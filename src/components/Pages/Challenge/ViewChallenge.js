import './../../styles/challenge.css';
import React from 'react';

import { withRouter } from 'react-router-dom'

import WatchRewards from './Segments/WatchRewards'
import Comments from './Segments/Comments'
import DoAction from './Modals/DoAction';

import OtherChallenges from './Segments/OtherChallenges'
import ManageChallengeParticipants from './Segments/ManageChallengeParticipants'
import OtherMainSIde from './Segments/OtherMainSIde'
import ManageChallenge from './Segments/ManageChallenge';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faEye, faTimes } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import auth from '../../../services/auth';

const api = axios.create({
  baseURL: 'https://api.vici.life/api/',
  headers: {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization' : 'Bearer '+auth.getAccessToken(),
  }
})


class ViewChallenge extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            challengeID: this.props.match.params.id,
            uinfo: this.props.uinfo,
            isWatching: false,
            isWatchingText: 'Watch Challenge',
            challengeDetails: [],
            challengeActions: [],
            actionsItem: [],
            toggleDoAction: false,
            isOwner: false,
        }

        // this.getChallengeInfo();


        this.watchChallenge = this.watchChallenge.bind(this);
        this.addTracking = this.addTracking.bind(this);
        this.toggleDoAction = this.toggleDoAction.bind(this);
        this.getAction = this.getAction.bind(this)
    }

    componentDidMount(){
        console.log('props', this.props)
        let self = this;
        api.get('challenge/'+this.state.challengeID).then((response) => {
            console.log('challegne info -> ', response.data.challenges[0]);
            let challenges = response.data.challenges[0];

            let challenge_details = [];
            challenge_details['name'] = challenges.name;
            challenge_details['description'] = challenges.description;
            challenge_details['id'] = challenges.id;
            challenges.challenge_details.map((item, i) => { challenge_details[item.field] = item.data; })

            self.setState({challengeDetails: challenge_details});
            self.setState({challengeActions: challenges.actions});

            if(challenges.owner_id == auth.user().id){
                self.setState({isOwner: true});
            }else{
                self.setState({isOwner: false});
            }
            // challenge actions
        }).catch((error) => {
            console.log('error -> ', error);
        });
    }

    toggleDoAction (item) {
        this.setState({ actionsItem: item });
        if(this.state.toggleDoAction){
            this.setState({ toggleDoAction: false });
        }else{
            if(item.trackings.length == 0){
                this.setState({ toggleDoAction: true });
            }
        }
    }
    
    getAction () {
        this.setState({ toggleDoAction: false });
        this.addTracking(this.state.actionsItem)
    }

    async addTracking(item){
        const data = {
            name: item.name,
            description: item.description,
            action_id: item.id,
            details: [],
        }
        if(item.trackings.length == 0){
            await api.post('tracking', data).then(res => {
                console.log('action response---------', res.data.tracking)
                this.state.challengeActions.forEach((action, i) => {
                    if(item.id == action.id){
                        action.trackings.push(res.data.tracking)
                    }
                })
                this.setState({ challengeActions: this.state.challengeActions });
            }).catch(error => {
                console.log(error)
            })
        }
    }


    watchChallenge(){

        this.setState({ isWatching: !this.state.isWatching });

        if(this.state.isWatching){
            this.setState({ isWatchingText: 'Watch Challenge'});
        } else {
            this.setState({ isWatchingText: 'Stop Watching'});
        }



        // this.state.isWatching = !this.state.isWatching;
    }

    render () {

      const ActionList = () => {

        return (
          Object.entries(this.state.challengeActions).map(([key, value]) => (
              <li key={key}>
                <div className="dradiobutton"><input type="radio" name="" id="" /></div>
                <div className="dtextlist">{value.name}</div>
                <div onClick={() => this.toggleDoAction(value)} className="ddoaction">{ value.trackings.length > 0 ? 'Doing' : 'Do Action'}</div>
                {
                    this.state.toggleDoAction && <DoAction closeModal={this.toggleDoAction } doAction={this.getAction} />  
                }
              </li>
          ))
        )
      }

        return (
            <div className="challenges-page-inner">
                <div className="dview-left">
                    <div className="dv-left-inner">
                        <div className="dvl-main-sidebar">

                            <OtherMainSIde details={this.state.challengeDetails} />
                        </div>
                        <div className="dvl-main-sidebar">
                            <WatchRewards />
                        </div>
                        <div className="dvl-main-sidebar">
                            <div className="dvl-invite-link">
                                <h2>Invite link</h2>
                                <div className="dlinkfield">
                                    <div className="dlinkinput" >
                                        <input type="text" placeholder="https://invitelink" style={{backgroundImage: 'url(/img/link.png)'}}/>
                                    </div>
                                    <div className="dlinkbutton">
                                        <button>Copy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dview-right">
                    <div className="dview-right-inner">
                        {
                            this.state.isOwner &&
                            <div>
                                <ManageChallenge challenge={this.state.challengeDetails} />
                            </div>
                        }
                        {/* <div className="dvr-notif-bar">
                            <span className="dvr-notif-eye"><FontAwesomeIcon icon={faEye} /></span>
                            <span className="dvr-notif-text">You are watching the challenge with 230 other people.</span>
                            <span className="dvr-notif-close"><FontAwesomeIcon icon={faTimes} /></span>
                        </div> */}
                        <div className="dvr-item dvr-main-action">
                            <div className="dvr-action-inner">
                                <h2>Actions</h2>
                                <div className="dvr-item-content">
                                    <ul>
                                      { ActionList() }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <div className="dvr-item dvr-main-progress">
                            <div className="dleftpart">
                                <img src="/img/user_main.jpg" alt="" />
                            </div>
                            <div className="drightpart">
                                <div className="dchartpart">
                                    <div className="watch-pie-chart wpc-progress">
                                        <h6>
                                            <span className="dnumbs">0</span>
                                            <span className="dactions">Actions</span>
                                        </h6>
                                        <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                        <title>Layer 1</title>
                                        <circle id="circle" className="circle_animation" r="44.85699" cy="81" cx="81" style={{
                                            stroke: '#25345C',
                                            transition: 'all 0.3s',
                                            strokeWidth: '10',
                                            strokeDasharray: '282',
                                            strokeDashoffset: '282'
                                            }} fill="none"/>
                                        </g>
                                        </svg>
                                    </div>
                                </div>
                                <div className="dprogressinfo">
                                    <h3>No progess yet.</h3>
                                    <div className="dpi-join-button">Join Challenge</div>
                                </div>
                            </div>
                        </div> */}
                        <ManageChallengeParticipants />
                        
                        <div className="dvr-item dvr-main-comments no-shadow">
                            <Comments />
                        </div>
                    </div>
                </div>
                {/* <div className="dotherinfo">
                    <div className="dohterinner">
                        <h2 className="dotherheader">Other challenges</h2>
                        <div className="dotheritems">
                            <OtherChallenges />
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default withRouter(ViewChallenge)
