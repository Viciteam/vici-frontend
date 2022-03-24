import './../../../styles/challenge.css';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import { fa } from 'faker/lib/locales';

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

class PostUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive,
            post_information: this.props.postinfo,
            post: [],
            comments: [],
            buildComment: ''
        }

        this.loadPostData = this.loadPostData.bind(this);
        this.addPostReaction = this.addPostReaction.bind(this);
        this.addCommentReaction = this.addCommentReaction.bind(this);
        this.viewComment = this.viewComment.bind(this);
        this.postComment = this.postComment.bind(this);
        this.processComment = this.processComment.bind(this);
        this.processCommentSend = this.processCommentSend.bind(this);
        this.prepCommentHolder = this.prepCommentHolder.bind(this);

        this.handleOpenLogin = this.handleOpenLogin.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);
    }

    loadPostData(){

        let baseinfo = this.state.post_information;
        console.log('user information ->', baseinfo);

        baseinfo.name = auth.userProfile().name;
        baseinfo.view_comment = false;

        this.setState({post_information: baseinfo});

        // pull post information as per API
        // let post_info = {
        //     id: 1,
        //     avatar: '/img/user_main.jpg',
        //     name: 'John Peter Doe',
        //     time: '5m ago',
        //     message: [
        //         {
        //             text: 'Think i wanna do the bookwork challenge soon, haven\'t read a book since! Who wants to join?',
        //             image: '/img/profile-timeline.jpg',
        //         }
        //     ],
        //     like: 2,
        //     dislike: 3,
        //     islikeselected: '',
        //     view_comment: false
        // };
        // this.setState({post: post_info});
    }

    loadComments(){

        this.setState({comments: []});
        let self = this;

        api.get('/getnewsfeed_comments/'+this.props.postinfo.id, {})
        .then((response) => {
            console.log('post commetns for -> ', response.data.comments.data);
            self.setState({comments: response.data.comments.data});
        });


        // let comments_data = [
        //     {
        //         id: 1,
        //         avatar: '/img/prof_icon.png',
        //         name: 'John S. White',
        //         time: '3m ago',
        //         message: 'Sound like fun! Count me in!',
        //         like: 1,
        //         dislike: 2,
        //         islikeselected: 'like'
        //     },
        //     {
        //         id: 2,
        //         avatar: '/img/prof_icon.png',
        //         name: 'Black S. Panther',
        //         time: '3m ago',
        //         message: 'Sound like fun!\nCount me in!',
        //         like: 0,
        //         dislike: 2,
        //         islikeselected: ''
        //     },
        // ];
        // this.setState({comments: comments_data});
    }

    addPostReaction(reaction){
        
        let post_info = this.state.post;
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

        this.setState({post: post_info});
    }

    addCommentReaction(reaction, index){
        let comments = this.state.comments;

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

        this.setState({comments: comments});


        // console.log('selected index ->', selected_comment);
    }

    viewComment(){

        let post_info = this.state.post_information;
        console.log('this -> ', post_info.view_comment);
        post_info.view_comment = !post_info.view_comment;

        this.setState({post_information: post_info});
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
        console.log('text ->', textbase);
        this.setState({buildComment: textbase});
    }

    prepCommentHolder(text){
        // console.log(text);
        let newText = text.split('\n').map((str, k) => <p key={k}>{str}</p>);
        return newText;
    }
    
    processComment(){
        let comments_infos = this.state.comments;
        let comment_to_add = this.state.buildComment;
        let newCommentContent = comment_to_add.replace(/(?:\r\n|\r|\n)/g, '\n');

        let userid = auth.user();

        let comments_build = {
            "user_id": userid.id,
            "post_id": this.props.postinfo.id,
            "time":"10 mins ago",
            "post_media":"",
            "post_message": newCommentContent,
            "likes":"0",
            "dislikes":"0",
            "islikeselected": "",
            "isPrivate":"0"
        };
        let self = this;
        api.post('/newsfeed_comment', comments_build)
        .then((response) => {
            console.log('challenge comment-> ', response.data.newsfeed_comment);
            self.loadComments(this.props.postinfo.id);
            self.setState({buildComment: ''});
        });

        // comments_infos.push(comment_build);
        // this.setState({comments: comments_infos});
        // this.setState({buildComment: ''});
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

    handleOpenLogin(){
        this.setState({ openModal: true });
    }

    handleCloseLogin(){
        this.setState({ openModal: false });
    }

    componentDidMount(){
        this.loadPostData();
        this.loadComments();
    }

    render () {
        
        return (
            <div className="dtimelinemain">
                { Object.keys(this.state.post_information).length == 0 ? 
                    <div className='loading-part'>
                        Loading
                    </div>
                    :
                    <div className="dtm-inner">
                        {/* BOF post item */}
                        <div className="dtm-item">
                            <div className="dtm-item-inner">
                                <div className="dtm-header">
                                    <div className="dtm-item-image">
                                        <div className="dtm-item-image-inner">
                                            {/* <img alt="" src={ this.state.post_information.avatar }/> */}
                                            <img alt="" src={ this.profile_main_image() }/>
                                        </div>
                                    </div>
                                    <div className="dtm-item-info">
                                        <div className="dtm-item-info-inner">
                                            <h3>{ this.state.post_information.name }</h3>
                                            <div className="subinfo">{moment(this.state.post_information.created_at).fromNow()}</div>
                                        </div>
                                    </div>
                                    <br className="clear" />
                                </div>
                                <div className="dtm-content">
                                    <div className='dtm-content-inner'>
                                    { this.prepCommentHolder(this.state.post_information.post_message) }
                                    </div>
                                </div>
                                <div className="challengebuttom dtimeline">
                                    <div className="dcb-inner">
                                        <div className={"dcleft " + (this.state.post_information.islikeselected != '' ? 'has-selected-item' : '')}>
                                            <div onClick={() => this.addPostReaction('like')} className={"dc-left-item " + (this.state.post_information.islikeselected == 'like' ? 'isactive_tab' : '')}>
                                                <div className="dicon">
                                                    <div className="dclikable">
                                                        <img alt="" src={(this.state.post_information.islikeselected == 'like' ? '/img/like_h.png' : '/img/like.png')}/>
                                                    </div>
                                                </div>
                                                <div className="dvals">
                                                    <div className="dv-inner">{ this.state.post_information.likes }</div>
                                                </div>
                                            </div>
                                            <div onClick={() => this.addPostReaction('dislike')} className={"dc-left-item " + (this.state.post_information.islikeselected == 'dislike' ? 'isactive_tab' : '')}>
                                                <div className="dicon">
                                                    <div className="dclikable">
                                                        <img alt="" src={(this.state.post_information.islikeselected == 'dislike' ? '/img/dislike_h.png' : '/img/dislike.png')}/>
                                                    </div>
                                                </div>
                                                <div className="dvals">
                                                    <div className="dv-inner">{ this.state.post_information.dislikes }</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dcright" onClick={() => this.viewComment()}>
                                            <div className="dccomment" >
                                                <img alt="" src="/img/comment.png"/>
                                            </div>
                                        </div>
                                        <br className="clear" />
                                    </div>
                                </div>
                            </div>
                            <div className={"dtm-comments " + (this.state.post_information.view_comment ? 'active_comments' : 'inactive_comments')}>
                                <div className="drm-comments-inner">
                                    {
                                        this.state.comments.map((comment, index) => (
                                            <div className="dtm-comment-inner" key={index}>
                                                <div className="dtm-comment-image">
                                                    <img alt="" src={comment.profpic_link} />
                                                </div>
                                                <div className="dtm-comment-content">
                                                    <div className="dpagetitle">{ comment.name }<span className="dtime">{moment(comment.created_at).fromNow()}</span></div>
                                                    <div className="dcommentcontent">
                                                        <div className="dcm-text">
                                                            this isa tomment
                                                        {/* { this.prepCommentHolder(comment.message) } */}
                                                        </div>
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
                                                            please <span onClick={this.handleOpenLogin} class="login_in_comment">login</span> to leave a comment 
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
                        {/* EOF post item */}
                    </div>
                }
                
                
            </div>
        )
    }
}

export default PostUser