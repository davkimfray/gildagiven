import React, {useEffect, useState} from "react";
import "../../../scss/shared.css";
import "./contacts.css";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import {FaAmazon, FaLinkedin, FaYoutube, FaFacebookF, FaTwitter, FaInstagram} from "react-icons/fa";
import emailjs from "emailjs-com";
import {CToast, CToastBody, CToaster, CToastHeader} from "@coreui/react";
import {FaRegCheckCircle, FaRegTimesCircle} from "react-icons/fa";
import {getFirebase} from "../../../components/Firebase/firebase";

const Contacts = () => {
    const [from_name, setFrom_name] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [contactsHeader, setContactsHeader] = useState({});
    
    useEffect(() => {
        const pageRef = getFirebase().database().ref('pages/contacts');
        pageRef.on('value', (snapshot) => {
            let items = snapshot.val();
            setContactsHeader(items);
        });
    }, []);
    function handleSubmit(e) {
        e.preventDefault();

        setInvalid(false);
        setShowToast(false);

        emailjs.sendForm('service_c6dspud', 'template_upnn7dp', e.target, "user_K506DfRd22PA0LE5FIvHp")
            .then(() => {
                setShowToast(true);
                resetForm();
            }, () => {
                setInvalid(true);
                setShowToast(true);
            });
    }

    function resetForm() {
        setFrom_name('');
        setEmail('');
        setMessage('');
    }

    return (
        <div className="main-bg">
            <CToaster position="bottom-center">
                <CToast
                    show={showToast}
                    autohide={3000}
                    fade={true}
                >
                    {invalid ?
                        <CToastHeader closeButton={true} className="text-danger h4">
                            <FaRegTimesCircle fontSize="2em" className="rounded-circle px-1 m-1 mr-3"/>
                            Failed
                        </CToastHeader>
                        :
                        <CToastHeader closeButton={true} className="text-success h4">
                            <FaRegCheckCircle fontSize="2em" className="text-success rounded-circle px-1 m-1 mr-3"/>
                            Successful
                        </CToastHeader>
                    }
                    <CToastBody className="h5 text-center">
                        {invalid ? `Failed to send Message! <br/> Please Try again!` : `Message Sent.`}
                    </CToastBody>
                </CToast>
            </CToaster> <NavBar/>
            <section id="top-contacts" className="d-flex flex-column justify-content-center pt-5">
                <div className="container col-xxl-9 mx-auto pt-5">
                    <h2 className="text-center ">
                        <span className="font-heading word-bottom-line p-2">Contact</span>
                    </h2>
                    <div className="row mx-auto ">
                        <div className="col-sm-5 py-5">
                            <div className="my-auto bg-light shadow">
                                <div className="card-body">
                                    <p className="font-heading text-center font-weight-bold main-color">{contactsHeader.title}</p>

                                    <p className="font-display text-center m-lg-5 ">{contactsHeader.content}</p>
                                    <p className="text-center">
                                        <a href="#contact-form"
                                           className="btn sec-main-bg h3 font-display font-weight-bold text-white px-4 py-2 ">Oh!
                                            Let's Chat</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 py-sm-5 mt-5">
                            <span className="vertical-line "/>
                        </div>
                        <div className="row col-sm-6 col-lg-5 py-sm-5 font-heading">
                            <div className="">
                                <p className="pl-5 font-heading font-weight-bold main-color">Info</p>
                                <p className="h4">
                                    Email: <span className="pl-2 font-weight-bold">info@gildagiven.com </span>
                                </p>
                                <p className="h4 py-3">
                                    Phone: <span className="pl-2 font-weight-bold"> (+255) 758 278 017 </span>
                                </p>
                                <div className="d-flex h4">
                                    <p>Address:</p>
                                    <p className="pl-2 font-weight-bold">Sahara Ventures Al Dua Tower, 6th Floor New
                                        Bagamoyo Road, Dar es salaam, Tanzania</p>
                                </div>
                                <p className="mx-lg-4">
                                    <a href="https://www.facebook.com/gildergiven/"
                                       className="text-decoration-none facebook"><FaFacebookF/></a>
                                    <a href="https://www.instagram.com/gildagiven/?hl=en"
                                       className="text-decoration-none instagram px-2"><FaInstagram/></a>
                                    <a href="https://twitter.com/gilda_given"
                                       className="text-decoration-none twitter px-2"><FaTwitter/></a>
                                    <a href="https://www.youtube.com/channel/UCTSj2RYx6A58W4DZnIn6y0Q"
                                       className="text-decoration-none youtube px-2"><FaYoutube/></a>
                                    <a href="http://amazon.com/author/gildagiven"
                                       className="text-decoration-none  px-2 amazon"> <FaAmazon/></a>
                                    <a href="https://www.linkedin.com/in/gilda-given-534019104/"
                                       className="text-decoration-none linkedin"> <FaLinkedin/></a>
                                </p>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section id="contact-form" className="d-flex">
                <div className="container col-sm-11 col-md-10 col-lg-9 col-xxl-8 m-auto py-5">
                    <p className="text-center ">
                        <span className="font-heading word-bottom-line p-2">Let's Connect</span>
                    </p>
                    <form className="py-3" onSubmit={event => handleSubmit(event)}>

                        <div className="form-group my-5">
                            <input type="text" className="form-control p-4" name="from_name" placeholder="Name"
                                   onChange={event => setFrom_name(event.target.value)}
                                   value={from_name} required
                            /></div>
                        <div className="form-group my-5">
                            <input type="email" className="form-control p-4" name="email" placeholder="Email"
                                   onChange={event => setEmail(event.target.value)}
                                   value={email} required
                            />
                        </div>
                        <div className="form-group">
                          <textarea className="form-control p-4" rows="5" name="message" placeholder="Message"
                                    onChange={event => setMessage(event.target.value)}
                                    value={message} required
                          />
                        </div>
                        <div className="row pt-4">
                            <button type="submit"
                                    className="btn sec-main-bg text-white px-5 py-2 h4 font-subheading mx-auto">Send
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default Contacts;
