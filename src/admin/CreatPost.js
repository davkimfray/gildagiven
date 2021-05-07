import React, { Component } from "react";
import { getFirebase } from "../config/firebase.js";
import { getStorage } from "../config/firebase.js";
import "../style/shared.css";
import "../style/blog.css";


class CreatePost extends Component{
    constructor() {
        super();
        this.state = {
            // currentItem: '',
            title: '',
            subTitle: '',
            content: '',
            image: null,
            imageFile: '',
            category: '',
            progress:0,
            downloadURL: null
        }

        this.handleChange = this.handleChange.bind(this);
        // this.handleUpload = this.handleUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        if (e.target.name === 'image'){
            if (e.target.files[0]) {
                this.setState({
                    image: e.target.files[0]
                });
            }
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }
    // handleUpload = () =>{
    // console.log(this.state.image);
    // let file = this.state.image;
    //     const storage = getStorage();
    //     const storageRef = storage.ref();
    //     const uploadTask = storageRef.child('folder/' + file.name).put(file);
    //
    //     uploadTask.on(getStorage().TaskEvent.STATE_CHANGED,
    //     (snapshot) =>{
    //         var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
    //         this.setState({progress})
    //     },(error) =>{
    //         throw error
    //     },() =>{
    //         // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
    //
    //         uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
    //             this.setState({
    //                 downloadURL: url
    //             })
    //         })
    //         document.getElementById("file").value = null
    //
    //     }
    //     )
    // }
    handleSubmit(e) {
        e.preventDefault();
        const newPostRef = getFirebase().database().ref('posts');
        console.log(this.state.image);
        let file = this.state.image;
        const storage = getFirebase().storage();
        const storageRef = storage.ref();
        const uploadTask = storageRef.child('folder/' + file.name).put(file);

        uploadTask.on(getFirebase().storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>{
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100;
                this.setState({progress})
            },(error) =>{
                throw error
            },() =>{
                // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

                uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                    this.setState({
                        downloadURL: url
                    })
                    const newPost = {
                        title: this.state.title,
                        subTitle: this.state.subTitle,
                        imageUrl: this.state.downloadURL,
                        category: this.state.category,
                        date: new Date(),
                        content: this.state.content
                    };
                    newPostRef.push(newPost);
                    console.log(newPost);
                    this.setState({
                        title: '',
                        subTitle: '',
                        imageUrl: '',
                        content: '',
                        category: '',
                    });
                })
                document.getElementById("file").value = null

            }
        )

    }
    componentDidMount() {
        const itemsRef = getFirebase().database().ref('items');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    title: items[item].title,
                    user: items[item].user
                });
            }
            this.setState({
                items: newState
            });
        });
    }
    removeItem(itemId) {
        const itemRef = getFirebase().database().ref(`/items/${itemId}`);
        itemRef.remove();
    }
    render() {
        return (
            <div className='app'>
                <div className='container'>
                    {/*<section className='add-item'>*/}
                    {/*    <form onSubmit={this.handleSubmit}>*/}
                    {/*        <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />*/}
                    {/*        <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />*/}
                    {/*        <button>Add Item</button>*/}
                    {/*    </form>*/}
                    {/*</section>*/}
                    {/*<section className='display-item'>*/}
                    {/*    <div className="wrapper">*/}
                    {/*        <ul>*/}
                    {/*            {this.state.items.map((item) => {*/}
                    {/*                return (*/}
                    {/*                    <li key={item.id}>*/}
                    {/*                        <h3>{item.title}</h3>*/}
                    {/*                        <p>brought by: {item.user}*/}
                    {/*                            <button onClick={() => this.removeItem(item.id)}>Remove Item</button>*/}
                    {/*                        </p>*/}
                    {/*                    </li>*/}
                    {/*                )*/}
                    {/*            })}*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*</section>*/}
                </div>
                <section id="contact-form" className="main-bg pt-5 d-flex">
                    <div className="container m-auto py-5">
                        <p className="text-center ">
                            <span className="font-heading word-bottom-line p-2">Add New Post</span>
                        </p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row my-lg-5 mx-0 justify-content-between">
                            <div className="form-group col-lg-6">
                                <input type="text" className="form-control p-4" name="title" placeholder="Title"  onChange={this.handleChange} value={this.state.title}/>
                            </div>
                            <div className="form-group col-lg-6">
                                <input type="text" className="form-control p-4" name="subTitle" placeholder="Sub Title"  onChange={this.handleChange} value={this.state.subTitle}/>
                            </div>
                    </div>
                            <div className="row my-lg-5 mx-0 justify-content-between">
                            <div className="form-group  col-lg-6">
                                <input type="text" className="form-control p-4" name="category" placeholder="Category"  onChange={this.handleChange} value={this.state.category}/>
                            </div>
                            <div className="form-group  col-lg-6">
                                <input type="file" id="file" className="form-control p-4" name="image" placeholder="Image"  onChange={this.handleChange}/>
                            </div>
                                {this.state.progress}
                    </div>
                            {/*<div className="form-group my-5">*/}
                            {/*    <input type="text" className="form-control p-4" name="imageAlt" placeholder="Image Description"  onChange={this.handleChange} value={this.state.imageAlt}/>*/}
                            {/*</div>*/}
                            <div className="form-group">
                                <textarea className="form-control p-4" rows="5" name="content"  placeholder="Post Content" onChange={this.handleChange} value={this.state.content}/>
                            </div>
                            <div className="row pt-4">
                                <button type="submit" className="btn sec-main-bg text-white px-5 py-2 mx-auto">Add Post</button>
                            </div>
                        </form>
                    </div>
                </section>

            </div>
        );
    }
};

export default CreatePost;
