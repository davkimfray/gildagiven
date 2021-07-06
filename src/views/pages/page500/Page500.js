import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import internalServerError from '../../../assets/undraw_server_down_s4lk.svg'
import "../../../scss/shared.css";
import {Link} from "react-router-dom";

const Page500 = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center main-bg">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol className="col-md-11 col-lg-7">
            <span className="clearfix">
            <img className='col-12 p-4 mx-auto' src={internalServerError}/>
            </span>
            <span className="clearfix d-md-none">
              <h1 className="float-left col-12 col-md-2 display-3 text-center mr-5">500</h1>
              <h4 className="pt-3 text-center">Houston, we have a problem!</h4>
              <p className="text-muted text-center float-left">The page you are looking for is temporarily unavailable.</p>
            </span>
            <span className="clearfix d-none d-md-block">
              <h1 className="float-left col-12 col-md-2 display-3 mr-5">500</h1>
              <h4 className="pt-3">Houston, we have a problem!</h4>
              <p className="text-muted float-left">The page you are looking for is temporarily unavailable.</p>
            </span>
            <p className="clearfix row justify-content-center p-3">
              
            <Link to="/" className="h3 sec-main-bg mx-auto font-display rounded-lg font-weight-bold text-decoration-none text-white px-4 py-3 ">
      BACK <span className="p-1"/> HOME</Link>
            </p>

          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page500
