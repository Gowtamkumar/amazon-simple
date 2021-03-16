import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import './Login.css'
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
function Login() {

    const [newUser, setnewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        email: '',
        password: '',
        name: '',
        error: '',
        success: ''
    })

    // use context
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext)
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };



    const HeandelChange = (event) => {
        let idfielddate = true;
        if (event.target.name === 'email') {
            const emailvalitation = /\S+@\S+\.\S+/.test(event.target.value)
            idfielddate = event.target.value && emailvalitation;

        }
        if (event.target.name === 'password') {
            const ispassword = event.target.value.length > 6;
            const emailvalitation = /\d{1}/.test(event.target.value)
            idfielddate = ispassword && emailvalitation;

        }
        if (idfielddate) {
            const newUserinfo = { ...user }
            newUserinfo[event.target.name] = event.target.value;
            setUser(newUserinfo);
        }
    }

    const HandelSubmit = (event) => {
        console.log(user, user.password);
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in 
                    const newUserinfo = { ...user }
                    newUserinfo.error = '';
                    newUserinfo.success = true;
                    setUser(newUserinfo);
                    updateUserinfo(user.name);
                    console.log('user info ', res.user)
                })
                .catch(error => {
                    const newUserinfo = { ...user }
                    newUserinfo.error = error.message;
                    newUserinfo.success = false;
                    setUser(newUserinfo)
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in
                    const newUserinfo = { ...user }
                    newUserinfo.error = '';
                    newUserinfo.success = true;
                    setUser(newUserinfo)
                    setLoggedInUser(newUserinfo);
                    history.replace(from);
                    console.log("DSAFADS", user)
                })
                .catch((error) => {
                    const newUserinfo = { ...user }
                    newUserinfo.error = error.message;
                    newUserinfo.success = false;
                    setUser(newUserinfo)
                });
        }
        event.preventDefault();

    }



    const updateUserinfo = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('User name Update successful.')
        }).catch(function (error) {
            console.log(error)
        });
    }

    // signOUt heanddler
    const HeandelSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    photo: '',
                    email: '',
                }
                setUser(signedOutUser);
            })
            .catch(err => {
                console.log(err)
            })
    }

    var Googleprovider = new firebase.auth.GoogleAuthProvider();
    const HandelGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(Googleprovider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const singnedIdUser = {
                  isSignedIn: true,
                  name: displayName,
                  email: email,
                  photo: photoURL
                }
                setUser(singnedIdUser);
                console.log(displayName, email, photoURL)
            }).catch((error) => {
                
                console.log(error)
                console.log(error.message)

              
            });
    }
    var Facebookprovider = new firebase.auth.FacebookAuthProvider();
    const HandelFacebooksignin = () => {
        firebase
            .auth()
            .signInWithPopup(Facebookprovider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const singnedIdUser = {
                  isSignedIn: true,
                  name: displayName,
                  email: email,
                  photo: photoURL
                }
                setUser(singnedIdUser);
                console.log(displayName, email, photoURL)

            })
            .catch((error) => {
                console.log(error)
                console.log(error.message)

            });

    }
    var Githubprovider = new firebase.auth.GithubAuthProvider();
    const HandelGithubsignin = () => {
        firebase
            .auth()
            .signInWithPopup(Githubprovider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const singnedIdUser = {
                  isSignedIn: true,
                  name: displayName,
                  email: email,
                  photo: photoURL
                }
                setUser(singnedIdUser);
                console.log(displayName, email, photoURL)

            }).catch(error => {
                console.log(error)
                console.log(error.message)
            });
    }

    return (
        <div className="App">
            <div className="main-container">
                <form onSubmit={HandelSubmit}>
                    <input type="checkbox" name="newUser" id="" onChange={() => setnewUser(!newUser)} />
                    <label htmlFor="newUser">New Sign Up</label><br />
                    {newUser && <input type="text" name="name" onBlur={HeandelChange} placeholder="Your name" />}<br />
                    <input type="email" name="email" onBlur={HeandelChange} placeholder="Your Email" required /><br />
                    <input type="password" name="password" onBlur={HeandelChange} placeholder="Your Password" required /><br />
                    <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
                    
                </form>
                <button onClick={HeandelSignOut}>Sign Out</button>
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>New User {newUser ? 'Create' : 'Logged in'} successfully</p>}
                
                <p>Display Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <p>Password: {user.password}</p>
                
                <button onClick={HandelGoogleSignIn}>Sign in By Google</button><br />
                <button onClick={HandelFacebooksignin}>Sign in By facebook</button><br />
                <button onClick={HandelGithubsignin}>Sign in By Github</button><br />
                

            </div>
        </div>
    );
}

export default Login;
