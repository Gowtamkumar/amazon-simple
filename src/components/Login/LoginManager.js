import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeloginframwork = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
}


export const HandelGoogleSignIn = () => {
    const Googleprovider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(Googleprovider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const singnedIdUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUserToken()
            return singnedIdUser;

        }).catch((error) => {
            console.log(error)
            console.log(error.message)
        });
}
const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
       sessionStorage.setItem('userToken', idToken)
      }).catch(function(error) {
        // Handle error
      });
}
export const HandelFacebooksignin = () => {
    const Facebookprovider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(Facebookprovider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const singnedIdUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            return singnedIdUser;
        })
        .catch((error) => {
            console.log(error)
            console.log(error.message)

        });
}
export const HandelGithubsignin = () => {
    const Githubprovider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(Githubprovider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const singnedIdUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            return singnedIdUser;


        }).catch(error => {
            console.log(error)
            console.log(error.message)
        });
}

// signOUt heanddler
export const HeandelSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                photo: '',
                email: '',
            }
            return signedOutUser;
        })
        .catch(err => {
            console.log(err)
        })
}

// newUser && user.email && user.password option 
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            // Signed in 
            const newUserinfo = res.user;
            newUserinfo.error = '';
            newUserinfo.success = true;
            updateUserinfo(name);
            return newUserinfo;
        })
        .catch(error => {
            const newUserinfo = {}
            newUserinfo.error = error.message;
            newUserinfo.success = false;

        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            // Signed in
            const newUserinfo = res.user
            newUserinfo.error = '';
            newUserinfo.success = true;
            return newUserinfo;
        })
        .catch(error => {
            const newUserinfo = {}
            newUserinfo.error = error.message;
            newUserinfo.success = false;
            return newUserinfo;
        });
}


const updateUserinfo = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('User name Update successful.')
    }).catch(function (error) {
        console.log(error)
    });
}
