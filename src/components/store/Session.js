import { useEffect, useState } from "react";
import Store from "./Store";
import {getFirebase} from "../Firebase/firebase";

export const initialState = {
    currentUser: null,
    isLoggedIn: false
};

export function useSession() {
    const [{ currentUser, isLoggedIn }, setState] = Store.useStore();
    const [isLoading, toggleIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe =
            getFirebase().auth().onAuthStateChanged(user => {
            if (user) {
                setState({
                    currentUser: user,
                    isLoggedIn: true
                });
            } else {
                setState({
                    currentUser: null,
                    isLoggedIn: false
                });
            }
            toggleIsLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [setState]);

    return {
        isLoading,
        currentUser,
        isLoggedIn
    };
}
