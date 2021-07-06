import React, {useEffect, useState} from "react";
import "../../../scss/shared.css";
import "./quotes.css";
import quotes from "../../../assets/home/quote.png";
import {getFirebase} from "../../../components/Firebase/firebase";

const Quotes = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [quote, setQuote] = useState('');
    // const [today, setToday] = useState('');
    useEffect(() => {
        let month = (new Date().getMonth() + 1) < 10 ? '-0' : '-';
        month += (new Date().getMonth() + 1);
        const quoteKey = new Date(new Date().getFullYear() + month + '-' + new Date().getDate()).getTime().toString();
        // setToday(quoteKey);
        fetchquotes(quoteKey);
    }, []);
    const fetchquotes = async (quoteKey) => {
        setIsLoading(true);
        let quotesRef;
        quotesRef = getFirebase().database().ref('quotes/' + quoteKey);
        await quotesRef.on('value', (snapshot) => {
            setQuote(snapshot.val());
            setIsLoading(false);
        });
    };
    return (
        <div className="main-bg">
            {isLoading ?
        ''
                : quote ?
                    <div className="row mx-auto justify-content-center align-items-center ">
                        <div className="col-10 col-sm-8 main-bg quotes-border">
                            <p className="">
                                <img src={quotes} className="quotes-open" width="100%" alt=""/>
                                Today's Quote!
                            </p>
                            <p className="text-center  mx-2 my-auto quotes-text">"{quote}"</p>

                        </div>
                        <div className="quotes main-bg col-9 col-sm-7" >
                            <p className="row mx-auto mb-0 text-left main-color font-weight-bold quotes-heading font-heading">
                                <div className="quotes-open">
                                    <img src={quotes} className="quotes-open" width="100%" alt=""/>
                                </div>
                                Today's Quote!
                            </p>
                            <p className="text-center mx-2 my-auto quotes-text">
                                "{quote}"</p>
                            <p className=" text-right">
                                <div>
                                    <img src={quotes} width="100%" className="quotes-close" alt=""/>
                                </div>
                            </p>
                        </div>
                    </div>
                : ''
            }
        </div>
    );
};

export default Quotes;
