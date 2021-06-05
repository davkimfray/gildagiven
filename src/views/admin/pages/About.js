import React, {Component} from "react";
import {getFirebase} from "../../../components/Firebase/firebase.js";
import "../../../scss/shared.css";
import "../../pages/about/about.css";
import {
    CButton, CForm,
    CFormGroup,
    CInput,
    CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
    CSpinner,
    CTextarea, CToast, CToastBody, CToaster, CToastHeader
} from "@coreui/react";
import {FaRegCheckCircle,FaPen, FaTrash} from 'react-icons/fa';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutMe: [],
            aboutKey: '',
            title: '',
            details: '',
            progress: 0,
            today: 0,
            showToast: false,
            invalid: false,
            deleteModal: false,
            deleteAboutKey: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteAbout = this.deleteAbout.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newAboutsRef = getFirebase().database().ref('pages/about/' + (this.state.aboutKey ? this.state.aboutKey : ''));
        this.setState({progress: 10});
        if (this.state.aboutKey){
            newAboutsRef.update({
                title: this.state.title,
                details: this.state.details
            }).then(() => {
                this.setState({progress: 100});
                this.setState({
                    title: '',
                    details: '',
                    aboutKey: '',
                    progress: 0,
                    showToast: true
                });
            });
            } else {
            newAboutsRef.push({
                title: this.state.title,
                details: this.state.details
            }).then(() => {
                this.setState({progress: 100});
                this.setState({
                    title: '',
                    details: '',
                    aboutKey: '',
                    progress: 0,
                    showToast: true
                });
            });
        }

    }

    componentDidMount() {
        const aboutRef = getFirebase().database().ref('pages/about');
            aboutRef.on('value', (snapshot) => {
                let data = snapshot.val();
                let newState = [];
                for (let about in data) {
                    newState.push({
                        id: about,
                        title: data[about].title,
                        details: data[about].details,
                    });
                }
                this.setState({aboutMe: newState})
            });
    }

    deleteAbout(about, deleteAbout) {
        if (deleteAbout === true){
            this.setState({deleteModal: false});
            const deleteAboutRef = getFirebase().database().ref('/pages/about/' + this.state.deleteAboutKey.id);
            deleteAboutRef.remove();
            this.setState({deleteAboutKey: []});
        } else {
            this.setState({deleteModal: true,
            deleteAboutKey: about});
        }
    }
    
    render() {
        return (
            <>
                <CToaster position="bottom-center">
                    <CToast
                        show={this.state.showToast}
                        autohide={3000}
                        fade={true}
                    >
                        <CToastHeader closeButton={true} className="text-success">
                            <FaRegCheckCircle fontSize="2em" className="text-success rounded-circle px-1 m-1 mr-3"/>
                            Successful
                        </CToastHeader>
                        <CToastBody>
                            {this.state.aboutKey ? `About Updated Successfully.` : `About Added Successfully.`}
                        </CToastBody>
                    </CToast>
                </CToaster>
                <CModal
                    show={this.state.deleteModal}
                    onClose={this.setState.bind(this, {deleteModal: false})}
                    color="danger"
                >
                    <CModalHeader closeButton>
                        <CModalTitle>Confirm Delete book</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <p className="text-center mt-4">
                            <FaTrash fontSize="2.5em" className="text-danger"/>

                        </p>
                        <h2 className="text-center m-3">{this.state.deleteAboutKey.title}</h2>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="danger" onClick={this.deleteAbout.bind(this, '', true)}> Delete </CButton>{' '}
                        <CButton
                            color="secondary"
                            onClick={this.setState.bind(this, {deleteModal: false})}
                        >Cancel</CButton>
                    </CModalFooter>
                </CModal>

                <div className="main-bg d-flex">
                    <div className="m-auto p-0 pb-3">
                        <p className="text-center ">
                            <span className="font-heading word-bottom-line p-2">
                                {this.state.aboutKey ? 'Edit About' : 'Add New About'}</span>
                        </p>
                        <div>
                            <CForm onSubmit={this.handleSubmit} className="row mx-0 justify-content-center py-3">
                                <div className="col-lg-7 mx-0 ">
                                    <CFormGroup>
                                        <CLabel htmlFor="date-input " className="h3">Title</CLabel>
                                        <CInput type="text" id="title" name="title" placeholder="Title"
                                                onChange={event => this.setState({title: event.target.value})}
                                                value={this.state.title} />
                                    </CFormGroup>
                                    <CFormGroup>
                                        <CLabel htmlFor="textarea-input" className="h3 pt-3">Textarea</CLabel>
                                        <CTextarea
                                            name="textarea-input"
                                            id="textarea-input"
                                            rows="5"
                                            size="lg"
                                            placeholder="Content..."
                                            onChange={event => this.setState({details: event.target.value})}
                                            value={this.state.details}
                                            required
                                        />
                                    </CFormGroup>
                                </div>

                                <CFormGroup className="col-lg-3 row pt-3 mt-auto mb-2">
                                    <CButton type="submit"
                                            className="btn h4 sec-main-bg text-white px-5 py-2 mx-auto"
                                            disabled={this.state.progress > 0 && this.state.progress < 100}>
                                        {this.state.progress > 0 && this.state.progress < 100 ?
                                            <CSpinner color="info" className={""}/> : ''}
                                        <span className={"px-4 py-2"}>
                                    {this.state.aboutKey ? 'Update' : 'Add'}
                                    </span>
                                    </CButton>
                                </CFormGroup>
                            </CForm>
                            <div id="about" className="main-bg">
                                <div className="col-xxl-11 mx-auto font-display py-5 px-2">
                                    <p className="font-heading main-color text-center font-weight-bold m-0">
                                        <span className="word-bottom-line px-2"> About Me</span>
                                    </p>
                                    {this.state.aboutMe.map((about, index) => (
                                    <div key={index} className="row m-0 word-bottom-line py-3">
                                        {index === 0 ?
                                            <div className="row col-md-11 px-0 mx-0 align-items-center">
                                                <p className="col-1 d-none d-sm-flex col-sm-2 col-lg-1 bg-white text-center text-capitalize i-not-mobile">{about.details.slice(0,1)}</p>
                                                <p className="col-11 col-sm-10 col-lg-11 ">
                                                <span className="col-1 d-sm-none bg-white text-center text-capitalize i-mobile">
                                                    {about.details.slice(0,1)}
                                                </span>
                                                    {about.details.slice(1)}</p>
                                            </div>
                                            :
                                            <div className="col-md-10 col-lg-11 px-0 mx-auto">
                                                <p className="font-heading main-color text-center font-weight-bold ">{about.title}</p>
                                                <p dangerouslySetInnerHTML={{
                                                    __html: `${(about.details).replace(/\r?\n/g, '<br/>')}`
                                                }}/>
                                            </div>
                                        }
                                        <div className="col-md-1 col-lg-1 row m-0 align-items-center justify-content-center justify-content-md-start px-0">
                                            <div className="m-2 mt-md-auto mx-lg-1">
                                                <CButton color="light" className="col quote-card" style={{width: '4.7em'}}
                                                    onClick={event => {
                                                        this.setState({aboutKey: about.id, title: about.title, details: about.details});
                                                        window.scrollTo(0,0);
                                                    }}>
                                                  <span>
                                                      <FaPen fontSize="2em" className="bg-success rounded-circle px-2 m-1"/>
                                                  </span><br/>Edit
                                                </CButton>
                                            </div>
                                            <div className="m-2 mt-md-0 mb-md-auto mx-lg-1">
                                                <CButton type="button" onClick={this.deleteAbout.bind(this, about, false)} color="light" className="col quote-card"
                                                         style={{width: '4.7em'}}>
                                        <span>
                                            <FaTrash fontSize="2em" className="bg-danger px-2 rounded-circle m-1"/>
                                        </span><br/>Trash
                                                </CButton>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default About
