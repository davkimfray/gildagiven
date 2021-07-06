import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupAppend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import pageNotFound from '../../../assets/undraw_page_not_found_su7k.svg'
import "../../../scss/shared.css";
import {Link} from "react-router-dom";

const Page404 = () => {
  return (
    <div className="d-flex align-items-center justify-content-center w-100 main-bg" style={{minHeight: '100vh',flexDirection: 'column'}}>
        <img className='col-9 col-md-6 col-lg-4 p-4 mx-auto' src={pageNotFound}/>
      <h2 className='col-11 py-4 mx-auto text-center'>Opps! Page Not Found</h2>
      <Link to="/" className="h3 sec-main-bg font-display rounded-lg font-weight-bold text-decoration-none text-white px-4 py-3 ">
      BACK <span className="p-1"/> HOME</Link>

 
    </div>
  )
}

export default Page404
