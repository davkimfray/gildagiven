import React from 'react';
// import {exact} from "prop-types";

const Dashboard = React.lazy(() => import('./views/admin/dashboard/Dashboard'));

const Pages = React.lazy(() => import('./views/admin/pages/Pages'));
const HomePage = React.lazy(() => import('./views/admin/pages/Home'));
const Posts = React.lazy(() => import('./views/admin/posts/Posts'));
const CreatPost = React.lazy(() => import('./views/admin/posts/CreatPost'));
const Books = React.lazy(() => import('./views/admin/books/Books'));
const AddBook = React.lazy(() => import('./views/admin/books/AddBook'));
const Quotes = React.lazy(() => import('./views/admin/quotes/Quotes'));
const AddQuotes = React.lazy(() => import('./views/admin/quotes/AddQuotes'));
// const ViewPost = React.lazy(() => import('./views/pages/blog/ViewPost'));


const routes = [
  // { path: '/blog/post/:postKey', exact: true, name: 'View Post', component: ViewPost },

  { path: '/admin/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin/pages', name: 'Pages', component: HomePage, exact: true},
  { path: '/admin/pages/home', name: 'Home', component: HomePage },
  { path: '/admin/posts', name: 'Posts', component: Posts, exact: true},
  { path: '/admin/posts/new-post', name: 'Creat Post', component: CreatPost },
  { path: '/admin/posts/edit/:postKey', name: 'Edit Post', component: CreatPost },
  { path: '/admin/books', name: 'Books', component: Books, exact: true},
  { path: '/admin/books/add-book', name: 'Add Book', component: AddBook },
  { path: '/admin/books/edit/:bookKey', name: 'Edit Book', component: AddBook },
  { path: '/admin/quotes', name: 'Quotes', component: Quotes, exact: true},
  { path: '/admin/quotes/add-quote', name: 'Add Quotes', component: AddQuotes },
  { path: '/admin/quotes/edit/:quoteKey', name: 'Edit Quotes', component: AddQuotes },
];

export default routes;
