import React from 'react';

import CookieService from '../../../services/CookieService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPaperclip, faChevronDown, faCamera} from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-regular-svg-icons'

import FriendsPop from './Components/FriendsPop';

class Friends extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive,
            friendsNumber: 0,
            friendsList: [],
            friendsPops: [],
            lastInserted: null
        }

        this.pullFriendsInformation = this.pullFriendsInformation.bind(this);
        this.openFriendProfile = this.openFriendProfile.bind(this);
        this.closeActiveChat = this.closeActiveChat.bind(this);
        this.openActiveChat = this.openActiveChat.bind(this);
        
    }

    pullFriendsInformation(){

        const user_profile = CookieService.get("user_profile");
        let userid  = 0;
        if(user_profile !== undefined){
            userid = user_profile.id;
        }
        
        console.log('user profile -> ', userid);

        // get users friends
        let friends = [
            {
                id: 1,
                img: '/img/dummy/1.png',
                name: 'Jessica Alba',
                is_online: true,
                is_open: false,
                messages: [
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'out',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'out',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                ]
            },
            {
                id: 2,
                img: '/img/dummy/2.png',
                name: 'Lorem Zones',
                is_online: false,
                is_open: false,
                messages: [
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'out',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'out',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                ]
            },
            {
                id: 3,
                img: '/img/dummy/3.png',
                name: 'Arnold Zaragoza',
                is_online: true,
                is_open: false,
                messages: [
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'out',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'out',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                ]
            },
            {
                id: 4,
                img: '/img/dummy/4.png',
                name: 'Jackie Jeminiz',
                is_online: true,
                is_open: false,
                messages: [
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'out',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'out',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                ]
            },
            {
                id: 5,
                img: '/img/dummy/5.png',
                name: 'Jet Gautay',
                is_online: false,
                is_open: false,
                messages: [
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'out',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'in',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                    {
                        id: 1,
                        type: 'out',
                        message: 'asdasdasdasdasdasdasdasdads'
                    },
                ]
            },
        ];

        this.setState({friendsList: friends});
        this.setState({friendsNumber: 20});
    } 

    openFriendProfile(item){
        // window.open('/profile/'+id);
        let friendsPopUps = this.state.friendsPops;
        friendsPopUps.push(item);
        this.setState({friendsPops: friendsPopUps});
        this.setState({lastInserted: item});
    }

    closeActiveChat(e){
        this.setState({lastInserted: null});
    }

    openActiveChat(e){
        let setActive = this.state.friendsPops[e];
        this.setState({lastInserted: setActive});
    }

    componentDidMount(){
        this.pullFriendsInformation();
    }

    render () {
        
        return (
            <div className="px-6 py-3 rounded-xl mt-6">
                <div className="flex justify-between mb-5">
                    <div className="flex">
                        <div className="font-bold">Friends</div>
                        <div className="pl-1">({this.state.friendsNumber} online)</div>
                    </div>  
                    <div>
                        <button className="text-sm text-vici_secondary_text">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button className="text-sm ml-3 text-vici_secondary_text">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </button>
                    </div>
                    <FriendsPop pops={this.state.friendsPops} lastinserted={this.state.lastInserted} closePop={this.closeActiveChat} openPops={(e) => this.openActiveChat(e)}/>
                    
                </div>
                {
                    this.state.friendsList.map((item, i) => (
                        <div className="flex my-3 d-friends-list" key={i} onClick={() => this.openFriendProfile(item)}>
                            <div className="relative">
                                <img alt="" src={ item.img } className="rounded-full"></img>
                                { item.is_online && <div className="h-3 w-3 bg-tag_success rounded-full absolute right-0 -mt-3 border border-white_color"></div> }
                            </div>
                            <div className="pl-5 pt-3">
                                <div className="font-bold">{ item.name }</div>
                            </div>
                        </div>
                    ))
                }

            </div>
        )
    }
}

export default Friends