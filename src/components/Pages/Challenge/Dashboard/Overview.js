import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
import ActivityChart from '../Dashboard/ActivityChart';
import auth from '../../../../services/auth';
import CookieService from '../../../../services/CookieService';

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectRange: false,
            selectedDate: 'Select Date',
            selectionRange: {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            }
        };
        this.handleSelectRange = this.handleSelectRange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmitSelected = this.handleSubmitSelected.bind(this);
    }
    handleSelectRange() {
        console.log('details', this.props.details)
        if(this.state.selectRange){
            this.setState({ selectRange: false });
        }else{
            this.setState({ selectRange: true });
        }
        
    }
    handleSubmitSelected() {
        this.setState({ selectRange: false });
    }
    handleSelect(ranges){
        console.log(ranges);
        this.setState({
            selectionRange: {
                startDate: ranges.selection.startDate,
                endDate: ranges.selection.endDate,
                key: 'selection',
            },
            //selectRange: false
          });
        
        let dateStart = moment(ranges.selection.startDate).format("DD MMM YYYY");
        let dateEnd = moment(ranges.selection.endDate).format("DD MMM YYYY");
        this.setState({ selectedDate: dateStart + ' - ' +  dateEnd});
        console.log('date start', dateStart)
    }

    render () {

        const profile_main_image = () => {
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

        return (
            <div className="mt-6 pb-12 px-3">
                <div className="flex justify-between">
                    <div className="text-xl font-bold text-vici_secondary_text">Overview</div>
                    <div className="relative">
                        <button className="font-bold px-4 py-2 border rounded-lg border-bottom_gray flex text-xs text-vici_primary_text" onClick={this.handleSelectRange}>
                            { this.state.selectedDate }
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 mt-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        {
                            this.state.selectRange && 
                            <div className="absolute right-0 top-8">
                                <DateRangePicker
                                    ranges={[this.state.selectionRange]}
                                    onChange={this.handleSelect}
                                    moveRangeOnFirstSelection={false}
                                    editableDateInputs={true}
                                />
                                <div className="flex justify-end">
                                    <button onClick={this.handleSubmitSelected} className="px-3 py-2 bg-primary_color text-white_color text-sm rounded-lg">Close</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="shadow-vici mt-6 p-6 flex">
                    <div className="w-1/6 border-r border-bottom_gray py-3">
                        <div className="text-xl font-bold text-other_challenges">{ this.props.details.name }</div>
                        <div className="flex mt-2">
                            <img src={profile_main_image() ? profile_main_image() : '/img/avatarguest.png'} className="w-6" />
                            <div className="text-xs font-bold pl-2 pt-1">{auth.userProfile() ? auth.userProfile().name : auth.user().name}</div>
                        </div>
                    </div>
                    <div className="w-1/6 pt-4">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl text-other_challenges">200</div>
                            <button className="ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-vici_success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-sm text-center">Visitors</div>
                    </div>
                    <div className="w-1/6 pt-4">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl text-other_challenges">145</div>
                            <button className="ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-vici_success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-sm text-center">Joined</div>
                    </div>
                    <div className="w-1/6 pt-4">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl">78%</div>
                            <button className="ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-vici_error" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-sm text-center">Completion rate</div>
                    </div>
                    <div className="w-1/6 pt-4">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl text-other_challenges">5</div>
                        </div>
                        <div className="text-sm text-center">Clans</div>
                    </div>
                    <div className="w-1/6 pt-4">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl text-other_challenges">15</div>
                        </div>
                        <div className="text-sm text-center">Squads</div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between px-6 py-2 bg-vici_light_gray rounded-2xl">
                        <div className="flex pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-other_challenges" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            <div className="pl-3">
                                <span className="font-bold text-other_challenges">10 Actions </span>
                                <span className="">are waiting to be verified.</span>
                            </div>
                        </div>
                        <div>
                            <button className="">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between mt-2 px-6 py-2 bg-vici_light_gray rounded-2xl">
                        <div className="flex pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-other_challenges" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            <div className="pl-3">
                                <span className="font-bold text-other_challenges">1 Reward to confirm </span>
                                <span className="">(Manual Reward)</span>
                            </div>
                        </div>
                        <div>
                            <button className="">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between mt-2 px-6 py-2 bg-vici_light_gray rounded-2xl">
                        <div className="flex pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-other_challenges" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            <div className="pl-3">
                                <span className="">50 participants claimed their reward. </span>
                                <span className="font-bold text-other_challenges">Review rewards </span>
                            </div>
                        </div>
                        <div>
                            <button className="">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between rounded-t-3xl px-8 py-2 bg-other_challenges">
                        <div className="text-xl text-white_color">Activity</div>
                        <div className="flex">
                            <div className="pt-1">
                                <span className="text-sm text-white_color">View: Visitors</span>
                            </div>
                            <button className="pb-0">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white_color ml-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="relative p-3 shadow-vici">
                        <div className="absolute right-0 pr-6">
                            <div>
                                <div className="flex pt-1">
                                    <div className="">
                                        <span className="text-sm text-other_challenges">This Week</span>
                                    </div>
                                    <button className="pb-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-other_challenges ml-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ActivityChart />
                    </div>
                    <div className="mt-6 mx-12">
                        <div className="flex justify-between">
                            <div className="text-xl font-bold">Updates & Comments</div>
                            <div className="flex">
                                <div className="pt-1">
                                    <span className="text-sm">All posts</span>
                                </div>
                                <button className="pb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex">
                                <div>
                                    <img src="/img/user_main.jpg" width={44} />
                                </div>
                                <div className="w-full pl-4">
                                    <textarea className="w-full" placeholder="Write Something.."></textarea>
                                </div>
                            </div>
                            <div className="flex justify-between p-3">
                                <div>
                                    <button>
                                        <img alt="" src="/img/addimage.png"/>
                                    </button>
                                    <button className="ml-6">
                                        <img alt="" src="/img/clip.png"/>
                                    </button>
                                </div>
                                <div>
                                    <button className="ml-6">
                                        <img alt="" src="/img/send.png"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex border-b pb-3 border-medium_gray">
                                <div>
                                    <img src="/img/user_main.jpg" width={44} />
                                </div>
                                <div>
                                    <div className="text-vici_secondary_text pl-6">Daphne Winter - Joined the challenge</div>
                                    <div className="text-sm pl-6 text-medium_gray">5 min ago</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex border-b pb-3 border-medium_gray">
                                <div>
                                    <img src="/img/explore/Input fields2.png" width={44} />
                                </div>
                                <div>
                                    <div className="text-vici_secondary_text pl-6">Lorem Ipsum - Failed the challenge</div>
                                    <div className="text-sm pl-6 text-medium_gray">51 min ago</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-between pb-3">
                                <div className="flex">
                                    <div>
                                        <img src="/img/user_main.jpg" width={44} />
                                    </div>
                                    <div>
                                        <div className="font-bold pl-6">Daphne Winter</div>
                                        <div className="text-sm pl-6 text-medium_gray">1 hr ago</div>
                                    </div>
                                </div>
                                <div>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div>Morning Routine let’s go!</div>
                            <div className="mt-3 mx-3">
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <div className="flex">
                                            <button>
                                                <img alt="" src="/img/like.png"/>
                                            </button>
                                            <span className="pl-2">0</span>
                                        </div>
                                        <div className="flex ml-3">
                                            <button className="">
                                                <img alt="" src="/img/dislike.png"/>
                                            </button>
                                            <span className="pl-2">0</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="">
                                            <img alt="" src="/img/comment.png"/>
                                        </button>
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

export default Overview