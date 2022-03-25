import axios from "axios";
import UrlService from './UrlService'
import CookieService from "./CookieService";

const expiresAt = 60 * 24;

class AuthService {

    async doUserLogin(data) {
        try {
            const response = await axios.post(UrlService.loginUrl(), data);
            return response.data
        } catch (error) {
            return false
        }
    }

    async doUserRegister(data){
        try {
            const response = await axios.post(UrlService.registerUrl(), data);
            return response.data
        } catch (error) {
            return false
        }
    }

    async doSocialRegister(data){
        try {
            const response = await axios.post(UrlService.registerUrl(), data).then().catch(function (error) {
                return error.response;
            });
            return response
        } catch (error) {
            console.log("social registration error -> ", error.message)
            console.log("social registration response -> ", error.response)
            return error
        }
    }

    async doUserLogout(){
        try {
            const response = await axios.post(UrlService.logoutUrl());
            return response.data
        } catch (error) {
            return false
        }
    }

    async registerUserProfile(data){
        try {
            const response = await axios.post(UrlService.userProfile(), data);
            return response.data
        } catch (error) {
            return false
        }
    }

    async getUserProfile(){
        const user = CookieService.get("user_info")
        let user_id = user.id
        try {
            const response = await axios.get(UrlService.getUserProfile(user_id));
            if(response.data.user){
                CookieService.set("user_profile", response.data.user);
                return response.data
            }else{
                return false
            }


        } catch (error) {
            return false
        }
    }

    async followUser(user) {
        try {
            const data = {
                user_id: user.id,
                friend_id: user.friend_id
            }
            const response = await axios.post(UrlService.follow(), data);
            if(response.data){
                return response.data
            }else{
                return false
            }
        } catch (error) {
            return false
        }
    }

    async getProfile(id){
        try {
            const response = await axios.get(UrlService.getUserProfile(id));
            if(response.data.user){
                return response.data.user
            }else{
                return false
            }
        } catch (error) {
            return false
        }
    }

    async uploadProfPic(data){
        try {
            const formData = new FormData();
            formData.append('image', data);
            const response = await axios.post(UrlService.uploadProfPic(), formData);
            return response.data
        } catch (error) {
            return false
        }
    }

    handleLoginSuccess(response) {
        let date = new Date();
        date.setTime(date.getTime() + expiresAt * 60 * 1000);
        const options = { path: "/", expires: date };
        CookieService.set("access_token", response.token, options);
        CookieService.set("user_info", response.user, options);
        const userProfile = this.getUserProfile(response.user.id);
        // console.log('user id ->', response.user.id);
        return userProfile;
    }

}

export default new AuthService();
