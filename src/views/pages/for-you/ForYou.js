import React, {useEffect, useState} from "react";
import "./for-you.scss";
import "../load-more-button/load-more-buton.scss";
import "../../../scss/shared.css";
import NavBar from "../navbar/NavBar";
import LazyLoad from "react-lazy-load";
import RegisterWeeklyArticle from "../register-weekly-articles/RegisterWeeklyArticle";
import Footer from "../footer/Footer";
import {CButton, CSpinner, CButtonClose} from "@coreui/react";
import {getFirebase} from "../../../components/Firebase/firebase";
import axios from "axios";

const ForYou = () => {
    const [forYouHeader, setForYouHeader] = useState({});
    const [books, setBooks] = useState([]);
    const [activeReadMore, setActiveReadMore] = useState(null);
    const [booksKeys, setBooksKeys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let numOfLetters = 150
    if(window.innerWidth > 580) {
        numOfLetters = 200
    }
    if(window.innerWidth > 990) {
        numOfLetters = 300
    }
    if(window.innerWidth > 1270) {
        numOfLetters = 500
    }
    if(window.innerWidth > 1460) {
        numOfLetters = 4000
    }
    // console.log(width);
    useEffect(() => {
        const pageRef = getFirebase().database().ref('pages/for-you');
        pageRef.on('value', (snapshot) => {
            let items = snapshot.val();
            setForYouHeader(items);
        });
        fetchBooks(null, 6);
    }, []);
    const fetchBooks = async (lastKey, pageLimit) => {
        setIsLoading(true);
        let booksRef;
        const booksKeyRef = getFirebase().database().ref('books/booksKeys').orderByKey();
            booksRef = getFirebase().database().ref('books/books/').orderByKey().limitToLast(pageLimit);

        await booksKeyRef.on('value', (snapshot) => {
            const data = snapshot.val();
            let newKeys = [];
            for (let key in data) {
                newKeys.push(data[key]);
            }
            setBooksKeys(newKeys.reverse());
            booksRef.on('value', (snapshot) => {
                const data = snapshot.val();
                let newState = [];
                for (let book in data) {
                    newState.push({
                        id: book,
                        title: data[book].title,
                        description: data[book].description,
                        imageUrl: data[book].imageUrl,
                        bookName: data[book].bookName,
                        bookUrl: data[book].bookUrl,
                        date: data[book].date,
                    });
                }
                setBooks(newState.reverse());
                setIsLoading(false);
            });

        });
    };
    const getDataFromURL = (url, fileName) => {
        axios({
            method: "get",
            url: url,
            responseType: "arraybuffer"
        })
            .then((response) => {
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(
                    new Blob([response.data], {type: "application/octet-stream"})
                );
                link.download = fileName;

                document.body.appendChild(link);

                link.click();
                setTimeout(function () {
                    window.URL.revokeObjectURL(link);
                }, 200);
            })
            .catch(() => {
            });
    };
    return (
        <div className="main-bg">
            <NavBar/>

            <section id="top-for-you" className="d-flex flex-column justify-content-center align-items-center main-bg">
                <div data-aos={"zoom-in"} className="col-10 col-sm-8 col-lg-6  text-center">
                    <h2 className="main-color font-display "><span className="word-bottom-line py-3 px-4">{forYouHeader.title}</span>
                    </h2>
                    <p className=" my-4 font-display">{forYouHeader.content}</p>
                </div>
            </section>
            <section id="books" className="main-bg">
                {/*<div className="row mx-auto col-12 py-0 main-color font-weight-bold font-heading justify-content-center align-items-center">*/}
                {/*    <div className="col-3"><hr className="sec-main-bg"/></div>*/}
                {/*    <div className="col-6 col-lg-4 text-center px-4 px-md-0 text-capitalize">Keep watering yourself</div>*/}
                {/*    <div className="col-3 "><hr className="sec-main-bg"/></div>*/}
                {/*</div>*/}
                {isLoading ?
                    <div
                        className="d-flex justify-content-center align-items-center font-banner pt-3 text-center position-absolute w-100 h-50">
                        <h1>Loading</h1>
                        <div className="lds-ellipsis">
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div>
                    : ''}
                <div className="font-display pb-4">
                    {books.map((book, index) => (
                        <div id={index} key={index}>
                            {/*<div id={index} key={index} className={(index + 1) % 2 === 0 ? "bg-white" : ''}>*/}
                            <LazyLoad debounce={false} offsetVertical={500}>
                                <div className="py-5 col-sm-11 col-lg-10 col-xxl-9 mx-auto">
                                    <div className="row mx-auto align-items-center font-display">
                                        <div className="col-6 col-sm-3 col-lg-2">
                                            <img src={book.imageUrl} width="100%" alt=""/>
                                        </div>
                                        <div className="col-sm-9 col-lg-8 mt-3 mt-md-0">
                                            <h4 className="font-weight-bold ">{book.title}</h4>
                                            <p>
                                                <span>{book.description.substring(0, activeReadMore !== index ? numOfLetters : 40000)}</span>
                                                {book.description.length > numOfLetters && activeReadMore !== index ?
                                             <CButtonClose onClick={() => {
                                                 setActiveReadMore(index)}}> Read more ▼</CButtonClose>
                                             : ''
                                                }
                                             </p>   

                                            <div className="col-lg-2 d-inline-flex m-0 p-0">
                                                {/*<a href={book.bookUrl}*/}
                                                {/*   className="font-display px-5 py-2 h3 mx-auto mx-sm-0 sec-main-bg download-btn-mobile text-decoration-none text-white font-weight-bold"*/}
                                                {/*   download>Download</a>*/}
                                                <CButton
                                                    onClick={getDataFromURL.bind(this, book.bookUrl, book.bookName)}
                                                    className="sec-main-bg px-5 py-lg-4 h3 mx-auto buttonDownload download-btn-mobile text-white font-weight-bold"
                                                >Download</CButton>
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            {/*<a target="#" onClick={getDataFromURL.bind(this, book.bookUrl, book.bookName)}*/}
                                            {/*   className="font-display px-5 py-lg-4 mx-auto h3 sec-main-bg download-btn-not-mobile buttonDownload text-decoration-none text-white font-weight-bold"*/}
                                            {/*>Download</a>*/}
                                            <CButton onClick={getDataFromURL.bind(this, book.bookUrl, book.bookName)}
                                                     className="sec-main-bg px-5 py-lg-4 h3 buttonDownload download-btn-not-mobile text-white font-weight-bold">Download</CButton>
                                            {/*<a target="_blank" href={book.bookUrl}*/}
                                            {/*   className="font-display px-5 py-lg-4 mx-auto h3 sec-main-bg download-btn-not-mobile buttonDownload text-decoration-none text-white font-weight-bold"*/}
                                            {/*download={book.bookName}>Download</a>*/}
                                        </div>
                                    </div>
                                    <hr className="col-9 mx-auto mt-4 mt-lg-5 sec-main-bg "/>
                                </div>
                            </LazyLoad>
                        </div>
                    ))}

                    {books.length < booksKeys.length ?

                        <div className="buttons ">
                            <button className="blob-btn" disabled={isLoading} onClick={()=> fetchBooks(null, books.length+6)}>
                                {isLoading ?
                                    <CSpinner color="primary" size="sm" variant="grow" className={"mr-3 mb-1 spinner"}/> : ''}
                                {isLoading ? "Loading..." : "Load More"}
                                <span className="blob-btn__inner">
                                   <span className="blob-btn__blobs">
                                        <span className="blob-btn__blob"/>
                                        <span className="blob-btn__blob"/>
                                        <span className="blob-btn__blob"/>
                                        <span className="blob-btn__blob"/>
                                  </span>
                                </span>
                            </button>
                            <br/>

                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="position-absolute">
                                <defs>
                                    <filter id="goo">
                                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"/>
                                        <feColorMatrix in="blur" mode="matrix"
                                                       values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                                                       result="goo"/>
                                        <feBlend in2="goo" in="SourceGraphic" result="mix"/>
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        : ''}
                </div>
            </section>

            <RegisterWeeklyArticle />
            <Footer/>
        </div>
    );
};

export default ForYou;
