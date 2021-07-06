import React, {useEffect, useState} from "react";
import {getFirebase} from "../../../components/Firebase/firebase";
import "../../../scss/shared.css";
import "./quotes.css";
import {FaEye, FaPen, FaTrash, FaRegClock, FaPlus} from 'react-icons/fa';

import {
    CBadge,
    CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
} from "@coreui/react";


const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [today, setToday] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState( false);
    const [deleteQuoteKey, setdeleteQuoteKey] = useState( []);
    useEffect(() => {

        let month = (new Date().getMonth()+1) <10 ? '-0':'-';
        month += (new Date().getMonth()+1);
        setToday(new Date(new Date().getFullYear()+month+'-'+new Date().getDate()).getTime().toString());
        fetchquotes(null);
    }, []);
    const fetchquotes = async (lastKey) => {
        setIsLoading(true);
        let quotesRef;
            quotesRef = getFirebase().database().ref('quotes/').orderByKey();
        await quotesRef.on('value', (snapshot) => {
                const data = snapshot.val();
                let newState = [];
                for (let quote in data) {
                    newState.push({
                        id: quote,
                        quote: data[quote]
                    });
                }
                setQuotes(newState.reverse());
                setIsLoading(false);
            });
    };

    const deleteQuote = (quote, deleteQuote) => {
        if (deleteQuote === true){
            setDeleteModal( false);
            const deleteQuoteRef = getFirebase().database().ref('/quotes/' + deleteQuoteKey.id);
            deleteQuoteRef.remove();
            setdeleteQuoteKey([])
        } else {
            setDeleteModal(true);
            setdeleteQuoteKey(quote);
        }
    }


    return (
        <div>
            {isLoading ?
                <div className="d-flex justify-content-center align-items-center font-banner pt-3 text-center position-absolute w-75 h-75">
                    <h1>Loading</h1>
                    <div className="lds-ellipsis">
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                    </div>
                </div>
            : ''}

            <CModal
                show={deleteModal}
                onClose={setDeleteModal.bind(this, false)}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Confirm Delete quote</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p className="text-center mt-4">
                        <FaTrash fontSize="2.5em" className="text-danger"/>
                    </p>
                    <h2 className="text-center m-3">{deleteQuoteKey.quote}</h2>
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={deleteQuote.bind(this, '', true)}> Delete </CButton>{' '}
                    <CButton
                        color="secondary"
                        onClick={setDeleteModal.bind(this, false)}
                    >Cancel</CButton>
                </CModalFooter>
            </CModal>


            <div id="quotes" className="container m-0 mx-sm-auto px-0 mx-lg-auto main-bg">
                <div className=" row col-md-11 mx-auto justify-content-center justify-content-md-between align-items-center px-0">
                    <a color="light" className="quote-card btn btn-light px-4 m-2" href="/admin/quotes/add-quote">
                        <FaPlus fontSize="2em" className="text-success rounded-circle px-1 m-1 mr-3"
                                style={{border: '3px solid #2eb85c '}}/>
                        Add New Quote
                    </a>
                    <div className="row m-0 d-none">
                        <CButton color="light" className="quote-card m-2">
                            <FaEye fontSize="2em" className="bg-primary rounded-circle px-1 m-1 mx-3"/>
                            View
                        </CButton>
                        <CButton color="light" className="quote-card m-2">
                            <FaTrash fontSize="2em" className="bg-danger px-2 rounded-circle m-1"/>
                            Trash
                        </CButton>
                    </div>

                </div>

                <div className="row m-0 p-lg-2">
                    {/*<div className="row col-md-7 col-lg-8 quote-card-wrapper m-auto px-2">*/}
                    {quotes.map((quote, index) => (
                        <div key={quote.id} className="col-md-11 my-3 mx-auto p-lg-3 w-100 quote-card bg-white rounded">

                        <div className="row col-md-11 pt-3 py-lg-2 mx-auto align-items-center justify-content-between">
                            <p className="text-black-50 mb-0">
                                <FaRegClock fontSize="1.2em" className="mx-2 mb-2"/>
                                {new Date(new Date().setTime(quote.id)).toDateString()}
                            </p>
                            {today === quote.id ?
                                <CBadge className="mr-1 px-3 py-2" color={"success"} shape="pill">Active</CBadge>
                                : today < quote.id ?
                                    <CBadge className="mr-1 px-3 py-2" color={"info"} shape="pill">Pending</CBadge>
                                    : <CBadge className="mr-1 px-3 py-2" color={"danger"} shape="pill">Outdated</CBadge>
                            }
                        </div>
                        <div className="row m-0" style={{justifyContent: "space-evenly"}}>
                            <div className="col-md-9 p-3 quote-content ">
                                <p className="sub_title font-subheading main-color">{quote.quote}</p>
                                <div className="col-lg-2 d-lg-none row m-0 justify-content-center justify-content-md-start px-0">
                                    <div className="m-2 mx-lg-1">
                                        <CButton href={"/admin/quotes/edit/"+quote.id} params={quote.id}  color="light" className="col quote-card" style={{width: '4.7em'}}>
                                        <span>
                                            <FaPen fontSize="2em" className="bg-success rounded-circle px-2 m-1"/>
                                        </span><br/>Edit
                                        </CButton>
                                    </div>
                                    <div className="m-2 mx-lg-1">
                                        <CButton type="button" onClick={deleteQuote.bind(this,quote, false)}  color="light" className="col quote-card" style={{width: '4.7em'}}>
                                        <span>
                                            <FaTrash fontSize="2em" className="bg-danger px-2 rounded-circle m-1"/>
                                        </span><br/>Trash
                                        </CButton>
                                    </div>
                                </div>

                            </div>
                            <div
                                className=" col-lg-2 d-md-down-none d-flex m-0 justify-content-center align-items-center px-0">
                                <div className="row justify-content-end mx-2">
                                    <div className="m-2 mx-lg-1">
                                        <CButton color="light" href={"/admin/quotes/edit/"+quote.id} params={quote.id} className="col quote-card" style={{width: '4.7em'}}>
                                        <span>
                                            <FaPen fontSize="2em" className="bg-success rounded-circle px-2 m-1"/>
                                        </span><br/>Edit
                                        </CButton>
                                    </div>
                                </div>
                                <div className="row m-0">
                                    <div className=" m-2 mx-lg-1">
                                        <CButton type="button" onClick={deleteQuote.bind(this,quote, false)} color="light" className="col quote-card" style={{width: '4.7em'}}>
                                        <span>
                                            <FaTrash fontSize="2em" className="bg-danger px-2 rounded-circle m-1"/>
                                        </span><br/>Trash
                                        </CButton>
                                    </div>

                                </div>

                            </div>
                        </div>
                        </div>
                    ))}

                </div>
                {/*<CPagination*/}
                {/*    size="lg"*/}
                {/*    align="center"*/}
                {/*    addListClass="some-class"*/}
                {/*    className="shadow-none"*/}
                {/*    activePage={currentPage}*/}
                {/*    pages={quotesKeys.length % 6 > 0 ? parseInt((quotesKeys.length / 6) + 1) : parseInt(quotesKeys / 6)}*/}
                {/*    onActivePageChange={(event) => {*/}
                {/*        setCurrentPage(event);*/}
                {/*        fetchquotes(quotesKeys[(event - 1) * 6])*/}
                {/*    }}*/}
                {/*/>*/}
            </div>
        </div>
    );
};
export default Quotes;
