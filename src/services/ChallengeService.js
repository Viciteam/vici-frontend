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

            //   challenges.forEach(item=> {
            //       api.get('/userprofile/'+item.owner_id, {})
            //         .then((response) => {
            //             item.owner_name = response.data.user.name   
            //             item.onwer_picture = response.data.user.profpic_link    
            //         });
            //   })

            }
          ).catch((error) => {
              console.log('error -> ', error);
          });
          return challenges
    }

    async todaysChallenge(){
        let todays_challenges = []
        await api.get('getallchallenges').then(
            (response) => {
                let today = new Date().toISOString().split('T')[0]
                response.data.challenges.forEach(item=>{
                    if(item.created_at.split('T')[0] === today){
                        todays_challenges.push(item)
                    }
                })
            }
          ).catch((error) => {
              console.log('error -> ', error);
          });
        return todays_challenges
    }

    async getComments(id){
        try {
            const response = await api.get('getchallenge_comments/' + id);
            return response.data
        } catch (error) {
            return false
        }
    }

    async postComment(data){
        try {
            const response = await api.post('challenge_comment', data);
            return response.data
        } catch (error) {
            return false
        }
    }

}

export default new ChallengeService();