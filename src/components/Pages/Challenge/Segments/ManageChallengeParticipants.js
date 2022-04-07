import './../../../styles/challenge.css';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCheckCircle} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import auth from '../../../../services/auth';

const api = axios.create({
    baseURL: 'https://api.vici.life/api/',
    headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization' : 'Bearer '+auth.getAccessToken(),
    }
})

class ManageChallengeParticipants extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive,
            allParicipants: []
        }
    }

    getParticipants(id){
        // console.log('get participants ->', id);
        let self = this;
        api.get('getallchallengeparticipants/'+id).then((response) => {
            console.log('get participants -> ', response.data.participants.data);
            self.setState({allParicipants: response.data.participants.data});
        }).catch((error) => {
            console.log('error -> ', error);
        });
    }

    componentDidMount(){
        let challenge_path = window.location.pathname.split("/");
        let challenge_id = challenge_path[challenge_path.length - 1];

        this.getParticipants(challenge_id);
    }

    render () {
        return (
            <div className="dvr-item dvr-main-participants-progress">
                <div className="dvr-participants-inner">
                    <h2><span className="dheadertitle">Participant Progress</span><span className="dviewall">View All ></span></h2>
                    <div className="dvr-item-content">
                        <div className="dvr-participants-list">
                            {
                                (this.state.allParicipants.length === 0 ? 
                                    <div className='showLoading'>
                                        <img src="/img/load_line.gif" style={{width: '350px', margin: '0 auto'}} alt="" />
                                    </div>
                                :
                                    <div>
                                        <div className="dvr-participants-header">
                                            <div className="dvr-title-participants">Participant</div>
                                            <div className="dvr-title-progress">Progress</div>
                                        </div>
                                        <div className="dvr-participant-items">
                                            {
                                                this.state.allParicipants.map((item, i) => (
                                                    <div className="dvr-participant dvr-done-item" key={i}>
                                                        <div className="dvr-item-participant">
                                                            <div className="dvr-participant-photo">
                                                                <img src={item.profpic_link} alt="" />
                                                            </div>
                                                            <div className="dvr-participant-name">{item.name_of_user}</div>
                                                        </div>
                                                        <div className="dvr-item-progress">
                                                            <div className="dprogressbar">
                                                                <div className="dprogressbase">
                                                                    <div className="dprogressvalues" style={{width: 100 + '%'}}>&nbsp;</div>
                                                                </div>
                                                            </div>
                                                            <div className="dvectorpagrt"><FontAwesomeIcon icon={faCheckCircle} /></div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ManageChallengeParticipants
