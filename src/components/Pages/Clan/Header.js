import './../../styles/profiles.css';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faBell, faSearch } from '@fortawesome/free-solid-svg-icons'

import BrandProfileModal from './Components/BrandProfileModal';
import { ProfileContext } from '../Profile/ProfileContext'
import auth from '../../../services/auth';
import AuthService from '../../../services/AuthService';
//import Image from '../../../../public/img/avatarguest.png';
import LoginModal from '../Auth/LoginModal';

class ClanHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            uinfo: this.props.uinfo,
            openMessages: false,
            openSearchDropdown: false,
            openAccountSettings: false,
            openCreateBrandProfile: false,
            openCreateBrandProfileInvite: false,
            search: '',
            banner: null,
            openModal: false
        }
        this.handleOpenMessages = this.handleOpenMessages.bind(this);
        this.handleOpenAccountSettings = this.handleOpenAccountSettings.bind(this);

        this.handleOpenCreateBrandProfile = this.handleOpenCreateBrandProfile.bind(this);
        this.handleCloseCreateBrandProfile = this.handleCloseCreateBrandProfile.bind(this);

        this.handleBannerChanges = this.handleBannerChanges.bind(this);
        this.handleProfileImage = this.handleProfileImage.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.handleOpenLogin = this.handleOpenLogin.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    static contextType = ProfileContext;

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ openMessages: false });
            this.setState({ openAccountSettings: false });
            this.setState({ search: '' });
        }
    }

    handleBannerChanges (val) {
        const { banner } = this.context;
        const [setBannerValue] = banner;
        //const [profileValue, setProfileValue] = profile;
        setBannerValue(val)
    }

    async handleLogout() {
        const response = await AuthService.doUserLogout()
        if(response){
            auth.logout();
            this.setState({ openAccountSettings: false });
            window.location.href = "/";
        }
        
    }

    handleProfileImage (val) {
        const { profile } = this.context;
        const [setProfileValue] = profile;
        setProfileValue(val)
    }

    handleOpenCreateBrandProfile () {
        this.setState({ openCreateBrandProfile: true });
        this.setState({ openAccountSettings: false });
    }

    handleCloseCreateBrandProfile () {
        this.setState({ openCreateBrandProfile: false });
    }

    handleKeyPress = (event) => {
        this.setState({search: event.target.value});
    }

    handleOpenAccountSettings () {
        if(this.state.openAccountSettings){
            this.setState({ openAccountSettings: false });
        }else{
            this.setState({ openAccountSettings: true });
            this.setState({ openMessages: false });
        }
    }

    handleOpenMessages () {
        if(this.state.openMessages){
            this.setState({ openMessages: false });
        }else{
            this.setState({ openMessages: true });
            this.setState({ openAccountSettings: false });
        }
    }

    handleOpenLogin(){
        this.setState({ openModal: true });
    }

    handleCloseLogin(){
        this.setState({ openModal: false });
    }

    render () {

        const messages = [
            {
                image: '/img/dummy/1.png',
                sender: 'John Green',
                message: 'That’s too hard to do :(',
                time: '30m',
            },
            {
                image: '/img/dummy/2.png',
                sender: 'John White',
                message: 'Yeah, the other challenge is hard..',
                time: '4h',
            },
            {
                image: '/img/dummy/3.png',
                sender: 'John Red',
                message: 'Yeah, the other challenge is hard..',
                time: '3m',
            }
        ]

        const people = [
            {
                img: '/img/dummy/1.png',
                name: 'Jennifer Lorem Ipsum',
                subtitle: 'Friend',
            },
            {
                img: '/img/dummy/2.png',
                name: 'Cathy White',
                subtitle: 'Friend',
            },
            {
                img: '/img/dummy/3.png',
                name: 'Jen Gold',
                subtitle: 'Followed',
            },
        ]

        const challenges = [
            {
                img: '/img/dummy/Avatar User 13.png',
                title: 'Just Dance Challenge',
            },
            {
                img: '/img/dummy/Avatar User 132.png',
                title: 'Jello eating contest',
            }
        ]

        const isAuthHeader = () => {
            if(auth.isAuthenticated()){
                return (
                    <div ref={this.wrapperRef} className="flex">
                        <div className="dnotif px-3 flex">
                            <div className="relative">
                                <div onClick={this.handleOpenMessages} className="dmessage mx-3 cursor-pointer relative">
                                   {/*  <FontAwesomeIcon icon={faComment} /> */}
                                   <img src="/img/messages.png" className="w-10 mt-3" />
                                <span className="notifone absolute bg-primary_color h-2 rounded-full top-0 right-0 w-2">&nbsp;</span></div>
                                {
                                    this.state.openMessages &&
                                <div className="absolute bg-white_color right-0 shadow-vici rounded-b-2xl z-10" style={{width: '432px'}}>
                                    <div className="text-xl text-vici_black font-bold">
                                        <div className="flex justify-between border-b border-light_gray p-5 w-full">
                                            <div>Message</div>
                                            <div className="flex pr-3">
                                                <button className="p-1 mr-3 border rounded border-light_gray">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                </button>
                                                <div className="text-lg text-vici_secondary pt-1">New Message</div>
                                            </div>
                                        </div>
                                        <div className="p-5 border-b border-medium_gray">
                                            <div className="flex w-full border border-light_gray rounded-2xl">
                                                <div className="p-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2ZM8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0Z" fill="#596366"/>
                                                        <path d="M19.1722 15.1692L16.0382 12.0352C15.7292 12.6482 15.3592 13.2252 14.9252 13.7492L17.7582 16.5832C18.0812 16.9072 18.0812 17.4342 17.7582 17.7582C17.5462 17.9702 17.2992 18.0012 17.1712 18.0012C17.0422 18.0012 16.7952 17.9702 16.5832 17.7582L13.7492 14.9252C13.2262 15.3602 12.6482 15.7302 12.0352 16.0382L15.1692 19.1722C15.7222 19.7252 16.4462 20.0012 17.1702 20.0012C17.8952 20.0012 18.6192 19.7252 19.1722 19.1722C20.2772 18.0662 20.2772 16.2742 19.1722 15.1692Z" fill="#596366"/>
                                                    </svg>
                                                </div>
                                                <div className="w-full">
                                                    <input type="search"  className="w-full focus:outline-none pl-1 py-1 rounded-2xl pr-3"/>
                                                </div>
                                            </div>
                                            <div className="flex cursor-pointer justify-between pt-5">
                                                <div className="flex">
                                                    <div>
                                                        <img alt="" src="/img/dummy/message.png" width="54"/>
                                                    </div>
                                                    <div className="px-3">
                                                        <div className="text-lg">Message Requests</div>
                                                        <div className="text-sm text-medium_gray font-normal">2 new message requests</div>
                                                    </div>
                                                </div>
                                                <div className="pt-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            {
                                                messages.map((item, i) => (
                                                    <div className="flex cursor-pointer justify-between pt-5">
                                                        <div className="flex">
                                                            <div>
                                                                <img alt="" className="rounded-full" src={item.image} width="54"/>
                                                            </div>
                                                            <div className="px-3 text-left">
                                                                <div className="text-lg font-normal">{ item.sender }</div>
                                                                <div className="text-sm text-medium_gray font-normal">{ item.message }</div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-2 text-sm">
                                                            {item.time}
                                                        </div>
                                                    </div>
                                                ))
                                             }
                                        </div>
                                        <div className="flex justify-center p-5">
                                             <div className="text-lg font-bold text-vici_secondary cursor-pointer"><a href="/messages">See all messages</a></div>
                                        </div>
                                    </div>
                                </div>
                                }

                            </div>
                            <div className="dalarm relative pl-3">
                                {/* <FontAwesomeIcon icon={faBell} /> */}
                                    <img src="/img/notif.png" className="w-8 mt-3" />
                                <span className="notifone absolute bg-primary_color h-2 rounded-full top-3 right-0 w-2">&nbsp;</span>
                            </div>
                        </div>
                        <div className="dproficon mt-1 mx-3">
                            <div className="relative">
                                <img alt="" onClick={this.handleOpenAccountSettings} src={auth.userProfile() !== 'undefined' && auth.userProfile() ? auth.userProfile().profpic_link : '/img/avatarguest.png'} className="cursor-pointer rounded-lg w-14 max-h-14"/>
                                {
                                    this.state.openAccountSettings &&
                                    <div className="absolute bg-white_color right-0 shadow-vici rounded z-10" style={{width: '270px'}}>
                                        <div className="text-left">
                                            <div className="text-sm font-bold px-6 pt-6 pb-3">
                                                Profile
                                            </div>
                                            <div onClick={this.handleOpenCreateBrandProfile} className="flex px-6 py-3 cursor-pointer ">
                                                <div>
                                                    <button className="p-1 border rounded border-medium_gray text-vici_secondary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="text-sm text-vici_secondary font-bold pl-3 pt-1">
                                                    Create brand profile
                                                </div>
                                            </div>
                                            <div className="flex justify-between px-6 py-3 bg-light_gray">
                                                <div className="text-sm font-bold">
                                                    Focus Mode
                                                </div>
                                                <div>
                                                    <label for="toggleB" className="flex items-center cursor-pointer">
                                                        <div className="relative mute-chat">
                                                            <input type="checkbox" id="toggleB" className="sr-only" />
                                                            <div className="block bg-bottom_gray w-12 h-7 rounded-full"></div>
                                                            <div className="dot absolute left-1 top-1 bg-vici_gray w-5 h-5 rounded-full transition"></div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mx-6 border border-bottom_gray mt-2"></div>
                                            <div className="px-6 py-3 text-sm font-bold cursor-pointer hover:bg-light_gray">
                                                Account Settings
                                            </div>
                                            <div className="mx-6 border border-bottom_gray mb-2"></div>
                                            <div className="px-6 py-3 text-sm font-bold cursor-pointer hover:bg-light_gray">
                                            Help & Support
                                            </div>
                                            <div className="px-6 py-3 text-sm font-bold cursor-pointer hover:bg-light_gray">
                                            Give Feedback
                                            </div>
                                            <div className="px-6 py-3 text-sm font-bold cursor-pointer hover:bg-light_gray">
                                            Language - English (US)
                                            </div>
                                            <div className="mx-6 border border-bottom_gray mt-2"></div>
                                            <div onClick={this.handleLogout} className="px-6 py-3 mb-3 mt-2 text-sm font-bold hover:bg-light_gray cursor-pointer">
                                                Logout
                                            </div>
                                            <div className="mx-6 pb-6">
                                                <div className="text-xs">
                                                    <span className="px-1">
                                                        <a href="/privacy-policy" className="iubenda-white no-brand iubenda-noiframe iubenda-embed iubenda-noiframe iub-body-embed" title="Privacy Policy">
                                                            Privacy Policy
                                                        </a>                                                       
                                                    </span> • 
                                                    <span className="px-1">
                                                        <a href="/terms-and-conditions" className="iubenda-white no-brand iubenda-noiframe iubenda-embed iubenda-noiframe iub-body-embed" title="Terms and Conditions">
                                                            Terms and Conditions
                                                        </a>
                                                    </span> • 
                                                    <span className="px-1">
                                                        <a href="/cookie-policy" className="iubenda-white no-brand iubenda-noiframe iubenda-embed iubenda-noiframe iub-body-embed" title="Cookie Policy">
                                                            Cookie Policy
                                                        </a>
                                                    </span> • 
                                                    <span className="px-1">Vici Life Pte. Ltd. © 2022</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        {/* <div className="dcoin mt-3 mr-3">
                            <div className="dcoin-inner flex"><img alt="" src="/img/coil.png"/> <span className="pl-2">0</span></div>
                        </div>
                        <div className="dmedals mt-3 mx-3">
                            <div className="dmedal-inner flex"><img alt="" src="/img/medal.png"/> <span className="pl-2">0</span></div>
                        </div> */}
                    </div>
                );
            } else {
                return (
                    <div className="flex ml-3 pt-2">
                        <button onClick={this.handleOpenLogin} className="px-3 py-2 bg-primary_color text-white_color rounded-md h-10 w-24 capitalize">login</button>
                        <button  onClick={this.handleOpenLogin} className="px-3 py-2 bg-primary_color text-white_color rounded-md h-10 w-24 ml-3 capitalize">sign up</button>

                        {this.state.openModal && <LoginModal closeModal={this.handleCloseLogin } />}
                    </div>
                );
            }
        }
        
        return (
            <div ref={this.wrapperRef} className="clan-header-main">
                <div className="clan-header-inner flex justify-between lg:justify-evenly">
                    <div className="dlogo">
                        <a href="/"><img alt="" src="/img/vici.png"/></a>
                    </div>
                    <div className="flex lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                    <div className="hidden lg:flex">
                        <div className="dmenu m-0 w-1/2">
                            <ul className="flex justify-center w-full pt-3">
                                <li className="px-6"><a href="/">Home</a></li>
                                <li className="px-6"><a href="/">Explore</a></li>
                                <li className="px-6"><a href="/">Learn</a></li>
                            </ul>
                        </div>
                        <div className="dsearch mt-2 relative h-10 border border-medium_gray rounded-lg flex">
                            <span className="pt-2 px-3"><FontAwesomeIcon icon={faSearch} /></span>
                            <input className="rounded-lg focus:outline-none" onKeyPress={this.handleKeyPress.bind(this)} type="text" name="" id="" />
                            {
                                this.state.search.length > 0 &&
                                <div className="absolute w-96 bg-white_color shadow-lg z-50 rounded-b-3xl">
                                    <div className="py-3 shadow-border_shadow px-5 text-left">
                                        Results for: {this.state.search}
                                    </div>
                                    <div className="py-3 px-5 text-left">
                                        <div className="font-bold text-vici_secondary_text">People</div>
                                        {
                                            people.map((item, i) => (
                                                <div className="px-3 py-2 flex">
                                                    <div>
                                                        <img alt="" src={ item.img } className="rounded-full" />
                                                    </div>
                                                    <div className="pl-3">
                                                        <div className="font-bold">{ item.name }</div>
                                                        <div className="">{ item.subtitle}</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className="font-bold text-vici_secondary_text">Challenges</div>
                                        {
                                            challenges.map((item, i) => (
                                                <div className="px-3 py-2 flex">
                                                    <div>
                                                        <img alt="" src={ item.img } className="rounded-lg" width="54" />
                                                    </div>
                                                    <div className="pl-3 pt-2">
                                                        <div className="font-bold">{ item.title }</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className="font-bold text-vici_secondary_text">Clans</div>
                                        <div className="flex justify-center p-3">
                                            <div>0 results for “{this.state.search}” in clans</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center pb-3">
                                        <button className="text-vici_secondary font-bold"><a href="/search-results">See more results</a></button>
                                    </div>
                                </div>
                            }
                        </div>
                        {isAuthHeader()}
                    </div>
                </div>
                {this.state.openCreateBrandProfile && <BrandProfileModal closeModal={this.handleCloseCreateBrandProfile } bannerUpdate={this.handleBannerChanges} profileUpdate={this.handleProfileImage} />}
            </div>
        )
    }
}

export default ClanHeader