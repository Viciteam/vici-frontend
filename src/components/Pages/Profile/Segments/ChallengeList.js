import './../../../styles/profiles.css';
import React from 'react';
import Index from '../Index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

class ChallengeList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            uinfo: this.props.uinfo,
            challenge_id: this.props.challenge_id,
            challenge_info: {
                challenge_tags: []
            },
            challengeComments: []
        }
        
        this.addPostReaction = this.addPostReaction.bind(this);
        this.addCommentReaction = this.addCommentReaction.bind(this);
        this.getChallengeInfo = this.getChallengeInfo.bind(this);
        this.getChallengeComments = this.getChallengeComments.bind(this);
        this.viewComment = this.viewComment.bind(this);
    }

    getChallengeInfo($id){
        let challenge_information = {
            id: 1,
            avatar: '/img/user_main.jpg',
            name: 'John Peter Doe haw',
            time: '5m ago',
            challenge_tags: ['health', 'productibity'],
            challenge_image: '/img/cards.JPG',
            challenge_title: 'Healthy Spirits!',
            challenge_text: 'Discipline yourself to drink water more ofter. Begin a healthy life with a small step',
            challenge_frequency: 'Daily',
            challenge_current_milestone: '243 Glasses',
            like: 2,
            dislike: 3,
            islikeselected: '',
            view_comment: true
        };
        this.setState({challenge_info: challenge_information});
    }

    getChallengeComments($id){
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
                message: 'Sound like fun! Count me in!',
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

    componentDidMount(){
        this.getChallengeInfo(this.state.challenge_id);
        this.getChallengeComments(this.state.challenge_id);
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
                                {this.state.challenge_info.challenge_tags.map((message) => (
                                    <span>{message}</span>
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
                                                <div className="dcm-text">{ comment.message }</div>
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
                                    <div className="dpartimage">
                                        <div className="dpimage"><img alt="" src="/img/user_main.jpg"/></div>
                                    </div>
                                    <div className="dformpart">
                                        <div className="dforminner">
                                            <div className="dftextarea">
                                                <textarea value={this.state.buildComment} onChange={(e) => this.postComment(e.target.value)} name="" id="" placeholder="Leave a comment"></textarea>
                                            </div>
                                            <div className="demoticons">
                                                <button onClick={() => this.processComment()}><FontAwesomeIcon icon={faSmile} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default ChallengeList