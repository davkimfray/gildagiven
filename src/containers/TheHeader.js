import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CDropdown, CDropdownToggle
} from '@coreui/react'

// routes config
import {FaPowerOff} from "react-icons/fa";
import {UseAuth} from "../components/store/Auth";

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  const { signout } = UseAuth();

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader withSubheader className="bg-secondary">
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mr-auto d-flex d-lg-none " to="/">
        <div className="text-center d-inline-block mr-auto quotes-text text-primary " style={{fontSize: '2em'}}>
          <label>
            Gilda Given</label>
        </div>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          {/*<CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>*/}
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CDropdown
            inNav
            className="c-header-nav-item mx-2"
        >
          <CDropdownToggle className="c-header-nav-link" caret={false} onClick={signout.bind(this)}>
            <FaPowerOff fontSize="1.5em" className="bg-primary rounded-circle px-1 m-auto"/>
          </CDropdownToggle>
        </CDropdown>
      </CHeaderNav>

      {/*<CSubheader className="px-3 justify-content-between">*/}
      {/*  <CBreadcrumbRouter*/}
      {/*    className="border-0 c-subheader-nav m-0 px-0 px-md-3"*/}
      {/*    routes={routes}*/}
      {/*  />*/}
      {/*</CSubheader>*/}
    </CHeader>
  )
}

export default TheHeader
