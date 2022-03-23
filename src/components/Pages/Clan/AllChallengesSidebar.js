import React from 'react';
import auth from '../../../services/auth';
import axios from 'axios'
import moment from 'moment';

const api = axios.create({
    baseURL: 'https://api.vici.life/api/',
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization' : 'Bearer '+auth.getAccessToken(),
    }
})
class AllChallengesSidebar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allChallenges: [],
        }
        this.handleClickChallenge = this.handleClickChallenge.bind(this);
    }

    handleClickChallenge(item){
        window.location="/challenge/" + item.id
    }

    async componentDidMount(){
        await api.get('getallchallenges').then(
            (response) => {
              response.data.challenges.sort(function compare(a, b) {
                let dateA = new Date(a.created_at);
                let dateB = new Date(b.created_at);
                return dateB - dateA;
              });

              this.setState({allChallenges: response.data.challenges});
            }
          ).catch((error) => {
              console.log('error -> ', error);
          });
    }
    render () {
        const challenges = [
            {
                img: '/img/dummy/Rectangle2.png',
                title: 'Morning Routine',
                subtitle: 'Current: Exercise for 10 min...',
                time: '7 AM',
            },
            {
                img: '/img/dummy/Rectangle1.png',
                title: 'Healthy Spirits!',
                subtitle: 'Current: Run 10 KM',
                time: 'Jan 18',
            },
            {
                img: '/img/dummy/Rectangle3.png',
                title: 'Workout',
                subtitle: 'Current: Chest Day',
                time: 'Jan 18',
            }
        ]
        return (
            <div className="bg-white_color px-6 py-3 rounded-xl shadow-vici mt-6">
                <div className="flex justify-between border-b pb-2 border-vici_gray">
                    <div className="font-bold">All Challenges</div>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                </div>
                {
                   this.state.allChallenges.slice(0, 3).map((item, i) => (
                        <div onClick={() => this.handleClickChallenge(item)} className="flex cursor-pointer justify-between my-3" key={i}>
                            <div className="w-full flex justify-between">
                                <div className="flex">
                                    <div>
                                        <img alt="" src={item.img ? item.img : '/img/dummy/Rectangle2.png'} className="w-10 rounded-lg"></img>
                                    </div>
                                    <div className="pt-1 pl-3">
                                        <div className="font-bold">{ item.name }</div>
                                        <div className="text-xs">{item.description}</div>
                                    </div>
                                </div>
                                <div className="pt-3">
                                    <span className="text-xs">{moment(item.created_at).fromNow()}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }   
                <div className="flex justify-center">
                    <button className="font-bold text-vici_secondary">View all</button>
                </div>       
            </div>
        )
    }
}
export default AllChallengesSidebar