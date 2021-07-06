import React, {Component} from "react";
import {getFirebase} from "../../../components/Firebase/firebase.js";
import "../../../scss/shared.css";
import "./view-post.css";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import ImageLoader from "../../image-loader/ImageLoader";
import LazyLoad from "react-lazy-load";
import {Link} from "react-router-dom";
import {FaAmazon, FaLinkedin, FaYoutube, FaFacebookF, FaTwitter, FaInstagram} from "react-icons/fa";
import viewBlogGilda from "../../../assets/gilda/view_blog.JPG";

class ViewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            subTitle: '',
            content: '',
            imageUrl: '',
            category: '',
            isLoading: false,
            downloadURL: null
        };
    }
    


    componentDidMount() {
        this.setState({isLoading: true});
        if (this.props.match.params.postKey) {
            // const itemsRef = getFirebase().database().ref('posts/' + this.props.match.params.postKey);
            // itemsRef.on('value', (snapshot) => {
            //     let item = snapshot.val();
                this.setState({
                    title: this.props.location.query.title,
                    // subTitle: this.props.location.query.subTitle,
                    content: this.props.location.query.content,
                    // imageUrl: this.props.location.query.thu,
                    // category: this.props.location.query.category,
                });
            // });
                this.setState({isLoading: false});
            // console.log(this.props.location.query)
        }
    }


    render() {
        return (
                <section id="" className="main-bg pt-5 d-flex flex-column justify-content-between">
            <NavBar/>
            <div className="container col-lg-9 col-xxl-8 pt-5 pb-3 px-0 mx-md-auto">
                {this.state.isLoading ?
                    <div className="d-flex justify-content-center align-items-center font-banner pt-3 text-center position-absolute w-75 h-75">
                        <h1>Loading</h1>
                        <div className="lds-ellipsis">
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div>
                    : ''}
                    <div className="row mx-0 justify-content-between">
                         <div className="col-md-11 col-lg-8 mx-auto">
                            <p className="font-heading m-0 py-2 px-4">
                                {this.state.title}
                            </p>
                            {/*<p className="font-subheading main-color py-2 m-0 px-4">*/}
                            {/*    {this.state.subTitle}*/}
                            {/*</p>*/}
                            <p className="font-subheading py-2 m-0 h5 px-4">
                                <span className="main-color pr-2">By</span>
                                Gilda Given
                            </p>

                            {/*<LazyLoad debounce={false} offsetVertical={500}>*/}
                            {/*    <ImageLoader src={this.state.imageUrl}/>*/}
                            {/*</LazyLoad>*/}
                            <p className="p-2 figure-wrapper" dangerouslySetInnerHTML={{
                                __html: `${this.state.content}`
                            }}/>
                        </div>
                        <div className="d-sm-flex d-lg-block col-lg-4 pl-xxl-3 p-0 m-0">
                            <div className="mt-5 mb-0 col-sm-6 col-lg-12">
                            <div className="bg-right-card">
                                <LazyLoad debounce={false} offsetVertical={500}>
                                    <ImageLoader src={viewBlogGilda}/>
                                </LazyLoad>
                                <p className="text-center py-3">
                                <Link to="/about" className="text-decoration-none h4 font-small font-weight-light text-primary">
                                    About / Contact
                                    <span><br/></span>
                                     <span className="font-banner font-weight-bold text-center h2" style={{color: "black"}}>Gilda Given</span>
                                </Link>
                            </p>
                            </div>
                            </div>
                            <div className="col-sm-6 col-lg-12 mt-5" style={{height: "fit-content"}}>
                            <div className="lets-hang-out bg-right-card pb-4">
                                <p className="word-bottom-line"/>
                                <p className="font-banner text-center py-4">Let's Hang Out</p>
                                <p className="text-center">
                                    <a href="https://www.facebook.com/gildergiven/" className="text-decoration-none facebook"><FaFacebookF/></a>
                                    <a href="https://www.instagram.com/gildagiven/?hl=en" className="text-decoration-none instagram px-2"><FaInstagram/></a>
                                    <a href="https://twitter.com/gilda_given" className="text-decoration-none twitter px-2"><FaTwitter/></a>
                                    <a href="https://www.youtube.com/channel/UCTSj2RYx6A58W4DZnIn6y0Q" className="text-decoration-none youtube px-2"><FaYoutube/></a>
                                    <a href="http://amazon.com/author/gildagiven" className="text-decoration-none  px-2 amazon"> <FaAmazon/></a>
                                    <a href="https://www.linkedin.com/in/gilda-given-534019104/" className="text-decoration-none linkedin"> <FaLinkedin/></a>
                                </p>
                            </div>
                            </div>

                        </div>
                    </div>
             </div>
                <Footer className="mb-0"/>
            </section>
        );
    }
}

export default ViewPost;
