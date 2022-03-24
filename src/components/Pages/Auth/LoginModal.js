import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import AuthService from '../../../services/AuthService';
import CookieService from '../../../services/CookieService';


function LoginModal ({ closeModal }) {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [password_confirmation, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(true);
    const [socialValid, setSocialValid] = useState(true);
    let [register, setRegister] = useState(false);
    const [fbImage] = useState('');
 

    async function handleLogin(){
        setLoading(true)
        if(register){
            const postData = { name, email, password, password_confirmation }
            const response = await AuthService.doUserRegister(postData)
            console.log('response register-', response)
            if(response){
                AuthService.handleLoginSuccess(response)
                setValid(true)
                setLoading(false)
                closeModal()
                window.location.href = "/";
            }else{
                setValid(false)
                setLoading(false)
                console.log('The given data was invalid')
            }
        }else{
            const postData = { email, password }
            const response = await AuthService.doUserLogin(postData)
            // console.log('response-', response)
            if(response){
                const loginSuccessResponse = await AuthService.handleLoginSuccess(response);
                // console.log('login succss -> ', loginSuccessResponse);
                CookieService.set("user_profile", loginSuccessResponse.user);
                setValid(true)
                setLoading(false)
                closeModal()
                window.location.href = "/";
            }else{
                setValid(false)
                setLoading(false)
                console.log('Invalid email or password')
            }
        }
                
    }

    function handleKeyPress(event) {
        if(event.key === 'Enter' && !register){
            handleLogin()
        }
    }

    async function LoginWithFacebook(response) {
       setLoading(true)
        console.log('fb response ->', response);
        
        let name = response.name;
        let email = response.email;
        let fb_user_id = response.userID;
        let password = response.userID;
        let password_confirmation = response.userID;

        // change image sie
        let picture = response.picture.data.url;
        

        // register user
        const postData = { name, email, password, password_confirmation }
        console.log('user login -> ', postData);

        const registerResponse = await AuthService.doSocialRegister(postData)
        console.log('response social register one ->', registerResponse)

        let isRegistrationSuccessful = '';
        if(registerResponse.status === 201){
            isRegistrationSuccessful = 'go_login';
        } else if(registerResponse.data.errors.email[0] === 'The email has already been taken.'){
            isRegistrationSuccessful = 'user_exist'
        }   

        // if(registerResponse.data.errors.email[0] == 'The email has already been taken.'){
        if(isRegistrationSuccessful === 'user_exist'){
            console.log('do user login in normal way');
            const loginAccount = { email, password }
            const socialLoginResponse = await AuthService.doUserLogin(loginAccount)
            console.log('response-', socialLoginResponse)
            if(socialLoginResponse){
                const loginSuccessResponse = await AuthService.handleLoginSuccess(socialLoginResponse);
                
                if(loginSuccessResponse.user === undefined || loginSuccessResponse.user === null){
                    console.log('build a new user info');

                    let new_user_information = {
                        "id":1,
                        "fb_user_id": fb_user_id,
                        "user_id":socialLoginResponse.user.id,
                        "profpic_link": picture,
                        "bgcolor":"#867996",
                        "txtcolor":"black",
                        "username": name,
                        "name": name,
                        "pref_pronoun":"",
                        "bday":"",
                        "bio":"",
                        "mission":"",
                        "country":"",
                        "created_at":"",
                        "updated_at":"",
                        "profile_banner_link":""
                    };

                    console.log('new user info ->', new_user_information);
                    CookieService.set("user_profile", new_user_information);
                }
                // CookieService.set("user_profile", loginSuccessResponse.user);
                setValid(true)
                setLoading(false)
                closeModal()
                window.location.href = "/";
            }else{
                setSocialValid(false)
                setLoading(false)
                console.log('Invalid email or password')
            }
        }
        
        if(isRegistrationSuccessful === 'go_login'){
            const loginAccount = { email, password }
            const socialLoginResponse = await AuthService.doUserLogin(loginAccount)
            console.log('response-', socialLoginResponse)
            const loginSuccessResponse = await AuthService.handleLoginSuccess(socialLoginResponse);

            if(loginSuccessResponse.user === undefined || loginSuccessResponse.user === null){
                console.log('build a new user info');

                let new_user_information = {
                    "id":1,
                    "fb_user_id": fb_user_id,
                    "user_id": "",
                    "profpic_link": picture,
                    "bgcolor":"#867996",
                    "txtcolor":"black",
                    "username": name,
                    "name": name,
                    "pref_pronoun":"",
                    "bday":"",
                    "bio":"",
                    "mission":"",
                    "country":"",
                    "created_at":"",
                    "updated_at":"",
                    "profile_banner_link":""
                };

                console.log('new user info ->', new_user_information);
                CookieService.set("user_profile", new_user_information);
            }
            // CookieService.set("user_profile", loginSuccessResponse.user);
            setValid(true)
            setLoading(false)
            closeModal()
            window.location.href = "/";
            
        }
        

    }

    async function LoginWithGoogle(response) {
        console.log("show login with google ->", response);

        let name = response.profileObj.name;
        let email = response.profileObj.email;
        let google_user_id = response.profileObj.googleId;
        let password = response.profileObj.googleId;
        let password_confirmation = response.profileObj.googleId;
        let picture = response.profileObj.imageUrl.replace("s96-c", "s250-c");
        
        const postData = { name, email, password, password_confirmation }
        console.log('user login -> ', postData);

        const registerResponse = await AuthService.doSocialRegister(postData)
        console.log('response social register one ->', registerResponse)

         let isRegistrationSuccessful = '';
        if(registerResponse.status === 201){
            isRegistrationSuccessful = 'go_login';
        } else if(registerResponse.data.errors.email[0] === 'The email has already been taken.'){
            isRegistrationSuccessful = 'user_exist'
        }   

        // console.log(isRegistrationSuccessful);
        if(isRegistrationSuccessful === 'user_exist'){
            console.log('do user login in normal way');
            const loginAccount = { email, password }
            const socialLoginResponse = await AuthService.doUserLogin(loginAccount)
            console.log('response-', socialLoginResponse)
            if(socialLoginResponse){
                const loginSuccessResponse = await AuthService.handleLoginSuccess(socialLoginResponse);
                
                if(loginSuccessResponse.user === undefined || loginSuccessResponse.user === null){
                    console.log('build a new user info');

                    let new_user_information = {
                        "id":1,
                        "google_user_id": google_user_id,
                        "user_id":socialLoginResponse.user.id,
                        "profpic_link": picture,
                        "bgcolor":"#867996",
                        "txtcolor":"black",
                        "username": name,
                        "name": name,
                        "pref_pronoun":"",
                        "bday":"",
                        "bio":"",
                        "mission":"",
                        "country":"",
                        "created_at":"",
                        "updated_at":"",
                        "profile_banner_link":""
                    };

                    console.log('new user info ->', new_user_information);
                    CookieService.set("user_profile", new_user_information);
                }
                // CookieService.set("user_profile", loginSuccessResponse.user);
                setValid(true)
                setLoading(false)
                closeModal()
                window.location.href = "/";
            }else{
                setSocialValid(false)
                setLoading(false)
                console.log('Invalid email or password')
            }
        }
        
        if(isRegistrationSuccessful === 'go_login'){
            const loginAccount = { email, password }
            const socialLoginResponse = await AuthService.doUserLogin(loginAccount)
            console.log('response-', socialLoginResponse)
            const loginSuccessResponse = await AuthService.handleLoginSuccess(socialLoginResponse);

            if(loginSuccessResponse.user === undefined || loginSuccessResponse.user === null){
                console.log('build a new user info');

                let new_user_information = {
                    "id":1,
                    "google_user_id": google_user_id,
                    "user_id": "",
                    "profpic_link": picture,
                    "bgcolor":"#867996",
                    "txtcolor":"black",
                    "username": name,
                    "name": name,
                    "pref_pronoun":"",
                    "bday":"",
                    "bio":"",
                    "mission":"",
                    "country":"",
                    "created_at":"",
                    "updated_at":"",
                    "profile_banner_link":""
                };

                console.log('new user info ->', new_user_information);
                CookieService.set("user_profile", new_user_information);
            }
            // CookieService.set("user_profile", loginSuccessResponse.user);
            setValid(true)
            setLoading(false)
            closeModal()
            window.location.href = "/";
            
        }


    }



    let showFacebookLoginError = () => {
        if(!socialValid){
            return (
                <div className="fb-login-error">User has already been regestered to the site.<br />please login using regular login </div>
            );
        }
    }
    
    return (
        <div className="bg-vici_black bg-opacity-50 fixed inset-0 min-h-screen flex justify-center  items-center z-20">
            <div className="bg-white_color xl:w-1/3 lg:w-1/2 md:w-8/12 rounded-lg p-6">
                <div className="flex justify-end pb-3">
                    <div>
                        <div onClick={() => {closeModal();}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7266 16.5L16.7266 20.5L10.7266 14.4983L4.72656 20.5L0.726562 16.5L6.72656 10.5L0.726562 4.5L4.72656 0.5L10.7266 6.5L16.7266 0.5L20.7266 4.5L14.7249 10.5L20.7266 16.5Z" fill="#EB5757"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <img src={fbImage} alt="" />
                <div className="px-20 pb-20 pt-15">
                    <div className="text-center font-bold text-2xl">
                        { register ? 'Create a Vici account' : 'Please log in to continue'}
                    </div>
                    {
                        register &&
                        <div className="mt-6 w-full">
                            <input className="w-full px-5 py-2 rounded-full border border-bottom_gray" type="text" value={name} onChange={event => setName(name = event.target.value)} placeholder="Name"/>
                        </div>
                    }
                    <div className="mt-3 w-full">
                        <input className="w-full px-5 py-2 rounded-full border border-bottom_gray" type="email" value={email} onChange={event => setEmail(email = event.target.value)} placeholder="Email"/>
                    </div>
                    <div className="mt-3 w-full">
                        <input onKeyPress={handleKeyPress} className="w-full px-5 py-2 rounded-full border border-bottom_gray" type="password" value={password} onChange={event => setPassword(password = event.target.value)} placeholder="Password"/>
                    </div>
                    {
                        register &&
                        <div className="mt-3 w-full">
                            <input className="w-full px-5 py-2 rounded-full border border-bottom_gray" type="password" value={password_confirmation} onChange={event => setConfirmPassword(password_confirmation = event.target.value)} placeholder="Confirm password"/>
                        </div>
                    }
                    <div className="mt-6 relative">
                        <hr />
                        <div className="absolute top-0 px-3 -mt-2 bg-white_color left-28 text-xs">OR</div>
                    </div>
                    <div className="">
                        <div className="mt-6">
                            <GoogleLogin
                                clientId="210346353529-aiqqk6kajcfu5kosjg4o7i8rj8gp6b5m.apps.googleusercontent.com"
                                buttonText="Continue with Google"
                                onSuccess={LoginWithGoogle}
                                // onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                className="google-style"
                            />
                        </div>
                        <div className="mt-3">
                            <FacebookLogin
                                appId="1397019250754280"
                                autoLoad={false}
                                returnScopes={true}
                                fields="name,email,picture"
                                scope="public_profile,email"
                                callback={LoginWithFacebook}
                                cssClass="google-style py-3"
                                textButton="Continue with Facebook"
                                icon="fa-facebook"
                            />
                        </div>
                        {showFacebookLoginError()}
                    </div>
                    <div className="mt-3">
                        <div onClick={handleLogin} className="bg-primary_color text-white_color py-3 text-center cursor-pointer rounded-full">{ loading ? 'Logging in...' : register ? 'Get started' : 'Log in'}</div>
                    </div>
                    <div className="my-5">
                        <div className="text-medium_gray text-center cursor-pointer">Forgot password?</div>
                    </div>
                    <div>
                        <div className="text-medium_gray cursor-pointer text-center">{register ? 'Already have an account?' : 'Dont have an account?'} 
                            <span onClick={() => setRegister(register = !register)} className="text-primary_color cursor-pointer pl-3 font-bold">{register ? 'Log in' : 'Sign up'}</span>
                        </div>
                    </div>
                </div>
                {
                    !valid &&
                    <div className="text-center">{register ? 'The given data was invalid!' : 'There\'s no account associated with this email address.'}
                        {
                            !register &&
                            <span onClick={() => setRegister(register = !register)} className="cursor-pointer font-bold text-primary_color"> Create an account</span>
                        }
                    </div>
                }
            </div>
            
        </div>
    )
}

export default LoginModal