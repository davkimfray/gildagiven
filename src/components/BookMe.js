import React from "react";
import "../style/book-me.css";
import NavBar from "./NavBar";

const BookMe = () => {
    return (
        <div>
            <NavBar/>
            <section id="book-me" className="pt-5 main-bg">
                <div className="container m-auto pt-4 pt-md-5">
                    <div className="text-center ">
                        <span className="font-heading word-bottom-line p-2">Booking Form</span>
                    </div>
                    <form className="py-3">
                        <div className="form-row justify-content-between">
                            <div className="form-group my-3 col-md-6">
                                <input type="email" className="form-control p-4" placeholder="Name"/>
                            </div>
                            <div className="form-group my-3 col-md-6">
                                <input type="email" className="form-control p-4" placeholder="Email"/>
                            </div>
                        </div>
                        <div className="form-group my-3">
                            <input type="text" className="form-control p-4" placeholder="Topic"/>
                        </div>
                        <div className="form-group my-4">
                            <input type="text" className="form-control p-4" placeholder="When"/>
                        </div>
                        <div className="form-group my-3">
                            <input type="text" className="form-control p-4" placeholder="Where"/>
                        </div>
                        <div className="form-group my-4">
                            <textarea className="form-control p-4" rows="5" placeholder="Message"></textarea>
                        </div>
                        <div className="row py-4">
                            <button type="submit" className="btn sec-main-bg text-white px-5 py-2 mx-auto">Book Me Now
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default BookMe;
