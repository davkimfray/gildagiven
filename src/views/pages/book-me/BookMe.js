import React, {useEffect, useState} from "react";
import "./book-me.scss";
import "../../../scss/shared.css";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import emailjs from "emailjs-com";
import {CToast, CToastBody, CToaster, CToastHeader} from "@coreui/react";
import {FaRegCheckCircle, FaRegTimesCircle} from "react-icons/fa";
import {getFirebase} from "../../../components/Firebase/firebase";

const BookMe = () => {
    const [bookMeHeader, setBookMeHeader] = useState({});
    const [from_name, setFrom_name] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [topic, setTopic] = useState('');
    const [when, setWhen] = useState('');
    const [where, setWhere] = useState('');
    const [today, setToday] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [invalid, setInvalid] = useState(false);
    useEffect(() => {
        const pageRef = getFirebase().database().ref('pages/book-me');
        pageRef.on('value', (snapshot) => {
            let items = snapshot.val();
            setBookMeHeader(items);
        });
        let month = (new Date().getMonth()+1) <10 ? '-0':'-';
        month += (new Date().getMonth()+1);
        setToday(new Date().getFullYear()+month+'-'+new Date().getDate());
    }, []);
    function handleSubmit(e) {
        e.preventDefault();

        setInvalid(false);
        setShowToast(false);

        emailjs.sendForm('service_c6dspud', 'template_8q46chg', e.target, "user_K506DfRd22PA0LE5FIvHp")
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
        setTopic('');
        setWhen('');
        setWhere('');
        setMessage('');
    }

    return (
        <div>
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
                        {invalid ? `Failed to send Booking Request! <br/> Please Try again!` : `Booking Request Sent.`}
                    </CToastBody>
                </CToast>
            </CToaster>
            <NavBar/>
            <section id="book-me" className="pt-5 main-bg row m-0">
                <div className="col-11 row col-md-5 col-lg-4 mx-auto ">
                    <div data-aos={"zoom-out"} className="px-0 text-center pt-5 m-auto">
                        <h2 className="main-color font-display ">{bookMeHeader.title}</h2>
                        <div className="col-7 col-sm-8 mx-auto">
                            <hr className="main-bg"/>
                        </div>
                        <p className="font-banner mx-auto">
                            {bookMeHeader.content}
                        </p>
                    </div>
                    {/*<img src={bookMe} className="position-absolute d-sm-down-none ml-auto"/>*/}
                </div>
                <div className="container col-sm-11 col-md-7 col-lg-6 m-auto pt-5 ">
                    <div className="text-center ">
                        <span className="font-heading word-bottom-line d-sm-down-none p-2">Book Me</span>
                    </div>
                    <form className="py-3" onSubmit={event => handleSubmit(event)}>
                        <div className="form-row justify-content-between">
                            <div className="form-group my-3 col-lg-6">
                                <input type="text" className="form-control p-4" name="from_name" placeholder="Name"
                                       onChange={event => setFrom_name(event.target.value)}
                                       value={from_name} required
                                />
                            </div>
                            <div className="form-group my-3 col-lg-6">
                                <input type="email" className="form-control p-4" name="email" placeholder="Email"
                                       onChange={event => setEmail(event.target.value)}
                                       value={email} required
                                />
                            </div>
                        </div>
                        <div className="form-group my-3">
                            <input type="text" className="form-control p-4" name="topic" placeholder="Topic"
                                   onChange={event => setTopic( event.target.value)}
                                   value={topic} required
                            />
                        </div>
                        <div className="form-row justify-content-between">
                            <div className="form-group my-3 col-lg-6">
                                <input type="date" className="form-control p-4" name="when" placeholder="When"
                                       min={today}
                                       onChange={event => setWhen(event.target.value)}
                                       value={when} required
                                />
                            </div>
                            <div className="form-group my-3 col-lg-6">
                                <input type="text" className="form-control p-4" name="where" placeholder="Where"
                                       onChange={event => setWhere(event.target.value)}
                                       value={where} required
                                />
                            </div>
                        </div>
                        <div className="form-group my-4">
                            <textarea className="form-control p-4" rows="5" name="message" placeholder="Message"
                                      onChange={event => setMessage(event.target.value)}
                                      value={message} required
                            />
                        </div>
                        <div className="row py-4">
                            <button type="submit" className="btn h4 sec-main-bg text-white px-5 py-2 mx-auto">Book Me Now
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default BookMe;
