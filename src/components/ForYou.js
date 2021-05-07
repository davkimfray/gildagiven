import React from "react";
import "../style/for-you.css";
import bookSummaries from "../assets/books/book-summaries.jpg";
import trackSheet from "../assets/books/track-sheet.jpg";
import achieveAnyGoal from "../assets/books/achieve-any-goal.jpg";
import dailyAffirmation from "../assets/books/affirmation.jpg";
import selfCommit from "../assets/books/self-commit.jpg";
import NavBar from "./NavBar";

const books = [
    {
        image: bookSummaries,
        title: "Book Summaries and Recommendation Books",
        details: "I had a chance to read profound books for self-transformations, and I have just put them down here. They helped me a lot. Hopeful they will be of some help to you too. Just click to download and enjoy the reading."
    }, {
        image: trackSheet,
        title: "Track Sheet & Check Box ",
        details: "I understand it is not easy to transform into a new person but also adopting new habits or leaving bad ones need some great strategies. Maybe you were missing something before then or you didn't know why you are doing what you were doing but with the checkbox and tack sheet… you will have a chance to know where to start, the why and the how."
    },   {
        image: achieveAnyGoal,
        title: "Achieve Any Goal",
        details: "I know all of us have something that we would like to achieve. If you are looking for a simple blue print, this will be the rightful guide source for you."
    },  {
        image: dailyAffirmation,
        title: "Daily affirmation",
        details: "Fill your day with good vibes. With daily affirmation you will find yourself enjoy the day no matter what comes on your way"
    },  {
        image: selfCommit,
        title: "Self-Commit",
        details: "Have you ever find yourself blaming every person in your life for the situation that you have today? Do you know that is the habit that you have created since you were young and you totally need to change that? Start here today with this personal self-commit. It is a guarantee; with this simple commit your life will be served."
    }];
const ForYou = () => {
    return (
        <div>
            <NavBar/>

            <section id="top-for-you" className="d-flex flex-column justify-content-center align-items-center main-bg">
                <div className="col-10 col-sm-8 col-lg-6  text-center">
                    <h2 className="main-color font-display "><span className="word-bottom-line py-3 px-4">For You</span>
                    </h2>
                    <p className=" my-4 font-display">Stay positive and mindful with these free resources. Keep watering
                        yourself buddy!</p>
                </div>
            </section>
            <section id="books" className="main-bg">
                <div className="font-display py-4">
                    {books.map((book, index) => (
                        <div key={index} className={(index + 1) % 2 === 0 ? "bg-white" : ''}>
                            <div className="py-5 col-sm-11 col-lg-10 mx-auto">
                                <div className="row mx-auto align-items-center font-display">
                                    <div className="col-6 col-sm-3 col-lg-2">
                                        <img src={book.image} width="100%" alt=""/></div>
                                    <div className="col-sm-9 col-lg-8 mt-3 mt-md-0">
                                        <h4 className="font-weight-bold ">Check Box & Track Sheet</h4>
                                        <p>{book.details}</p>
                                        <div className="col-lg-2 d-inline-flex m-0 p-0">
                                            <a href="/dowload/book"
                                               className="font-display px-5 py-2 h3 mx-auto mx-sm-0 sec-main-bg download-btn-mobile text-decoration-none text-white font-weight-bold">Download</a>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <a href="/dowload/book"
                                           className="font-display px-5 py-lg-4 mx-auto h3 sec-main-bg download-btn-not-mobile text-decoration-none text-white font-weight-bold">Download</a>
                                    </div>
                                </div>
                                <hr className="col-9 mx-auto mt-4 mt-lg-5 sec-main-bg "/>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div id="weekly-articles" className="py-4 main-bg">
                <div className="row mx-auto py-4 main-color font-weight-bold font-heading align-items-center"
                     style={{justifyContent: 'space-evenly'}}>
                    <div className="col-3">
                        <hr className="main-bg"/>
                    </div>
                    <div className="col-6 col-lg-4 text-center px-4 px-md-0">Register for Weekly Articles</div>
                    <div className="col-3 ">
                        <hr className="main-bg"/>
                    </div>
                </div>
                <div className="col-sm-10 col-lg-8 mx-auto text-center font-banner ">
                    <p>Register to receive free weekly articles every Wednesday for your personal growth. All of the
                        articles are based on mindset transformation, self-realization, and spirituality. It has nothing
                        to
                        do with how to get money or how to be successful</p>
                    <div className="row col-11 mx-auto text-center py-3 justify-content-center">
                        <div className="col-sm-7 col-lg-5 mt-2">
                            <input className="form-control " placeholder="Email"/>
                        </div>
                        <div className="col-sm-5 col-lg-4 mt-2">
                            <a href="/register"
                               className="font-subheading btn text-white font-weight-bold px-5 py-2 text-decoration-none sec-main-bg">REGISTER</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ForYou;
