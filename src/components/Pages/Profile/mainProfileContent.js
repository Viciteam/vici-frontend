import React from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
// import 'react-tabs/style/react-tabs.css';

import './../../styles/profiles.css';
import './../../styles/calendar-sidebar.css'
import SideProfile from './Segments/SideProfile'

import WallofAchievements from './Segments/WallofAchievements'
import TopActivities from './Segments/TopActivities'
import Challenge from './Segments/Challenge'
import Timeline from './Segments/Timeline'
// import DailyChallenge from './Segments/DailyChallenge'
// import OngoingChallenge from './Segments/OngoingChallenge'
// import PopularClans from '../Clan/PopularClans'
import WhoToFollow from '../Clan/WhoToFollow';
import PersonalAgenda from '../Clan/PersonalAgenda';
import AllChallengesSidebar from '../Clan/AllChallengesSidebar';
import Friends from '../Clan/Friends';
import auth from '../../../services/auth';
import LoginModal from '../Auth/LoginModal';
import MakeMyDay from './Modal/MakeMyDay';
import ChallengeService from '../../../services/ChallengeService';
class mainProfileContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userinfo: {
                name: 'Daphne Winter',
                level: 11,
                clan: 'Fitness Clan',
                stats: {
                    gold: 250,
                    purple: 0,
                    copper: 0
                },
                social_info: {
                    followers: 50,
                    following: 2,
                    friends: 98
                }
            },
            openModal: false,
            toggleMakeMyDay: false,
            openLeftScroll: false,
            newChallengeModal: false,
            allChallenges: [],
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.toggleMakeMyDay = this.toggleMakeMyDay.bind(this);
        this.boxRef = React.createRef();
        this.newChallenge = this.newChallenge.bind(this);
        this.handleClickChallenge = this.handleClickChallenge.bind(this);
    }

    toggleMakeMyDay () {
        console.log('all', this.state.allChallenges)
        if(this.state.toggleMakeMyDay){
            this.setState({ toggleMakeMyDay: false });
        }else{
            this.setState({ toggleMakeMyDay: true });
        }
    }

    handleClickChallenge(item){
        window.location="/challenge/" + item.id
    }

    componentDidMount(){
        ChallengeService.allChallenges().then(data =>
            this.setState({
              allChallenges: data
            })
          );
        //this.setState({ allChallenges: ChallengeService.allChallenges() });
    }

    newChallenge(){
        this.setState({ newChallengeModal: true });
        //console.log('all---',  this.state.allChallenges)
        /* if(this.state.newChallengeModal){
            this.setState({ newChallengeModal: false });
        }else{
            this.setState({ newChallengeModal: true });
        } */
    }

    handleOpenModal () {
        this.setState({ openModal: true });
    }

    handleCloseModal () {
        this.setState({ openModal: false });
    }

   scroll = (scrollOffset) => {
       console.log(scrollOffset)
        this.boxRef.current.scrollLeft += scrollOffset;
        if(scrollOffset <= 260){
            this.setState({ openLeftScroll: true });
        }else{
            this.setState({ openLeftScroll: false });
        }
        
      }

    render(){
        const user_information = this.state.userinfo;
        const { allChallenges } = this.state;
        return (
            <div className="container mx-auto mt-20">
                <div className="main-content flex">
                    <div className="w-1/4 hidden lg:block pt-4">
                        <SideProfile uinfo={user_information} />
                    </div>
                    <div className="w-1/2 middle-content">

                        <div className="w-full block lg:hidden pt-4">
                            <SideProfile uinfo={user_information} />
                        </div>

                        <div className="w-full block lg:hidden">
                            <div className="sr-inner">
                                {/* <DailyChallenge />
                                <OngoingChallenge /> */}
                                {/* <PopularClans /> */}
                                {/* <WhoToFollow /> */}
                                <PersonalAgenda />
                                <AllChallengesSidebar />
                                <div className="bg-white_color p-3 flex justify-center rounded-xl shadow-vici mt-6">
                                    <Calendar />
                                </div>
                                <Friends />
                            </div>
                        </div>

                        <div className="content-inner">
                            <div className="w-full">
                                <div className="top-part mx-6">
                                    {
                                        auth.isAuthenticated() ? 
                                        <div className="relative">
                                            <div className="text-2xl font-bold">Good morning, start your day with:</div>
                                            <div ref={this.boxRef} className="flex w-full overflow-x-hidden">
                                                <div className="flex">
                                                    <div className="w-36 bg-primary_color h-52 flex justify-center rounded-lg p-3 shadow-vici">
                                                        <a href='/challenge/new'>
                                                            <div className="text-center mt-12 cursor-pointer">
                                                                <div className="flex justify-center"><img src="/img/new_challenge.png" /></div>
                                                                <div className="text-sm text-white_color">New Challenge</div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="w-36 h-52 flex justify-center rounded-lg mx-3 p-3 shadow-vici">
                                                        <div onClick={this.toggleMakeMyDay} className="text-center mt-12 cursor-pointer">
                                                            <div className="flex justify-center"><img src="/img/bi_sun-fill.png" /></div>
                                                            <div className="text-sm mt-3 font-bold text-vici_secondary">Make my day</div>
                                                        </div>
                                                        {
                                                          this.state.toggleMakeMyDay && <MakeMyDay closeModal={this.toggleMakeMyDay } />  
                                                        }
                                                    </div>
                                                    {
                                                        allChallenges.length > 0 ?
                                                        allChallenges.map((item, i) => (
                                                            <div onClick={() => this.handleClickChallenge(item)} className="w-36 h-50 rounded-lg cursor-pointer shadow-vici mx-1">
                                                                <div className="truncate rounded-lg h-full w-full relative">
                                                                    <img src="/img/dummy/Rectangle1.png" className="w-full h-full object-cover" />
                                                                    <div className="z-10 absolute bottom-0 text-xs truncate w-full text-center bg-vici_secondary text-white_color p-2">
                                                                        { item.name }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                        :
                                                        <div className="text-center pt-24">Loading challenge...</div>
                                                    }
                                                    
                                                    {/* <div className="w-36 h-52 flex justify-center rounded-lg mx-3 shadow-vici">
                                                        <img src="/img/dummy/Frame 294.png" className="w-34"/>
                                                    </div>
                                                    <div className="w-36 h-52 flex justify-center rounded-lg shadow-vici">
                                                        <img src="/img/dummy/Frame 1692.png" className="w-34"/>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className="absolute right-0 top-32 -mr-3 z-10">
                                                <button onClick={() => this.scroll(260)} className="bg-white_color p-1 rounded-full text-vici_secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </button>
                                            </div>
                                            {
                                                this.state.openLeftScroll &&
                                                <div className="absolute left-0 top-32 -ml-3 z-10">
                                                    <button onClick={() => this.scroll(-260)} className="bg-white_color p-1 rounded-full text-vici_secondary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            }
                                            {/* <div className="wall-of-achievement">
                                                <WallofAchievements />
                                            </div>
                                            <div className="top-activities">
                                                <TopActivities />
                                            </div>
                                            <br className="clear"/> */}
                                        </div>
                                        :
                                        <div className="px-6 mb-3">
                                            <div className='flex w-full h-36 justify-center pt-14 border border-medium_gray rounded-xl login-details'>
                                                <span>Log in to Vici to create and participate in challenges.</span> <span onClick={this.handleOpenModal} className="font-bold cursor-pointer pl-1">Login</span> 
                                            </div>
                                            {this.state.openModal && <LoginModal closeModal={this.handleCloseModal } />}
                                        </div>
                                    }
                                    

                                </div>
                                <div className="middle-part">
                                    <div className="mp-inner pt-0">
                                        <Tabs defaultIndex={0} className="mt-6" >
                                            <TabList className="tabtitles px-6">
                                                <Tab>Challenges & Achievements</Tab>
                                                <Tab>Timeline</Tab>
                                            </TabList>

                                            <TabPanel>
                                                <Challenge />
                                            </TabPanel>
                                            <TabPanel>
                                                <Timeline />
                                            </TabPanel>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="srightnotif hidden lg:block">
                                <div className="sr-inner">
                                    <PersonalAgenda />
                                    <AllChallengesSidebar />
                                    <div className="bg-white_color p-3 rounded-xl shadow-vici mt-6">
                                        <Calendar />
                                    </div>
                                    <Friends />
                                </div>
                            </div>
                            <br className="clear"/> */}
                        </div>
                    </div>

                    <div className="w-1/4 hidden lg:block">
                        <div className="sr-inner">
                            {/* <DailyChallenge />
                            <OngoingChallenge /> */}
                            {/* <PopularClans /> */}
                            {/* <WhoToFollow /> */}
                            <PersonalAgenda />
                            <AllChallengesSidebar />
                            <div className="bg-white_color p-3 rounded-xl shadow-vici mt-6">
                                <Calendar />
                            </div>
                            <Friends />
                        </div>
                    </div>
                    <br className="clear"/>


                </div>
            </div>
        )
    }
}

export default mainProfileContent
