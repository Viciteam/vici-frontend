import './../../../styles/profiles.css';
import React from 'react';
import Index from '../Index';

import ReactModal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import auth from '../../../../services/auth';
import CookieService from '../../../../services/CookieService';

import LoginModal from '../../Auth/LoginModal';

import axios from 'axios'

import moment from 'moment';

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
  

class ChallengeList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            uinfo: this.props.uinfo,
            challenge_info: this.props.challenge_id,
            challengeComments: [],
            buildComment: '',
            openModal: false,
            joinChallengeModal: false,
            joinChallengeStep: 1,
            joinChallengeSelected: 'individual',
            joinChallengeSelectedSquad: 'Please select a Squad',
            joinChallengeSelectedClan: 'Please select a Clan',
            hasUserLogin: false
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
        this.goViewChallenge = this.goViewChallenge.bind(this);

        this.handleOpenLogin = this.handleOpenLogin.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);

        // join challenge
        this.openJoinChallenge = this.openJoinChallenge.bind(this);
        this.joinChallengeOption = this.joinChallengeOption.bind(this);
        this.closeJoinChallenge = this.closeJoinChallenge.bind(this);
        this.confirmJoinChallenge = this.confirmJoinChallenge.bind(this);
        this.showChallengeDetails = this.showChallengeDetails.bind(this);
    }

    getChallengeInfo(){
        console.log('challenge -> '+this.props.challenge_id.id+' ', this.props.challenge_id.actions);
        let setDefaults = this.state.challenge_info;
        setDefaults.view_comment = false;
        setDefaults.like = 0;
        setDefaults.dislike = 0;
        setDefaults.islikeselected = '';

        this.setState({challenge_info: setDefaults});
        
    }


    getChallengeComments(){
        // console.log('challenge challengeid -> ', challengeid);
        this.setState({challengeComments: []});
        let self = this;
        if(this.state.hasUserLogin){
            api.get('/getchallenge_comments/'+this.props.challenge_id.id, {})
            .then((response) => {
                // console.log('challenge commetns for '+challengeid+' -> ', response.data.comments.data);
                self.setState({challengeComments: response.data.comments.data});
            });
        }
        
        
    }

    viewComment(){

        let post_info = this.state.challenge_info;

        post_info.view_comment = !post_info.view_comment;

        this.setState({challenge_info: post_info});
    }

    addPostReaction(reaction){
        if(this.state.hasUserLogin){
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
        } else {
            console.log('no user login');
            let post_info = this.state.challenge_info;
            post_info.view_comment = !post_info.view_comment;
            this.setState({challenge_info: post_info});
        }
        
    }

    addCommentReaction(reaction, index){
        
        let comments = this.state.challengeComments;
        console.log('this copmmnet ->', comments[index]);

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

    }

    prepCommentHolder(text){
        // console.log(text);
        let newText = text.split('\n').map((str, i) => <p key={i}>{str}</p>);
        return newText;
    }

    postComment(e){
        let textbase = e.target.value;
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
        let userid = auth.user();
        let comment_info = {
            "user_id": userid.id,
            "challenge_id": this.props.challenge_id.id,
            "time":"0 mins ago",
            "post_media":"",
            "post_message": newCommentContent,
            "likes":"0",
            "dislikes":"0",
            "islikeselected": "",
            "isPrivate":"0"
        };

        let self = this;

        api.post('/challenge_comment', comment_info)
        .then((response) => {
            console.log('challenge comment-> ', response.data.challenge_comment);
            self.getChallengeComments(this.props.challenge_id.id);
            self.setState({buildComment: ''});
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

    goViewChallenge(id){
      // console.log('visit challenge -> ', id);

        window.location.replace('/challenge/'+id);
    
    
    }

    openJoinChallenge(){
        this.setState({ joinChallengeStep: 1 });
        this.setState({ joinChallengeModal: true });
    }

    joinChallengeOption(selected){
        this.setState({ joinChallengeSelected: selected });
    }

    closeJoinChallenge(){
        this.setState({ joinChallengeModal: false });
    }

    confirmJoinChallenge(){
        let self = this;
        let userid = auth.user();
        let params = {
            "challenge_id": this.props.challenge_id.id,
            "user_id": userid.id,
            "status": "Active",
        };

        // let parameters = JSON.stringify(params);

        api.post('/participant', params)
        .then((response) => {
            console.log(response);

            self.setState({ joinChallengeStep: 2 });
        });
    }

    showChallengeDetails(){
        window.location.replace('/challenge/'+this.state.challenge_info.id);
    }

    checkHasUserLogin(){
        if(auth.isAuthenticated()){
            this.setState({hasUserLogin: true});
        } else {
            this.setState({hasUserLogin: false});
        }
    }


    componentDidMount(){
        this.checkHasUserLogin();
        this.getChallengeInfo();
        this.getChallengeComments();
    }

    handleOpenLogin(){
        this.setState({ openModal: true });
    }

    handleCloseLogin(){
        this.setState({ openModal: false });
    }
    

    render () {

        let joinChallenge = () => {
            if(this.state.joinChallengeStep === 1){

                let clanOptions = () => {
                    if(this.state.joinChallengeSelected === 'clan'){
                        return (
                            <div className="join-challenge-idv-options">
                                <div className="join-challenge-idv-options-items">
                                    <label htmlFor="">Coming soon</label>
                                    {/* <div className="d-select-squad">
                                        <div className="d-selected-squad">{this.state.joinChallengeSelectedClan}</div>
                                        <div className="d-squad-options">
                                            <div className="d-select-squad-item">Clan 1</div>
                                            <div className="d-select-squad-item">Clan 2</div>
                                            <div className="d-select-squad-item">Clan 3</div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        );
                    }
                }

                let squadOptions = () => {
                    if(this.state.joinChallengeSelected === 'squad'){
                        return (
                            <div className="join-challenge-idv-options">
                                <div className="join-challenge-idv-options-items">
                                    <label htmlFor="">Coming soon</label>
                                    {/* <div className="d-select-squad">
                                        <div className="d-selected-squad">{this.state.joinChallengeSelectedSquad}</div>
                                        <div className="d-squad-options">
                                            <div className="d-select-squad-item">Squad 1</div>
                                            <div className="d-select-squad-item">Squad 2</div>
                                            <div className="d-select-squad-item">Squad 3</div>
                                            <div className="d-select-squad-item create-a-squad">Create a squad</div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        );
                    }
                }
                return (
                    <div className="join-challenge-steps challenge-step-one">
                        <div className="join-challenge-inner">
                            <div className="join-challenge-header">Join Challenge</div>
                            <div className="join-challenge-content">
                                <div className="join-challenge-content-inner">
                                    <h3>How do you want to join the challenge?</h3>
                                    <div className="join-challenge-item">
                                        <div className="d-join-checkbox">
                                            <input type="radio" name="selectjoin[]" defaultChecked onChange={() => this.joinChallengeOption('individual')} />
                                        </div>
                                        <div className="d-join-content">
                                            <div className="join-challenge-item-title">Join as an indvidual</div>
                                            <div className="join-challenge-item-subtitle">Join the challenge as yourself.</div>
                                        </div>
                                        {/* {individualOptions()} */}
                                    </div>
                                    <div className="join-challenge-item">
                                        <div className="d-join-checkbox">
                                            <input disabled type="radio" name="selectjoin[]" onChange={() => this.joinChallengeOption('clan')} />
                                        </div>
                                        <div className="d-join-content">
                                            <div className="join-challenge-item-title">Represent a Clan (Coming soon)</div>
                                            <div className="join-challenge-item-subtitle">Choose a clan to represent when doing the challenge, chosen clan name will be shown in participant progress.</div>
                                        </div>
                                        {clanOptions()}
                                    </div>
                                    <div className="join-challenge-item">
                                        <div className="d-join-checkbox">
                                            <input disabled type="radio" name="selectjoin[]" onChange={() => this.joinChallengeOption('squad')} />
                                        </div>
                                        <div className="d-join-content">
                                            <div className="join-challenge-item-title">Join as a Squad (Coming soon)</div>
                                            <div className="join-challenge-item-subtitle">Invite your squad members to join the challenge with you.</div>
                                        </div>
                                        {squadOptions()}
                                    </div>
                                </div>
                            </div>
                            <div className="join-challenge-footer">
                                <button className="cancel-option" onClick={() => this.closeJoinChallenge()}>Cancel</button>
                                <button className="join-option" onClick={() => this.confirmJoinChallenge()}>Join Challenge</button>
                            </div>
                        </div>
                    </div>
                );
            }

            if(this.state.joinChallengeStep === 2){
                return (
                    <div className="join-challenge-steps challenge-step-two">
                        <div className="ms-watch-modal">
                            <div className="ms-watch-modal-inner">
                                <div className="ms-watch-header-top">
                                    <img src="/img/watch_header.png" alt="" />
                                </div>
                                <div className="ms-watch-content">
                                    <div className="ms-watch-join">
                                        <h3>Challenge Joined!</h3>
                                        <div className="ms-join-success">Start doing the actions now or<br />invite some friends to join you!</div>
                                    </div>
                                    <div className="dsub-desc-ops">
                                        <button className="cancel-option" onClick={() => this.closeJoinChallenge()}>Close</button>
                                        <button className="savebutton" onClick={() => this.showChallengeDetails()}>Challenge Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        };

        return (
            <div className="dch-item">
                <div className="ditm-inner">
                    <div className="dchallengeheadpart">
                        <div className="dpartimage">
                            <div className="dpimageinner">
                                <img alt="" src={this.props.challenge_id.profpic_link}/>
                            </div>
                        </div>
                        <div className="dheadtile">
                            <h3><span className="dusername">{this.props.challenge_id.name}</span> created a <span className="dactivity">Challenge for herself!</span></h3>
                            <div className="dtime">{moment(this.props.challenge_id.created_at).fromNow()}</div>
                            <div className="dtags">
                                {/* {this.props.challenge_id.challenge_tags.map((message, i) => (
                                    <span key={i}>{message}</span>
                                ))} */}
                            </div>
                        </div>
                    </div>
                    <div className="challange_content">
                        <div className="cc_inner">
                            <div className="dimage">
                                <div className="dimg-inner">
                                    {/* <img alt="" src={this.props.challenge_id.challenge_image}/> */}
                                    <img alt="" src='/img/cards.JPG'/>
                                </div>
                            </div>
                            <div className="dinfo">
                                <div className="dinfo-inner">
                                    {/* <div className="dfreq">{this.props.challenge_id.challenge_frequency}</div>
                                    <div className="dtitle">{this.props.challenge_id.challenge_title}</div> */}
                                    <div className="ddesc">{this.props.challenge_id.description}</div>
                                    {
                                        (this.props.challenge_id.actions.length > 0  ? 
                                            <div>
                                                <div className="dstatus">
                                                    <span>Current milestone:</span> {this.props.challenge_id.actions[0].name}
                                                </div>
                                            </div>
                                            
                                            :
                                            <div>
                                                <div className="dstatus">
                                                    <span>Currently no milestone yet</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="dprogress">
                                        <div className="douter">
                                            <div className="dorange">&nbsp;</div>
                                        </div>
                                    </div>
                                    <div className="dbuttons">
                                        <button onClick={() => this.goViewChallenge(this.props.challenge_id.id)}>View Challenge</button>
                                        {
                                            (this.state.hasUserLogin ? 
                                                <button className="dwhitebg" onClick={() => this.openJoinChallenge()}>Join Challenge</button>
                                            :
                                                <div>&nbsp;</div>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="challengebuttom">
                        <div className="dcb-inner">
                            <div className={"dcleft " + (this.props.challenge_id.islikeselected != '' ? 'has-selected-item' : '')}>
                                <div onClick={() => this.addPostReaction('like')} className={"dc-left-item " + (this.props.challenge_id.islikeselected == 'like' ? 'isactive_tab' : '')}>
                                    <div className="dicon">
                                        <div className="dclikable">
                                            <img alt="" src={(this.props.challenge_id.islikeselected == 'like' ? '/img/like_h.png' : '/img/like.png')}/>
                                        </div>
                                    </div>
                                    <div className="dvals">
                                        <div className="dv-inner">{this.props.challenge_id.like}</div>
                                    </div>
                                </div>
                                <div onClick={() => this.addPostReaction('dislike')} className={"dc-left-item " + (this.props.challenge_id.islikeselected == 'dislike' ? 'isactive_tab' : '')}>
                                    <div className="dicon">
                                        <div className="dclikable">
                                            <img alt="" src={(this.props.challenge_id.islikeselected == 'dislike' ? '/img/dislike_h.png' : '/img/dislike.png')}/>
                                        </div>
                                    </div>
                                    <div className="dvals">
                                        <div className="dv-inner">{this.props.challenge_id.dislike}</div>
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
                <div className={"dtm-comments " + (this.props.challenge_id.view_comment ? 'active_comments' : 'inactive_comments')} style={{marginTop: '45px'}}>
                        <div className="drm-comments-inner">
                            {
                                this.state.challengeComments.map((comment, index) => (
                                    <div className="dtm-comment-inner" key={index}>
                                        <div className="dtm-comment-image">
                                            <img alt="" src={comment.profpic_link} />
                                        </div>
                                        <div className="dtm-comment-content">
                                            <div className="dpagetitle">{ comment.name }<span className="dtime">{moment(comment.created_at).fromNow()}</span></div>
                                            <div className="dcommentcontent">
                                                <div className="dcm-text">{ (comment.comment_message ? this.prepCommentHolder(comment.comment_message) : comment.comment_message) }</div>
                                                {/* <div className="dcm-text">{ comment.comment_message }</div> */}
                                                <div className="dcm-options">
                                                    <div className="doptleft">
                                                        <div className="dc-left-item" onClick={() => this.addCommentReaction('like', index)}>
                                                            <div className="dicon">
                                                                <div className="dclikable">
                                                                    <img alt="" src={(comment.islikeselected == 'like' ? '/img/like_h.png' : '/img/like.png')}/>
                                                                </div>
                                                            </div>
                                                            <div className="dvals">
                                                                <div className="dv-inner">{comment.likes}</div>
                                                            </div>
                                                        </div>
                                                        <div className="dc-left-item" onClick={() => this.addCommentReaction('dislike', index)}>
                                                            <div className="dicon">
                                                                <div className="dclikable">
                                                                    <img alt="" src={(comment.islikeselected == 'dislike' ? '/img/dislike_h.png' : '/img/dislike.png')}/>
                                                                </div>
                                                            </div>
                                                            <div className="dvals">
                                                                <div className="dv-inner">{comment.dislikes}</div>
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

                <ReactModal
                    isOpen={this.state.joinChallengeModal}
                    contentLabel="Example Modal"
                    className="join_challenge_modal"
                    ariaHideApp={false}
                >
                    <div className="ms-watch-modal">
                        {joinChallenge()}
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default ChallengeList