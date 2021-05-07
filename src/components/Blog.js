import React, {Component} from "react";
import {getFirebase} from "../config/firebase";
// import "../style/shared.css";
import "../style/blog.css";
import quotes from "../assets/home/quote.png";
import gildaBlog from "../assets/gilda/gilda-blog.jpg";
import NavBar from "./NavBar";


class Blog extends Component {
    topTopics = ['The Power of Positive Thinking', 'You Are the Creator of Your Own Reality',
        'Appreciate! Say, “Thank You!', 'If They Can Do It We Can Do It Too', 'Self-Limiting Beliefs Is Killing You'];

    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        const postsRef = getFirebase().database().ref('posts');
        postsRef.on('value', (snapshot) => {
            let posts = snapshot.val();
            let newState = [];
            for (let post in posts) {
                newState.push({
                    id: post,
                    title: posts[post].title,
                    subTitle: posts[post].subTitle,
                    imageUrl: posts[post].imageUrl,
                    date: posts[post].date,
                    category: posts[post].category,
                    content: posts[post].content
                });
            }
            this.setState({
                posts: newState
            });
        });
    }

    removeItem(itemId) {
        const itemRef = getFirebase().database().ref(`/posts/${itemId}`);
        itemRef.remove();
    }

    render() {
        return (
            <div>
                <NavBar/>
                <section id="top-blog" className="main-bg">
                    <div className="row  m-auto ">
                        <div className="col-sm-6 col-lg-7 main-bg top-image top-image-mobile my-5"></div>
                        <div className="col-sm-6 col-lg-5 text-center my-auto">
                            <h2 className="main-color font-display font-weight-bold">BLOG</h2>
                            <div className="col-7 col-sm-8 mx-auto">
                                <hr className="main-bg"/>
                            </div>
                            <p className="font-banner col-lg-10 mx-auto">
                                Once you read with dedication and discrimination, even a single sentence can make a
                                shift in
                                your life keep exploring! Stay positive and mindful!
                            </p>
                        </div>
                        <div className="col-sm-6 col-lg-7 main-bg top-image top-image-not-mobile"></div>
                    </div>
                </section>
                <section id="blog" className="m-0 pt-5 main-bg">
                    <div className="row mx-auto col-12 py-0 main-color font-weight-bold font-heading justify-content-center align-items-center">
                        <div className="col-3"><hr className="sec-main-bg"/></div>
                        <div className="col-6 col-lg-4 text-center px-4 px-md-0">My Personal journey of inspiration</div>
                        <div className="col-3 "><hr className="sec-main-bg"/></div>
                    </div>
                    <div className="row col-11 m-auto p-2">
                    <div className="row col-md-7 col-lg-8 post-card-wrapper m-auto px-2">
                        {this.state.posts.map(post => (
                            <div key={post.id} className="my-3 col-11 mx-auto col-lg-5 mx-lg-3 post-card">
                                <div className="thumbnail">
                                    <img src={post.imageUrl} alt="" width="100%"/>
                                </div>
                                <div className="post-content main-bg">
                                    <div className="category sec-main-bg">{post.category}</div>
                                    <h1 className="title"> {post.title}</h1>
                                    <h2 className="sub_title main-color">{post.subTitle}</h2>
                                    <p dangerouslySetInnerHTML={{
                                        __html: `${post.content.substring(0, 100)}...`
                                    }}/>
                                    <div className="post-meta row m-0 align-items-center"><span className="timestamp">
                                        {post.date}</span>
                                        <a href="/register"
                                           className="font-subheading btn text-white font-weight-bold px-3 py-2 ml-auto mr-0  sec-main-bg">Read
                                            More ></a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-5 col-lg-4 mx-auto">
                        {/*<img src={gildaBlog} width="100%" alt=""/>*/}
                            <p className="text-center ">
                                <span className="px-md-1 px-lg-4 py-2 font-banner h5"
                                      style={{borderBottom: '2px solid black', letterSpacing: '2px'}}>TOP PICKS</span>
                            </p>
                        {this.topTopics.map((topic, index) => (
                            <div key={index} className="ml-lg-5 my-3 row align-items-center">
                                    <span className="h1 font-weight-bold  font-banner "
                                          style={{borderBottom: '1px solid black'}}>{index +1}</span>
                                <p className="col-10 font-banner h4">{topic} </p>
                            </div>
                        ))}

                            <hr className="sec-main-bg mt-5 col-10 mx-auto"/>
                                {/*<p className="text-center font-weight-bold py-2 font-heading h5">*/}
                                {/*    𝚃𝙴𝚁𝙼𝚂 𝙿𝚁𝙸𝚅𝙰𝙲𝚈 ©𝟸𝟶𝟸𝟶 𝙶𝚒𝚕𝚍𝚊 𝙶𝚒𝚟𝚎𝚗*/}
                                {/*</p>*/}
                    </div>
                    </div>
                </section>
                <div className="row mx-auto justify-content-center align-items-center main-bg">
                    <div className="col-8 main-bg quotes-border">
                        <p className="quotes-text">
                            <img src={quotes} className="quotes-open" alt=""/>
                            Gilda's Quotes,
                        </p>
                        <p className="text-center  mx-2 my-auto quotes-text">"Be yourself everyone; else is already taken"</p>

                    </div>
                    <div className="quotes main-bg">
                        <p className=" mx-auto mb-0 text-left main-color font-weight-bold font-subheading quotes-text">
                            <img src={quotes} className="quotes-open"  alt=""/>
                            Gilda's Quotes,
                        </p>
                        <p className="text-center  mx-2 my-auto quotes-text">
                            "Be yourself everyone; else is already taken"</p>
                        <p className=" text-right">
                            <img src={quotes} className="quotes-close" alt=""/>
                        </p>
                    </div>
                </div>
                <div id="weekly-articles" className="py-4 main-bg">
                    <div className="row mx-auto py-4 main-color font-weight-bold font-heading align-posts-center"
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
                            articles are based on mindset transformation, self-realization, and spirituality. It has
                            nothing to do with how to get money or how to be successful
                        </p>
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

            // <div className='app'>
            //     <header>
            //         <div className="wrapper">
            //             <h1>Fun Food Friends</h1>
            //
            //         </div>
            //     </header>
            //     <div className='container'>
            //         <section className='display-item'>
            //             <div className="wrapper">
            //                 <ul>
            //                     {this.state.posts.map((item) => {
            //                         return (
            //                             <li key={item.id}>
            //                                 <h3>{item.title}</h3>
            //                                 <p>brought by: {item.user}
            //                                     <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
            //                                 </p>
            //                             </li>
            //                         )
            //                     })}
            //                 </ul>
            //             </div>
            //         </section>
            //     </div>
            // </div>
        );
    }

    //   <div>
    //       <section id="top-blog" className="main-bg">
    //           <div className="row m-auto">
    //               <div className="col-sm-6 col-lg-7 main-bg top-image top-image-mobile my-5"></div>
    //               <div className="col-sm-6 col-lg-5 text-center my-auto">
    //                   <h2 className="main-color font-display font-weight-bold">BLOG</h2>
    //                   <div className="col-7 col-sm-8 mx-auto">
    //                       <hr className="main-bg"/>
    //                   </div>
    //                   <p className="font-banner col-lg-10 mx-auto">
    //                       Once you read with dedication and discrimination, even a single sentence can make a shift in
    //                       your life keep exploring! Stay positive and mindful!
    //                   </p>
    //               </div>
    //               <div className="col-sm-6 col-lg-7 main-bg top-image top-image-not-mobile"></div>
    //           </div>
    //       </section>
    //       <section id="blog" className="row py-5 main-bg">
    //           <div className="col-md-7 col-lg-8 mx-auto">
    //               {/*<div className=" col-md-11 mx-auto">*/}
    //               {/*    <div className="card-body">*/}
    //               {/*        <p className="card-title font-banner font-weight-bold">An Author,</p>*/}
    //               {/*        <p className="card-title font-banner font-weight-bold">*/}
    //               {/*            And <span style="border-bottom: 2px solid rgb(239,53,73)">Mindful</span> Charm*/}
    //               {/*        </p>*/}
    //               {/*        <div className="card-text font-display font-weight-normal my-4"*/}
    //               {/*             style="letter-spacing: 2px;line-height: 3vw;">*/}
    //               {/*            <span className="h3 p-2" style="background: rgba(239,53,73, 0.2)">I</span>*/}
    //               {/*            am just an ordinary girl who chooses to be extraordinary and devoted to serving, inspiring,*/}
    //               {/*            and transforming others’ mindset through mindful writing and speaking after my*/}
    //               {/*            self-realization arises into presence as a conscious being.*/}
    //               {/*        </div>*/}
    //               {/*        <p className="text-center">*/}
    //               {/*            <a href="#" className="btn main-bg font-display font-weight-bold text-white px-5 py-3 "*/}
    //               {/*               style="border-radius: 0!important; font-size: 24px;">Learn More</a>*/}
    //               {/*        </p>*/}
    //               {/*    </div>*/}
    //               {/*</div>*/}
    //               <div className=" col-md-11 mx-auto">
    //                   <div className="card-body">
    //                       {currentPost.map(post => (
    //                           <section key={post.slug} className="card">
    //                               <img src={post.coverImage} alt={post.coverImageAlt} />
    //                               <div className="card-content">
    //                                   <h2>
    //                                       {post.title} &mdash;{" "}
    //                                       <span style={{ color: "#5e5e5e" }}>{post.datePretty}</span>
    //                                   </h2>
    //                                   <p
    //                                       dangerouslySetInnerHTML={{
    //                                           __html: `${post.content.substring(0, 200)}...`
    //                                       }}
    //                                   />
    //                                   {/*<Link to={`/${post.slug}`}>Continue reading...</Link>*/}
    //                               </div>
    //                           </section>
    //                       ))}
    //                   </div>
    //               </div>
    //           </div>
    //           {/*<div className="col-md-5 col-lg-4 mx-auto">*/}
    //           {/*    <img src="assets/gilda/gilda-blog.jpg" width="100%" alt=""/>*/}
    //           {/*        <p className="text-center py-4">*/}
    //           {/*            <span className="px-4 py-2 font-banner h5"*/}
    //           {/*                  style="border-top: 2px solid black; letter-spacing: 2px">TOP PICKS</span>*/}
    //           {/*        </p>*/}
    //           {/*        <div style="margin-left: 16px">*/}
    //           {/*            <p>*/}
    //           {/*                <span className="h1 mx-4 font-weight-bold  font-banner "*/}
    //           {/*                      style="border-bottom: 1px solid black">1</span>*/}
    //           {/*                <span className=" font-banner h4">The Power of Positive Thinking</span>*/}
    //           {/*            </p>*/}
    //           {/*            <p>*/}
    //           {/*                <span className="h1 mx-4 font-weight-bold  font-banner "*/}
    //           {/*                      style="border-bottom: 1px solid black">2</span>*/}
    //           {/*                <span className="h4 font-banner" style="font-weight: 500">You Are the Creator of Your Own Reality</span>*/}
    //           {/*            </p>*/}
    //           {/*            <p>*/}
    //           {/*                <span className="h1 mx-4 font-weight-bold  font-banner "*/}
    //           {/*                      style="border-bottom: 1px solid black">3</span>*/}
    //           {/*                <span className=" font-banner h4">Appreciate! Say, “Thank You!”</span>*/}
    //           {/*            </p>*/}
    //           {/*            <p>*/}
    //           {/*                <span className="h1 mx-4 font-weight-bold  font-banner "*/}
    //           {/*                      style="border-bottom: 1px solid black">4</span>*/}
    //           {/*                <span className=" font-banner h4">If They Can Do It We Can Do It Too</span>*/}
    //           {/*            </p>*/}
    //           {/*            <p>*/}
    //           {/*                <span className="h1 mx-4 font-weight-bold  font-banner "*/}
    //           {/*                      style="border-bottom: 1px solid black">5</span>*/}
    //           {/*                <span className=" font-banner h4">Self-Limiting Beliefs Is Killing You</span>*/}
    //           {/*            </p>*/}
    //           {/*        </div>*/}
    //           {/*        <hr className="sec-main-bg mt-5 col-10 mx-auto"/>*/}
    //           {/*            <p className="text-center font-weight-bold py-2 font-heading h5">*/}
    //           {/*                𝚃𝙴𝚁𝙼𝚂 𝙿𝚁𝙸𝚅𝙰𝙲𝚈 ©𝟸𝟶𝟸𝟶 𝙶𝚒𝚕𝚍𝚊 𝙶𝚒𝚟𝚎𝚗*/}
    //           {/*            </p>*/}
    //           {/*</div>*/}
    //       </section>
    //       <div className="row mx-auto justify-content-center align-posts-center main-bg">
    //           <div className="col-8 main-bg quotes-border">
    //               <p className="quotes-text">
    //                   <img src={quotes} className="quotes-open" alt=""/>
    //                   Gilda's Quotes,
    //               </p>
    //               <p className="text-center  mx-2 my-auto quotes-text">"Be yourself everyone; else is already taken"</p>
    //
    //           </div>
    //           <div className="quotes main-bg">
    //               <p className=" mx-auto mb-0 text-left main-color font-weight-bold font-subheading quotes-text">
    //                   <img src={quotes} className="quotes-open"  alt=""/>
    //                   Gilda's Quotes,
    //               </p>
    //               <p className="text-center  mx-2 my-auto quotes-text">
    //                   "Be yourself everyone; else is already taken"</p>
    //               <p className=" text-right">
    //                   <img src={quotes} className="quotes-close" alt=""/>
    //               </p>
    //           </div>
    //       </div>
    //       <div id="weekly-articles" className="py-4 main-bg">
    //           <div className="row mx-auto py-4 main-color font-weight-bold font-heading align-posts-center"
    //                style={{justifyContent: 'space-evenly'}}>
    //               <div className="col-3">
    //                   <hr className="main-bg"/>
    //               </div>
    //               <div className="col-6 col-lg-4 text-center px-4 px-md-0">Register for Weekly Articles</div>
    //               <div className="col-3 ">
    //                   <hr className="main-bg"/>
    //               </div>
    //           </div>
    //           <div className="col-sm-10 col-lg-8 mx-auto text-center font-banner ">
    //               <p>Register to receive free weekly articles every Wednesday for your personal growth. All of the
    //                   articles are based on mindset transformation, self-realization, and spirituality. It has nothing to
    //                   do with how to get money or how to be successful</p>
    //               <div className="row col-11 mx-auto text-center py-3 justify-content-center">
    //                   <div className="col-sm-7 col-lg-5 mt-2">
    //                       <input className="form-control " placeholder="Email"/>
    //                   </div>
    //                   <div className="col-sm-5 col-lg-4 mt-2">
    //                       <a href="/register"
    //                          className="font-subheading btn text-white font-weight-bold px-5 py-2 text-decoration-none sec-main-bg">REGISTER</a>
    //                   </div>
    //               </div>
    //           </div>
    //       </div>
    //
    //   </div>
    // );
};

export default Blog;
