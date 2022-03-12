import './../../../styles/challenge.css';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import { fa } from 'faker/lib/locales';

class PostUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive,
            post_id: this.props.postinfo,
            post: [],
            comments: []
        }

        this.loadPostData = this.loadPostData.bind(this);
        this.addPostReaction = this.addPostReaction.bind(this);
        this.addCommentReaction = this.addCommentReaction.bind(this);
        this.viewComment = this.viewComment.bind(this);
    }

    _handleComment = (e, index) => {
        if (e.key === 'Enter') {
            let array = [...this.state.posts]; // make a separate copy of the array
            const newComment = {
                avatar: '/img/prof_icon.png',
                name: 'John S. White',
                time: '3m ago',
                message: this.state.postComments,
            }
            if (index !== -1) {
                array.forEach((elem, i) =>{
                    if(index === i){
                        const data = {
                            avatar: '/img/user_main.jpg',
                            name: 'John Peter Doe',
                            time: '5m ago',
                            message: [...elem.message],
                            comments: [...elem.comments, newComment],
                        }
                        array.splice(index, 1, data);
                    }
                })
                //array.splice(index, 1);
                this.setState({posts: array});
                this.setState({postComments: ''});
            }
        }
    }

    loadPostData(){
        console.log('load post information -> ', this.state.post_id);

        // pull post information as per API
        let post_info = {
            id: 1,
            avatar: '/img/user_main.jpg',
            name: 'John Peter Doe',
            time: '5m ago',
            message: [
                {
                    text: 'Think i wanna do the bookwork challenge soon, haven\'t read a book since! Who wants to join?',
                    image: '/img/profile-timeline.jpg',
                }
            ],
            like: 2,
            dislike: 3,
            islikeselected: '',
            view_comment: true
        };
        this.setState({post: post_info});
    }

    loadComments(){
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
        this.setState({comments: comments_data});
    }

    addPostReaction(reaction){
        
        let post_info = this.state.post;
        console.log('post-part -> ', post_info);
        console.log('reaction -> ', reaction);

        

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
        let post_info = this.state.post;

        post_info.view_comment = !post_info.view_comment;

        this.setState({post: post_info});
    }
    

    componentDidMount(){
        this.loadPostData();
        this.loadComments();
    }

    render () {
        
        return (
            <div className="dtimelinemain">
                { Object.keys(this.state.post).length == 0 ? 
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
                                            <img alt="" src={ this.state.post.avatar }/>
                                        </div>
                                    </div>
                                    <div className="dtm-item-info">
                                        <div className="dtm-item-info-inner">
                                            <h3>{ this.state.post.name }</h3>
                                            <div className="subinfo">{ this.state.post.time }</div>
                                        </div>
                                    </div>
                                    <br className="clear" />
                                </div>
                                <div className="dtm-content">
                                    {this.state.post.message.map((mess, index) => (
                                        <div className="dtm-content-inner" key={index}>
                                            { mess.text }
                                        </div>  
                                    ))}
                                </div>
                                <div className="challengebuttom dtimeline">
                                    <div className="dcb-inner">
                                        <div className={"dcleft " + (this.state.post.islikeselected != '' ? 'has-selected-item' : '')}>
                                            <div onClick={() => this.addPostReaction('like')} className={"dc-left-item " + (this.state.post.islikeselected == 'like' ? 'isactive_tab' : '')}>
                                                <div className="dicon">
                                                    <div className="dclikable">
                                                        <img alt="" src={(this.state.post.islikeselected == 'like' ? '/img/like_h.png' : '/img/like.png')}/>
                                                    </div>
                                                </div>
                                                <div className="dvals">
                                                    <div className="dv-inner">{ this.state.post.like }</div>
                                                </div>
                                            </div>
                                            <div onClick={() => this.addPostReaction('dislike')} className={"dc-left-item " + (this.state.post.islikeselected == 'dislike' ? 'isactive_tab' : '')}>
                                                <div className="dicon">
                                                    <div className="dclikable">
                                                        <img alt="" src={(this.state.post.islikeselected == 'dislike' ? '/img/dislike_h.png' : '/img/dislike.png')}/>
                                                    </div>
                                                </div>
                                                <div className="dvals">
                                                    <div className="dv-inner">{ this.state.post.dislike }</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dcright">
                                            <div className="dccomment" onClick={() => this.viewComment()}>
                                                <img alt="" src="/img/comment.png"/>
                                            </div>
                                        </div>
                                        <br className="clear" />
                                    </div>
                                </div>
                            </div>
                            <div className={"dtm-comments " + (this.state.post.view_comment ? 'active_comments' : 'inactive_comments')}>
                                <div className="drm-comments-inner">
                                    {
                                        this.state.comments.map((comment, index) => (
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
                                                        <textarea value={this.state.postComments} onKeyDown={(e) => this._handleComment(e, this.state.post.id)} onChange={this.handleCommentChange} name="" id="" placeholder="Leave a comment"></textarea>
                                                    </div>
                                                    <div className="demoticons">
                                                        <button><FontAwesomeIcon icon={faSmile} /></button>
                                                    </div>
                                                </div>
                                            </div>
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