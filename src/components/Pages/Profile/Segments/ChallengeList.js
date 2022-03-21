import './../../../styles/profiles.css';
import React from 'react';
import Index from '../Index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import auth from '../../../../services/auth';
import CookieService from '../../../../services/CookieService';

import LoginModal from '../../Auth/LoginModal';

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
  

class ChallengeList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            uinfo: this.props.uinfo,
            challenge_id: this.props.challenge_id,
            challenge_info: {
                id: 0,
                avatar: '/img/avatarguest.png',
                name: '',
                time: '',
                challenge_image: '/img/cards.JPG',
                challenge_title: '',
                challenge_text: '',
                challenge_frequency: '',
                challenge_current_milestone: '',
                like: '',
                dislike: '',
                islikeselected: '',
                view_comment: false,
                challenge_tags: []
            },
            challengeComments: [],
            buildComment: '',
            openModal: false
        }
        
        this.addPostReaction = this.addPostReaction.bind(this);
        this.addCommentReaction = this.addCommentReaction.bind(this);
        this.getChallengeInfo = this.getChallengeInfo.bind(this);
        this.getChallengeComments = this.getChallengeComments.bind(this);
        this.viewComment = this.viewComment.bind(this);
        this.postComment = this.postComment.bind(this);
        this.processComment = this.processComment.bind(this);
        this.processCommentSend = this.processCommentSend.bind(this);
        this.prepCommentHolder = this.prepCommentHolder.bind(this);
        this.profile_main_image = this.profile_main_image.bind(this);

        this.handleOpenLogin = this.handleOpenLogin.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);
    }

    getChallengeInfo(id){
        console.log('challenge -> ', id);
        let pullOriginDatra = 0;

        let self = this;

        api.get('/challenge/'+id, {})
        .then((response) => {
            console.log('API response -> ', response.data);
            let activeChallenge = response.data.challenges[0];
            let challengeinfo = self.state.challenge_info;

            challengeinfo.id = activeChallenge.id;
            challengeinfo.time = activeChallenge.created_at;
            challengeinfo.challenge_title = activeChallenge.name;
            challengeinfo.challenge_text = activeChallenge.description;

            self.setState({challenge_info: challengeinfo});

            self.getOwnerInfo(activeChallenge.owner_id);


        });
    }

    getOwnerInfo(userid){
        console.log('user id -:>', userid);

        api.get('/userprofile/'+userid, {})
        .then((response) => {
            console.log('User response -> ', response);

            // let activeChallenge = response.data.challenges[0];
            // let challengeinfo = self.state.challenge_info;

            // challengeinfo.id = activeChallenge.id;
            // challengeinfo.time = activeChallenge.created_at;
            // challengeinfo.challenge_title = activeChallenge.name;
            // challengeinfo.challenge_text = activeChallenge.description;

            // self.setState({challenge_info: challengeinfo});

            // self.getOwnerInfo(activeChallenge.owner_id);

        });
    }

    getChallengeComments(id){
        let comments_data = [
            {
                id: 1,
                avatar: '/img/prof_icon.png',
                name: 'John S. White',
                time: '3m ago',
                message: 'Sound like fun! Count me in!',
                like: 1,
                dislike: 2,
                islikeselected: 'like'
            },
            {
                id: 2,
                avatar: '/img/prof_icon.png',
                name: 'Black S. Panther',
                time: '3m ago',
                message: 'Sound like fun!\nCount me in!',
                like: 0,
                dislike: 2,
                islikeselected: ''
            },
        ];
        this.setState({challengeComments: comments_data});
    }

    viewComment(){

        let post_info = this.state.challenge_info;

        post_info.view_comment = !post_info.view_comment;

        this.setState({challenge_info: post_info});
    }

    addPostReaction(reaction){
        
        let post_info = this.state.challenge_info;

        if(post_info.islikeselected == ''){ 
            console.log('blank isliked');
            if(reaction == 'like'){
                console.log('+1 like');
                let likevals = post_info.like;
                post_info.like = likevals + 1;
            }

            if(reaction == 'dislike'){
                console.log('+1 dislike');
                let dislikevals = post_info.dislike;
                post_info.dislike = dislikevals + 1;
            }
            post_info.islikeselected = reaction;
        } else {
            let postSelected = post_info.islikeselected;
            if(reaction == postSelected){
                if(reaction == 'like'){
                    console.log('+1 like');
                    let likevals = post_info.like;
                    post_info.like = likevals - 1;
                }
    
                if(reaction == 'dislike'){
                    console.log('+1 dislike');
                    let dislikevals = post_info.dislike;
                    post_info.dislike = dislikevals - 1;
                }
                post_info.islikeselected = '';

            }
            
        }

        this.setState({challenge_info: post_info});
    }

    addCommentReaction(reaction, index){
        let comments = this.state.challengeComments;

        if(comments[index].islikeselected == ''){
            console.log('not liked anything');

            if(reaction == 'like'){
                let likevals = comments[index].like;
                comments[index].like = likevals + 1;
            }

            if(reaction == 'dislike'){
                let dislikevals = comments[index].dislike;
                comments[index].dislike = dislikevals + 1;
            }
            comments[index].islikeselected = reaction;

        } else {
            console.log('has liked -> ', comments[index].islikeselected);

            let postSelected = comments[index].islikeselected;
            if(reaction == postSelected){
                if(reaction == 'like'){
                    console.log('+1 like');
                    let likevals = comments[index].like;
                    comments[index].like = likevals - 1;
                }
    
                if(reaction == 'dislike'){
                    console.log('+1 dislike');
                    let dislikevals = comments[index].dislike;
                    comments[index].dislike = dislikevals - 1;
                }
                comments[index].islikeselected = '';

            }

        }

        this.setState({challengeComments: comments});


        // console.log('selected index ->', selected_comment);
    }

    prepCommentHolder(text){
        // console.log(text);
        let newText = text.split('\n').map((str, i) => <p key={i}>{str}</p>);
        return newText;
    }

    postComment(e){
        let textbase = e.target.value;
        // console.log('text ->', textbase);
        this.setState({buildComment: textbase});
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

    processComment(){
        let comments_infos = this.state.challengeComments;
        let comment_to_add = this.state.buildComment;
        let newCommentContent = comment_to_add.replace(/(?:\r\n|\r|\n)/g, '\n');

        // console.log('new paret -> ', newCommentContent);

        let comment_build = {
            id: 3,
            avatar: this.profile_main_image(),
            name: auth.isAuthenticated() ? auth.userProfile() ? auth.userProfile().name : auth.user().name : 'Guest User',
            time: '3m ago',
            message: newCommentContent,
            like: 0,
            dislike: 0,
            islikeselected: ''
        };

        comments_infos.push(comment_build);
        this.setState({challengeComments: comments_infos});
        this.setState({buildComment: ''});
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
        this.getChallengeInfo(this.state.challenge_id);
        this.getChallengeComments(this.state.challenge_id);
    }

    handleOpenLogin(){
        this.setState({ openModal: true });
    }

    handleCloseLogin(){
        this.setState({ openModal: false });
    }
    

    render () {

        return (
            <div className="dch-item">
                <div className="ditm-inner">
                    <div className="dchallengeheadpart">
                        <div className="dpartimage">
                            <div className="dpimageinner">
                                <img alt="" src={this.state.challenge_info.avatar}/>
                            </div>
                        </div>
                        <div className="dheadtile">
                            <h3><span className="dusername">{this.state.challenge_info.name}</span> created a <span className="dactivity">Challenge for herself!</span></h3>
                            <div className="dtime">{this.state.challenge_info.time}</div>
                            <div className="dtags">
                                {this.state.challenge_info.challenge_tags.map((message, i) => (
                                    <span key={i}>{message}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="challange_content">
                        <div className="cc_inner">
                            <div className="dimage">
                                <div className="dimg-inner">
                                    <img alt="" src={this.state.challenge_info.challenge_image}/>
                                </div>
                            </div>
                            <div className="dinfo">
                                <div className="dinfo-inner">
                                    <div className="dfreq">{this.state.challenge_info.challenge_frequency}</div>
                                    <div className="dtitle">{this.state.challenge_info.challenge_title}</div>
                                    <div className="ddesc">{this.state.challenge_info.challenge_text}</div>
                                    <div className="dstatus">
                                        <span>Current milestone:</span> {this.state.challenge_info.challenge_current_milestone}
                                    </div>
                                    <div className="dprogress">
                                        <div className="douter">
                                            <div className="dorange">&nbsp;</div>
                                        </div>
                                    </div>
                                    <div className="dbuttons">
                                        <button>View Challenge</button>
                                        <button className="dwhitebg">Join Challenge</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="challengebuttom">
                        <div className="dcb-inner">
                            <div className={"dcleft " + (this.state.challenge_info.islikeselected != '' ? 'has-selected-item' : '')}>
                                <div onClick={() => this.addPostReaction('like')} className={"dc-left-item " + (this.state.challenge_info.islikeselected == 'like' ? 'isactive_tab' : '')}>
                                    <div className="dicon">
                                        <div className="dclikable">
                                            <img alt="" src={(this.state.challenge_info.islikeselected == 'like' ? '/img/like_h.png' : '/img/like.png')}/>
                                        </div>
                                    </div>
                                    <div className="dvals">
                                        <div className="dv-inner">{this.state.challenge_info.like}</div>
                                    </div>
                                </div>
                                <div onClick={() => this.addPostReaction('dislike')} className={"dc-left-item " + (this.state.challenge_info.islikeselected == 'dislike' ? 'isactive_tab' : '')}>
                                    <div className="dicon">
                                        <div className="dclikable">
                                            <img alt="" src={(this.state.challenge_info.islikeselected == 'dislike' ? '/img/dislike_h.png' : '/img/dislike.png')}/>
                                        </div>
                                    </div>
                                    <div className="dvals">
                                        <div className="dv-inner">{this.state.challenge_info.dislike}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="dcright" onClick={() => this.viewComment()}>
                                <div className="dccomment">
                                    <img alt="" src="/img/comment.png"/>
                                </div>
                            </div>
                            <br className="clear" />
                        </div>
                    </div>
                    
                </div>
                <div className={"dtm-comments " + (this.state.challenge_info.view_comment ? 'active_comments' : 'inactive_comments')} style={{marginTop: '45px'}}>
                        <div className="drm-comments-inner">
                            {
                                this.state.challengeComments.map((comment, index) => (
                                    <div className="dtm-comment-inner" key={index}>
                                        <div className="dtm-comment-image">
                                            <img alt="" src={comment.avatar} />
                                        </div>
                                        <div className="dtm-comment-content">
                                            <div className="dpagetitle">{ comment.name }<span className="dtime">{ comment.time }</span></div>
                                            <div className="dcommentcontent">
                                                <div className="dcm-text">{ this.prepCommentHolder(comment.message) }</div>
                                                <div className="dcm-options">
                                                    <div className="doptleft">
                                                        <div className="dc-left-item" onClick={() => this.addCommentReaction('like', index)}>
                                                            <div className="dicon">
                                                                <div className="dclikable">
                                                                    <img alt="" src={(comment.islikeselected == 'like' ? '/img/like_h.png' : '/img/like.png')}/>
                                                                </div>
                                                            </div>
                                                            <div className="dvals">
                                                                <div className="dv-inner">{comment.like}</div>
                                                            </div>
                                                        </div>
                                                        <div className="dc-left-item" onClick={() => this.addCommentReaction('dislike', index)}>
                                                            <div className="dicon">
                                                                <div className="dclikable">
                                                                    <img alt="" src={(comment.islikeselected == 'dislike' ? '/img/dislike_h.png' : '/img/dislike.png')}/>
                                                                </div>
                                                            </div>
                                                            <div className="dvals">
                                                                <div className="dv-inner">{comment.dislike}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="doptright">
                                                        <button>Reply</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="dreplypart">
                                <div className="dr-inner">
                                    {
                                        auth.isAuthenticated() ? 
                                            <div>
                                                <div className="dpartimage">
                                                    <div className="dpimage"><img alt="" src={this.profile_main_image()}/></div>
                                                </div>
                                                <div className="dformpart">
                                                    <div className="dforminner">
                                                        <div className="dftextarea">
                                                            <textarea value={this.state.buildComment} onKeyPress={(event) => this.processCommentSend(event)} onChange={(e) => this.postComment(e)} name="" id="" placeholder="Leave a comment"></textarea>
                                                        </div>
                                                        <div className="demoticons">
                                                            <button onClick={() => this.processComment()}><FontAwesomeIcon icon={faSmile} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        :
                                        <div>
                                            <div className="dpartimage">
                                                &nbsp;
                                            </div>
                                            <div className="dformpart">
                                                <div className="dforminner dcommentloginnow">
                                                    please <span onClick={this.handleOpenLogin} className="login_in_comment">login</span> to leave a comment 
                                                </div>
                                                {this.state.openModal && <LoginModal closeModal={this.handleCloseLogin } />}
                                            </div>
                                        </div>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default ChallengeList