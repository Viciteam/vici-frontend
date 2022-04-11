import './../../../styles/challenge.css';
import React from 'react';

import ChallengeGoalActions from './../Segments/ChallengeGoalActions'
import AddSocialAction from './../Segments/AddSocialAction'
import ChallengePenalties from './../Segments/ChallengePenalties'
import Switch from "react-switch";
import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBars, faEllipsisV, faGlobeEurope, faMapMarkerAlt, faImage, faCrosshairs, faQuestionCircle, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

class StepTwo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive,
            activepart: 'title',
            mainGoalValue: 'single', 
            convertActionToPoints: false,
            allowPenalty: false,
            allow_penalty: false,
            actionList: [],
            social_list: [],
            penalty: [],
            showformPart: 1,
            maxItems: 3
        }

        this.createActive = this.createActive.bind(this);
        this.toogleMainGoalValues = this.toogleMainGoalValues.bind(this);

        this.toogleConvertActionToPoints = this.toogleConvertActionToPoints.bind(this);

        this.toogleAllowPenalty = this.toogleAllowPenalty.bind(this);

        this.proceedToNext = this.proceedToNext.bind(this);
        this.proceedToPrev = this.proceedToPrev.bind(this);

        this.pullChallengeAction = this.pullChallengeAction.bind(this);
        this.pullSocialAction = this.pullSocialAction.bind(this);
        this.pullPenalties = this.pullPenalties.bind(this);

        this.proceedToNext = this.proceedToNext.bind(this); 
        this.showAllSteps = this.showAllSteps.bind(this); 
        
    }

    createActive(setactive){
        // console.log('Type ->', setactive);
        this.setState({activepart: setactive})
    }

    toogleMainGoalValues(toogleTo){
        this.setState({mainGoalValue: toogleTo});
        // this.populateInput('goal_type', toogleTo);
        this.createActive('two_main_goal')
    } 

    toogleConvertActionToPoints(){
        let newState = !this.state.convertActionToPoints;
        this.setState({convertActionToPoints: newState});
        
        // this.populateInput('convert_action_to_points', newState)
        this.setState({allow_penalty: newState});
    }

    toogleAllowPenalty(){
        let toogleAllowPenalty = !this.state.allowPenalty;
        this.setState({allowPenalty: toogleAllowPenalty});
    }

    proceedToNext(){
        let finalInfo = {
            'main_goal': this.state.mainGoalValue,
            'actions': this.state.actionList,
            'social': this.state.social_list,
            'allow_penalty': this.state.allowPenalty,
            'penalty': this.state.penalty,
            'convert_actions_to_points': this.state.convertActionToPoints,
        }

        console.log('triggered here');
        // this.props.callBack(finalInfo);
    }

    proceedToPrev(){
        this.props.toBack(true);
    }

    pullChallengeAction(actionDetails){
        console.log(actionDetails);
        let currentlist = this.state.actionList;
        currentlist.push(actionDetails);
        // currentlist['action'] = actionDetails;
        this.setState({actionList: currentlist});
    }

    pullSocialAction(socialDetails){
        let currentlist = this.state.social_list;
        currentlist = socialDetails;
        this.setState({social_list: currentlist});
    }

    pullPenalties (actionPenalties){
        let currentlist = this.state.penalty;
        currentlist.push(actionPenalties);
        // currentlist = actionPenalties;
        this.setState({penalty: currentlist});
    }

    openIdentifySteps(){
        let steps = this.state.showformPart;
        this.setState({showformPart: steps + 1});
    }

    showAllSteps(event, item){
        // console.log('show selected ->', event.target.checked);
        if(event.target.checked){
            this.setState({showformPart: 5});
		}
    }



    
    

    render () {
        return (
            <div className="cgoal-center-inner">
                <h2>How to Measure the Goal?</h2>

                <div className={"cg-item " + (this.state.activepart === 'two_main_goal' ? 'active_item' : '')} onFocus={() => this.createActive('two_main_goal') }>
                    <div className="cg-label">Is it one goal or multiple goals?</div>
                    <div className="cg-input">
                        <div className="dmultiple">
                            <div className={"dm-left toogle-clickable " + (this.state.mainGoalValue === 'single' ? 'active_main_goal_item' : '')} onClick={() => this.toogleMainGoalValues('single')}>
                                <div className="dradiobt">
                                    {/* <input type="radio" name="gender" checked={this.state.mainGoalValue ==== "single"}/> */}
                                    <div className={"dradiobase " + (this.state.mainGoalValue === 'single' ? 'active_radio_main_itemn' : '')}>
                                    <div className={"dradio-inner " + (this.state.mainGoalValue === 'single' ? 'active_radio_itemn' : '')}>&nbsp;</div>
                                    </div>
                                </div>
                                <div className="dtextone">
                                    Single Goal
                                </div>
                            </div>
                            <div className={"dm-left toogle-clickable " + (this.state.mainGoalValue === 'multiple' ? 'active_main_goal_item' : '')} onClick={() => this.toogleMainGoalValues('multiple')}>
                                <div className="dradiobt">
                                    {/* <input type="radio" name="gender" checked={this.state.mainGoalValue ==== "multiple"}/> */}
                                    <div className={"dradiobase " + (this.state.mainGoalValue === 'multiple' ? 'active_radio_main_itemn' : '')}>
                                    <div className={"dradio-inner " + (this.state.mainGoalValue === 'multiple' ? 'active_radio_itemn' : '')}>&nbsp;</div>
                                    </div>
                                </div>
                                <div className="dtextone ">
                                    Multiple Milestones
                                </div>
                            </div>
                        </div>
                        {/* <div className="dsdesc">Description</div>
                        <div className="dsdesc">Single Goal. Only has one goal with multiple actions, enable multiple milestones to create milestones.</div> */}
                        <input type="text" placeholder="What is the main goal? E.g. Be physically fit" />
                    </div>
                </div>

                <div className={"cg-item " + (this.state.activepart === 'two_actions' ? 'active_item' : '')} style={(this.state.showformPart >= 2 ? {} : {display: 'none'})} onFocus={() => this.createActive('two_actions') }>

                    <div className="cg-label">What are the actions needed to complete the Goal?</div>
                    <ChallengeGoalActions getData={this.pullChallengeAction} />
                </div>

                {/* <div className={"cg-item " + (this.state.activepart === 'two_social_actions' ? 'active_item' : '')} style={(this.state.showformPart >= 3 ? {} : {display: 'none'})} onFocus={() => this.createActive('two_social_actions') }>
                    <AddSocialAction getData={this.pullSocialAction} />
                </div> */}

                <div className={"cg-item " + (this.state.activepart === 'two_convert_actions' ? 'active_item' : '')} style={(this.state.showformPart >= 3 ? {} : {display: 'none'})} onFocus={() => this.createActive('two_convert_actions') }>
                    <div className="cg-label">
                        <div className="cgl-name">Do you want to convert all actions into points?</div>
                        <div className="cgl-doptions"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleConvertActionToPoints} checked={this.state.convertActionToPoints} /></div>
                    </div>
                    <div className="cg-input dactivity">
                        <div className="subheader">Set how many points participant can get for each action</div>
                    </div>
                </div>

                {/* <div className={"cg-item " + (this.state.activepart === 'two_penalty' ? 'active_item' : '')} style={(this.state.showformPart >= 5 ? {} : {display: 'none'})} onFocus={() => this.createActive('two_penalty') }>
                    <div className="cg-label">
                        <div className="cgl-name">Would you like to set Penalty rules?</div>
                        <div className="cgl-doptions"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleAllowPenalty} checked={this.state.allowPenalty} /></div>
                    </div>
                    <ChallengePenalties getData={this.pullPenalties} showPenalties={this.state.allowPenalty} />
                </div> */}

                <div className="step-by-step-options" style={(this.state.showformPart < this.state.maxItems ? {} : {display: 'none'})}>
                    <div className='step-show-all'>
                        <input type="checkbox" onChange={(e) => this.showAllSteps(e, 'show_all')} /> show all steps
                    </div>
                    <div className='step-show-once'>
                        <button onClick={() => this.openIdentifySteps()}>{this.state.showformPart}/{this.state.maxItems} <FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                </div>

                <div className="dnext-button" style={(this.state.showformPart >= this.state.maxItems ? {} : {display: 'none'})}>
                    <button className="prev-arrow" onClick={() => this.proceedToPrev()}>Back</button>
                    <button className="next-arrow" onClick={() => this.proceedToNext()}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default StepTwo