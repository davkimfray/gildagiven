import React, { useState, useEffect, useContext, createContext } from "react";
import {getFirebase} from "../Firebase/firebase";

// as firebase from "firebase/app";
// import "firebase/auth";
// // Add your Firebase credentials
// firebase.initializeApp({
//     apiKey: "",
//     authDomain: "",
//     projectId: "",
//     appID: "",
// });
const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);
    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password) => {
        console.log(email)
        // return getFirebase()
        //     .auth()
        //     .signInWithEmailAndPassword(email, password)
        //     .then((response) => {
        //         setUser(response.user);
        //         return response.user;
        //     });
    };
    const signup = (email, password) => {
        return getFirebase()
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                return response.user;
            });
    };
    const signout = () => {
        return getFirebase()
            .auth()
            .signOut()
            .then(() => {
                setUser(false);
            });
    };
    const sendPasswordResetEmail = (email) => {
        return getFirebase()
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                return true;
            });
    };
    const confirmPasswordReset = (code, password) => {
        return getFirebase()
            .auth()
            .confirmPasswordReset(code, password)
            .then(() => {
                return true;
            });
    };
    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const unsubscribe = getFirebase().auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    // Return the user object and auth methods
    return {
        user,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}
