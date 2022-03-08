import './../../../styles/challenge.css';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowDown} from '@fortawesome/free-solid-svg-icons'

class StepOne extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive,
            activepart: 'title',
            isChallengeTitle: '',
            isHashtags: '',
            isTagline: '',
            isInstructions: '',
            showformPart: 1,
            stackedStep: 1
        }

        this.createActive = this.createActive.bind(this);

        this.addChallengeTitle = this.addChallengeTitle.bind(this); 
        this.addChallengehashtag = this.addChallengehashtag.bind(this); 
        this.addChallengeTagline = this.addChallengeTagline.bind(this); 
        this.addChallengeInstuctions = this.addChallengeInstuctions.bind(this); 
        this.openIdentifySteps = this.openIdentifySteps.bind(this); 
        this.proceedToNext = this.proceedToNext.bind(this); 
        this.showAllSteps = this.showAllSteps.bind(this); 
        
    }

    createActive(setactive){
        console.log('Type ->', setactive);
        this.setState({activepart: setactive});
    }

    addChallengeTitle(value){
        this.setState({isChallengeTitle: value});
    }

    addChallengehashtag(value){
        this.setState({isHashtags: value});
    }

    addChallengeTagline(value){
        this.setState({isTagline: value});
    }

    addChallengeInstuctions(value){
        this.setState({isInstructions: value});
    }
    
    proceedToNext(){
        let finalInfo = {
            'title': this.state.isChallengeTitle,
            'hashtag': this.state.isHashtags,
            'tagline': this.state.isTagline,
            'instructions': this.state.isInstructions,
        }
        this.props.callBack(finalInfo);
    }

    openIdentifySteps(){
        let steps = this.state.showformPart;
        this.setState({showformPart: steps + 1});
    }

    showAllSteps(event, item){
        console.log('show selected ->', event.target.checked);
        if(event.target.checked){
            this.setState({showformPart: 4});
		}
    }


    render () {
        
        return (
            <div className="cgoal-center-inner">
                <h2>Title and Description</h2>
                <div className={"cg-item " + (this.state.activepart === 'title' ? 'active_item' : '')} onFocus={() => this.createActive('title') }>
                    <div className="cg-label">Challenge Title</div>
                    <div className="cg-input">
                        <input type="text" onChange={(e) => this.addChallengeTitle(e.target.value)} />
                    </div>
                </div>

                <div className={"cg-item " + (this.state.activepart === 'hashtags' ? 'active_item' : '')} style={(this.state.showformPart >= 2 ? {} : {display: 'none'})}  onFocus={() => this.createActive('hashtags') }>
                    <div className="cg-label">Hashtags</div>
                    <div className="cg-input">
                        <input type="text" onChange={(e) => this.addChallengehashtag(e.target.value)} />
                    </div>
                </div>

                <div className={"cg-item " + (this.state.activepart === 'tagline' ? 'active_item' : '')} style={(this.state.showformPart >= 3 ? {} : {display: 'none'})}  onFocus={() => this.createActive('tagline') }>
                    <div className="cg-label">Tagline</div>
                    <div className="cg-input">
                        <textarea name="" id="" onChange={(e) => this.addChallengeTagline(e.target.value)}></textarea>
                    </div>
                </div>

                <div className={"cg-item " + (this.state.activepart === 'rules' ? 'active_item' : '')} style={(this.state.showformPart >= 4 ? {} : {display: 'none'})}  onFocus={() => this.createActive('rules') }>
                    <div className="cg-label">Instructions and rules</div>
                    <div className="cg-input">
                        <textarea name="" id="" onChange={(e) => this.addChallengeInstuctions(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="step-by-step-options" style={(this.state.showformPart < 4 ? {} : {display: 'none'})}>
                    <div className='step-show-all'>
                        <input type="checkbox" onChange={(e) => this.showAllSteps(e, 'show_all')} /> show all steps
                    </div>
                    <div className='step-show-once'>
                        <button onClick={() => this.openIdentifySteps()}>{this.state.showformPart}/4 <FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                </div>
                <div className="dnext-button" style={(this.state.showformPart >= 4 ? {} : {display: 'none'})}>
                    <button className="next-arrow" onClick={() => this.proceedToNext()}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default StepOne