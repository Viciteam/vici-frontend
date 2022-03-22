import axios from "axios";
import auth from "./auth";

const api = axios.create({
    baseURL: 'https://api.vici.life/api/',
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization' : 'Bearer '+auth.getAccessToken(),
    }
})

class ChallengeService {
    
    async allChallenges() {
        let challenges = []
        await api.get('getallchallenges').then(
            (response) => {
              response.data.challenges.sort(function compare(a, b) {
                let dateA = new Date(a.created_at);
                let dateB = new Date(b.created_at);
                return dateB - dateA;
              });
              challenges = response.data.challenges
            }
          ).catch((error) => {
              console.log('error -> ', error);
          });
          return challenges
    }
}

export default new ChallengeService();