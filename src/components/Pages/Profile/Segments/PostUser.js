import './../../../styles/challenge.css';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-regular-svg-icons'

class PostUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive,
            post_id: this.props.postinfo,
            post: {
                id: 1,
                avatar: '/img/user_main.jpg',
                name: 'John Peter Doe',
                time: '5m ago',
                message: [
                    {
                        text: 'Think i wanna do the bookwork challenge soon, haven\'t read a book since! Who wants to join?',
                        image: '',
                    }
                ],
                comments: [
                    {
                        id: 1,
                        avatar: '/img/prof_icon.png',
                        name: 'John S. White',
                        time: '3m ago',
                        message: 'Sound like fun! Count me in!',
                    },
                    {
                        id: 1,
                        avatar: '/img/prof_icon.png',
                        name: 'Black S. Panther',
                        time: '3m ago',
                        message: 'Sound like fun! Count me in!',
                    },
                ]
            }
        }

        this.loadPostData = this.loadPostData.bind(this);
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
    }

    componentDidMount(){
        this.loadPostData();
    }

    render () {
        
        return (
            <div className="dtimelinemain">
                <div className="dtm-inner">
                    {/* BOF post item */}
                    <div className="dtm-item">
                        <div className="dtm-item-inner">
                            <div className="dtm-header">
                                <div className="dtm-item-image">
                                    <div className="dtm-item-image-inner">
                                        <img alt="" src="/img/user_main.jpg"/>
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
                                    <div className="dcleft">
                                        <div className="dc-left-item">
                                            <div className="dicon">
                                                <div className="dclikable">
                                                    <img alt="" src="/img/like.png"/>
                                                </div>
                                            </div>
                                            <div className="dvals">
                                                <div className="dv-inner">
                                                    0
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dc-left-item">
                                            <div className="dicon">
                                                <div className="dclikable">
                                                    <img alt="" src="/img/dislike.png"/>
                                                </div>
                                            </div>
                                            <div className="dvals">
                                                <div className="dv-inner">
                                                    0
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dcright">
                                        <div className="dccomment">
                                            <img alt="" src="/img/comment.png"/>
                                        </div>
                                    </div>
                                    <br className="clear" />
                                </div>
                            </div>
                        </div>
                        <div className="dtm-comments">
                            <div className="drm-comments-inner">
                                {
                                    this.state.post.comments.map((comment, index) => (
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
                                                            <div className="dc-left-item">
                                                                <div className="dicon">
                                                                    <div className="dclikable">
                                                                        <img alt="" src="/img/like.png"/>
                                                                    </div>
                                                                </div>
                                                                <div className="dvals">
                                                                    <div className="dv-inner">
                                                                        0
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="dc-left-item">
                                                                <div className="dicon">
                                                                    <div className="dclikable">
                                                                        <img alt="" src="/img/dislike.png"/>
                                                                    </div>
                                                                </div>
                                                                <div className="dvals">
                                                                    <div className="dv-inner">
                                                                        0
                                                                    </div>
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
            </div>
        )
    }
}

export default PostUser