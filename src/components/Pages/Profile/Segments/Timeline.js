import './../../../styles/profiles.css';
import React from 'react';

import PostUser from './PostUser'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-regular-svg-icons'

class Timeline extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            uinfo: this.props.uinfo,
            postMessage: '',
            postComments: '',
            openAttach: false,
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
            const data = {
                avatar: '/img/user_main.jpg',
                name: 'John Peter Doe',
                time: '5m ago',
                message: [
                    {
                        text: this.state.postMessage
                    }
                ],
                comments: []
            }
            this.setState({ 
                posts: [data, ...this.state.posts],
                postMessage: ''
            })       
    }

    render () {
        const { posts } = this.state
        
        return (
            <div className="timeline-inner">
                <div className="tm-onmind">
                    <div className="om-inner">
                        <div className="dprofpic">
                            <img alt="" src="/img/user_main.jpg"/>
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

                {posts.map((post) => (
                    <PostUser postinfo={post}  />
                ))}

            </div>
        )
    }
}

export default Timeline