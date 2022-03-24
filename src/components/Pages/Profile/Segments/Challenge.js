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
    'Authorization' : 'Bearer '+auth.getAccessToken(),
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
            challengeList: []
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

    getChallengeInfo(){
        let self = this;

        api.get('/getallchallenges', {})
        .then((response) => {
            // console.log('API response -> ', response.data.challenges);
            let challenges = response.data.challenges;
            console.log('d challegnes -> ', challenges);
            // let cids = [];
            // Object.keys(challenges).forEach(function(xkey) {
            //     cids.push(challenges[xkey].id);
            // });
            // cids = cids.reverse();
            // cids = cids.slice(0, 4);

            self.setState({challengeList: challenges});
        });
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

    componentDidMount(){
        this.getChallengeInfo();
    }

    render () {

        return (
            <div className="challenges-inner">
                <div className="dchallenge-list">
                    <div className="dch-inner">
                        {
                            (
                                this.state.challengeList.length > 0 ?
                                    this.state.challengeList.map((challenge, i) => (
                                        <ChallengeList challenge_id={challenge} key={i}  />
                                    ))
                                :
                                <div className='dloadingmean'>Loading...</div>
                            )
                            
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Challenge