import React, {Component} from "react";
import {getFirebase} from "../../../components/Firebase/firebase.js";
import "../../../scss/shared.css";
import "./quotes.css";
import {
    CCol,
    CFormGroup,
    CInput,
    CLabel,
    CSpinner,
    CTextarea, CToast, CToastBody, CToaster, CToastHeader
} from "@coreui/react";
import {FaRegCheckCircle} from "react-icons/fa";

class AddQuotes  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
            quoteDate: '',
            progress: 0,
            today: 0,
            showToast: false,
            invalid: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.quoteDate.trim().length>0 && this.state.quote.trim().length>0 ) {
            const quoteKey = new Date(this.state.quoteDate).getTime();
            const newQuotesRef = getFirebase().database().ref('quotes/' + (this.props.match.params.quoteKey ? this.props.match.params.quoteKey : quoteKey));
            this.setState({progress: 10});
            newQuotesRef.set(this.state.quote).then(() => {
                this.setState({progress: 100});
                if (!this.props.match.params.quoteKey) {
                    this.setState({
                        quote: '',
                        progress: 0,
                        showToast: true,
                    });
                } else {
                    this.setState({
                        progress: 0,
                        showToast: true,
                    });
                }
            });
        } else {
            this.setState({invalid: true})
        }
    }

    componentDidMount() {
        let month = (new Date().getMonth()+1) <10 ? '-0':'-';
        month += (new Date().getMonth()+1);
        this.setState({today:new Date().getFullYear()+month+'-'+new Date().getDate()});
        if (this.props.match.params.quoteKey ) {
            const itemsRef = getFirebase().database().ref('quotes/'+this.props.match.params.quoteKey );
        itemsRef.on('value', (snapshot) => {
             let item = snapshot.val();
             this.setState({
                 quote: item,
             })
        });
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
                                        {this.props.match.params.quoteKey ? `Quote Updated Successfully.` : `Quote Added Successfully.`}
                                    </CToastBody>
                                </CToast>
                </CToaster>
                <div className="main-bg d-flex">
                    <div className="container m-auto p-0 pb-3">
                        <p className="text-center ">
                            <span className="font-heading word-bottom-line p-2">
                                {this.props.match.params.quoteKey ?  'Edit Book' : 'Add New Book'}</span>
                        </p>
                        <div>
                            <div className="row mx-0 justify-content-center py-5">
                            <div className="col-lg-7 mx-0 ">
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="date-input">Quote Date</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="date" id="date-input"  name="date-input" placeholder="date"
                                                min={this.state.today}
                                                invalid={!this.state.quoteDate.trim().length>0 && this.state.invalid}
                                                onChange={event => this.setState({quoteDate: event.target.value})}
                                                value={this.state.quoteDate} required/>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup >
                                        <CLabel htmlFor="textarea-input">Textarea</CLabel>
                                        <CTextarea
                                            name="textarea-input"
                                            id="textarea-input"
                                            rows="5"
                                            size="lg"
                                            invalid={!this.state.quote.trim().length>0 && this.state.invalid}
                                            placeholder="Content..."
                                            onChange={event => this.setState({quote: event.target.value})}
                                            value={this.state.quote}
                                            required
                                        />
                                </CFormGroup>
                            </div>

                            </div>
                            <div className="col-lg-11 mx-auto">
                            <div className="row pt-4">
                                <button onClick={this.handleSubmit} className="btn h4 sec-main-bg text-white px-5 py-2 mx-auto"  disabled={this.state.progress > 0 && this.state.progress < 100}>
                                    {this.state.progress > 0 && this.state.progress < 100 ? <CSpinner color="info" className={""}/> : ''}
                                    <span className={"px-4 py-2"}>
                                    {this.props.match.params.quoteKey ? 'Update Quote' : 'Add Quote'}
                                    </span>
                            </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AddQuotes
