import React from 'react';
import AboutMe from './Components/AboutMe';
import ProfileContent from './Components/ProfileContent';
import RightSidebar from './Components/RightSidebar';
import EditProfile from './Modal/EditProfile';
import AuthService from '../../../services/AuthService';
import NewChallengeModal from './Segments/NewChallengeModal';

import { ProfileContext } from '../Profile/ProfileContext'

import auth from '../../../services/auth';
class Index extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            openEditProfileModal: false,
            newChallengeModal: false,
            userProfile: [],
            isFollowed: false,
        }
        this.handleOpenEditProfileModal = this.handleOpenEditProfileModal.bind(this);
        this.handleCloseEditProfileModal = this.handleCloseEditProfileModal.bind(this);      
        this.newChallenge = this.newChallenge.bind(this);  
        this.followUser = this.followUser.bind(this);    
    }

    async componentDidMount(){ 
        let profile = await AuthService.getProfile(window.location.pathname.split('/')[2])
        this.setState({ userProfile: profile });
        console.log(profile)
    }

    static contextType = ProfileContext;

    handleOpenEditProfileModal () {
        this.setState({ openEditProfileModal: true });
    }

    async followUser(){
        const data = {
            id: auth.user().id,
            friend_id: this.state.userProfile.id
        }
        const res = await AuthService.followUser(data)
        console.log(res)
        if(res){
            this.setState({ isFollowed: true });
        }
    }

    handleCloseEditProfileModal () {
        this.setState({ openEditProfileModal: false });
    }

    newChallenge(){
        console.log("open modal now");
        this.setState({ newChallengeModal: true });
    }

    render () {

        //const { banner, userBanner } = this.context;
        // const { profile } = this.context;
        // const [bannerValue, setBannerValue] = banner;
        // const [profileValue, setProfileValue] = profile;
        const { userProfile } = this.state;
        return (
            <div>
                <div className="">
                  <img alt="" src={userProfile ? userProfile.profile_banner_link ? userProfile.profile_banner_link : '/img/default_banner.jpg' : '/img/default_banner.jpg'} className="w-full h-56 object-cover" />
                </div>
                <div className="container mx-auto">
                    {/* <div className="mx-12 flex">
                        <button className="mx-3 uppercase active-text">Profile</button>
                        <span>&nbsp; • &nbsp;</span>
                        <button className="mx-3 uppercase">Challenges</button>
                        <span>&nbsp; • &nbsp;</span>
                        <button className="mx-3 uppercase">Achievements</button>
                    </div> */}
                    <div className="block lg:flex justify-between border-b pb-5 shadow-border_shadow bg-white_color p-5">
                        <div className="flex">
                            <div className="half-circle relative">
                                <div className="rounded-full absolute ml-1 w-28 mt-1">
                                    <img alt="" src={userProfile ? userProfile.profpic_link : '/img/avatarguest.png'} className="rounded-full object-cover w-28 h-28" />
                                </div>
                                <div className="h-10 w-10 bg-primary_color rounded-full text-center pt-2 absolute -bottom-2 left-10 font-bold">150</div>
                            </div>
                            <div className="ml-20 pt-7">
                                <div className="text-2xl font-bold">{ userProfile.length == 0 ? 'loading..' : userProfile.name }</div>
                                <div className="flex">
                                    <img alt="" src="/img/coil.png" className="h-5" />
                                    <div className="ml-2">0</div>
                                    <img alt="" src="/img/medal.png" className="ml-3 h-5" />
                                    <div className="ml-2">0</div>
                                    <div className="ml-3 font-bold cursor-pointer text-primary_color">visit store</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex pt-7 justify-center">
                            <div className="mx-5">
                                <div className="font-bold">Following</div>
                                <div className="text-right text-2xl">0</div>
                            </div>
                            <div className="mx-5">
                                <div className="font-bold">Followers & Friends</div>
                                <div className="text-right text-2xl">0</div>
                            </div>
                            {
                                userProfile.id == auth.user().id ?
                                <div className="mx-5">
                                    <div className="">
                                        <button className="text-sm flex text-vici_secondary px-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span className="hidden sm:block">Add Friends</span>
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <button onClick={this.handleOpenEditProfileModal} className="text-sm flex bg-vici_secondary w-full text-white_color px-3 py-1 rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            <span className="hidden sm:block">Edit Profile</span>
                                        </button>
                                        {this.state.openEditProfileModal && <EditProfile closeModal={this.handleCloseEditProfileModal } />}
                                    </div>
                                </div>
                                :
                                <div className="mx-5">
                                    <div className="">
                                        <button className="text-sm flex text-vici_secondary px-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span className="hidden sm:block">Add Friend</span>
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <button onClick={this.followUser} className="text-sm text-center bg-vici_secondary w-full text-white_color px-3 py-1 rounded">
                                            <span className="hidden sm:block">{this.state.isFollowed ? 'Following' : 'Follow'}</span>
                                        </button>
                                    </div>
                                </div>
                            }
                            
                        </div>
                    </div>
                    <div className="block lg:flex px-5 lg:px-24 py-5 bg-white_color justify-between">
                        <div className="flex justify-center">
                            <div className="flex w-52 bg-vici_light_gray rounded-full py-1 px-2">
                                <img alt="" src="/img/badge-question.png" className="h-10" />
                                <div>
                                    <div className="font-bold">0</div>
                                    <div className="">Challenges Joined</div>
                                </div>
                            </div>
                            <div className="flex w-52 bg-vici_light_gray rounded-full py-1 px-2 mx-6">
                                <div className="pt-3"><img alt="" src="/img/Groups Icon.png" className="h-6 px-3" /></div>
                                <div>
                                    <div className="font-bold">0</div>
                                    <div className="">Clans Joined</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="flex py-2 px-3 border rounded-2xl border-vici_button_txt shadow-border_shadow_button" onClick={() => this.newChallenge() }>
                                <img alt="" src="/img/Frame 1989.png" />
                                <div className="px-2 pt-1 text-vici_button_txt">New Challenge</div>
                                {this.state.newChallengeModal && <NewChallengeModal showModal={this.state.newChallengeModal} />}
                            </button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="block lg:flex w-full">
                            <div className="w-full lg:w-1/4">
                                <AboutMe profile={userProfile}/>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <ProfileContent />
                            </div>
                            <div className="w-full lg:w-1/4">

                                <RightSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index