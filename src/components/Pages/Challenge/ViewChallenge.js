import './../../styles/challenge.css';
import React from 'react';

import { withRouter } from 'react-router-dom'

import WatchRewards from './Segments/WatchRewards'
import Comments from './Segments/Comments'

import OtherChallenges from './Segments/OtherChallenges'
import OtherMainSIde from './Segments/OtherMainSIde'
import ManageChallenge from './Segments/ManageChallenge';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faEye, faTimes } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.vici.life/api/',
  headers: {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization' : 'Bearer 1|74Q5WHcDLDhCb5M9NtabCridB2ZN68CGFaS5r2yN'
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
            challengeActions: []
        }

        // this.getChallengeInfo();


        this.watchChallenge = this.watchChallenge.bind(this);
    }

    componentDidMount(){
      api.get('challenge/'+this.state.challengeID).then(
        (response) => {
          console.log('response -> ', response.data.challenges);
          let challenges = response.data.challenges[0];

          let challenge_details = [];
          challenge_details['name'] = challenges.name;
          challenge_details['description'] = challenges.description;
          this.setState({challengeDetails: challenge_details});

          // set actioms
          // let actions = [];
          // challenges.actions.map((item, index) => {
          //   let info = [];
          //
          //   // conert trackings
          //   info.push(item);
          //   console.log('info ->', info);
          //   actions.push(info);
          // })
          // console.log('actions ->', actions);
          this.setState({challengeActions: challenges.actions});

          // challenge actions
        }
      ).catch((error) => {
        console.log('error -> ', error);
      });
    }

    // getChallengeInfo = async () => {
    //   console.log('get challenge');
    //   let self = this;
    //
    //   // get challenge
    //   api.get('challenge/'+this.state.challengeID).then(
    //     (response) => {
    //       console.log('response -> ', response.data.challenges);
    //       this.setState({challengeDetails: response.data.challenges});
    //
    //     }
    //   ).catch((error) => {
    //     console.log('error -> ', error);
    //   });
    // }

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
                <div className="ddoaction">Do Action</div>
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
                        <div>
                           <ManageChallenge />
                        </div>
                        <div className="dvr-notif-bar">
                            <span className="dvr-notif-eye"><FontAwesomeIcon icon={faEye} /></span>
                            <span className="dvr-notif-text">You are watching the challenge with 230 other people.</span>
                            <span className="dvr-notif-close"><FontAwesomeIcon icon={faTimes} /></span>
                        </div>
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
                        <div className="dvr-item dvr-main-progress">
                            <div className="dleftpart">
                                <img src="/img/user_main.jpg" alt="" />
                            </div>
                            <div className="drightpart">
                                <div className="dchartpart">
                                    {/* <div className="donut-chart-block">
                                        <div className="donut-chart" style={{backgroundColor: this.state.selectedColor+"70"}}>
                                            <div id="part1" className="portion-block"><div className="circle" style={{backgroundColor: this.state.selectedColor}}></div></div>
                                            <p className="center"><span className="dnum">0</span><br /><span className="dsubtext">Actions</span></p>
                                        </div>
                                    </div> */}
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
                        </div>
                        <div className="dvr-item dvr-main-participants-progress">
                            <div className="dvr-participants-inner">
                                <h2><span className="dheadertitle">Participant Progress</span><span className="dviewall">View All ></span></h2>
                                <div className="dvr-item-content">
                                    <div className="dvr-participants-list">
                                        <div className="dvr-participants-header">
                                            <div className="dvr-title-participants">Participant</div>
                                            <div className="dvr-title-clan">Clan</div>
                                            <div className="dvr-title-progress">Progress</div>
                                        </div>
                                        <div className="dvr-participant-items">
                                            <div className="dvr-participant dvr-done-item">
                                                <div className="dvr-item-participant">
                                                    <div className="dvr-participant-photo">
                                                        <img src="/img/prof_icon.png" alt="" />
                                                    </div>
                                                    <div className="dvr-participant-name">Lorem Ipsum</div>
                                                </div>
                                                <div className="dvr-item-clan">Sample Clan</div>
                                                <div className="dvr-item-progress">
                                                    <div className="dprogressbar">
                                                        <div className="dprogressbase">
                                                            <div className="dprogressvalues" style={{width: 100 + '%'}}>&nbsp;</div>
                                                        </div>
                                                    </div>
                                                    <div className="dvectorpagrt"><FontAwesomeIcon icon={faCheckCircle} /></div>
                                                </div>
                                            </div>
                                            <div className="dvr-participant dvr-failed-item">
                                                <div className="dvr-item-participant">
                                                    <div className="dvr-participant-photo">
                                                        <img src="/img/prof_icon.png" alt="" />
                                                    </div>
                                                    <div className="dvr-participant-name">Lorem Ipsum</div>
                                                </div>
                                                <div className="dvr-item-clan">Sample Clan</div>
                                                <div className="dvr-item-progress">
                                                    <div className="dprogressbar">
                                                        <div className="dprogressbase">
                                                            <div className="dprogressvalues" style={{width: 75 + '%'}}>&nbsp;</div>
                                                        </div>
                                                    </div>
                                                    <div className="dvectorpagrt">failed</div>
                                                </div>
                                            </div>
                                            <div className="dvr-participant">
                                                <div className="dvr-item-participant">
                                                    <div className="dvr-participant-photo">
                                                        <img src="/img/prof_icon.png" alt="" />
                                                    </div>
                                                    <div className="dvr-participant-name">Lorem Ipsum</div>
                                                </div>
                                                <div className="dvr-item-clan">Sample Clan</div>
                                                <div className="dvr-item-progress">
                                                    <div className="dprogressbar">
                                                        <div className="dprogressbase">
                                                            <div className="dprogressvalues" style={{width: 75 + '%'}}>&nbsp;</div>
                                                        </div>
                                                    </div>
                                                    <div className="dvectorpagrt">2/5</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dvr-item dvr-main-comments no-shadow">
                            <Comments />
                        </div>
                    </div>
                </div>
                <div className="dotherinfo">
                    <div className="dohterinner">
                        <h2 className="dotherheader">Other challenges</h2>
                        <div className="dotheritems">
                            <OtherChallenges />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ViewChallenge)
