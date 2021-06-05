import React  from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './scss/style.scss';
import './scss/shared.css';
import './views/pages/login/login.css';
import {useSession} from "./components/store/Session";
// import {useSession} from "./components/store/Session";

const loading = (
    <section className="auth-wrapper ">
        <div className="auth-content">
            <div className="auth-bg">
                <span className="r main-bg"/>
                <span className="r s main-bg"/>
                <span className="r s main-bg"/>
                <span className="r main-bg"/>
            </div>
            <div className="d-flex justify-content-center align-items-center font-banner pt-3 text-center position-absolute w-100 h-100">
                <h1>Loading</h1>
                <div className="lds-ellipsis">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
        </div>
    </section>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Landing = React.lazy(() => import('./views/pages/landing/Landing'));
const About = React.lazy(() => import('./views/pages/about/AboutUS'));
const BookMe = React.lazy(() => import('./views/pages/book-me/BookMe'));
const Blog = React.lazy(() => import('./views/pages/blog/Blog'));
const BlogPost = React.lazy(() => import('./views/pages/blog/ViewPost'));
const ForYou = React.lazy(() => import('./views/pages/for-you/ForYou'));
const Contacts = React.lazy(() => import('./views/pages/contacts/Contacts'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

export default function App() {
  const { isLoading} = useSession();
    if (isLoading) {
      return loading
    }
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/" name="Landing Page" render={props => <Landing {...props}/>} />
              <Route exact path="/about" name="About Page" render={props => <About {...props}/>} />
              <Route exact path="/blog" name="Blog Page" render={props => <Blog {...props}/>} />
              <Route path="/blog/post/:postKey" name="View Post" render={props => <BlogPost {...props}/>} />
              <Route exact path="/login" name="Blog Page" render={props => <Login {...props}/>} />
              <Route exact path="/book-me" name="Book Me Page" render={props => <BookMe {...props}/>} />
              <Route exact path="/for-you" name="For You Page" render={props => <ForYou {...props}/>} />
              <Route exact path="/contacts" name="Contacts Page" render={props => <Contacts {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                <Route exact path="/admin/login" name="Login Page" render={props => <Login {...props}/> } />
              <Route path="/admin" name="Admin" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
}
