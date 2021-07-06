import React, {useEffect, useState} from "react";
import {getFirebase} from "../../../components/Firebase/firebase";
import "../../../scss/shared.css";
import "../load-more-button/load-more-buton.scss";

import "./blog.scss";
import NavBar from "../navbar/NavBar";
import LazyLoad from "react-lazy-load";
import AOS from 'aos';
import RegisterWeeklyArticle from "../register-weekly-articles/RegisterWeeklyArticle";
import Quotes from "../qoutes/Quotes";
import ImageLoader from "../../image-loader/ImageLoader";
import {CSpinner} from "@coreui/react";
import Footer from "../footer/Footer";
import {Link} from "react-router-dom";
import {FaRegClock} from "react-icons/fa";
import axios from "axios";
import moment from 'moment';


const Blog = () => {
    const [blogHeader, setBlogHeader] = useState({});
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [maxHeight, setMmxHeight] = useState(700);
    // const topTopics = ['The Power of Positive Thinking', 'You Are the Creator of Your Own Reality',
    //     'Appreciate! Say, “Thank You!', 'If They Can Do It We Can Do It Too', 'Self-Limiting Beliefs Is Killing You'];
    const fetchPosts = async (lastKey, pageLimit) => {
        setIsLoading(true);
        let postsRef;
        let postsRefKey;
        if (lastKey !== null && lastKey !== undefined) {
            postsRef = getFirebase().database().ref('posts').orderByKey().endAt(lastKey).limitToLast(6);
        } else {
            postsRef = getFirebase().database().ref('posts').orderByKey().limitToLast(pageLimit);
            postsRefKey = getFirebase().database().ref('postsKeys').orderByKey();
        }
        // postsRefKey.on('value', dataSnapshot => {
        //     setTotalPosts(dataSnapshot.numChildren());
        // })
        // await postsRef.on('value', (snapshot) => {
        //     const data = snapshot.val();
        //     let newState = [];
        //     for (let post in data) {
        //         newState.push({
        //             id: post,
        //             title: data[post].title,
        //             subTitle: data[post].subTitle,
        //             imageUrl: data[post].imageUrl,
        //             date: data[post].date,
        //             category: data[post].category,
        //             content: data[post].content
        //         });
        //     }
        //     setPosts(newState);
        //     setIsLoading(false)
        // });
        //

        const mediumURL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@gildagiven";

        axios({
            method: "get",
            url: mediumURL,
            // responseType: "arraybuffer"
        })
            .then((data) => {
                // console.log(data.data)
                const avatar = data.data.feed.image;
                const profileLink = data.data.feed.link;
                const res = data.data.items; //This is an array with the content. No feed, no info about author etc..
                const posts = res.filter(item => item.categories.length > 0);

                const title = data.data.feed.title;

                // this.setState(
                //     (pre) => ({
                //         profile: {
                //             ...pre.profile,
                //             ptitle: title,
                //             profileurl: profileLink,
                //             avtar: avatar,
                //
                //         },
                //         item: posts,
                //         isloading: false
                //     }),
                //     () => {
                //         console.log(this.state);
                //     }
                // );
                setAllPosts(posts);
                pagination(3,2, posts);

                    setIsLoading(false)

            })
            .catch((e) => {
                // this.setState({ error: e.toJSON() })
                console.log(e);
            });
    };

    const pagination = (cols, rows, posts) => {
        const  numOfCols = cols;
        const numOfRows = rows;
        setMmxHeight(800 * numOfRows);
        let colSortPosts =[];
        for (let col=0; col<numOfCols; col++){
            for (let row=0; row<=numOfRows-1; row++) {
                colSortPosts.push(posts[(row*numOfCols)+col])
            }
        }

        // console.log(colSortPosts)
        // console.log(posts)
        setPosts(colSortPosts);
    }

    useEffect(() => {
        const pageRef = getFirebase().database().ref('pages/blog');
        pageRef.on('value', (snapshot) => {
            let items = snapshot.val();
            setBlogHeader(items);
        });
        AOS.init({
            duration: 1000
        });
        fetchPosts(null, 6);
    }, []);

    return (
        <div className="main-bg">
            <NavBar/>
            <section id="top-blog">
                <div className="row  m-auto ">
                    <div className="col-sm-6 col-lg-7 main-bg top-image top-image-mobile my-5"/>
                    <div data-aos={"zoom-out"} className="col-sm-6 col-lg-5 text-center my-auto">
                        <h2 className="main-color font-heading font-weight-bold">{blogHeader.title}</h2>
                        <div className="col-7 col-sm-8 mx-auto">
                            <hr className="bg-primary"/>
                        </div>
                        <p className="font-banner col-lg-10 mx-auto">
                            {blogHeader.content}
                        </p>
                    </div>
                    <div className="col-sm-6 col-lg-7 main-bg top-image top-image-not-mobile"/>
                </div>
            </section>
            <div id="blog" className="m-0 pt-5 main-bg">
                <div
                    className="row mx-auto col-12 py-0 main-color font-weight-bold font-heading justify-content-center align-items-center">
                    <div className="col-3">
                        <hr className="sec-main-bg"/>
                    </div>
                    <div className="col-6 col-lg-4 font-heading text-center px-4 px-md-0"> Stay Positive & Mindful</div>
                    <div className="col-3 ">
                        <hr className="sec-main-bg"/>
                    </div>
                </div>
                <div className="row m-auto p-2">

                    {/*<div className="row col-md-7 col-lg-8 post-card-wrapper m-auto px-2">*/}
                    <div className="col-xl-11 px-0 px-lg-2  m-auto ">
                    {/*<div className="col-lg-8 col-xxl-7 px-0  m-auto ">*/}
                        {isLoading ?
                            <div
                                className="d-flex justify-content-center align-items-center font-banner pt-3 text-center w-100" style={{height: "25vh"}}>
                                <h1>Loading</h1>
                                <div className="lds-ellipsis">
                                    <div/>
                                    <div/>
                                    <div/>
                                    <div/>
                                </div>
                            </div>
                            : ''}
                            <div className="d-lg-none row px-0 mx-auto mt-3 mb-5">

                            {posts.map((post, index) => (
                                <div key={post.id}
                                     className="col-md-9 mx-md-auto mx-lg-0 col-lg-4 my-2 p-0 post-card-wrapper">
                                     {/*className="col-md-10 col-lg-6 my-2 px-0 px-lg-3 post-card-wrapper">*/}
                                    <div data-aos={"fade-up"} data-aos-offset={index * 10} className="card p-0 main-bg border-primary">
                                        <div className="card-header p-0">
                                            <img src={post.thumbnail}
                                                 alt=""/>
                                        </div>
                                        <div className="card-body">
                                            <h1 className="title"> {post.title}</h1>

                                            <p>{`${
                                                post.description.replace(/<[^>]+>/g, '')
                                                    .substring(0, 200)}...`}</p>
                                            <div className="card-meta row w-100 m-0 align-items-center pr-sm-4">
                                                <FaRegClock fontSize="1.2em" className="m-2 mb-3 text-primary"/>
                                                <span className="text-primary h5">{moment(post.pubDate).format("MMM DD, YYYY hh:mm")}
</span>
                                                <Link to={{pathname: "/blog/post/" + post.title,
                                                    query: post}}
                                                      className="font-subheading btn text-white font-weight-bold px-3 py-2 ml-auto mr-0  sec-main-bg">Read
                                                    More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </div>
                            <div className="d-md-down-none card-wrapper px-0 mx-auto mt-3 mb-5" style={{maxHeight: maxHeight.toFixed()+'px'}}>

                            {posts.map((post, index) => (
                                <div key={post.id}
                                     className="col-md-6 mx-md-auto mx-lg-0 col-lg-4 my-2 px-1 px-xl-3 post-card-wrapper">
                                     {/*className="col-md-10 col-lg-6 my-2 px-0 px-lg-3 post-card-wrapper">*/}
                                    <div data-aos={"fade-up"} data-aos-offset={index * 10} className="card p-0 main-bg border-primary">
                                        <div className="card-header p-0">
                                            <img src={post.thumbnail}
                                                 alt=""/>
                                        </div>
                                        <div className="card-body">
                                            <h1 className="title"> {post.title}</h1>

                                            <p className="mb-2">{`${
                                                post.description.replace(/<[^>]+>/g, '')
                                                    .substring(0, 200)}...`}</p>
                                            <div className=" row w-100 m-0 align-items-center pr-sm-4">
                                                <FaRegClock fontSize="1.2em" className="m-2 mb-3 text-primary"/>
                                                <span className="text-primary h5">{moment(post.pubDate).format("MMM DD, YYYY")}
</span>
                                                <Link to={{pathname: "/blog/post/" + post.title,
                                                    query: post}}
                                                      className="font-subheading btn text-white font-weight-bold px-3 py-2 ml-auto mr-0  sec-main-bg">Read
                                                    More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </div>
{posts.length/3 < (allPosts.length/3).toFixed()?

                            <div className="buttons ">
                                <button className="blob-btn" disabled={isLoading} onClick={()=> pagination(3, (posts.length/3)+1, allPosts)}>
                                {/*<button className="blob-btn" disabled={isLoading} onClick={()=> fetchPosts(null, posts.length+6)}>*/}
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
                </div>
                {/*                                    <div data-aos={"fade-up"} data-aos-offset={index * 100}*/}
                {/*                                         className="my-3 mx-0 mx-lg-2 w-100 post-card">*/}
                {/*                                        <div className="thumbnail mx-0">*/}
                {/*                                            <LazyLoad debounce={false} offsetVertical={500}>*/}
                {/*                                                <ImageLoader src={post.thumbnail}/>*/}
                {/*                                            </LazyLoad>*/}
                {/*                                        </div>*/}
                {/*                                        <div className="row ml-0">*/}
                {/*                                        <div className="post-content main-bg">*/}
                {/*                                            /!*<div className="category sec-main-bg">{post.category}</div>*!/*/}
                {/*                                            <h1 className="title"> {post.title}</h1>*/}
                {/*                                            /!*<h2 className="sub_title main-color">{post.subTitle}</h2>*!/*/}
                {/*                                            /!*<p dangerouslySetInnerHTML={{*!/*/}
                {/*                                            /!*    __html: `${reactToText(post.description).substring(0, 200)}...`*!/*/}
                {/*                                            /!*}}/>*!/*/}
                {/*                                            <p>{`${*/}
                {/*                                                post.description.replace(/<[^>]+>/g, '')*/}
                {/*                                            .substring(0, 200)}...`}</p>*/}
                {/*                                            <div className="post-meta row   m-0 align-items-center pr-sm-4">*/}
                {/*                                                <FaRegClock fontSize="1.2em" className="m-2 mb-3 text-primary"/>*/}
                {/*                                                <span className="text-primary h5">{moment(post.pubDate).format("MMM DD, YYYY hh:mm")}*/}
                {/*</span>*/}
                {/*                                                <Link to={{pathname: "/blog/post/" + post.title,*/}
                {/*                                                query: post}}*/}
                {/*                                                      className="font-subheading btn text-white font-weight-bold px-3 py-2 ml-auto mr-0  sec-main-bg">Read*/}
                {/*                                                    More*/}
                {/*                                                </Link>*/}
                {/*                                            </div>*/}
                {/*                                        </div>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
            </div>

            <Quotes/>
            <RegisterWeeklyArticle/>
            <Footer/>
        </div>
    );
};


export default Blog;
