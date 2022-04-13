import './../../styles/challenge.css';
import React from 'react';
import ReactModal from 'react-modal';

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
import { act } from 'react-dom/test-utils';

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
            openDoAction: false,
            openExecuteAction: false,
            openQuitAction: false,
            selectedAction: [],
            selectedExecution: [],
            isActionContent: '',
            verificationLink: ''
        }

        this.toggleOpenAction = this.toggleOpenAction.bind(this)
        this.closeAction = this.closeAction.bind(this)
        this.userActionStatus = this.userActionStatus.bind(this)
        this.confirmUserToQuitTask = this.confirmUserToQuitTask.bind(this)
        this.confirmFinishAction = this.confirmFinishAction.bind(this)
        this.addVerificationLink = this.addVerificationLink.bind(this)
    }

    componentDidMount(){
        // console.log('user info -> ', auth.userProfile());
        // console.log('props', this.props)
        this.getChallengeData();
    }

    getChallengeData(){
        let self = this;
        api.get('challenge/'+this.state.challengeID).then((response) => {
            // console.log('challegne info frm api -> ', response.data.challenges[0]);
            let challenges = response.data.challenges[0];

            let challenge_details = [];
            challenge_details['name'] = challenges.name;
            challenge_details['description'] = challenges.description;
            challenge_details['id'] = challenges.id;
            challenges.challenge_details.map((item, i) => { challenge_details[item.field] = item.data; })

            self.setState({challengeDetails: challenge_details});
            
            let challenge_actions_sanitize = [];
            challenges.actions.map((item, i) => {
                let oneAction = item;
                oneAction.action_details.map((item, i) => { oneAction[item.field] = item.data; })
                challenge_actions_sanitize.push(oneAction)
            });
            self.setState({challengeActions: challenge_actions_sanitize});

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

    userActionStatus(actions){
        // console.log('actions -> ', actions);
        let currentUser = auth.userProfile().user_id;

        // console.log('current user id -> ', currentUser);
        let userActionCommited = [];
        actions.trackings.map((item, i) => {
            if(item.description == currentUser){ userActionCommited.push(item); }
        });

        if(userActionCommited.length === 0){ return 'open_do_action'; }

        // get last action from action list
        let lastAction = userActionCommited.at(-1);
        // console.log('action status -> ', lastAction);

        if(lastAction.name == "start_action"){ return 'open_confirm_action'; }

        if(lastAction.name == "quit_action"){ return 'open_do_action'; }

        if(lastAction.name == "confirmation_sent_action"){ return 'open_for_confirmation_action'; }

        if(lastAction.name == "confirmed_action"){ return 'open_confirmed_action'; }
    }
    
    addVerificationLink(e){
        this.setState({verificationLink: e});
    }

    toggleOpenAction(item, action) {
        // console.log('selected action ->', item);
        this.setState({isActionContent: action});
        this.setState({selectedAction: item});
        this.setState({openDoAction: true});
    }
    
    closeAction(){
        this.setState({selectedAction: []});
        this.setState({openDoAction: false});
    }
    

    confirmUserToPerformTask(task){
        // prep data
        const data = {
            name: 'start_action',
            description: auth.userProfile().user_id,
            action_id: task.id,
            details: [
                {
                    "field": "comment",
				    "data": auth.userProfile().name+' started the action'
                }
            ],
        }
        this.saveAction(data);
    }

    confirmUserToQuitTask(task){
        const data = {
            name: 'quit_action',
            description: auth.userProfile().user_id,
            action_id: task.id,
            details: [
                {
                    "field": "comment",
				    "data": auth.userProfile().name+' quitted the action'
                }
            ],
        }
        this.saveAction(data);
    }

    confirmFinishAction(task){

        console.log('the task -> ', task);
        const data = {
            name: 'confirmation_sent_action',
            description: auth.userProfile().user_id,
            action_id: task.id,
            details: [
                {
                    "field": "comment",
				    "data": auth.userProfile().name+' has performed the action and is for verification'
                },
                {
                    "field": "verification",
				    "data": this.state.verificationLink
                }
            ],
        }

        this.saveAction(data);

    }

    saveAction(taskData){
        let self = this;
        api.post('/tracking', taskData)
        .then((response) => {
            console.log('Actions response -> ', response.data);
            self.closeAction();
            self.getChallengeData();
        }).catch((error) => {
            console.log('error -> ', error);
        });
    }
    

    render () {

        const ActionsContents = () => {
            if(this.state.isActionContent == "do_action"){
                return (
                    <div className='do-action-content-main'>
                        <div className='do-action-verification'>
                            <div>This action requires you to submit proof when done.</div>
                            <div>Challenge creator will require you to submit a link to your action for verification</div>
                        </div>
                        <div className='do-action-options'>
                            <button className='cancel-button' onClick={() => this.closeAction()}>Cancel</button>
                            <button className='start-button' onClick={() => this.confirmUserToPerformTask(this.state.selectedAction)}>Start Action</button>
                        </div>
                    </div>
                );
            }

            if(this.state.isActionContent == "execute_action"){
                return (
                    <div className='do-action-content-main'>
                        <div className='do-action-verification'>
                            <div className='do-action-veridy-text'>To mark this action as done. Please send the link here</div>
                            <div className='do-action-veridy-input'><input type="text" onChange={(e) => this.addVerificationLink(e.target.value)} placeholder='https://actions.execution/have-done-my-action' /></div>
                            <div className=''>Challenge creator will recieve your link and verify if you have execured the action.</div>
                        </div>
                        <div className='do-action-options'>
                            <button className='cancel-button' onClick={() => this.closeAction()}>Cancel</button>
                            <button className={'start-button '+(this.state.verificationLink == '' ? 'disabled-button' : '')} onClick={() => this.confirmFinishAction(this.state.selectedAction)} disabled={(this.state.verificationLink == '' ? true : false)}>Finish Action</button>
                        </div>
                    </div>
                );
            }

            if(this.state.isActionContent == "quit_action"){
                return (
                    <div className='do-action-content-main'>
                        <div className='do-action-verification'>
                            <div>Quiting the action will cause you to lose all<br />progress for this action.</div>
                            <div><strong>Are you sure you want to quit action?</strong></div>
                        </div>
                        <div className='do-action-options'>
                            <button className='cancel-button' onClick={() => this.closeAction()}>Cancel</button>
                            <button className='quit-button' onClick={() => this.confirmUserToQuitTask(this.state.selectedAction)}>Quit Action</button>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="challenges-page-inner">
                <div className="dview-left">
                    <div className="dv-left-inner">
                        <div className="dvl-main-sidebar">

                            <OtherMainSIde details={this.state.challengeDetails} />
                        </div>
                        {/* <div className="dvl-main-sidebar">
                            <WatchRewards />
                        </div> */}
                        {/* <div className="dvl-main-sidebar">
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
                        </div> */}
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
                                        {
                                          Object.entries(this.state.challengeActions).map(([key, value]) => (
                                            <li key={key}>
                                                <div className="dtextlist">
                                                    <div className='d-activity-name'>{value.name}</div>
                                                    <div className='d-activity-description'>{value.description}</div>
                                                    {/* <div className='d-activity-tracking-items'>{value.custom_tracking_items.split(',').map((item, i) => (<span key={i}>{item}</span>))}</div> */}
                                                </div>
                                                {
                                                    (this.userActionStatus(value) == 'open_do_action' ? <div className="ddoaction"><div onClick={() => this.toggleOpenAction(value, 'do_action')} className="do-inner-action">Do Action</div></div> : 
                                                    (this.userActionStatus(value) == 'open_confirm_action' ?
                                                        <div className="ddoaction">
                                                            <div onClick={() => this.toggleOpenAction(value, 'execute_action')} className="do-inner-action">Finish Action</div>
                                                            <div onClick={() => this.toggleOpenAction(value, 'quit_action')} className="do-inner-action quit-button">Quit Action</div>
                                                        </div>
                                                    : (this.userActionStatus(value) == 'open_for_confirmation_action' ? <div className="ddoaction"><div className='do-for-action-confirmation'>For Valiation</div></div> : <div></div> ))
                                                    )
                                                }
                                                    
                                                
                                            </li>
                                        ))
                                      }
                                    </ul>
                                    <ReactModal isOpen={this.state.openDoAction} contentLabel="Example Modal" className="do_action_modal" ariaHideApp={false} >
                                        <div className="ms-watch-modal">
                                            <div className='do-action-inner'>
                                                <div className='do-action-challenge-image'>
                                                    <img src={this.state.challengeDetails.challenge_image} alt="" />
                                                </div>
                                                <h3>{this.state.selectedAction.name}</h3>
                                                <div className='do-action-taglines'>
                                                    { (this.state.selectedAction.custom_tracking_items !== null ? this.state.selectedAction.custom_tracking_items?.split(',').map((item, i) => (<span key={i}>{item}</span>)) : <span>{this.state.selectedAction.custom_tracking_items}</span>) }
                                                </div>
                                                <div className='do-action-message'>
                                                    <div className='do-action-instructions'>{this.state.selectedAction.description}</div>
                                                </div>
                                                { ActionsContents() }
                                            </div>
                                        </div>
                                    </ReactModal>

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
