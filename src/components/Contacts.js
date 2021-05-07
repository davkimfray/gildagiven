import React from "react";
import "../style/shared.css";
import "../style/contacts.css";
import NavBar from "./NavBar";

const Contacts = () => {
  return (
    <div>
        <NavBar/>
        <section id="top-contacts" className="d-flex flex-column justify-content-center pt-5 main-bg">
            <div className="container mx-auto pt-5">
                <h2 className="text-center ">
                    <span className="font-heading word-bottom-line p-2">Contact</span>
                </h2>
                <div className="row mx-auto ">
                    <div className="col-sm-5 py-5">
                        <div className="my-auto bg-light shadow">
                            <div className="card-body">
                                <p className="font-heading text-center font-weight-bold main-color">Let’s Connect</p>

                                <p className="font-display text-center m-lg-5 ">
                                    Do you have anything to share? If it is comments from the books, questions regarding
                                    personal
                                    growth or you just want to pass by and say
                                    Hi!
                                </p>
                                <p className="text-center">
                                    <a href="#contact-form"
                                       className="btn sec-main-bg font-display font-weight-bold text-white px-4 py-2 ">Learn
                                        More</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 py-sm-5 mt-5">
                        <span className="vertical-line "></span>
                    </div>
                    <div className="row col-sm-6 col-lg-5 py-sm-5 font-heading">
                        <div className="">
                            <p className="pl-5 font-heading font-weight-bold main-color">Info</p>
                            <p>
                                Email: <span className="pl-2 font-weight-bold">info@gildagiven.com </span>
                            </p>
                            <p>
                                Phone: <span className="pl-2 font-weight-bold"> (+255) 758 278 017 </span>
                            </p>
                            <div className="d-flex">
                                <p>Address:</p>
                                <p className="pl-2 font-weight-bold">Sahara Ventures Al Dua Tower, 6th Floor New
                                    Bagamoyo Road, Dar es salaam, Tanzania</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        <section id="contact-form" className="main-bg d-flex">
            <div className="container m-auto py-5">
                <p className="text-center ">
                    <span className="font-heading word-bottom-line p-2">Form</span>
                </p>
                <form>

                    <div className="form-group my-5">
                        <input type="text" className="form-control p-4" placeholder="When"/>
                    </div>
                    <div className="form-group my-5">
                        <input type="text" className="form-control p-4" placeholder="Where"/>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control p-4" rows="5" placeholder="Message"/>
                    </div>
                    <div className="row pt-4">
                        <button type="submit" className="btn sec-main-bg text-white px-5 py-2 mx-auto">Send</button>
                    </div>
                </form>
            </div>
        </section>

    </div>
  );
};

export default Contacts;
