import './../../styles/challenge.css';
import React from 'react';

import { withRouter } from 'react-router-dom'

import Menu from './Segments/Menu'

// import steps
import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import StepFour from './Steps/StepFour'

import Switch from "react-switch";

import ReactModal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBars, faEllipsisV, faGlobeEurope, faMapMarkerAlt, faImage, faCrosshairs, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

import { HexColorPicker } from "react-colorful";

import ReactTooltip from 'react-tooltip';
import auth from '../../../services/auth';

import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.vici.life/api/',
  headers: {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization' : `Bearer ${auth.getAccessToken()}`,
    'X-CSRF-TOKEN': auth.getAccessToken()
  }
})

class GoalChallengeOne extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            challengeID: this.props.match.params.id,
            uinfo: this.props.uinfo,
            activepart: 'title',
            stepnumber: 0,
            menuActive: 1,
            activityList: [{"activity": ""}],
            checked: false,
            showOptionOne: true,
            showOptionTwo: false,
            selectedPreviewHeaderImage: '/img/prev-header.png',
            selectedColor: '#03488d',
            socialActionSLide: false,
            allowPenalty: false,
            formDetails: {
                'details': {}
            },
            challengeTitle: '',
            title: '',
            finalValues: [],
            stepOneData: [],
            stepTwoData: [],
            stepThreeData: [],
            stepFourData: '',
            showPublishChallengeModal: false,
            newChallengeID: 0,
            showLoading: false
        }
        this.createActive = this.createActive.bind(this);
        this.proceedToNext = this.proceedToNext.bind(this);
        this.proceedToPrev = this.proceedToPrev.bind(this);
        this.handleChange = this.handleChange.bind(this); 
        
        this.handleStepTwoPreviousStep = this.handleStepTwoPreviousStep.bind(this);     
        this.handleStepThreePreviousStep = this.handleStepThreePreviousStep.bind(this);     
        this.handleStepFourPreviousStep = this.handleStepFourPreviousStep.bind(this);     
        this.toogleChangeChallengePrivacy = this.toogleChangeChallengePrivacy.bind(this);
        // change tab
        this.populateInput = this.populateInput.bind(this);
        this.submitChallengeForm = this.submitChallengeForm.bind(this);
        this.handleStepFourCallback = this.handleStepFourCallback.bind(this);
        this.processStepPerStep = this.processStepPerStep.bind(this);
        this.processSubmit = this.processSubmit.bind(this);
        this.handleStepFourColor = this.handleStepFourColor.bind(this);
        this.handleStepFourSelectedImage = this.handleStepFourSelectedImage.bind(this);

        this.activity_list = [
            {"activity": ""}
        ];
    } 

    toogleChangeChallengePrivacy(){
        console.log();
    }
    
    createActive(setactive){
        // console.log('Type ->', setactive);
        this.setState({activepart: setactive})
    }

    populateInput(state, e){
      let dform = this.state.formDetails;
      dform[state] = e;
      this.setState({formDetails: dform});
    //   console.log('changed '+state+' -> ', e);
    }
    
    proceedToNext(){
        let stepnum = this.state.stepnumber + 1;
        let menuitem = this.state.menuActive + 1;
        this.setState({stepnumber: stepnum})
        this.setState({menuActive: menuitem})
    }

    proceedToPrev(){
        let stepnum = this.state.stepnumber - 1;
        let menuitem = this.state.menuActive - 1;
        this.setState({stepnumber: stepnum})
        this.setState({menuActive: menuitem})
    }

    handleStepTwoPreviousStep(){
        this.proceedToPrev();
    }

    handleStepThreePreviousStep(){
        this.proceedToPrev();
    }
    
    handleStepFourPreviousStep(){
        this.proceedToPrev();
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    /** Page 2 */
    submitChallengeForm(){
        console.log(this.state.formDetails);

        let formDetails = this.state.formDetails;

        let params = [];

        params['name'] = formDetails.challengeTitle;
        params['description'] = formDetails.instructions_rules;
        params['is_template'] = 'No';
        params['owner_id'] = '1';
        params['details'] = [];

        Object.keys(formDetails).forEach(function(key) {
            let subdetails = [];
            console.log('dkeys ->', key);
            if(key !== 'details' || key !== 'challengeTitle' || key !== 'instructions_rules'){
                subdetails['field'] = key;
                subdetails['data'] = formDetails[key];
                console.log('subdetails ->', subdetails);
                params['details'].push(subdetails);
            }
        });

        let parameters = JSON.stringify(params);

        // api.post('/challenge', parameters)
        // .then((response) => {
        //     console.log(response);
        // });

        //     api.get('challenge/'+this.state.challengeID).then(
        //     (response) => {
        //       console.log('response -> ', response.data.challenges);
        //       let challenges = response.data.challenges[0];

        //       let challenge_details = [];
        //       challenge_details['name'] = challenges.name;
        //       challenge_details['description'] = challenges.description;
        //       this.setState({challengeDetails: challenge_details});
            
        //     //   this.setState({challengeActions: challenges.actions});

        //       // challenge actions
        //     }
        //   ).catch((error) => {
        //     console.log('error -> ', error);
        //   });
        
        console.log('params ->', params);
    }

    addAction(challenge_id){
        // console.log('challenge id -> ', challenge_id);
        let finalvalues = this.state.finalValues;
        console.log('challenge actions -> ', finalvalues);
        if(finalvalues.actions != null){
            let actionsInfo = finalvalues.actions;
            console.log('actions -> ', actionsInfo);
            Object.keys(actionsInfo).forEach(function(xkey) {
                let itemActions = actionsInfo[xkey];
                let actions = {};
                actions['name'] = itemActions.title;
                actions['description'] = ' '+itemActions.instructions;
                actions['challenge_id'] = challenge_id;
                actions['details'] = [];
                Object.keys(itemActions).forEach(function(key) {
                    let subdetails = {};
                    if(key !== 'details' && key !== 'title' && key !== 'instructions'){
                        subdetails['field'] = key;
                        // subdetails['data'] = JSON.stringify(itemActions[key]);
                        subdetails['data'] = itemActions[key];
                        actions['details'].push(subdetails);
                    }
                });
                // console.log('action -> ', actions);
                api.post('/action', actions)
                .then((response) => {
                    console.log('Actions response -> ', response.data);
                });


            });

            

            // console.log('actions -> ', actions);

            // api.post('/action', actions)
            // .then((response) => {
            //     console.log('Actions response -> ', response.data);
            // });
        }
    }

    addPenalty(challenge_id){
        let finalvalues = this.state.finalValues;
        if(finalvalues.penalty != null){
            let penaltiesInfo = finalvalues.penalty;
            console.log('penalty -> ', penaltiesInfo);

            Object.keys(penaltiesInfo).forEach(function(xkey) {
                let activePenalty = penaltiesInfo[xkey];
                let penalties = {};
                penalties['name'] = activePenalty.title;
                penalties['description'] = 'penalties for '+activePenalty.title;
                penalties['challenge_id'] = challenge_id;
                penalties['details'] = [];
                Object.keys(activePenalty).forEach(function(key) {
                    let subdetails = {};
                    if(key !== 'details' && key !== 'title' && key !== 'instructions'){
                        subdetails['field'] = key;
                        subdetails['data'] = JSON.stringify(activePenalty[key]);
                        penalties['details'].push(subdetails);
                    }
                });

                // console.log('penalty -> ', penalties);
                api.post('/action', penalties)
                .then((response) => {
                    console.log('Penalty response -> ', response.data);
                });
            });

            
            
            // console.log('penalties ->', penalties);

            // api.post('/action', penalties)
            // .then((response) => {
            //     console.log('Penalty response -> ', response.data);
            // });


        }   
    }

    processSubmit(){
        console.log('step finalValues -> ', this.state.finalValues);
        console.log('auth data -> ', auth.user());
        console.log('auth data -> ', auth.getAccessToken());

        let self = this;

        let finalvalues = this.state.finalValues;

        let parameters = {};
        parameters['name'] = finalvalues.title;
        parameters['description'] = finalvalues.tagline;
        parameters['is_template'] = 'No';
        parameters['owner_id'] = auth.user().id;
        parameters['details'] = [];

        Object.keys(finalvalues).forEach(function(xkey) {
            let subdetails = {};
            console.log('key -> ', xkey);
            if(xkey != 'details' && xkey != 'title' && xkey != 'tagline' && xkey != 'actions' && xkey != 'penalty' && xkey != 'social'){
                subdetails['field'] = xkey;
                subdetails['data'] = finalvalues[xkey];
                parameters['details'].push(subdetails);
            }
        });

        this.setState({showPublishChallengeModal: true});
        this.setState({showLoading: true});

        // let params = JSON.stringify(Object.assign({}, parameters));

        console.log('params -> ', parameters);


        api.post('/challenge', parameters)
        .then((response) => {
            console.log('API response -> ', response.data.challenge.id);
                
            self.addAction(response.data.challenge.id);
            self.addPenalty(response.data.challenge.id);
            self.setState({newChallengeID: response.data.challenge.id});
            self.setState({showLoading: false});
        });


    }

    processStepPerStep(info){
        let getFinalValues = this.state.finalValues;
        Object.keys(info).forEach(function(key) {
            getFinalValues[key] = info[key];
        });
        this.setState({finalValues: getFinalValues});
        this.proceedToNext();
    }

    handleStepFourCallback(StepFourInfo){
        // this.processStepPerStep(StepFourInfo);
        let getFinalValues = this.state.finalValues;
        Object.keys(StepFourInfo).forEach(function(key) {
            getFinalValues[key] = StepFourInfo[key];
        });
        this.setState({finalValues: getFinalValues});
        this.processSubmit();
    }

    handleStepFourColor(stepFourColor){
        console.log('this is the color ->', stepFourColor);
        this.setState({selectedColor: stepFourColor});
    }

    handleStepFourSelectedImage(stepfourimage){
        this.setState({selectedPreviewHeaderImage: stepfourimage});
    }
    
    render () {
        const tip_images = [
            '/img/challenge_tip1.png',
            '/img/challenge_tip2.png',
            '/img/challenge_tip3.png',
        ];

        const tip_message = [
            'Remember a good title catches your reader\'s interest. But don\'t just be a clickbait. Keep It Short, Simple, and on Point.',
            'Measurable goals are easier to gauge. Just choose and click!',
            'A goal with a deadline helps you achieve it much quicker.',
        ]
        
        return (
            <div className="challenges-goal-page-inner">
                <ReactTooltip />
                <div className="cgoal-inner">
                    <div className="cgoal-left">
                        <div className="cgoal-left-inner">
                            <div className="dtitle">
                                <div className="dimage">
                                    <img src="/img/ch_goal.png" alt="" />
                                </div>
                                <div className="dtext">
                                    Goal Challenge
                                </div>
                            </div>
                            <div className="dmenu-side">
                                <Menu isactive={this.state.menuActive} />
                            </div>
                        </div>
                    </div>

                    <div className="cgoal-center">
                        <div className={"dstep step_one " + (this.state.stepnumber === 0 ? 'isactive_tab' : '')}>
                            <StepOne callBack={this.processStepPerStep} />
                        </div>
                        <div className={"dstep step_one " + (this.state.stepnumber === 1 ? 'isactive_tab' : '')}>
                            <div className="cgoal-center-inner">
                                <StepTwo callBack={this.processStepPerStep} toBack={this.handleStepTwoPreviousStep}/>
                            </div>
                        </div>
                        <div className={"dstep step_one " + (this.state.stepnumber === 2 ? 'isactive_tab' : '')}>
                            <div className="cgoal-center-inner">
                                <StepThree callback={this.processStepPerStep} toBack={this.handleStepThreePreviousStep} />
                            </div>
                        </div>
                        <div className={"dstep step_one " + (this.state.stepnumber === 3 ? 'isactive_tab' : '')}>
                            <div className="cgoal-center-inner">
                                <StepFour selectedcolor={this.handleStepFourColor} selectedimage={this.handleStepFourSelectedImage} toBack={this.handleStepFourPreviousStep} callback={this.handleStepFourCallback} />
                                <ReactModal 
                                    isOpen={this.state.showPublishChallengeModal}
                                    contentLabel="Minimal Modal Example"
                                    className="Modal publish-challenge-modal"
                                    // overlayClassName="Overlay"
                                    ariaHideApp={false}
                                >
                                    <div className="publish-challenge-main">
                                        {
                                            (
                                                this.state.showLoading ? 
                                                <div className='showLoading'>
                                                    <img src="/img/loading.gif" alt="" />
                                                </div>
                                                :
                                                <div className='publish-modal'>
                                                    <div className='dpublish-image'>
                                                        <img src="/img/green_check.png" alt="" />
                                                    </div>
                                                    <h3>Your Challenge has been published!</h3>
                                                    <div className='d-confirm-saving'>
                                                        <button onClick={() => ( window.location.href = "/challenge/"+this.state.newChallengeID )}>View Challenge</button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        
                                        
                                    </div>
                                </ReactModal>
                            </div>
                        </div>
                    </div>
                    <div className="cgoal-right">
                        <div className="cgoal-right-inner" style={{display: this.state.stepnumber < 2 ? 'block' : 'none' }} >
                            <div className="dimage"><img src={tip_images[this.state.stepnumber]} alt="" /></div>
                            <div className="dtipbase">Tip { this.state.stepnumber + 1}</div>
                            <div className="dtextinfo">{tip_message[this.state.stepnumber]}</div>
                        </div>
                        <div className="cgoal-right-inner withopts"  style={{display: this.state.stepnumber === 3 ? 'block' : 'none' }} >
                            <div className="withops-inner">
                                <h3>Preview</h3>
                                <div className="withops-show-card">
                                    <div className="wsc-inner">
                                        <div className="prev-image">
                                            <img src={this.state.selectedPreviewHeaderImage} alt="" />
                                        </div>
                                        <div className="prev-sm-header">DAILY</div>
                                        <div className="prev-mg-header">HEALTHY SPIRITS!</div>
                                        <div className="prev-mg-desc">For me to discipline myself to drink water more often.</div>
                                        <div className="prev-tags">
                                            <ul>
                                                <li style={{backgroundColor: this.state.selectedColor}}>Health</li>
                                                <li style={{backgroundColor: this.state.selectedColor}}>Activity</li>
                                                <li style={{backgroundColor: this.state.selectedColor}}>Physical</li>
                                            </ul>
                                        </div>
                                        <div className="prev-participants">
                                            <div className="dpart-list">
                                                <div className="dname">
                                                    <div className="dphoto">
                                                        <img src="/img/prof_icon.png" alt="" />
                                                    </div>
                                                    <div className="dfname">John S. White</div>
                                                </div>
                                                <div className="dnumjoins">20 Joined</div>
                                            </div>
                                        </div>
                                        <div className="prev-instructions">instructions</div>
                                    </div>

                                    <h4>Progress bars, buttons & milestones</h4>
                                    <div className="wsc-inner dprogresspart">
                                        <div className="dprogressbase" style={{backgroundColor: this.state.selectedColor+"70"}}>
                                            <div className="dprogressvals" style={{backgroundColor: this.state.selectedColor, width: '60%'}}>&nbsp;</div>
                                        </div>
                                    </div>

                                    <div className="doptionspart">
                                        <div className="doptleft">
                                            <div className="donut-chart-block block">
                                                <div className="donut-chart" style={{backgroundColor: this.state.selectedColor+"70"}}>
                                                    <div id="part1" className="portion-block"><div className="circle" style={{backgroundColor: this.state.selectedColor}}></div></div>
                                                    <p className="center"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="doptright">
                                            <div className="doptr-item diconpin" style={{color: this.state.selectedColor}}>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            </div>
                                            <div className="doptr-item no-bg">
                                                <button style={{backgroundColor: this.state.selectedColor}}>Join Challenge</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(GoalChallengeOne)
