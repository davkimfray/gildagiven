import React from 'react'
import {
    TheContent,
    TheSidebar,
    TheHeader
} from './index'
import {useSession} from "../components/store/Session";
import {Redirect, Switch} from "react-router-dom";

const TheLayout = () => {
    const {isLoggedIn} = useSession();

    if (!isLoggedIn) {
        return (
            <Switch>
                <Redirect from="/admin" to="/admin/login"/>
            </Switch>
        )
    } else {
        return (
            <div className="c-app c-default-layout main-bg">
                <TheSidebar className="sec-main-bg"/>
                <div className="c-wrapper">
                    <TheHeader/>
                    <div className="c-body">
                        <TheContent/>
                    </div>
                    {/*<TheFooter/>*/}
                </div>
            </div>
        )
    }

}

export default TheLayout
