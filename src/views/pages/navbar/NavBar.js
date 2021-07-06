import React, {Component} from 'react'
import './navbar.css'
import {NavLink} from 'react-router-dom';
// import { createBrowserHistory } from "history";
import AOS from "aos";

// const history = createBrowserHistory();
export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            newScrollHeight: 0
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({menu: !this.state.menu})
        // window.location.reload(false);
    }
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }
    componentDidMount() {
        AOS.init({});
        window.scrollTo(0,0);
        window.onscroll =() => {
            this.setState({newScrollHeight: Math.ceil(window.scrollY / 50) });
            // console.log(this.state.newScrollHeight);

        }

        // const scrollTop = (window).scrollTop();
        // console.log(scrollTop);
        // window.scroll(function(){
        //     if(scrollTop > 100) {
        //         // ('#.main_h').fadeOut();
        //     } else {
        //         // ('#.main_h').fadeIn();
        //     }
        //
        // });
    }

    render() {

        return (
            <>
                <nav className={this.state.newScrollHeight > 1 ? "navbar navbar-expand-lg navbar-light nav-bar-bg animate-nav-bar-bg container-fluid fixed-top row m-0 w-100" : "navbar nav-bar-bg navbar-expand-lg navbar-light container-fluid fixed-top row m-0 w-100"}>
                    <NavLink to="/" className="name-logo mx-md-0 mx-lg-4 mt-md-3 my-lg-auto ">
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" onClick={ this.toggleMenu }
                            aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className={'collapse navbar-collapse pl-3 show my-auto'} style={this.state.menu?{maxHeight:"500px"}:{}}  id="navbarNavAltMarkup">
                        <div className="navbar-nav mx-auto mx-md-5 mx-lg-auto">
                            <p className=""/>
                            <NavLink exact className="nav-link" activeClassName="active-link" to="/">Home</NavLink>
                            <NavLink className="nav-link " activeClassName="active-link" to="/about">About</NavLink>
                            <NavLink className="nav-link " activeClassName="active-link" to="/blog">Blog</NavLink>
                            <NavLink className="nav-link " activeClassName="active-link" to="/book-me">Book Me</NavLink>
                            <NavLink className="nav-link " activeClassName="active-link" to="/for-you">For you</NavLink>
                            <NavLink className="nav-link " activeClassName="active-link" to="/contacts">Contact</NavLink>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}
