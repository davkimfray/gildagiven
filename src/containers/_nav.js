import React from 'react'
import CIcon from '@coreui/icons-react'
import {FaBlog, FaLayerGroup, FaBook} from 'react-icons/fa';
import {BiCalendarEvent, BiHome} from 'react-icons/bi';
import {RiContactsLine} from 'react-icons/ri';
import {BsInfoCircle, BsChatQuote} from 'react-icons/bs';
import {IoSpeedometerOutline} from 'react-icons/io5';
import {RiArticleLine} from 'react-icons/ri';

import {Link} from "react-router-dom";

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <IoSpeedometerOutline size="1.5em" className="ml-1 mr-3"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Posts',
    to: '/admin/posts',
    icon: <RiArticleLine size="1.5em" className="ml-1 mr-3"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Books',
    to: '/admin/books',
    icon: <FaBook size="1.5em" className="ml-1 mr-3"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quotes',
    to: '/admin/quotes',
    icon: <BsChatQuote size="1.5em" className="ml-1 mr-3"/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Pages']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Home',
    route: '/pages',
    icon: <BiHome size="1.5em" className="ml-1 mr-3"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'About',
        params: 'about',
        onClick: () => {window.location.href='/admin/pages/home/about'},
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Check Out My Books',
        params:'checkOutMyBooks',
        onClick: () => {window.location.href='/admin/pages/home/checkOutMyBooks'},
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Extra Me',
        params:'extraMe',
        onClick: () => {window.location.href='/admin/pages/home/extraMe'},
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'About',
    onClick: () => {window.location.href='/admin/pages/about'},
    icon: <BsInfoCircle size="1.5em" className="ml-1 mr-3"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Blog',
    onClick: () => {window.location.href='/admin/pages/blog'},
    icon: <FaBlog size="1.5em" className="ml-1 mr-3"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Book Me',
    onClick: () => {window.location.href='/admin/pages/book-me'},
    icon: <BiCalendarEvent size="1.5em" className="ml-1 mr-3"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'For You',
    onClick: () => {window.location.href='/admin/pages/for-you'},
    icon: <FaLayerGroup size="1.5em" className="ml-1 mr-3"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Contacts',
    onClick: () => {window.location.href='/admin/pages/contacts'},
    to: '/admin/pages/contacts',
    icon: <RiContactsLine size="1.5em" className="ml-1 mr-3"/>,
  },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Pages',
  //   route: '/pages',
  //   icon: 'cil-star',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Home',
  //       to: '/admin/pages/home',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'About',
  //       to: '/admin/pages/about',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Blog',
  //       to: '/admin/pages/blog',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Book Me',
  //       to: '/admin/pages/book-me',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'For You',
  //       to: '/admin/pages/for-you',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Contacts',
  //       to: '/admin/pages/contacts',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Pages',
  //   route: '/pages',
  //   icon: 'cil-star',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Home',
  //       to: '/admin/pages/home',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'About',
  //       to: '/admin/pages/about',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Blog',
  //       to: '/admin/pages/blog',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Book Me',
  //       to: '/admin/pages/book-me',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'For You',
  //       to: '/admin/pages/for-you',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Contacts',
  //       to: '/admin/pages/contacts',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Components']
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Base',
  //   route: '/base',
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Breadcrumb',
  //       to: '/admin/base/breadcrumbs',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Cards',
  //       to: '/admin/base/cards',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Carousel',
  //       to: '/admin/base/carousels',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Collapse',
  //       to: '/admin/base/collapses',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Forms',
  //       to: '/admin/base/forms',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Jumbotron',
  //       to: '/admin/base/jumbotrons',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'List group',
  //       to: '/admin/base/list-groups',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Navs',
  //       to: '/admin/base/navs',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Navbars',
  //       to: '/admin/base/navbars',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Pagination',
  //       to: '/admin/base/paginations',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Popovers',
  //       to: '/admin/base/popovers',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Progress',
  //       to: '/admin/base/progress-bar',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Switches',
  //       to: '/admin/base/switches',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tables',
  //       to: '/admin/base/tables',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tabs',
  //       to: '/admin/base/tabs',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tooltips',
  //       to: '/admin/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Buttons',
  //   route: '/buttons',
  //   icon: 'cil-cursor',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Buttons',
  //       to: '/admin/buttons/buttons',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Brand buttons',
  //       to: '/admin/buttons/brand-buttons',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Buttons groups',
  //       to: '/admin/buttons/button-groups',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Dropdowns',
  //       to: '/admin/buttons/button-dropdowns',
  //     }
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Charts',
  //   to: '/admin/charts',
  //   icon: 'cil-chart-pie'
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Notifications',
  //   route: '/notifications',
  //   icon: 'cil-bell',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Alerts',
  //       to: '/admin/notifications/alerts',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Badges',
  //       to: '/admin/notifications/badges',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Modal',
  //       to: '/admin/notifications/modals',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Toaster',
  //       to: '/admin/notifications/toaster'
  //     }
  //   ]
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Widgets',
  //   to: '/admin/widgets',
  //   icon: 'cil-calculator',
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },

  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
