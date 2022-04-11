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
        }

        // this.getChallengeInfo();


        this.watchChallenge = this.watchChallenge.bind(this);
        this.addTracking = this.addTracking.bind(this);
        this.toggleDoAction = this.toggleDoAction.bind(this);
        this.toggleExecuteAction = this.toggleExecuteAction.bind(this);
        this.toggleQuitAction = this.toggleQuitAction.bind(this);
        this.getAction = this.getAction.bind(this)
        this.closeDoAction = this.closeDoAction.bind(this)
        this.closeExecuteAction = this.closeExecuteAction.bind(this)
        this.closeQuitAction = this.closeQuitAction.bind(this)
        this.confirmUserToPerformTask = this.confirmUserToPerformTask.bind(this)
    }

    componentDidMount(){
        console.log('props', this.props)
        let self = this;
        api.get('challenge/'+this.state.challengeID).then((response) => {
            console.log('challegne info frm api -> ', response.data.challenges[0]);
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
        console.log('item -> ', item);

        this.setState({selectedAction: item});
        this.setState({openDoAction: true});
    }

    toggleExecuteAction(item){

        console.log('execution -> ', item);

        this.setState({selectedExecution: item});
        this.setState({openExecuteAction: true});
    }
    toggleQuitAction(item){
        console.log('execution -> ', item);

        this.setState({selectedExecution: item});
        this.setState({openQuitAction: true});
    }
    closeDoAction(){
        this.setState({selectedAction: []});
        this.setState({openDoAction: false});
    }

    closeExecuteAction(){
        this.setState({selectedExecution: []});
        this.setState({openExecuteAction: false});
    }

    closeQuitAction(){
        this.setState({selectedExecution: []});
        this.setState({openQuitAction: false});
    }

    confirmUserToPerformTask(task){
        console.log('proceed with action -> ', task);

        // prep data
        const data = {
            name: task.name,
            description: task.description,
            action_id: task.id,
            details: [],
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
                    <div onClick={() => this.toggleDoAction(value)} className="ddoaction">Do Action</div>
                    <div onClick={() => this.toggleExecuteAction(value)} className="ddoaction">Execute Action</div>
                    <div onClick={() => this.toggleQuitAction(value)} className="ddoaction">Quit Action</div>
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
                                      { ActionList() }
                                    </ul>
                                    <ReactModal
                                        isOpen={this.state.openDoAction}
                                        contentLabel="Example Modal"
                                        className="do_action_modal"
                                        ariaHideApp={false}
                                    >
                                        <div className="ms-watch-modal">
                                            <div className='do-action-inner'>
                                                <div className='do-action-challenge-image'>
                                                    <img src={this.state.challengeDetails.challenge_image} alt="" />
                                                </div>
                                                <h3>{this.state.selectedAction.name}</h3>
                                                <div className='do-action-message'>
                                                    <div className='do-action-instructions'>{this.state.selectedAction.description}</div>
                                                </div>
                                                <div className='do-action-verification'>
                                                    <div>This action requires you to submit proof when done.</div>
                                                    <div>Challenge creator will require you to submit a link to your action for verification</div>
                                                </div>
                                                <div className='do-action-options'>
                                                    <button className='cancel-button' onClick={() => this.closeDoAction()}>Cancel</button>
                                                    <button className='start-button' onClick={() => this.confirmUserToPerformTask(this.state.selectedAction)}>Start Action</button>
                                                </div>
                                            </div>
                                        </div>
                                    </ReactModal>
                                    <ReactModal
                                        isOpen={this.state.openExecuteAction}
                                        contentLabel="Example Modal"
                                        className="do_action_modal"
                                        ariaHideApp={false}
                                    >
                                        <div className="ms-watch-modal">
                                            <div className='do-action-inner'>
                                                <div className='do-action-challenge-image'>
                                                    <img src={this.state.challengeDetails.challenge_image} alt="" />
                                                </div>
                                                <h3>{this.state.selectedExecution.name}</h3>
                                                <div className='do-action-message'>
                                                    <div className='do-action-instructions'>{this.state.selectedExecution.description}</div>
                                                </div>
                                                <div className='do-action-verification'>
                                                    <div className='do-action-veridy-text'>To mark this action as done. Please send the link here</div>
                                                    <div className='do-action-veridy-input'><input type="text" placeholder='https://actions.execution/have-done-my-action' /></div>
                                                    <div className=''>Challenge creator will recieve your link and verify if you have execured the action.</div>
                                                </div>
                                                <div className='do-action-options'>
                                                    <button className='cancel-button' onClick={() => this.closeExecuteAction()}>Cancel</button>
                                                    <button className='start-button' onClick={() => this.confirmUserToPerformTask(this.state.selectedExecution)}>Finish Action</button>
                                                </div>
                                            </div>
                                        </div>
                                    </ReactModal>

                                    <ReactModal
                                        isOpen={this.state.openQuitAction}
                                        contentLabel="Example Modal"
                                        className="do_action_modal"
                                        ariaHideApp={false}
                                    >
                                        <div className="ms-watch-modal">
                                            <div className='do-action-inner'>
                                                <div className='do-action-challenge-image'>
                                                    <img src={this.state.challengeDetails.challenge_image} alt="" />
                                                </div>
                                                <h3>{this.state.selectedExecution.name}</h3>
                                                <div className='do-action-message'>
                                                    <div className='do-action-instructions'>{this.state.selectedExecution.description}</div>
                                                </div>
                                                <div className='do-action-verification'>
                                                    <div>Quiting the action will cause you to lose all<br />progress for this action.</div>
                                                    <div><strong>Are you sure you want to quit action?</strong></div>
                                                </div>
                                                <div className='do-action-options'>
                                                    <button className='cancel-button' onClick={() => this.closeQuitAction()}>Cancel</button>
                                                    <button className='quit-button' onClick={() => this.confirmUserToQuitTask(this.state.selectedExecution)}>Quit Action</button>
                                                </div>
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
