import React, {useEffect, useState} from "react";
import "../../../scss/shared.css";
import "./landing.css";
import NavBar from "../navbar/NavBar";
import LazyLoad from "react-lazy-load";
import "aos/dist/aos.css";
import {Link} from "react-router-dom";
import ImageLoader from "../../image-loader/ImageLoader";
import Quotes from "../qoutes/Quotes";
import Footer from "../footer/Footer";
import {getFirebase} from "../../../components/Firebase/firebase";
import {FaAmazon, FaLinkedin, FaYoutube, FaFacebookF, FaTwitter, FaInstagram} from "react-icons/fa";
import {CButtonClose} from "@coreui/react";


const aboutStyles = "no-repeat right, linear-gradient(to bottom, #ffffff 0%, #E0E3E7 100%)";
const Landing = () => {
    const [page, setPage] = useState([]);
    const [isLoadingCheckOut, setIsLoadingCheckOut] = useState(false);
    const [isLoadingExtraMe, setIsLoadingExtraMe] = useState(false);
    const [activeReadMore, setActiveReadMore] = useState(null);

    let numOfLetters = 150
    if(window.innerWidth > 580) {
        numOfLetters = 200
    }
    if(window.innerWidth > 990) {
        numOfLetters = 300
    }
    // if(window.innerWidth > 1270) {
    //     numOfLetters = 500
    // }
    // if(window.innerWidth > 1460) {
    //     numOfLetters = 4000
    // }
    useEffect(() => {
        setIsLoadingCheckOut(true);
        setIsLoadingExtraMe(true);
        const pageRef = getFirebase().database().ref('pages/home');
        pageRef.on('value', (snapshot) => {
            let items = snapshot.val();
            setPage([
                {section: 'top', content: structureFetchedData(items.top)},
                {section: 'about', content: structureFetchedData(items.about)},
                {section: 'checkOutMyBooks', content: structureFetchedData(items.checkOutMyBooks)},
                {section: 'extraMe', content: structureFetchedData(items.extraMe)}
            ]);
             setIsLoadingCheckOut(false);
             setIsLoadingExtraMe(false);
        });
    }, []);

    function structureFetchedData(data) {
        let val = [];
        for (let item in data) {
            val.push({
                id: item,
                title: data[item].title,
                imageUrl: data[item].imageUrl,
                content: data[item].content
            });
        }
        return val
    }

    return (
        <div className="main-bg">
            <NavBar/>
            <section id="home" className="main-bg">
                <div className="">
                    <div className="col-md-10  m-auto pl-4 col animate-wrapper">
                        <h2 className="main-color font-display">Meet</h2>
                        <h2 data-aos={"animate-top-text"} data-aos-duration={"2000"}
                            className="font-display font-weight-bold animate animate-delay-1">
                            Gilda <span className="word-bottom-line ">Given</span>,
                        </h2>
                        <h4 data-aos={"animate-top-text"} data-aos-duration={"2900"} data-aos-offset={"250"}
                            className="font-banner col-8 animate animate-delay-2">
                            <span className="ml-1 "/>
                            The Lady Who Chooses To <br/>
                            Embrace Her Own
                            <span className="font-display main-color">{' '} Nature </span>
                        </h4>
                        <p data-aos={"fade-right"} data-aos-offset={"150"} className="mx-4">
                            <a href="https://www.facebook.com/gildergiven/"
                               className="text-decoration-none facebook"><FaFacebookF/></a>
                            <a href="https://www.instagram.com/gildagiven/?hl=en"
                               className="text-decoration-none instagram px-2"><FaInstagram/></a>
                            <a href="https://twitter.com/gilda_given"
                               className="text-decoration-none twitter px-2"><FaTwitter/></a>
                            <a href="https://www.youtube.com/channel/UCTSj2RYx6A58W4DZnIn6y0Q"
                               className="text-decoration-none youtube px-2"><FaYoutube/></a>
                            <a href="http://amazon.com/author/gildagiven" className="text-decoration-none  px-2 amazon">
                                <FaAmazon/></a>
                            <a href="https://www.linkedin.com/in/gilda-given-534019104/"
                               className="text-decoration-none linkedin"> <FaLinkedin/></a>
                        </p>
                    </div>
                </div>
            </section>
            {page.map((section, index) => (
                section.section === 'about' ?
                    section.content.map((content, index) => (
                        <section key={index} id="about-me" className="d-flex flex-direction-column py-2 main-bg"
                                 style={{
                                     background: "url(" + content.imageUrl + ") " + aboutStyles,
                                     backgroundSize: 'contain'
                                 }}>
                            <div className="col-md-10 mx-auto my-auto">
                                <div data-aos={"fade-left"}
                                     className="card-about-wrapper col-lg-6 col-xl-5 py-4 font-weight-bold">
            <span
                className="card-title verticle-text font-weight-lighter main-color font-display position-absolute mt-4"
            >ABOUT</span>
                                    <div className="card-body ml-4">
                                        <p className="card-title font-banner pl-3 font-weight-bold">{content.title}</p>
                                        {/*<p className="card-title font-banner font-weight-bold">*/}
                                        {/*    And <span className="word-bottom-line">Mindful</span> Charm*/}
                                        {/*</p>*/}
                                        <div className="card-text font-display font-weight-normal">
                                            <span className="h1 p-2"> {content.content.slice(0, 1)}</span>
                                            {content.content.slice(1)}
                                        </div>
                                        <div className="text-center">
                                            <Link to="/about"
                                                  className="h5 sec-main-bg font-display font-weight-bold text-decoration-none text-white p-3 card-title font-weight-lighter ">Learn
                                                More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))
                    : ''
            ))}
            <section id="check-out-my-books" className="main-bg m-0">
                <p className="py-5 text-center main-color font-weight-bold heading font-heading">
                    Check Out My Books
                </p>

                <div className="row col-lg-11 mx-auto py-5 justify-content-between">
                    {isLoadingCheckOut ?
                        <div
                            className="d-flex justify-content-center align-items-center font-banner pt-3 text-center position-absolute w-100 h-25">
                            <h1>Loading</h1>
                            <div className="lds-ellipsis">
                                <div/>
                                <div/>
                                <div/>
                                <div/>
                            </div>
                        </div>
                        :
                        page.map((section, index) => (
                            section.section === 'checkOutMyBooks' ?
                                section.content.map((content, index) => (
                                    <div key={index} className="col-sm-6 col-lg-4 my-3"
                                         data-aos={"fade-up"} data-aos-duration={"2000"} data-aos-offset={index * 90}>
                                        <div className="img m-auto"
                                             style={content.imageUrl ? {display: 'block'} : {display: 'none'}}>
                                                <img src={content.imageUrl} width="100%" alt=""/>
                                        </div>
                                        <p className="my-4 main-color font-heading font-weight-bold">{content.title}</p>
                                        <p className="font-display">
                                        <span>{content.content.substring(0, activeReadMore !== index ? numOfLetters : 40000)}</span>
                                                {content.content.length > numOfLetters && activeReadMore !== index ?
                                             <CButtonClose onClick={() => {
                                                 setActiveReadMore(index)}}> Read more ▼</CButtonClose>
                                             : ''
                                                }
                                             </p>  
                                    </div>
                                ))
                                : ''
                        ))
                    }

                </div>
            </section>
            <section id="extra-me" className="main-bg row m-0" style={{overflowX: "hidden"}}>
                <div
                    className="row mx-auto col-12 py-0 main-color font-weight-bold font-heading justify-content-center align-items-center">
                    <div className="col-3">
                        <hr className="sec-main-bg"/>
                    </div>
                    <div className="col-6 col-lg-4 text-center px-0 ">The Extra Me</div>
                    <div className="col-3 ">
                        <hr className="sec-main-bg"/>
                    </div>
                </div>

                <div className="row col-lg-11 mx-auto py-md-5 justify-content-between">
                    {isLoadingExtraMe ?
                        <div
                            className="d-flex justify-content-center align-items-center font-banner pt-3 text-center position-absolute w-100 h-25">
                            <h1>Loading</h1>
                            <div className="lds-ellipsis">
                                <div/>
                                <div/>
                                <div/>
                                <div/>
                            </div>
                        </div>
                        :
                        page.map((section, index) => (
                            section.section === 'extraMe' ?
                                section.content.map((content, index) => (
                                    <div key={index}
                                         className={index === 0 ? "col-sm-10 col-lg-4 mx-auto my-3" : "col-sm-6 col-lg-4 my-3"}
                                         data-aos={index === 0 ? "fade-right" : index === 1 ? "zoom-in" : "fade-left"}
                                         data-aos-duration={"1000"}>
                                            <div className="extra-me-img"
                                                 style={{'backgroundImage': 'url(' + content.imageUrl + ')'}}/>
                                        <p className="font-heading text-white text-center h2 font-weight-bold py-3 col-7 mx-auto sec-main-bg">
                                            {content.title}</p>
                                        <p className="font-display">
                                        <span>{content.content.substring(0, activeReadMore !== index ? numOfLetters : 40000)}</span>
                                                {content.content.length > numOfLetters && activeReadMore !== index ?
                                             <CButtonClose onClick={() => {
                                                 setActiveReadMore(index)}}> Read more ▼</CButtonClose>
                                             : ''
                                                }
                                             </p>  
                                    </div>
                                ))
                                : ''
                        ))
                    }
                </div>
            </section>
            <Quotes/>
            <Footer/>
        </div>
    );
};

export default Landing;
