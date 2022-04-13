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
            challengeComments: [],
            buildComment: '',
            fileComment: '',
            fileUploader: null,
            showLoading: false
        }

        this.processCommentSend = this.processCommentSend.bind(this);
        this.postComment = this.postComment.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.inputFileRef = React.createRef();
    }

    uploadFile() {
        this.inputFileRef.current.click();
    };


    async setFile(event) {
        const objectUrl = URL.createObjectURL(event.target.files[0])
        this.setState({fileComment: objectUrl});
        console.log('my file', objectUrl)
    }

    processCommentSend(e){
        // console.log('text ->', e.key);
        if(e.key === 'Enter'){
            if(e.shiftKey){
                // console.log('has shift key pressed');
            } else {
                // console.log('has pressed enter');
                this.processComment();
                e.preventDefault();
            }
        }
    }

    postComment(e){
        let textbase = e.target.value;
        this.setState({buildComment: textbase});
    }

    processComment(){
        let comment_to_add = this.state.buildComment;
        let newCommentContent = comment_to_add.replace(/(?:\r\n|\r|\n)/g, '\n');
        let challenge_path = window.location.pathname.split("/");
        let challenge_id = challenge_path[challenge_path.length - 1];
        let userid = auth.user();
        let comment_info = {
            "user_id": userid.id,
            "challenge_id": challenge_id,
            "time":"0 mins ago",
            "post_media": this.state.fileComment,
            "post_message": newCommentContent,
            "likes":"0",
            "dislikes":"0",
            "islikeselected": "",
            "isPrivate":"0"
        };

        let self = this;

        api.post('/challenge_comment', comment_info)
        .then((response) => {
            // console.log('challenge comment-> ', response.data.challenge_comment);
            self.getComments(challenge_id);
            self.setState({buildComment: ''});
            self.setState({fileComment: ''});
        });   
    }

    getComments(id){
        this.setState({showLoading: true});
        let self = this;
        api.get('/getchallenge_comments/'+id, {})
        .then((response) => {
            // console.log('challenge commetns for '+id+' -> ', response.data.comments.data);
            self.setState({challengeComments: response.data.comments.data});
            self.setState({showLoading: false});
        }).catch((error) => {
            console.log('challenge commetns -> ', error);
        });
    }

    profile_main_image(){
        let show_image = '';
        const user_profile = CookieService.get("user_profile");
        if(user_profile !== undefined ){
            if(user_profile.fb_user_id !== undefined){
                // console.log('user profile from sideber -> ', user_profile.fb_user_id);
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
        // console.log('challenge id -> ', challenge_id);
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
                            <textarea value={this.state.buildComment} onKeyPress={(event) => this.processCommentSend(event)} onChange={(e) => this.postComment(e)} placeholder="Write something..."></textarea>
                        </div>
                        <div className="py-3">
                            <img src={this.state.fileComment} width="50" />
                        </div>
                    </div>
                    <div className="dpostops">
                        <div className="dopsleft">
                            <button onClick={this.uploadFile} className="dimagepart"><FontAwesomeIcon icon={faImage} /></button>
                            <button onClick={this.uploadFile} className="dlinkpart"><FontAwesomeIcon icon={faLink} /></button>
                            <input type="file" id="commentfile" onChange={this.setFile.bind(this)}  ref={this.inputFileRef} style={{display: "none"}}/>
                        </div>
                        <div className="dopsright" onClick={() => this.processComment()}>
                            <button className="dsendpost"><FontAwesomeIcon icon={faPaperPlane} /></button>
                        </div>
                    </div>
                </div>
                <div className="dpostlist">
                    {
                        (this.state.showLoading ?
                            <div className='showLoading'>
                                <img src="/img/load_line.gif" style={{width: '350px', margin: '0 auto'}} alt="" />
                            </div>
                        :    
                            (this.state.challengeComments.length === 0 ? 
                                <div className='d-no-comments-yet'>
                                    No comments yet
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
                            
                        )
                    }
                    {/* {renderComments} */}
                </div>
            </div>
        )
    }
}

export default Comments