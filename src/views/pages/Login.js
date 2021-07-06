import React, { Component } from "react";
import "../../style/shared.css";
import "../../style/admin/login.css";
import { FiUnlock } from 'react-icons/fi';
import { useAuth } from "../hooks/UseAuth";


export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const auth = useAuth();
        auth.signin(this.state.email, this.state.password);
            // getFirebase().auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            // .then(value => {
            //     console.log('LOGGED IN SUCCESS');
            //     this.props.history.push(ROUTES.DASHBOARD);
            // })
            // .catch(error => {
            //     console.log({error})
            // })
    }
    render() {
        const authIconStyle = { color: "#996573", fontSize: "1.5em" };

        return (
            <>
                <div className="auth-wrapper ">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r main-bg"/>
                            <span className="r s main-bg"/>
                            <span className="r s main-bg"/>
                            <span className="r main-bg"/>
                        </div>
                        <div className="card main-bg">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <FiUnlock style={authIconStyle}/>
                                </div>
                                <h3 className="mb-4 font-heading">Login</h3>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email}/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" name="password" placeholder="password" onChange={this.handleChange} value={this.state.password}/>
                                </div>

                                <button onClick={this.handleSubmit} className="btn sec-main-bg text-white shadow-2 font-banner px-4 my-4">Login</button>
                                {/*<p className="mb-2 text-muted">Forgot password? <a href="/auth/reset-password-1">Reset</a></p>*/}
                                {/*<p className="mb-0 text-muted">Don’t have an account? <a href="/auth/signup-1">Signup</a></p>*/}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    {/*<section className='add-item'>*/}
                    {/*    <form onSubmit={this.handleSubmit}>*/}
                    {/*        <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />*/}
                    {/*        <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />*/}
                    {/*        <button>Add Item</button>*/}
                    {/*    </form>*/}
                    {/*</section>*/}
                    {/*<section className='display-item'>*/}
                    {/*    <div className="wrapper">*/}
                    {/*        <ul>*/}
                    {/*            {this.state.items.map((item) => {*/}
                    {/*                return (*/}
                    {/*                    <li key={item.id}>*/}
                    {/*                        <h3>{item.title}</h3>*/}
                    {/*                        <p>brought by: {item.user}*/}
                    {/*                            <button onClick={() => this.removeItem(item.id)}>Remove Item</button>*/}
                    {/*                        </p>*/}
                    {/*                    </li>*/}
                    {/*                )*/}
                    {/*            })}*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*</section>*/}
                </div>

            </>
        );
    }
};
