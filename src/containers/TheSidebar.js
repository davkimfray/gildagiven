import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem
} from '@coreui/react'
import '../views/pages/qoutes/quotes.css'
import logo from "../assets/logo.png"

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow);


  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand  className="d-md-down-none bg-primary" to="/">
          <img src={logo} width="60%" alt="Gilda Given" className="mx-auto"/>
      </CSidebarBrand>
      <CSidebarNav className="bg-primary">

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none bg-primary text-white">
        <span className="pl-5 position-absolute d-flex align-items-center  overflow-hidden py-3" style={{width: '90%'}}>   &copy; 2021 Gilda Given.</span>
      </CSidebarMinimizer>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
