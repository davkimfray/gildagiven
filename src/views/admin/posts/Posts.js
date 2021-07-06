import React, {useEffect, useState} from "react";
import {getFirebase} from "../../../components/Firebase/firebase";
import "../../../scss/shared.css";
import "./posts.css";
import LazyLoad from "react-lazy-load";
import AOS from 'aos';
import {FaEye, FaPen, FaTrash, FaRegClock, FaPlus} from 'react-icons/fa';
import {
    CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
    CPagination
} from "@coreui/react";
import {Link} from "react-router-dom";


const Posts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [postsKeys, setPostsKeys] = useState([]);
    const [deleteModal, setDeleteModal] = useState( false);
    const [deletePostKey, setDeletePostKey] = useState( [])
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        AOS.init({
            duration: 1000
        });
        fetchPosts(null);
    }, []);
    const fetchPosts = async (lastKey) => {
        setIsLoading(true);
        let postsRef;
        const postsKeyRef = getFirebase().database().ref('postsKeys').orderByKey();

        if (lastKey !== null && lastKey !== undefined) {
            postsRef = getFirebase().database().ref('posts').orderByKey().endAt(lastKey.toString()).limitToLast(6);
        } else {
            postsRef = getFirebase().database().ref('posts').orderByKey().limitToLast(6);
        }
        await postsKeyRef.on('value', (snapshot) => {
            const data = snapshot.val();
            let newKeys = [];
            for (let key in data) {
                newKeys.push(data[key]);
            }
            setPostsKeys(newKeys.reverse());
            postsRef.on('value', (snapshot) => {
                const data = snapshot.val();
                let newState = [];
                for (let post in data) {
                    newState.push({
                        id: post,
                        title: data[post].title,
                        subTitle: data[post].subTitle,
                        imageUrl: data[post].imageUrl,
                        date: data[post].date,
                        category: data[post].category,
                        content: data[post].content
                    });
                }
                setPosts(newState.reverse());
                setIsLoading(false);
            });

        });
    };

    const deletePost = (post, deletePost) => {
        if (deletePost === true){
            setDeleteModal( false);
            const deletePostRef = getFirebase().database().ref('/posts/' + deletePostKey.id);
            const deletePostKeyRef = getFirebase().database().ref('/postsKeys/'+deletePostKey.id);
            deletePostRef.remove();
            deletePostKeyRef.remove();
            setDeletePostKey([])
        } else {
            setDeleteModal(true);
            setDeletePostKey(post);
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
                    <CModalTitle>Confirm Delete Post</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p className="text-center mt-4">
                        <FaTrash fontSize="2.5em" className="text-danger"/>

                    </p>
                    <h2 className="text-center m-3">{deletePostKey.title}</h2>
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={deletePost.bind(this, '', true)}> Delete </CButton>{' '}
                    <CButton
                        color="secondary"
                        onClick={setDeleteModal.bind(this, false)}
                    >Cancel</CButton>
                </CModalFooter>
            </CModal>


            <div id="posts" className="container m-0 mx-sm-auto px-0 mx-lg-auto main-bg">
                <div className=" row mx-2 justify-content-center justify-content-md-between align-items-center px-0">
                    <CButton color="light" className="post-card px-4 m-2 bg-light" href="/admin/posts/new-post">
                        <FaPlus fontSize="2em" className="text-success rounded-circle px-1 m-1 mr-3"
                                style={{border: '3px solid #2eb85c '}}/>
                        Add New Post
                    </CButton>
                    <div className="row m-0 d-none">
                        <CButton color="light" className="post-card m-2 bg-light">
                            <FaEye fontSize="2em" className="bg-primary rounded-circle px-1 m-1 mx-3"/>
                            View
                        </CButton>
                        <CButton color="light" className="post-card m-2 bg-light">
                            <FaTrash fontSize="2em" className="bg-danger px-2 rounded-circle m-1"/>
                            Trash
                        </CButton>
                    </div>

                </div>

                <div className="row m-0 p-lg-2">
                    {/*<div className="row col-md-7 col-lg-8 post-card-wrapper m-auto px-2">*/}
                    {posts.map((post, index) => (
                        <div key={post.id} className="row my-3 mx-auto p-lg-3 w-100 post-card bg-white rounded">
                            <LazyLoad className="col-md-4 col-lg-3 mx-auto p-0 thumbnail" debounce={false}
                                      offsetVertical={500}>
                                <div className="w-100 h-100 thumbnail " style={{
                                    background: 'url(' + post.imageUrl + ') no-repeat center',
                                    backgroundSize: 'cover'
                                }}/>
                                {/*<img src={post.imageUrl} width="100%" style={{maxHeight: '240px'}}/>*/}

                            </LazyLoad>
                            <div className="col-md-8 col-lg-7 p-3 post-content ">
                                <h1 className="title"> {post.title}</h1>
                                <h1 className="sub_title font-subheading main-color">{post.subTitle}</h1>
                                <p dangerouslySetInnerHTML={{
                                    __html: `${post.content.substring(0, 200)}...`
                                }}/>
                                <p className="text-black-50 mb-0">
                                    <FaRegClock fontSize="1.2em" className="mx-2 "/>
                                    {/*{new Date(new Date().setTime(post.id))}*/}
                                </p>
                                <div
                                    className="col-lg-2 d-lg-none row m-0 justify-content-center justify-content-md-start px-0">
                                    <div className="m-2 mx-lg-1">
                                        <Link to={"/admin/posts/edit/"+post.id} params={post.id}  color="light" className="col btn post-card bg-light" style={{width: '4.7em'}}>
                                        <span>
                                            <FaPen fontSize="2em" className="bg-success rounded-circle px-2 m-1"/>
                                        </span><br/>Edit
                                        </Link>
                                    </div>
                                    <div className="m-2 mx-lg-1">
                                        <Link to={"/blog/post/"+post.id} params={post.id} color="light" className="col btn post-card bg-light" style={{width: '4.7em'}}>
                                        <span>
                                            <FaEye fontSize="2em" className="bg-primary rounded-circle px-1 m-1"/>
                                        </span><br/>View
                                        </Link>
                                    </div>
                                    <div className="m-2 mx-lg-1">
                                        <CButton type="button" onClick={deletePost.bind(this,post, false)}  color="light" className="col post-card bg-light" style={{width: '4.7em'}}>
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
                                        <Link color="light" to={"/admin/posts/edit/"+post.id} params={post.id} className="btn col post-card bg-light" style={{width: '4.7em'}}>
                                        <span>
                                            <FaPen fontSize="2em" className="bg-success rounded-circle px-2 m-1"/>
                                        </span><br/>Edit
                                        </Link>
                                    </div>
                                    <div className="btn m-2 mx-lg-1" style={{opacity: 0}}>
                                        <Link disabled color="light" className="col bg-light" style={{width: '4.7em'}}>
                                        <span>
                                            <FaPen fontSize="2em" className="bg-success rounded-circle px-2 m-1"/>
                                        </span><br/>Edit
                                        </Link>
                                    </div>
                                </div>
                                <div className="row m-0">
                                    <div className="m-2 mx-lg-1">
                                        <Link  to={"/blog/post/"+post.id} params={post.id} color="light" className="btn col post-card bg-light" style={{width: '4.7em'}}>
                                        <span>
                                            <FaEye fontSize="2em" className="bg-primary rounded-circle px-1 m-1"/>
                                        </span><br/>View
                                        </Link>
                                    </div>
                                    <div className=" m-2 mx-lg-1">
                                        <CButton type="button" onClick={deletePost.bind(this,post, false)} color="light" className="col post-card bg-light" style={{width: '4.7em'}}>
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
                        pages={postsKeys.length % 6 > 0 ? parseInt((postsKeys.length / 6) + 1) : parseInt(postsKeys / 6)}
                        onActivePageChange={(event) => {
                            setCurrentPage(event);
                            fetchPosts(postsKeys[(event - 1) * 6])
                        }}
                    />
                : ''}

            </div>
        </div>
    );
};
export default Posts;
