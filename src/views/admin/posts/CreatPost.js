import React, {Component} from "react";
import {getFirebase} from "../../../components/Firebase/firebase.js";
import "../../../scss/shared.css";
import "./posts.css";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CProgress, CSpinner} from "@coreui/react";


class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file.then(
            file =>
                new Promise((resolve, reject) => {
                    let storage = getFirebase().storage().ref('posts/');
                    let uploadTask = storage
                        .child(file.name)
                        .put(file);
                    uploadTask.on(
                        getFirebase().storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                        function (snapshot) {
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            // const progress =
                            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            if (snapshot.state === getFirebase().storage.TaskState.PAUSED) {// or 'paused'
                                console.log("Upload is paused");
                            } else if (snapshot.state === getFirebase().storage.TaskState.RUNNING) {// or 'running'
                                console.log("Upload is running");
                            }
                        },
                        function (error) {
                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            // eslint-disable-next-line default-case
                            switch (error.code) {
                                case "storage/unauthorized":
                                    reject(" User doesn't have permission to access the object");
                                    break;

                                case "storage/canceled":
                                    reject("User canceled the upload");
                                    break;

                                case "storage/unknown":
                                    reject(
                                        "Unknown error occurred, inspect error.serverResponse"
                                    );
                                    break;
                            }
                        },
                        function () {
                            // Upload completed successfully, now we can get the download URL
                            uploadTask.snapshot.ref
                                .getDownloadURL()
                                .then(function (downloadURL) {
                                    // console.log("File available at", downloadURL);
                                    resolve({
                                        default: downloadURL
                                    });
                                });
                        }
                    );
                })
        );
    }
}


class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            subTitle: '',
            content: '<p>Add Content Here!</p>',
            image: null,
            imageUrl: '',
            category: '',
            progress: 0,
            downloadURL: null,
            postKey: this.props.match.params.postKey
        };
        this.inputFileRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const postKey = new Date().getTime();
        const newPostKeyRef = getFirebase().database().ref('postsKeys/'+ (this.state.postKey ? this.state.postKey : postKey));
        const newPostRef = getFirebase().database().ref('posts/'+ (this.state.postKey ? this.state.postKey : postKey));

        if (this.state.image) {
            let file = this.state.image;
            new Promise((resolve, reject) => {
                    const storage = getFirebase().storage();
                    const storageRef = storage.ref();
                    const uploadTask = storageRef.child('posts/' + file.name).put(file);
                    uploadTask.on(getFirebase().storage.TaskEvent.STATE_CHANGED,
                        (snapshot) => {
                            const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 80;
                            this.setState({progress: uploadProgress + 10})
                        },
                        function (error) {
                            if (error.code === "storage/unauthorized") {
                                reject(" User doesn't have permission to access the object");
                            } else if (error.code === "storage/canceled") {
                                reject("User canceled the upload");
                            } else if (error.code === "storage/unknown") {
                                reject(
                                    "Unknown error occurred, inspect error.serverResponse"
                                );
                            }
                        }, () => {
                            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                                this.setState({
                                    downloadURL: url
                                });
                                const newPost = {
                                    title: this.state.title,
                                    subTitle: this.state.subTitle,
                                    imageUrl: this.state.downloadURL,
                                    category: this.state.category,
                                    content: this.state.content
                                };
                                newPostRef.set(newPost);
                                this.setState({progress: 100});
                                if (!this.state.postKey) {
                                    newPostKeyRef.set(postKey);
                                    this.setState({
                                        title: '',
                                        subTitle: '',
                                        imageUrl: '',
                                        content: '<p>Add Content Here!</p>',
                                        category: '',
                                        progress: 0,
                                    });
                                }
                            });
                            document.getElementById("file").value = null
                        })
                }
            )
        }
        else if (this.state.postKey) {
            this.setState({progress: 50});
            const newPost = {
                title: this.state.title,
                subTitle: this.state.subTitle,
                imageUrl: this.state.imageUrl,
                category: this.state.category,
                content: this.state.content
            };
            newPostRef.set(newPost).then(() => this.setState({progress: 100}));


        }
    }

    componentDidMount() {
        if (this.state.postKey) {
            const itemsRef = getFirebase().database().ref('posts/'+this.state.postKey);
        itemsRef.on('value', (snapshot) => {
             let item = snapshot.val();
             this.setState({
                 title: item.title,
                 subTitle: item.subTitle,
                 content: item.content,
                 imageUrl: item.imageUrl,
                 category: item.category,
             })
        });
    }
    }


    render() {

        return (
            <>

                <div id="contact-form" className="main-bg d-flex">
                    <div className="container m-auto p-0 pb-3">
                        <p className="text-center ">
                            <span className="font-heading word-bottom-line p-2">
                                {this.state.postKey ?  'Edit Post' : 'Add New Post'}</span>
                        </p>
                        <div>
                            <div className="row mx-0 justify-content-center">
                            <div className={" col-lg-4 d-flex align-items-center"} style={{flexDirection: 'column', }}>
                                {/*<LazyLoad debounce={false} offsetVertical={500}>*/}
                                <img src={this.state.imageUrl} alt=""  style={{maxWidth: "100%", maxHeight: "240px"}}/>
                                {/*</LazyLoad>*/}
                                <input type="file" id="file" hidden name="image" placeholder="Image"
                                       ref={this.inputFileRef} onChange={event => event.target.files[0] ?
                                    this.setState({image: event.target.files[0], imageUrl: URL.createObjectURL(event.target.files[0])})
                                    : {}}/>

                                <button onClick={() => this.inputFileRef.current.click()} className="btn sec-main-bg h4 font-subheading text-white px-4 py-2 my-3 mx-auto">Select Image</button>
                            </div>
                            <div className="col-lg-7 mx-0">
                                <div className="form-group p-0">
                                    <label className="h4">Title</label>
                                    <input type="text" className="form-control p-4" name="title" placeholder="Title"
                                           onChange={event => this.setState({title: event.target.value})}
                                           value={this.state.title}/>
                                </div>
                                <div className="form-group p-0">
                                    <label className="h4">SubTitle</label>
                                    <input type="text" className="form-control p-4" name="subTitle"
                                           placeholder="Sub Title"
                                           onChange={event => this.setState({subTitle: event.target.value})}
                                           value={this.state.subTitle}/>
                                </div>
                                <div className="form-group p-0">
                                    <label className="h4">Category</label>
                                    <input type="text" className="form-control p-4" name="category"
                                           placeholder="Category"
                                           onChange={event => this.setState({category: event.target.value})}
                                           value={this.state.category}/>
                                </div>
                            </div>
                            </div>
                            <div className="col-lg-11 mx-auto">
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.state.content}
                                onReady={editor => {
                                    editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                                        return new MyUploadAdapter(loader);
                                    };
                                }}
                                // onChange={this.handleChange}
                                onChange={(event, editor) => {
                                    this.setState({content: editor.getData()});
                                }}
                                // onBlur={ ( event, editor ) => {
                                //     console.log( 'Blur.', editor );
                                // } }
                                // onFocus={ ( event, editor ) => {
                                //     console.log( 'Focus.', editor );
                                // } }
                            />
                                    <CProgress
                                        className="progress-xs"
                                        precision={1}
                                        color="success"
                                        value={this.state.progress}
                                        animated={this.state.progress !== 100}
                                    />
                            <div className="row pt-4">
                                <button onClick={this.handleSubmit} className="btn h4 sec-main-bg text-white px-5 py-2 mx-auto"  disabled={this.state.progress > 0 && this.state.progress < 100}>
                                    {this.state.progress > 0 && this.state.progress < 100 ? <CSpinner color="info" className={""}/> : ''}
                                    <span className={"px-4 py-2"}>
                                    {this.state.postKey ? 'Update Post' : 'Add Post'}
                                    </span>
                            </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CreatePost;
