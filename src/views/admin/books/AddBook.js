import React, {Component} from "react";
import {getFirebase} from "../../../components/Firebase/firebase.js";
import "../../../scss/shared.css";
import "./books.css";
import {
    CButton,
    CCol,
    CFormGroup,
    CInput, CInputFile, CInvalidFeedback,
    CLabel,
    CProgress,
    CSpinner,
    CTextarea, CToast, CToastBody, CToaster, CToastHeader
} from "@coreui/react";
import {FaRegCheckCircle} from "react-icons/fa";

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invalid: false,
            showToast: false,
            title: '',
            description: '',
            image: null,
            imageUrl: '',
            book: null,
            bookName: '',
            bookUrl: '',
            progress: 0,
            downloadURL: null
        };
        this.inputFileRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  async uploadFile(file, uploadCover) {
       return new Promise((resolve, reject) => {
           const storage = getFirebase().storage();
           const storageRef = storage.ref();
           const uploadFile = storageRef.child('books/' + this.state.title + '/' + file.name).put(file);
           uploadFile.on(getFirebase().storage.TaskEvent.STATE_CHANGED,
               (snapshot) => {
                   const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 70;
                   if (uploadCover) {
                       this.setState({progress: 20})
                   } else {
                       this.setState({progress: uploadProgress + 20})
                   }
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
                  uploadFile.snapshot.ref.getDownloadURL().then((downloadURL) => {
                      // if (uploadCover) this.setState({imageUrl: downloadURL});
                      resolve(downloadURL);
                   })
               })
       });
   }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            // progress: 0,
            showToast: false
        });
        if (this.state.title.trim().length > 0 && this.state.bookUrl && this.state.imageUrl && this.state.description.trim().length > 0) {
            const bookKey = new Date().getTime();
            const newBookKeyRef = getFirebase().database().ref('books/booksKeys/' + (this.props.match.params.bookKey ? this.props.match.params.bookKey : bookKey));
            const newBookRef = getFirebase().database().ref('books/books/' + (this.props.match.params.bookKey ? this.props.match.params.bookKey : bookKey));

            if (this.state.book && this.state.image) {
                let image ='';
                this.uploadFile(this.state.image, true).then((imageUrl) => {
                    image = imageUrl;
                });
                setTimeout(()=> {
                    this.uploadFile(this.state.book, false).then((bookUrl) => {
                        const newBook = {
                            title: this.state.title,
                            description: this.state.description,
                            imageUrl: image,
                            bookName: this.state.bookName,
                            bookUrl: bookUrl,
                        };
                        newBookRef.set(newBook).then(()=>{
                            this.setState({progress: 100});
                            if (!this.props.match.params.bookKey) {
                                newBookKeyRef.set(bookKey);
                                this.setState({
                                    title: '',
                                    description: '',
                                    image: '',
                                    imageUrl: '',
                                    book: '',
                                    bookUrl: '',
                                    bookName: '',
                                    progress: 0,
                                    showToast: true,

                                });
                                document.getElementById("file").value = null;
                                document.getElementById("custom-file-input").value = null;
                            } else {
                                this.setState({
                                    progress: 0,
                                    showToast: true,
                                });
                            }
                        });

                    });
                })
            }
            else if (this.state.book) {
                this.uploadFile(this.state.book, false).then((bookUrl) => {
                    const newBook = {
                        title: this.state.title,
                        description: this.state.description,
                        imageUrl: this.state.imageUrl,
                        bookName: this.state.bookName,
                        bookUrl: bookUrl,
                    };
                    newBookRef.set(newBook);
                    this.setState({progress: 100});
                    if (!this.props.match.params.bookKey) {
                        newBookKeyRef.set(bookKey);
                        this.setState({
                            title: '',
                            description: '',
                            imageUrl: '',
                            bookUrl: '',
                            bookName: '',
                            progress: 0,
                            showToast: true,

                        });
                        document.getElementById("file").value = null;
                        document.getElementById("custom-file-input").value = null;
                    } else {
                        this.setState({
                            progress: 0,
                            showToast: true,
                        });
                    }
                });
            } else if (this.state.image) {
                this.uploadFile(this.state.image, true).then((imageUrl) => {
                    const newBook = {
                        title: this.state.title,
                        description: this.state.description,
                        imageUrl: imageUrl,
                        bookName: this.state.bookName,
                        bookUrl: this.state.bookUrl,
                    };
                    newBookRef.set(newBook);
                    this.setState({progress: 100});
                    if (!this.props.match.params.bookKey) {
                        newBookKeyRef.set(bookKey);
                        this.setState({
                            title: '',
                            description: '',
                            imageUrl: '',
                            bookUrl: '',
                            bookName: '',
                            progress: 0,
                            showToast: true,

                        });
                        document.getElementById("file").value = null;
                        document.getElementById("custom-file-input").value = null;
                    } else {
                        this.setState({
                            progress: 0,
                            showToast: true,
                        });
                    }
                });
            } else {
                const newBook = {
                    title: this.state.title,
                    description: this.state.description,
                    imageUrl: this.state.imageUrl,
                    bookName: this.state.bookName,
                    bookUrl: this.state.bookUrl,
                };
                newBookKeyRef.set(bookKey);
                newBookRef.set(newBook);
                this.setState({progress: 100});
                if (!this.props.match.params.bookKey) {
                    this.setState({
                        title: '',
                        description: '',
                        imageUrl: '',
                        bookUrl: '',
                        bookName: '',
                        progress: 0,
                        showToast: true,

                    });
                    document.getElementById("file").value = null;
                    document.getElementById("custom-file-input").value = null;
                } else {
                    this.setState({
                        progress: 0,
                        showToast: true,
                    });
                }
            }

        } else {
            this.setState({invalid: true})
        }
    }
        componentDidMount()
        {
            if (this.props.match.params.bookKey) {
                const itemsRef = getFirebase().database().ref('books/books/' + this.props.match.params.bookKey);
                itemsRef.on('value', (snapshot) => {
                    let item = snapshot.val();
                    this.setState({
                        title: item.title,
                        description: item.description,
                        imageUrl: item.imageUrl,
                        bookName: item.bookName,
                        bookUrl: item.bookUrl,
                    })
                });
            }
        }
        render()
        {
            return (
                <>
                    <CToaster position="bottom-center" >
                        <CToast show={this.state.showToast} autohide={3000} fade={true} onClose={()=>this.setState({showToast: false})}>
                            <CToastHeader closeButton={true} className="text-success">
                                <FaRegCheckCircle fontSize="2em" className="text-success rounded-circle px-1 m-1 mr-3"/>
                                Successful
                            </CToastHeader>
                            <CToastBody>
                                {this.props.match.params.bookKey ? `Book Updated Successfully.` : `Book Added Successfully.`}
                            </CToastBody>
                        </CToast>
                    </CToaster>
                    <div className="main-bg d-flex">
                        <div className="container m-auto p-0 pb-3">
                            <p className="text-center mb-0">
                            <span className="font-heading">
                                {this.props.match.params.bookKey ? 'Edit Book' : 'Add New Book'}</span>
                            </p>
                            <CProgress
                                className="progress-xs"
                                precision={1}
                                color="primary"
                                value={this.state.progress}
                                // style={{width: this.state.progress + '%'}}
                                animated={this.state.progress !== 100}
                            />
                            <div>
                                <div className="row mx-0 justify-content-center py-5">
                                    <div className={" col-lg-4 d-flex align-items-center"}
                                         style={{flexDirection: 'column',}}>
                                        {/*<LazyLoad debounce={false} offsetVertical={500}>*/}
                                        <img src={this.state.imageUrl} alt=""
                                             style={{maxWidth: "100%", maxHeight: "240px"}}/>
                                        {/*</LazyLoad>*/}
                                        <input type="file" id="file" hidden name="image" placeholder="Image"
                                               ref={this.inputFileRef} onChange={event => event.target.files[0] ?
                                            this.setState({
                                                image: event.target.files[0],
                                                imageUrl: URL.createObjectURL(event.target.files[0])
                                            })
                                            : {}}/>

                                        <CButton onClick={() => this.inputFileRef.current.click()}
                                                className="btn sec-main-bg h4 font-subheading text-white px-4 py-2 my-3 mx-auto">Select
                                            Cover Image
                                        </CButton>
                                        {!this.state.imageUrl && this.state.invalid ?
                                            <div className="h5 pl-3 text-danger">*Cover Image Required*</div>
                                            : ''}

                                    </div>
                                    <div className="col-lg-7 mx-0 ">
                                        <CFormGroup>
                                            <CLabel className="h3">Book Title</CLabel>
                                            <CInput size="lg" name="title" placeholder="Title"
                                                    invalid={!this.state.title.trim().length>0 && this.state.invalid}
                                                    onChange={event => this.setState({title: event.target.value})}
                                                    value={this.state.title}/>
                                            <CInvalidFeedback className="h5 pl-3">*Book Title Required*</CInvalidFeedback>
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel className="h3">Select Book</CLabel>
                                            <CCol>
                                                <CInputFile size="lg" custom id="custom-file-input"
                                                            invalid={!this.state.bookUrl && this.state.invalid}
                                                            onChange={event => event.target.files[0] ?
                                                                this.setState({
                                                                    book: event.target.files[0],
                                                                    bookName: event.target.files[0].name,
                                                                    bookUrl: URL.createObjectURL(event.target.files[0])
                                                                })
                                                                : {}}/>
                                                <CInvalidFeedback className="h5 ">*Book File Required*</CInvalidFeedback>
                                                <CLabel htmlFor="custom-file-input" variant="custom-file">
                                                    {this.state.bookName ? this.state.bookName : 'Choose file...'}
                                                </CLabel>
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel className="h3">Book Details</CLabel>
                                            <CTextarea
                                                name="textarea-input"
                                                rows="5"
                                                size="lg"
                                                placeholder="Content..."
                                                invalid={!this.state.description.trim().length>0 && this.state.invalid}
                                                onChange={event => this.setState({description: event.target.value})}
                                                value={this.state.description}
                                            />
                                            <CInvalidFeedback className="h5 pl-3">*Book Details Required*</CInvalidFeedback>
                                        </CFormGroup>
                                    </div>

                                </div>
                                <div className="col-lg-11 mx-auto">
                                    <div className="row pt-4">
                                        <button onClick={this.handleSubmit}
                                                className="btn h4 sec-main-bg text-white px-5 py-2 mx-auto"
                                                disabled={this.state.progress > 0 && this.state.progress < 100}>
                                            {this.state.progress > 0 && this.state.progress < 100 ?
                                                <CSpinner color="info" className={""}/> : ''}
                                            <span className={"px-4 py-2"}>
                                    {this.props.match.params.bookKey ? 'Update Book' : 'Add Book'}
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

    export default AddBook;
