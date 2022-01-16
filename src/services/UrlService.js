let apiDomain = 'https://api.vici.life/'
let domain = 'https://vici.life/'
class UrlService {

    static loginUrl() {
        return apiDomain + "api/login";
    }
    static registerUrl() {
        return apiDomain + "api/register";
    }
    static logoutUrl() {
        return apiDomain + "api/logout";
    }

    static userProfile() {
        return apiDomain + "api/userprofile";
    }

    static getUserProfile(id) {
        return apiDomain + `api/userprofile/${id}`;
    }

    /* static uploadProfPic() {
        return domain + "/profilepics";
    } */
}

export default UrlService