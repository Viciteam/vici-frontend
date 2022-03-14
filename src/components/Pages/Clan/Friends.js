import React from 'react';

import CookieService from '../../../services/CookieService';

class Friends extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive,
            friendsNumber: 0,
            friendsList: []
        }

        this.pullFriendsInformation = this.pullFriendsInformation.bind(this);
        this.openFriendProfile = this.openFriendProfile.bind(this);
        
    }

    pullFriendsInformation(){
        const user_profile = CookieService.get("user_profile");
        let userid = user_profile.id;
        console.log('user profile -> ', userid);

        // get users friends
        let friends = [
            {
                id: 1,
                img: '/img/dummy/1.png',
                name: 'Jessica Alba',
                is_online: true,
            },
            {
                id: 2,
                img: '/img/dummy/2.png',
                name: 'Lorem Zones',
                is_online: false,
            },
            {
                id: 3,
                img: '/img/dummy/3.png',
                name: 'Arnold Zaragoza',
                is_online: true,
            },
            {
                id: 4,
                img: '/img/dummy/4.png',
                name: 'Jackie Jeminiz',
                is_online: true,
            },
            {
                id: 5,
                img: '/img/dummy/5.png',
                name: 'Jet Gautay',
                is_online: false,
            },
        ];

        this.setState({friendsList: friends});
        this.setState({friendsNumber: 20});
    } 

    openFriendProfile(id){
        window.open('/profile/'+id);
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
                    <div className='d-open-new-message'>
                        <div className='d-open-new-message-inner'>
                            <div className='d-new-message-container'>
                                <div className='d-open-header'>
                                    <div className='d-image-part'>
                                        <img src="/img/avatarguest.png" alt="" /> 
                                    </div>
                                    <div className='d-image-info'>
                                        test
                                    </div>
                                    <div className='d-image-options'>
                                        opts
                                    </div>
                                </div>
                                <div className='d-open-content'>
                                    <div className='d-content-inner'>
                                        this is a test
                                    </div>
                                </div>
                                <div className='d-open-footer'></div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.friendsList.map((item, i) => (
                        <div className="flex my-3 d-friends-list" key={i} onClick={() => this.openFriendProfile(item.id)}>
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