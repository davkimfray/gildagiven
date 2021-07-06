import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer } from '@coreui/react'

import Dashboard from "../views/admin/dashboard/Dashboard";
import Posts from "../views/admin/posts/Posts";
import Home from "../views/admin/pages/Home";
import Other from "../views/admin/pages/Other";
import CreatePost from "../views/admin/posts/CreatPost";
import Books from "../views/admin/books/Books";
import AddBook from "../views/admin/books/AddBook";
import AddQuotes from "../views/admin/quotes/AddQuotes";
import Quotes from "../views/admin/quotes/Quotes";
import About from "../views/admin/pages/About";

const loading = (
    <section className="auth-wrapper bg-main">
        {/*<div className="auth-content">*/}
        {/*    <div className="auth-bg">*/}
        {/*        <span className="r main-bg"/>*/}
        {/*        <span className="r s main-bg"/>*/}
        {/*        <span className="r s main-bg"/>*/}
        {/*        <span className="r main-bg"/>*/}
        {/*    </div>*/}
            <div className="d-flex justify-content-center align-items-center font-banner pt-3 text-center position-absolute w-100 h-100">
                {/*<h1>Loading</h1>*/}
                <div className="lds-ellipsis">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
        {/*</div>*/}
    </section>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {/*{routes.map((route, idx) => {*/}
            {/*  return route.component && (*/}
            {/*    <Route*/}
            {/*      key={idx}*/}
            {/*      path={route.path}*/}
            {/*      exact={route.exact}*/}
            {/*      name={route.name}*/}
            {/*      render={props => (*/}
            {/*        <CFade>*/}
            {/*          <route.component {...props} />*/}
            {/*        </CFade>*/}
            {/*      )} />*/}
            {/*  )*/}
            {/*})}*/}
            {/*<Redirect from="/admin" to="/admin/dashboard" />*/}
            {/*<CFade>*/}
              <Route path="/admin" exact name="Dashboard" render={props => <Dashboard {...props}/>} />
              <Route path="/admin/dashboard" name="Dashboard" render={props => <Dashboard {...props}/>} />
              <Route path="/admin/pages" exact name="Pages" render={props => <Home {...props}/>} />
              <Route path="/admin/pages/home/:section" name="Home" render={props => <Home {...props}/>} />
              <Route path="/admin/pages/:page" name="Page" render={props => <Other {...props}/>} />
              <Route path="/admin/pages/about" name="About" render={props => <About {...props}/>} />
              <Route path="/admin/posts" exact name="Posts" render={props => <Posts {...props}/>} />
              <Route path="/admin/posts/new-post" name="Creat Post" render={props => <CreatePost {...props}/>} />
              <Route path="/admin/posts/edit/:postKey" name="Edit Post" render={props => <CreatePost {...props}/>} />
              <Route path="/admin/books" exact name="Books" render={props => <Books {...props}/>} />
              <Route path="/admin/books/add-book" name="Add Book" render={props => <AddBook {...props}/>} />
              <Route path="/admin/books/edit/:bookKey" name="Edit Book" render={props => <AddBook {...props}/>} />
              <Route path="/admin/quotes" exact name="Quotes" render={props => <Quotes {...props}/>} />
              <Route path="/admin/quotes/add-quote" name="Add Quote" render={props => <AddQuotes {...props}/>} />
              <Route path="/admin/quotes/edit/:quoteKey" name="Edit Quote" render={props => <AddQuotes {...props}/>} />
              <Redirect from="/admin" to="/admin/dashboard" />

              {/*<Dashboard/>*/}
            {/*</CFade>*/}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
