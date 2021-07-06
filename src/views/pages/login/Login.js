import React, {useState} from 'react'
import CIcon from '@coreui/icons-react'
import {UseAuth} from "../../../components/store/Auth";
import './login.css'
import '../../../scss/shared.css'
import {
  CButton,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText, CSpinner, CToast, CToastBody, CToaster, CToastHeader
} from "@coreui/react";
import {FaRegTimesCircle} from "react-icons/fa";
import {Redirect, Switch} from "react-router-dom";
import {useSession} from "../../../components/store/Session";

const Login = () => {
  const { isLoggedIn} = useSession();
  const { signin } = UseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  // const handleChange = event => {
  //   if (event.target.name === 'email') setEmail(event.target.value)
  //    else setPassword(event.target.value)
  //   // this.setState({ [event.target.name]: event.target.value });
  // };

  const handleSubmit = event => {
    event.preventDefault();
    if (email.trim().length>0 && password.trim().length>0 ) {
      setProgress(10);
      setShowToast(false);

      signin(email, password)
      // .then(() => <Redirect to={"/admin/dashboard"}/>);
      // getFirebase().auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(value => {
        setProgress(0);
      //     console.log('LOGGED IN SUCCESS');
      //     this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        setShowToast(true);
        setError(error.message);
        setProgress(0)
        console.log({error})
      });

    } else {
      setInvalid(true)
    }
  }
  if (isLoggedIn) {
    return (
        <Switch>
          <Redirect from="/admin" to="/admin/dashboard"/>
        </Switch>
    )
  }
    return (
        <>
          <CToaster
              position="bottom-center"
          >
            <CToast
                show={showToast}
                autohide={5000}
                fade={true}
            >
              <CToastHeader closeButton={true} className="text-danger">
                <FaRegTimesCircle fontSize="2em" className="rounded-circle px-1 m-1 mr-3"/>
                Failed
              </CToastHeader>
              <CToastBody>
                {error}
              </CToastBody>
            </CToast>
          </CToaster>

          <div className="auth-wrapper ">
            <div className="auth-content">
              <div className="auth-bg">
                <span className="r main-bg"/>
                <span className="r s main-bg"/>
                <span className="r s main-bg"/>
                <span className="r main-bg"/>
              </div>
              <div className="card main-bg p-2">
                <div className="card-body text-center">
                  <div className="mb-4">
                    <CIcon name="cil-lock-locked" size={'4xl'} style={{color: "#996573"} }/>
                    {/*<FiUnlock style={authIconStyle}/>*/}
                  </div>
                  <h3 className="mb-4 font-heading">Login</h3>
                  <CForm onSubmit={handleSubmit} >
                    <CFormGroup>
                      <CInputGroup className="bg-white rounded-lg">
                        <CInputGroupPrepend>
                          <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="email" id="email1" name="email1" placeholder="Email" autoComplete="username"
                                invalid={!email.trim().length>0 && invalid}
                                onChange={event => setEmail(event.target.value)} value={email} required/>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CInputGroup className="bg-white rounded-lg">
                        <CInputGroupPrepend>
                          <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" id="password1" name="password1" placeholder="Password" autoComplete="current-password"
                                invalid={!password.trim().length>0 && invalid}
                                onChange={event => setPassword(event.target.value)} value={password} required/>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup className="form-actions">
                      <CButton type="submit" size="lg" color="primary" className="shadow-2 font-banner px-4 my-4"
                               disabled={progress > 0 && progress < 100}>
                        {progress > 0 && progress < 100 ? <CSpinner color="info" className={""}/> : ''}
                        <span className={"px-4 py-2"}>Login</span>
                        </CButton>
                    </CFormGroup>
                    {/*<div className="lds-ellipsis">*/}
                    {/*  <div className="bg-primary"/>*/}
                    {/*  <div className="bg-primary"/>*/}
                    {/*  <div className="bg-primary"/>*/}
                    {/*  <div className="bg-primary"/>*/}
                    {/*</div>*/}
                  </CForm>

                  {/*<div className="input-group mb-3">*/}
                  {/*  <input type="email" className="form-control" name="email" placeholder="Email"/>*/}
                  {/*</div>*/}
                  {/*<div className="input-group mb-4">*/}
                  {/*  <input type="password" className="form-control" name="password" placeholder="password" onChange={event => setPassword(event.target.value)} value={password}/>*/}
                  {/*</div>*/}

                  {/*<button onClick={handleSubmit} className="btn sec-main-bg text-white shadow-2 font-banner px-4 my-4">Login</button>*/}
                  {/*<p className="mb-2 text-muted">Forgot password? <a href="/auth/reset-password-1">Reset</a></p>*/}
                  {/*<p className="mb-0 text-muted">Don’t have an account? <a href="/auth/signup-1">Signup</a></p>*/}
                </div>
              </div>
            </div>
          </div>
        </>
    );
};
export default Login
