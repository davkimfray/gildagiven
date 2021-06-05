import React from "react";
import "./load-more-buton.scss";
import {CSpinner} from "@coreui/react";

const LoadMoreButton = (isLoading, onLoadMoreIsClicked) => {

    return (
        <div>
                        <div className="buttons ">
                            <button key={JSON.stringify(isLoading)}  className="blob-btn" disabled={isLoading} onClick={onLoadMoreIsClicked}>
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
    );
};

export default LoadMoreButton;
