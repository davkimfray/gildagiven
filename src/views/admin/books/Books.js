import React, {useEffect, useState} from "react";
import {getFirebase} from "../../../components/Firebase/firebase";
import "../../../scss/shared.css";
import "./books.css";
import LazyLoad from "react-lazy-load";
import {FaEye, FaPen, FaTrash, FaRegClock, FaPlus} from 'react-icons/fa';
import {
    CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
    CPagination
} from "@coreui/react";
import {Link} from "react-router-dom";

const Books = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [books, setBooks] = useState([]);
    const [booksKeys, setBooksKeys] = useState([]);
    const [deleteModal, setDeleteModal] = useState( false);
    const [deleteBookKey, setDeleteBookKey] = useState( []);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetchBooks(null);
    }, []);
    const fetchBooks = async (lastKey) => {
        setIsLoading(true);
        let booksRef;
        const booksKeyRef = getFirebase().database().ref('books/booksKeys').orderByKey();

        if (lastKey !== null && lastKey !== undefined) {
            booksRef = getFirebase().database().ref('books/books').orderByKey().endAt(lastKey.toString()).limitToLast(6);
        } else {
            booksRef = getFirebase().database().ref('books/books/').orderByKey().limitToLast(6);
        }
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

    const deleteBook = (book, deleteBook) => {
        if (deleteBook === true){
            setDeleteModal( false);
            const deleteBookRef = getFirebase().database().ref('/books/books/' + deleteBookKey.id);
            const deleteBookKeyRef = getFirebase().database().ref('/books/booksKeys/'+deleteBookKey.id);
            deleteBookRef.remove();
            deleteBookKeyRef.remove();
            setDeleteBookKey([]);
        } else {
            setDeleteModal(true);
            setDeleteBookKey(book);
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
                    <CModalTitle>Confirm Delete book</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p className="text-center mt-4">
                        <FaTrash fontSize="2.5em" className="text-danger"/>

                    </p>
                    <h2 className="text-center m-3">{deleteBookKey.title}</h2>
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={deleteBook.bind(this, '', true)}> Delete </CButton>{' '}
                    <CButton
                        color="secondary"
                        onClick={setDeleteModal.bind(this, false)}
                    >Cancel</CButton>
                </CModalFooter>
            </CModal>


            <div id="books" className="container m-0 mx-sm-auto px-0 mx-lg-auto main-bg">
                <div className=" row mx-2 justify-content-center justify-content-md-between align-items-center px-0">
                    <Link color="light" className="book-card btn btn-light px-4 m-2" to="/admin/books/add-book">
                        <FaPlus fontSize="2em" className="text-success rounded-circle px-1 m-1 mr-3"
                                style={{border: '3px solid #2eb85c '}}/>
                        Add New Book
                    </Link>
                    <div className="row m-0 d-none">
                        <CButton color="light" className="book-card m-2">
                            <FaEye fontSize="2em" className="bg-primary rounded-circle px-1 m-1 mx-3"/>
                            View
                        </CButton>
                        <CButton color="light" className="book-card m-2">
                            <FaTrash fontSize="2em" className="bg-danger px-2 rounded-circle m-1"/>
                            Trash
                        </CButton>
                    </div>

                </div>

                <div className="row m-0 p-lg-2">
                    {/*<div className="row col-md-7 col-lg-8 book-card-wrapper m-auto px-2">*/}
                    {books.map((book, index) => (
                        <div key={book.id} className="row my-3 mx-auto p-lg-3 w-100 book-card bg-white rounded">
                            <LazyLoad className="col-md-4 col-lg-3 mx-auto p-0 pt-2 pt-sm-0 thumbnail" debounce={false}
                                      offsetVertical={500}>
                                <div className="w-100 h-100 thumbnail " style={{
                                    background: 'url(' + book.imageUrl + ') no-repeat center',
                                    backgroundSize: 'contain'
                                }}/>
                                {/*<img src={book.imageUrl} width="50%"/>*/}

                            </LazyLoad>
                            <div className="col-md-8 col-lg-7 p-3 book-content ">
                                <h1 className="title"> {book.title}</h1>
                                <p className="sub_title font-subheading main-color">{book.description}</p>
                                <p className="text-black-50 mb-0">
                                    {/*<FaRegClock fontSize="1.2em" className="mx-2 "/>*/}
                                    {/*{new Date(new Date().setTime(book.id))}*/}
                                </p>
                                <div
                                    className="col-lg-2 d-lg-none row m-0 justify-content-center justify-content-md-start px-0">
                                    <div className="m-2 mx-lg-1">
                                        <Link to={"/admin/books/edit/"+book.id} params={book.id}  color="light" className="col book-card btn" style={{width: '4.7em'}}>
                                        <span>
                                            <FaPen fontSize="2em" className="bg-success rounded-circle px-2 m-1"/>
                                        </span><br/>Edit
                                        </Link>
                                    </div>
                                    <div className="m-2 mx-lg-1">
                                        <Link to={"/blog/book/"+book.id} params={book.id} color="light" className="col book-card btn" style={{width: '4.7em'}}>
                                        <span>
                                            <FaEye fontSize="2em" className="bg-primary rounded-circle px-1 m-1"/>
                                        </span><br/>View
                                        </Link>
                                    </div>
                                    <div className="m-2 mx-lg-1">
                                        <CButton type="button" onClick={deleteBook.bind(this,book, false)}  color="light" className="col book-card" style={{width: '4.7em'}}>
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
                                        <Link color="light" to={"/admin/books/edit/"+book.id} params={book.id} className="col book-card btn" style={{width: '4.7em'}}>
                                        <span>
                                            <FaPen fontSize="2em" className="bg-success rounded-circle px-2 m-1"/>
                                        </span><br/>Edit
                                        </Link>
                                    </div>
                                    <div className="m-2 mx-lg-1" style={{opacity: 0}}>
                                        <CButton disabled color="light" className="col " style={{width: '4.7em'}}>
                                        <span>
                                            <FaPen fontSize="2em" className="bg-success rounded-circle px-2 m-1"/>
                                        </span><br/>Edit
                                        </CButton>
                                    </div>
                                </div>
                                <div className="row m-0">
                                    <div className="m-2 mx-lg-1">
                                        <Link  to={"/blog/book/"+book.id} params={book.id} color="light" className="col book-card btn" style={{width: '4.7em'}}>
                                        <span>
                                            <FaEye fontSize="2em" className="bg-primary rounded-circle px-1 m-1"/>
                                        </span><br/>View
                                        </Link>
                                    </div>
                                    <div className=" m-2 mx-lg-1">
                                        <CButton type="button" onClick={deleteBook.bind(this,book, false)} color="light" className="col book-card" style={{width: '4.7em'}}>
                                        <span>
                                            <FaTrash fontSize="2em" className="bg-danger px-2 rounded-circle m-1"/>
                                        </span><br/>Trash
                                        </CButton>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>
                {!isLoading ?
                <CPagination
                    size="lg"
                    align="center"
                    addListClass="some-class"
                    className="shadow-none"
                    activePage={currentPage}
                    pages={booksKeys.length % 6 > 0 ? parseInt((booksKeys.length / 6) + 1) : parseInt(booksKeys / 6)}
                    onActivePageChange={(event) => {
                        setCurrentPage(event);
                        fetchBooks(booksKeys[(event - 1) * 6])
                    }}
                />
                : ''}
            </div>
        </div>
    );
};
export default Books;
