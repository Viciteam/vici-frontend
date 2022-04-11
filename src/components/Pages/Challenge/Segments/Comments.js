import './../../../styles/challenge.css';
import React from 'react';

import ShowComment from './ShowComment'; 
import ShowActivity from './ShowActivity'; 

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImage, faLink, faPaperPlane} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import auth from '../../../../services/auth';
import CookieService from '../../../../services/CookieService';

const api = axios.create({
    baseURL: 'https://api.vici.life/api/',
    headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization' : 'Bearer '+auth.getAccessToken(),
    }
})

class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive,
            challengeComments: []
        }

        // this.addChallengeComment = this.addChallengeComment.bind(this);
    }

    getComments(id){
        let self = this;
        api.get('/getchallenge_comments/'+id, {})
        .then((response) => {
            console.log('challenge commetns for '+id+' -> ', response.data.comments.data);
            self.setState({challengeComments: response.data.comments.data});
        }).catch((error) => {
            console.log('challenge commetns -> ', error);
        });
    }

    profile_main_image(){
        let show_image = '';
        const user_profile = CookieService.get("user_profile");
        if(user_profile !== undefined ){
            if(user_profile.fb_user_id !== undefined){
                console.log('user profile from sideber -> ', user_profile.fb_user_id);
                return "https://graph.facebook.com/"+user_profile.fb_user_id+"/picture?type=large&width=320&height=320";
            } else {
                return auth.userProfile() ? auth.userProfile().profpic_link : '/img/avatarguest.png';
            }
        } else {
            return auth.userProfile() ? auth.userProfile().profpic_link : '/img/avatarguest.png';
        }
    }

    componentDidMount(){
        let challenge_path = window.location.pathname.split("/");
        let challenge_id = challenge_path[challenge_path.length - 1];

        this.getComments(challenge_id);
        console.log('challenge id -> ', challenge_id);
    }

    render () {
        
        return (
            <div className="updates-comments-inner">
                <div className="dheadpart">
                    <h2>Updates & Comments</h2>
                    <div className="dsidepart">
                        <button>All Post</button>
                    </div>
                </div>
                <div className="daddpost">
                    <div className="dpostinput">
                        <div className="dpic">
                            <img src={this.profile_main_image()} alt="" />
                        </div>
                        <div className="daddpostarea">
                            <textarea placeholder="Write something..."></textarea>
                        </div>
                    </div>
                    <div className="dpostops">
                        <div className="dopsleft">
                            <button className="dimagepart"><FontAwesomeIcon icon={faImage} /></button>
                            <button className="dlinkpart"><FontAwesomeIcon icon={faLink} /></button>
                        </div>
                        <div className="dopsright" onClick={() => this.addChallengeComment()}>
                            <button className="dsendpost"><FontAwesomeIcon icon={faPaperPlane} /></button>
                        </div>
                    </div>
                </div>
                <div className="dpostlist">
                    {
                        (this.state.challengeComments.length === 0 ?
                            <div className='showLoading'>
                                <img src="/img/load_line.gif" style={{width: '350px', margin: '0 auto'}} alt="" />
                            </div>
                        :    
                            <div>
                                {
                                    this.state.challengeComments.map((item, i) => (
                                        <ShowComment info={item} key={item.id} />
                                    ))
                                }
                            </div>
                        )
                    }
                    {/* {renderComments} */}
                </div>
            </div>
        )
    }
}

export default Comments