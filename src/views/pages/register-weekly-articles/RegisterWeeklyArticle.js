import React, { Component } from 'react';
import {getFirebase} from "../../../components/Firebase/firebase.js";
import {
    CButton,
    CForm,
    CFormGroup,
    CInput,
    CSpinner, CToast, CToastBody, CToaster, CToastHeader
} from "@coreui/react";
import {FaRegCheckCircle, FaRegTimesCircle} from "react-icons/fa";


class RegisterWeeklyArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            today: 0,
            showToast: false,
            invalid: false,
            progress: 0,
            email: ''
        }
    }


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ showToast: true });

        if (this.state.email.trim().length>0) {
            const articlesSubscribersKey = new Date().getTime();
            this.setState({progress: 10});
            const newArticlesSubscribersRef = getFirebase().database().ref('articlesSubscribers/' + new Date(this.state.today).getTime() + '/' + articlesSubscribersKey);
            newArticlesSubscribersRef.set(this.state.email).then(() => {
                this.setState({progress: 100});
                    this.setState({
                        email: '',
                        progress: 0,
                        showToast: true,
                    });
            });
        } else {
            this.setState({invalid: true})
        }
    };

    componentDidMount() {
        let month = (new Date().getMonth()+1) <10 ? '-0':'-';
        month += (new Date().getMonth()+1);
        this.setState({today:new Date().getFullYear()+month+'-'+new Date().getDate()});
    }
    render() {
        return (
            <div id="weekly-articles" className="py-4 main-bg">
                <CToaster position="bottom-center">
                    <CToast
                        show={this.state.showToast}
                        autohide={3000}
                        fade={true}
                    >
                        {this.state.invalid ?
                            <CToastHeader closeButton={true} className="text-danger h4">
                                <FaRegTimesCircle fontSize="2em" className="rounded-circle px-1 m-1 mr-3"/>
                                Failed
                            </CToastHeader>
                            :
                            <CToastHeader closeButton={true} className="text-success h4">
                                <FaRegCheckCircle fontSize="2em" className="text-success rounded-circle px-1 m-1 mr-3"/>
                                Successful
                            </CToastHeader>
                        }
                        <CToastBody className="h5 text-center">
                            {this.state.invalid ? `Email Required!` : `You have Successfully registered for Weekly Articles.`}
                        </CToastBody>
                    </CToast>
                </CToaster>
                <div className="row mx-auto py-0 main-color font-weight-bold font-heading align-items-center justify-content-center">
                    <div className="col-3">
                        <hr className="bg-primary" style={{height: "1px"}}/>
                    </div>
                    <div className="col-6 col-sm-6 col-lg-4 text-center px-0 px-sm-4 px-md-0">Register for Weekly Articles</div>
                    <div className="col-3 ">
                        <hr className="bg-primary"/>
                    </div>
                </div>
                <div className="col-sm-10 col-lg-8 mx-auto text-center font-banner ">
                    <p>Register to receive free weekly articles every Wednesday for your personal growth. All of the
                        articles are based on mindset transformation, self-realization, and spirituality. It has nothing
                        to
                        do with how to get money or how to be successful</p>
                    <CForm onSubmit={this.handleSubmit} className="row col-sm-11 mx-auto text-center py-3 align-items-center justify-content-center">
                        <CFormGroup className="col-sm-7 col-lg-6 px-0 px-sm-3  mt-2">
                                <CInput type="email" id="email1" name="email1" placeholder="Email" autoComplete="username"
                                        invalid={!this.state.email.trim().length>0 && this.state.invalid}
                                        onChange={event => this.setState({ email: event.target.value })} value={this.state.email} required/>
                        </CFormGroup>
                        <CFormGroup className="form-actions col-sm-5 col-lg-4 mt-2">
                            <CButton type="submit" size="lg" color="primary" className="shadow-2 font-subheading btn text-white font-weight-bold px-2 py-2 text-decoration-none sec-main-bg px-4 "
                                     disabled={this.state.progess > 0 && this.state.progess < 100}>
                                {this.state.progess > 0 && this.state.progess < 100 ? <CSpinner color="info" className={""}/> : ''}
                                <span className={"px-4 py-2"}>REGISTER</span>
                            </CButton>
                        </CFormGroup>
                    </CForm>

                    {/*<form onSubmit={this.handleSubmit} className="row col-11 mx-auto text-center py-3 justify-content-center">*/}
                    {/*    <div className="col-sm-7 col-lg-5  mt-2">*/}
                    {/*        <input className="form-control" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email}/>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-sm-5 col-lg-4 mt-2">*/}
                    {/*        <button type="submit" className="font-subheading btn text-white font-weight-bold px-5 py-2 text-decoration-none sec-main-bg">REGISTER</button>*/}
                    {/*    </div>*/}
                    {/*</form>*/}
                </div>
            </div>


        );
    }
}

export default RegisterWeeklyArticle;

