import Store from './Store'
import {getFirebase} from "../Firebase/firebase";

export function UseAuth() {
    const [, setState] = Store.useStore();

    // const getUserFromDB = async userID => {
    //     const db = await getFirebase().database;
    //     return db
    //         .collection("users")
    //         .doc(userID)
    //         .get()
    //         .then(user => {
    //             return user.data();
    //         });
    // }

    const saveUserToDB = async (user, name) => {
        const db = await getFirebase().database;
        return db
            .collection("users")
            .doc(user.uid.toString())
            .set({
                id: user.uid.toString(),
                name,
                email: user.email
            })
            .then(() => {
                setState({
                    currentUser: {
                        id: user.uid.toString(),
                        name,
                        email: user.email
                    },
                    isLoggedIn: true
                });
            });
    };

    const signup = (email, password, username) => {
        return getFirebase().auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                // We want to save the user to our own collection with custom attributes for us
                saveUserToDB(response.user, username);
                return response.user
            })
    }

    const signin = (email, password) => {
        return getFirebase().auth()
            .signInWithEmailAndPassword(email, password)
            .then(async response => {
                // const user = await getUserFromDB(response.user.uid);
                setState({
                    // currentUser: user,   //user from DB
                    currentUser: response.user,  //user from Authentication
                    isLoggedIn: true
                });
                console.log('done')
                return response.user;
            })
    }

    const signout = () => {
        return getFirebase().auth().signOut().then(() => {
            setState({
                currentUser: null,
                isLoggedIn: false
            })
        })
    }

    return {
        signup,
        signin,
        signout
    }

}
