import "./about.css";
import "../../../scss/shared.css";
import NavBar from "../navbar/NavBar";
import React, {useEffect, useState} from "react";
import RegisterWeeklyArticle from "../register-weekly-articles/RegisterWeeklyArticle";
import Footer from "../footer/Footer";
import {getFirebase} from "../../../components/Firebase/firebase";
import {CButton} from "@coreui/react";

export const AboutUs = () => {
    const [aboutMe, setAboutMe] = useState([]);
    useEffect(() => {
        const aboutRef = getFirebase().database().ref('pages/about');
        aboutRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let newState = [];
            for (let about in data) {
                newState.push({
                    id: about,
                    title: data[about].title,
                    details: data[about].details,
                });
            }
            setAboutMe(newState)
        });
    }, []);
    return (
        <div>
            <NavBar/>
            <section id="top" className="bg-white" style={{color: "black"}}>
                <div className="">
                    <div className="col-md-10  m-auto pl-4 col ">
                        <h2 className="font-display font-weight-bold">
                            <span className="main-color font-display">Hey</span>
                            {' '} I'm {' '} <span className="word-bottom-line">Gilda</span> Given,
                        </h2>
                        <h4 className="font-banner col-8">
                            <span className="ml-1"></span>
                            The Lady Who Chooses To <br/>Embrace Her Own Given Nature
                        </h4>
                        <p className="mx-5 font-small font-italic">
                            <a href="#about" className="main-color text-decoration-none">Learn more</a>
                        </p>
                    </div>
                </div>

            </section>

            <section id="about" className="main-bg">
                <div className="col-11 col-md-10 mx-auto font-display py-5">
                    {aboutMe.map((about, index) => (
                        <div key={index} className="row m-0 py-3">
                            {index === 0 ?
                                <div className="row col-md-11 px-0 mx-0 align-items-center">
                                    <p className="col-1 d-none d-sm-flex col-sm-2 col-lg-1 bg-white text-center text-capitalize i-not-mobile">{about.details.slice(0,1)}</p>
                                    <p className="col-11 col-sm-10 col-lg-11 ">
                                                <span className="col-1 d-sm-none bg-white text-center text-capitalize i-mobile">
                                                    {about.details.slice(0,1)}
                                                </span>
                                        {about.details.slice(1)}</p>
                                </div>
                                :
                                <div className="w-100">
                                    {about.title.trim().length > 0 ?
                                        <p className="font-heading main-color text-center font-weight-bold py-4">{about.title}</p>
                                        : ''}
                                    <p dangerouslySetInnerHTML={{
                                        __html: `${(about.details).replace(/\r?\n/g, '<br/>')}`
                                    }}/>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </section>
            <RegisterWeeklyArticle/>
            <Footer/>
        </div>

    )
}

export default AboutUs;
