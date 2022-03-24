let apiDomain = 'https://api.vici.life/'
// let domain = 'https://vici.life/'
// let mparticleDomain = 'https://s2s.mparticle.com/'
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

    static uploadProfPic() {
        return apiDomain + "api/uploadFile";
    }

    static follow() {
        return apiDomain + "api/friend/follow";
    }
}

export default UrlService
