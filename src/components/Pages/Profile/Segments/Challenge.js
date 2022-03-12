import './../../../styles/profiles.css';
import React from 'react';

import ChallengeList from './ChallengeList'
import LoginModal from '../../Auth/LoginModal';
import auth from '../../../../services/auth';

import NewChallengeModal from './NewChallengeModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowRight, faArrowLeft, faThList } from '@fortawesome/free-solid-svg-icons'

import ReactModal from 'react-modal';

import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.vici.life/api/',
  headers: {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization' : 'Bearer 54|nDXR6RW6gzfF0P20tPIrjg68h6xpnZmNGdzSVVBM',
  }
})

class Challenge extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            uinfo: this.props.uinfo,
            openModal: false, 
            newChallengeModalOpen: false,
            challengeCurrentSteps: 1,
            challengeDesc: '',
            challengeName: '',
            challengeList: [1,2,3]
        }
        
        this.newChallenge = this.newChallenge.bind(this);
        this.proceedToNextStep = this.proceedToNextStep.bind(this);
        this.closeNewChallengeModal = this.closeNewChallengeModal.bind(this);
        this.saveChallengeName = this.saveChallengeName.bind(this);
        this.saveChallengeDesc = this.saveChallengeDesc.bind(this);
        this.buildChallengeFromScratch = this.buildChallengeFromScratch.bind(this);
    }

    handleOpenModal () {
        if(!auth.isAuthenticated()){
            this.setState({ openModal: true });
        }
    }

    newChallenge(){
        // window.location.href = "/challenge/new";

        console.log('new challenge');
        this.setState({ newChallengeModalOpen: true });
    }

    buildChallengeFromScratch(){
        // window.location.href = "/challenge/new";
        console.log('create from scratchj')

        // let params = {};
        // params['name'] = this.state.challengeName;
        // params['description'] = this.state.challengeDesc;
        // params['is_template'] = 'No';
        // params['owner_id'] = '1';
        // params['details'] = [];

        // console.log('save new token sd -> ', params);

        // let parameters = JSON.stringify(params);

        //  console.log('save new token -> ', parameters);

        // api.post('/challenge', parameters)
        // .then((response) => {
        //     console.log(response);
        // });



    }

    proceedToNextStep(selectedStep){
        this.setState({ challengeCurrentSteps: selectedStep });
    }

    closeNewChallengeModal(){
        this.setState({ newChallengeModalOpen: false });
    }

    saveChallengeName(name){
        this.setState({ challengeName: name });
    }

    saveChallengeDesc(desc){
        this.setState({ challengeDesc: desc });
    }

    render () {

        return (
            <div className="challenges-inner">
                {/* <div className="dchallemgeheader">
                    <div className="dc-inner">
                        <div className="dci-left">
                            <button onClick={this.handleOpenModal}>
                                <img src="/img/join_challenge.png" alt="" />
                                <span>Join a Challenge</span>
                            </button>
                            {this.state.openModal && <LoginModal closeModal={this.handleCloseModal } />}
                        </div>
                        <div className="dci-right">
                            <button onClick={() => this.newChallenge() }>
                                <img src="/img/new_challenge.png" alt="" />
                                <span>New Challenge</span>
                            </button>
                            {this.state.newChallengeModalOpen && <NewChallengeModal showModal={this.state.newChallengeModalOpen} />}
                            
                        </div>
                    </div>
                </div> */}
                <div className="dchallenge-list">
                    <div className="dch-inner">
                        {this.state.challengeList.map((challenge, i) => (
                            <ChallengeList challenge_id={challenge} key={i}  />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Challenge