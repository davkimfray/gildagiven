import React, {Component} from 'react'
import '../../../scss/shared.css'
import './footer.css'
import {Link} from 'react-router-dom';
import {FaAmazon, FaLinkedin, FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaArrowAltCircleUp} from "react-icons/fa";

export default class Footer extends Component {

    render() {

        return (
            <>
                <a href="#" onClick={()=>window.scrollTo(0,0)}
                         className="position-fixed rounded-circle  transparent" style={{bottom: "24px", right: "24px"}}>
                    <FaArrowAltCircleUp size="2.5em" className="text-primary"/>
                </a>
                <footer className="container-fluid sec-main-bg font-heading mx-auto">
                    <div className="row not-mobile-footer align-items-center">
                        <Link to="/" className="name-logo my-md-3 m-lg-4">
                        </Link>
                        <span className="h3 mt-4 mx-auto" style={{color: 'rgb(215 180 172)'}}>All Rights Reserved &#169; {new Date().getFullYear()} Gilda Given</span>
                        <p className="my-auto pr-5 row align-items-center" style={{marginRight: '2vw'}}>
                            <a href="https://www.facebook.com/gildergiven/" className="text-decoration-none facebook"><FaFacebookF/></a>
                            <a href="https://www.instagram.com/gildagiven/?hl=en" className="text-decoration-none instagram px-2"><FaInstagram/></a>
                            <a href="https://twitter.com/gilda_given" className="text-decoration-none twitter px-2"><FaTwitter/></a>
                            <a href="https://www.youtube.com/channel/UCTSj2RYx6A58W4DZnIn6y0Q" className="text-decoration-none youtube px-2"><FaYoutube/></a>
                            <a href="http://amazon.com/author/gildagiven" className="text-decoration-none  px-2 amazon"> <FaAmazon/></a>
                            <a href="https://www.linkedin.com/in/gilda-given-534019104/" className="text-decoration-none linkedin"> <FaLinkedin/></a>
                        </p>

                    </div>
                    <div className="d-flex flex-column mobile-footer justify-content-center align-items-center">
                        <a href="/" className="name-logo row">
                        </a>
                        <p className="my-auto mx-0 row align-items-center">
                            <a href="https://www.facebook.com/gildergiven/" className="text-decoration-none facebook"><FaFacebookF/></a>
                            <a href="https://www.instagram.com/gildagiven/?hl=en" className="text-decoration-none instagram px-2"><FaInstagram/></a>
                            <a href="https://twitter.com/gilda_given" className="text-decoration-none twitter px-2"><FaTwitter/></a>
                            <a href="https://www.youtube.com/channel/UCTSj2RYx6A58W4DZnIn6y0Q" className="text-decoration-none youtube px-2"><FaYoutube/></a>
                            <a href="http://amazon.com/author/gildagiven" className="text-decoration-none  px-2 amazon"> <FaAmazon/></a>
                            <a href="https://www.linkedin.com/in/gilda-given-534019104/" className="text-decoration-none linkedin"> <FaLinkedin/></a>
                        </p>
                        <p className=" m-0 p-2 font-heading" style={{color: 'rgb(215 180 172)', fontSize:"18px"}}>All Rights Reserved <br/> &#169; {new Date().getFullYear()} Gilda Given</p>
                    </div>
                </footer>
            </>
        )
    }
}
