import './../../../styles/profiles.css';
import React from 'react';

import PostUser from './PostUser'

import auth from '../../../../services/auth';
import CookieService from '../../../../services/CookieService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-regular-svg-icons'

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

class Timeline extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            uinfo: this.props.uinfo,
            postMessage: '',
            postComments: '',
            openAttach: false,
            post_list: [],
            posts: [
                {
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
    
                },
                {
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
            ]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOpenAttach = this.handleOpenAttach.bind(this);
        this.handleCloseAttach = this.handleCloseAttach.bind(this);
    }

    handleOpenAttach () {
        this.setState({openAttach: true});
    }

    handleCloseAttach () {
        this.setState({openAttach: false});
    }

    handleChange (event) {
        this.setState({postMessage: event.target.value});
    }

    handleCommentChange (event) {
        this.setState({postComments: event.target.value});
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

    handleClick(e) {
        this.refs.fileUploader.click();
    }

    _handleKeyDown = (e) => { 
        console.log('add post ->', this.state.postMessage);
        let userid = auth.user();
        let post_data = {
            "user_id": userid.id,
            "time":"10 mins ago",
            "post_media": "",
            "post_message": this.state.postMessage,
            "likes":"0",
            "dislikes":"0",
            "islikeselected": "",
            "isPrivate":"0"
        };

        let self = this;

        api.post('/newsfeed', post_data)
        .then((response) => {
            console.log('challenge comment-> ', response.data.newsfeed_comment);
            self.getPostListByUser();
            self.setState({ 
                posts: [post_data, ...this.state.post_list],
                postMessage: ''
            })  
        });
        
            // const data = {
            //     avatar: '/img/user_main.jpg',
            //     name: 'John Peter Doe',
            //     time: '5m ago',
            //     message: [
            //         {
            //             text: this.state.postMessage
            //         }
            //     ],
            //     comments: []
            // }
                 
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

    getPostListByUser(){
        let userid = auth.user();

        console.log('get user id -> ', userid.id);

        let self = this;

        api.get('/getnewsfeed/'+userid.id, {})
        .then((response) => {
            console.log('this posts _>',response.data.newsfeed.data);
            // console.log('challenge commetns for '+challengeid+' -> ', response.data.comments.data);
            self.setState({post_list: response.data.newsfeed.data});
        });
    }

    componentDidMount(){
        this.getPostListByUser();
    }

    render () {
        const { posts } = this.state.post_list;
        
        return (
            <div className="timeline-inner">
                <div className="tm-onmind">
                    <div className="om-inner">
                        <div className="dprofpic">
                            <img alt="" src={ this.profile_main_image() }/>
                        </div>
                        <div className="dtextarea">
                            <textarea value={this.state.postMessage} onChange={this.handleChange} placeholder="Write Something.."></textarea>
                        </div>
                        {
                            this.state.openAttach &&
                            <div className="h-48 relative w-full flex justify-center border rounded-lg border-medium_gray bg-primary_background">
                                <div onClick={this.handleCloseAttach} className="absolute cursor-pointer text-medium_gray right-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div onClick={this.handleClick} className="mt-12 cursor-pointer">
                                    <div className="w-full flex justify-center">
                                        <img alt="" src="/img/Group 1270.png"/>
                                    </div>
                                    <div className="text-vici_secondary font-bold">Add Attachments</div>
                                </div>
                                <input type="file" id="file" ref="fileUploader" style={{display: "none"}}/>
                            </div>
                        }
                        <div className="doptions">
                            <div className="leftops">
                                <div className="ditmone">
                                    <img alt="" src="/img/addimage.png"/>
                                </div>
                                <button onClick={this.handleOpenAttach} className="ditmone">
                                    <img alt="" src="/img/clip.png"/>
                                </button>
                                <button className="ditmone">
                                    <img alt="" src="/img/notes.png"/>
                                </button>
                            </div>
                            <div className="rightops">
                                <button onClick={this._handleKeyDown} className="ditmone">
                                    <img alt="" src="/img/send.png"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    (this.state.post_list.length > 0 ?
                        this.state.post_list.map((post, i) => (
                            <PostUser postinfo={post} key={i}  />
                        ))    
                    :
                        <div className='no-user-posts-yet'>No post yet</div>
                    )
                
                }

            </div>
        )
    }
}

export default Timeline