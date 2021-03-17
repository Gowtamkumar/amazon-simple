
import './Login.css'
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, HandelFacebooksignin, HandelGithubsignin, HandelGoogleSignIn, HeandelSignOut, initializeloginframwork, signInWithEmailAndPassword } from './LoginManager';

initializeloginframwork()

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

        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                })
        }
        event.preventDefault();
    }

    const googleSignIn = () => {
        HandelGoogleSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }
    const fbsignIn = () => {
        HandelFacebooksignin()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }
    const githubSignIn = () => {
        HandelGithubsignin()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }


    const signOut = () => {
        HeandelSignOut()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
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
                <button onClick={signOut}>Sign Out</button>
                {/* <p style={{ color: 'red' }}>{user.error}</p> */}
                {user.success && <p style={{ color: 'green' }}>New User {newUser ? 'Create' : 'Logged in'} successfully</p>}

                <p>Display Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <p>Password: {user.password}</p>

                <button onClick={googleSignIn}>Sign in By Google</button><br />
                <button onClick={fbsignIn}>Sign in By facebook</button><br />
                <button onClick={githubSignIn}>Sign in By Github</button><br />


            </div>
        </div>
    );
}

export default Login;
