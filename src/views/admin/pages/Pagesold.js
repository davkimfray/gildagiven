import React, {Component} from "react";
import { getFirebase } from "../../../components/Firebase/firebase.js";
import "../../../scss/shared.css";
import "./pages.css";
import PropTypes from 'prop-types';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Box from '@material-ui/core/Box';
// import Button from "@material-ui/core/Button";
// import {PhotoCamera} from '@material-ui/icons';
import wisdom from "../../../assets/books/wisdom1.JPG";



let selectedTab = null;
switch (window.location.pathname.slice(13)) {
    case 'home' : selectedTab = [
        {name: 'Top', image: 'image', title: 'home', subTitle: 'subTitle'},
        {name: 'About', image: 'image', title: 'title', subTitle: 'subTitle'},
        {name: 'Check Out My Books', image: 'image', title: 'title', details: 'details'},
        {name: 'Extra Me', image: 'image', title: 'title', details: 'details'}
    ]; break
    case 'about' : selectedTab = [
        {name: 'Top', contents: {image: 'image', title: 'title', subTitle: 'subTitle'}},
        {name: 'Details', contents: {title: 'title', subTitle: 'subTitle'}}
    ]; break
    case 'blog' : selectedTab = [
        {name: 'Top', contents: {image: 'image', title: 'blog', subTitle: 'subTitle'}},
        {name: 'Posts', contents: {title: 'title', subTitle: 'subTitle', image: 'image', topic: 'topic', details: 'details'}}
    ]; break
    case 'book-me' : selectedTab = [
        {name: 'Top', contents: {image: 'image', title: 'book', subTitle: 'subTitle'}},
    ]; break
    case 'for-you' : selectedTab = [
        {name: 'Top', contents: {image: 'image', title: 'title', subTitle: 'subTitle'}},
        {name: 'Books', contents: {title: 'title', image: 'image', book: 'book', details: 'details'}}
    ]; break
    case 'contacts' : selectedTab = [
        {name: 'Top', contents: {image: 'image', title: 'title', subTitle: 'subTitle'}},
    ]; break

    default : selectedTab = [
        {name: 'Top', contents: {image: 'image', title: 'title', subTitle: 'subTitle'}},
    ];


}


class Pagesold extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }

    }
    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };
        // this.state = {
        //     // currentItem: '',
        //     title: '',
        //     subTitle: '',
        //     content: '',
        //     image: null,
        //     imageFile: '',
        //     category: '',
        //     progress:0,
        //     downloadURL: null
        // }

    // constructor() {
    //     super();
    //     this.state = {
    //         // currentItem: '',
    //         title: '',
    //         subTitle: '',
    //         content: '',
    //         image: null,
    //         imageFile: '',
    //         category: '',
    //         progress:0,
    //         downloadURL: null
    //     }

    //     this.handleChange = this.handleChange.bind(this);
    //     // this.handleUpload = this.handleUpload.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }
    // handleChange(e) {
    //     if (e.target.name === 'image'){
    //         if (e.target.files[0]) {
    //             this.setState({
    //                 image: e.target.files[0]
    //             });
    //         }
    //     } else {
    //         this.setState({
    //             [e.target.name]: e.target.value
    //         });
    //     }
    // }
    // handleUpload = () =>{


    // handleSubmit(e) {
    //     e.preventDefault();
    //     const newPostRef = getFirebase().database().ref('posts');
    //     console.log(this.state.image);
    //     let file = this.state.image;
    //     const storage = getFirebase().storage();
    //     const storageRef = storage.ref();
    //     const uploadTask = storageRef.child('folder/' + file.name).put(file);
    //
    //     uploadTask.on(getFirebase().storage.TaskEvent.STATE_CHANGED,
    //         (snapshot) =>{
    //             const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100;
    //             this.setState({progress})
    //         },(error) =>{
    //             throw error
    //         },() =>{
    //             // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
    //
    //             uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
    //                 this.setState({
    //                     downloadURL: url
    //                 })
    //                 const newPost = {
    //                     title: this.state.title,
    //                     subTitle: this.state.subTitle,
    //                     imageUrl: this.state.downloadURL,
    //                     category: this.state.category,
    //                     date: new Date(),
    //                     content: this.state.content
    //                 };
    //                 newPostRef.push(newPost);
    //                 console.log(newPost);
    //                 this.setState({
    //                     title: '',
    //                     subTitle: '',
    //                     imageUrl: '',
    //                     content: '',
    //                     category: '',
    //                 });
    //             })
    //             document.getElementById("file").value = null
    //
    //         }
    //     )
    //
    // }
    // componentDidMount() {
    //     const itemsRef = getFirebase().database().ref('items');
    //     itemsRef.on('value', (snapshot) => {
    //         let items = snapshot.val();
    //         let newState = [];
    //         for (let item in items) {
    //             newState.push({
    //                 id: item,
    //                 title: items[item].title,
    //                 user: items[item].user
    //             });
    //         }
    //         this.setState({
    //             items: newState
    //         });
    //     });
    // }
    // removeItem(itemId) {
    //     const itemRef = getFirebase().database().ref(`/items/${itemId}`);
    //     itemRef.remove();
    // }
    // render() {
render() {
    const {classes} = this.props;

    return (
            <section>
                <div className={"row m-0 justify-content-center p-4 main-bg"}>

                </div>
                {/*<div className={"tabs-wrapper col-11 mx-auto "}>*/}
                {/*    <Tabs*/}
                {/*        orientation="vertical"*/}
                {/*        variant="scrollable"*/}
                {/*        value={this.state.value}*/}
                {/*        onChange={this.handleChange}*/}
                {/*        aria-label="Vertical tabs example"*/}
                {/*        className={' tabs'}*/}
                {/*        style={{position: 'relative', minWidth: 'fit-content'}}*/}
                {/*    >*/}
                {/*        {selectedTab.map((section, index) => (*/}
                {/*            <Tab key={index} label={section.name} {...a11yProps(index)}*/}
                {/*                 className={' btn'}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </Tabs>*/}
                {/*    {selectedTab.map((section, index) => (*/}
                {/*        <TabPanel key={index} value={this.state.value} index={index} className={""}>*/}
                {/*            <h1 className={"font-heading"}>{section.name}</h1>*/}
                {/*            <div className={"row px-2 mx-auto col-10"}>*/}
                {/*            <div className={"col-5 d-flex justify-content-center align-items-center"} style={{flexDirection: 'column'}}>*/}
                {/*                <img src={wisdom} alt={""} width="100%"/>*/}
                {/*                    <input type="file" id="file" hidden name="image" placeholder="Image" />*/}
                {/*                <Button*/}
                {/*                    variant="contained"*/}
                {/*                    color="primary"*/}
                {/*                    className={classes.button + " m-3"}*/}
                {/*                    startIcon={<PhotoCamera />}*/}
                {/*                    style={{backgroundColor: "#996573", textTransform: "capitalize"}}*/}
                {/*                >*/}
                {/*                    Select Image*/}
                {/*                </Button>*/}
                {/*            </div>*/}
                {/*            <div className={"col-lg-7"}>*/}
                {/*                    <div className="form-group ">*/}
                {/*                        {section.title}{window.location.pathname.slice(13)}*/}
                {/*                        <input type="text" className="form-control p-4" name="title" placeholder="Title"/>*/}
                {/*                    </div>*/}
                {/*                <div className="form-group">*/}
                {/*                    {section.details}*/}
                {/*                    <textarea className="form-control p-4" rows="4" name="content"  placeholder="Post Content" />*/}
                {/*                </div>*/}
                {/*                <Button*/}
                {/*                    variant="contained"*/}
                {/*                    color="primary"*/}
                {/*                    className={classes.button + " mx-auto"}*/}
                {/*                    startIcon={<PhotoCamera />}*/}
                {/*                    style={{backgroundColor: "#996573", textTransform: "capitalize"}}*/}
                {/*                >*/}
                {/*                    Update*/}
                {/*                </Button>*/}
                {/*            </div>*/}
                {/*            </div>*/}
                {/*        </TabPanel>*/}
                {/*        ))}*/}
                {/*</div>*/}
            <div className={"row m-0 justify-content-center main-bg"}>
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
                {/*<section id="contact-form" className="main-bg pt-5 d-flex">*/}
                {/*    <div className="container m-auto py-5">*/}
                {/*        <p className="text-center ">*/}
                {/*            <span className="font-heading word-bottom-line p-2">Add New Post</span>*/}
                {/*        </p>*/}
                {/*        <form onSubmit={this.handleSubmit}>*/}
                {/*            <div className="row my-lg-5 mx-0 justify-content-between">*/}
                {/*            <div className="form-group col-lg-6">*/}
                {/*                <input type="text" className="form-control p-4" name="title" placeholder="Title"  onChange={this.handleChange} value={this.state.title}/>*/}
                {/*            </div>*/}
                {/*            <div className="form-group col-lg-6">*/}
                {/*                <input type="text" className="form-control p-4" name="subTitle" placeholder="Sub Title"  onChange={this.handleChange} value={this.state.subTitle}/>*/}
                {/*            </div>*/}
                {/*    </div>*/}
                {/*            <div className="row my-lg-5 mx-0 justify-content-between">*/}
                {/*            <div className="form-group  col-lg-6">*/}
                {/*                <input type="text" className="form-control p-4" name="category" placeholder="Category"  onChange={this.handleChange} value={this.state.category}/>*/}
                {/*            </div>*/}
                {/*            <div className="form-group  col-lg-6">*/}
                {/*                <input type="file" id="file" className="form-control p-4" name="image" placeholder="Image"  onChange={this.handleChange}/>*/}
                {/*            </div>*/}
                {/*    </div>*/}
                {/*            /!*<div className="form-group my-5">*!/*/}
                {/*            /!*    <input type="text" className="form-control p-4" name="imageAlt" placeholder="Image Description"  onChange={this.handleChange} value={this.state.imageAlt}/>*!/*/}
                {/*            /!*</div>*!/*/}
                {/*            <div className="form-group">*/}
                {/*                <textarea className="form-control p-4" rows="5" name="content"  placeholder="Post Content" onChange={this.handleChange} value={this.state.content}/>*/}
                {/*            </div>*/}
                {/*            <div className="row pt-4">*/}
                {/*                <button type="submit" className="btn sec-main-bg text-white px-5 py-2 mx-auto">Add Post</button>*/}
                {/*            </div>*/}
                {/*        </form>*/}
                {/*    </div>*/}
                {/*</section>*/}

            </div>
            </section>
        );
    }

};
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                    {/*<Typography>{children}</Typography>*/}
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         backgroundColor: 'whitesmoke',
//         // backgroundColor: 'rgb(215 180 172)',
//         display: 'flex',
//         // height: 224,
//         boxShadow: '0 1px 3px rgba(153, 101, 115,0.12), 0 1px 20px rgba(153, 101, 115,0.24)'
//
//     },
//     tabs: {
//         borderRight: `3px solid rgb(215 180 172)`,
//     },
// }));

export default withStyles()(Pagesold)
