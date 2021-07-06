import React, {useEffect, useState} from 'react'
import {
    CButton} from '@coreui/react'
import womenTyping from '../../../assets/woman_typing.png'
import './dashboard.css'
import {FaPenNib, FaRegCalendarCheck, FaQuoteLeft, FaQuoteRight, FaBook, FaEye, FaThumbsUp} from "react-icons/fa";
import {getFirebase} from "../../../components/Firebase/firebase";

const Dashboard = () => {
    const [numOfArticles, setNumOfArticles] = useState(0);
    // const [today, setToday] = useState('');
    useEffect(() => {
        let month = (new Date().getMonth() + 1) < 10 ? '-0' : '-';
        month += (new Date().getMonth() + 1);
        const customDate = new Date(new Date().getFullYear() + month + '-' + new Date().getDate()).getTime().toString();
        // setToday(customDate);
        fetchNumOfArticles(customDate);
    }, []);
    const fetchNumOfArticles = async (articlesKey) => {
        let quotesRef;
        quotesRef = getFirebase().database().ref('articlesSubscribers/' + articlesKey);
        await quotesRef.on('value', (snapshot) => {
            setNumOfArticles(snapshot.numChildren());
        });
    };
    return (
        <>
            <div className="px-xxl-2 p-0 row mx-auto " style={{justifyContent: "space-evenly"}}>
                <div className="col-lg-7 col-xl-7 p-0">
                    <div className="row post-card card-shadow m-0 p-3 text-white">
                        <div className="col-sm-9 col-md-7 d-flex flex-column" style={{justifyContent: "space-evenly"}}>
                            <h1 className="font-weight-bold mb-3 font-heading">Hello Gilda!</h1>
                            <p>Ready for new insight today, let's make count and make every one keep learning about life
                                while enjoying it.</p>
                            <CButton color="primary" size="lg" className="px-4 mr-auto shadow"
                                     href="/admin/posts/new-post">
                                Write New Post
                            </CButton>
                        </div>
                        <div className="col-sm-3 col-md-4 px-0 d-none d-sm-flex align-items-center image">
                            {/*<img src={womenTyping} width="60%" alt=""/>*/}
                        </div>

                    </div>
                </div>
                <div className="col-lg-4 p-0 px-md-3 p-lg-0 my-md-3 col-xxl-3">
                    <div className="row m-0 justify-content-around justify-content-md-between">
                        <div
                            className="col-md-6 col-lg-12 bg-gradient-secondary row my-3 mt-lg-0 p-3 align-items-center card-shadow text-dark">
                            <FaPenNib size="4em" className="bg-primary px-3" style={{borderRadius: "16px"}}/>
                            <div className="ml-3 ">
                                <h4 className="mb-0 text-primary font-weight-bold">{numOfArticles} Subscribers</h4>
                                <h5 className="mb-0">Today's Articles Subscribers</h5>
                            </div>
                        </div>
                        <div
                            className="col-md-6 col-lg-12 bg-gradient-secondary row my-3 p-3 align-items-center card-shadow text-dark">
                            <FaBook size="4em" className="bg-primary px-3" style={{borderRadius: "16px"}}/>
                            <div className="ml-3 ">
                                <h4 className="mb-0 text-primary font-weight-bold">13 Books</h4>
                                <h5 className="mb-0">Today's Downloads</h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="px-xxl-2 p-0 my-lg-3 row mx-auto " style={{justifyContent: "space-evenly"}}>
                <div className="col-lg-7 card-shadow bg-gray-100 col-xl-7 p-0">
                    <h1 className="font-weight-bold py-3 px-4 font-heading">Top Posts</h1>
                    {[1,2,3].map((post, index) => (
                        <div key={index} className="row m-0 py-3 px-sm-3  ">
                            <div className="row m-0 d-none d-sm-flex text-primary"><h3>0{index+1}</h3>
                                <div className=" bg-info  mx-2 mt-0  mb-auto" style={{
                                    backgroundImage: "url(" + womenTyping + ")",
                                    backgroundSize: "cover",
                                    borderRadius: "16px",
                                    padding: "2.25rem"
                                }}>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9 col-md-6 ">
                                <h5 className="pt-1">
                                    <span className="h3 d-sm-none text-primary">01</span> Ready for new insight today,
                                    let's make count
                                    while enjoying it.</h5>
                                <div className="h5  row m-0 align-items-center d-md-none">may 20 2021
                                    <h5 className="font-weight-bold my-0 mx-2">
                                        <FaEye size="1.3em" className="text-primary mr-2"/>
                                        1.5k
                                    </h5>
                                    <h5 className="font-weight-bold my-0 ml-2">
                                        <FaThumbsUp size="1.3em" className="text-primary mr-2"/>
                                        1.5k
                                    </h5>
                                </div>
                                <h5 className="d-sm-down-none">May 20 2021</h5>
                            </div>
                            <div className=" p-0 row my-0 mx-auto d-sm-down-none justify-content-md-between">
                                <h5 className="font-weight-bold my-0 mr-2">
                                    <FaEye size="1.5em" className="text-primary mr-2"/>
                                    1.5k
                                </h5>
                                <h5 className="font-weight-bold">
                                    <FaThumbsUp size="1.5em" className="text-primary mr-2"/>
                                    1.5k
                                </h5>
                            </div>

                        </div>
                     ))
                    }
                </div>
                <div className="col-lg-4 p-0 px-md-3 my-md-3 my-lg-0 p-lg-0 col-xxl-3">
                    <div className="row m-0 justify-content-around justify-content-md-between">
                        <div className="col-md-6 col-lg-12 pl-md-0 pr-md-4 mt-lg-0" style={{height: "fit-content"}}>
                            {/*<CWidgetDropdown*/}
                            {/*    color="gradient-info"*/}
                            {/*    header="9"*/}
                            {/*    text="Visitors"*/}
                            {/*    className="card-shadow mx-0"*/}
                            {/*    footerSlot={*/}
                            {/*        <ChartLineSimple*/}
                            {/*            pointed*/}
                            {/*            className="mt-3 mx-3"*/}
                            {/*            style={{height: '70px'}}*/}
                            {/*            dataPoints={[1, 18, 9, 17]}*/}
                            {/*            pointHoverBackgroundColor="info"*/}
                            {/*            options={{ elements: { line: { tension: 0.00001 }}}}*/}
                            {/*            // label="Visitors"*/}
                            {/*            label={["Today", "This Week", "This Month", "Last Month"]}*/}
                            {/*            // label={["Jan", "2", "Mr", ' ']}*/}
                            {/*        />*/}
                            {/*    }*/}
                            {/*>*/}
                            {/*</CWidgetDropdown>*/}
                        </div>
                            <div className="col-md-6 col-lg-12 pl-md-0 pr-md-4 mt-lg-0" style={{height: "fit-content"}}>
                            <div
                                className="bg-gradient-secondary row my-3 mb-md-5 mb-lg-3 mt-lg-0 p-3 align-items-center card-shadow text-dark"
                                style={{height: "fit-content"}}>
                                <FaPenNib size="4em" className="bg-primary px-3" style={{borderRadius: "16px"}}/>
                                <div className="ml-3 ">
                                    <h4 className="mb-0 text-primary font-weight-bold">13 Articles</h4>
                                    <h5 className="mb-0">Today's Request</h5>
                                </div>
                            </div>
                            <div
                                className="bg-gradient-secondary row mt-3 mt-lg-0 p-3 align-items-center card-shadow text-dark"
                                style={{height: "fit-content"}}>
                                <FaPenNib size="4em" className="bg-primary px-3" style={{borderRadius: "16px"}}/>
                                <div className="ml-3 ">
                                    <h4 className="mb-0 text-primary font-weight-bold">13 Articles</h4>
                                    <h5 className="mb-0">Today's Request</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-12 bg-gradient-secondary row my-3 p-3 align-items-center card-shadow text-dark">
                            <div className="row m-0 w-100 align-items-center border-bottom pb-2">
                                <FaRegCalendarCheck size="4em" className="bg-primary px-3"
                                                    style={{borderRadius: "16px"}}/>
                                <div className="ml-3 ">
                                    <h4 className="mb-0 text-primary font-weight-bold">May 20 2021</h4>
                                    <h5 className="mb-0">Today's Quote</h5>
                                </div>
                            </div>

                            <h4 className="m-0 py-3">
                                <FaQuoteLeft size="1em" className="mb-3 mr-2"/>
                                sdfgsd fgsdfgsdf g sd fgs dfgsdfgsdfgsfgsd fgsdfgsd fg sdf gsd fg sdf g sd g sdf gs
                                <FaQuoteRight size="1em" className="mt-3 ml-2"/>
                            </h4>
                            <CButton color="primary" size="lg" className="px-4 mr-auto shadow"
                                     href="/admin/quotes/add-quote">
                                Add New Quote
                            </CButton>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
};

export default Dashboard
