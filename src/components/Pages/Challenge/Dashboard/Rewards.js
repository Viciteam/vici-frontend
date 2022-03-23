import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
import auth from '../../../../services/auth';
import CookieService from '../../../../services/CookieService';
class Rewards extends React.Component {
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
                    <div className="text-xl font-bold text-vici_secondary_text">Rewards</div>
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
                    <div className="w-1/3 border-r border-bottom_gray py-3">
                        <div className="text-xl font-bold text-other_challenges">{ this.props.details.name }</div>
                        <div className="flex mt-2">
                            <img src={profile_main_image() ? profile_main_image() : '/img/avatarguest.png'} className="w-6" />
                            <div className="text-xs font-bold pl-2 pt-1">{auth.userProfile() ? auth.userProfile().name : auth.user().name}</div>
                        </div>
                    </div>
                    <div className="w-1/3 pt-4">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl">498</div>
                        </div>
                        <div className="text-sm text-center">Total Rewards Given</div>
                    </div>
                    <div className="w-1/3 pt-4">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl text-other_challenges">5</div>
                        </div>
                        <div className="text-sm text-center">Total Actions Failed</div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between px-6 py-2 bg-vici_light_gray rounded-2xl">
                        <div className="flex pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-other_challenges" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            <div className="pl-3">
                                <span className="font-bold text-other_challenges">1 Reward to confirm</span>
                                <span className="pl-2">(Manual Reward)</span>
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
                <div className="shadow-vici mt-6 rounded-b-xl pb-6">
                    <div className="flex justify-between rounded-t-3xl px-8 py-2 mb-3 bg-other_challenges">
                        <div className="text-xl text-white_color">Rewards</div>
                        <div className="flex">
                            <button className="pb-0 flex pt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white_color" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                </svg>
                                <span className="text-sm text-white_color pl-2">Add reward</span>
                            </button>
                        </div>
                    </div>
                    <div className="py-4 px-6 flex justify-between">
                        <div className="flex">
                            <img src="/img/coil.png" />
                            <div className="pl-3">10 Vici Tokens</div>
                        </div>
                        <div>
                            <button className="text-vici_secondary">Edit</button>
                        </div>
                    </div>
                    <div className="py-4 px-6 flex justify-between">
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div className="pl-3">File - <span className="text-vici_secondary">thereward.doc</span></div>
                        </div>
                        <div>
                            <button className="text-vici_secondary">Edit</button>
                        </div>
                    </div>
                </div>
                <div className="shadow-vici mt-6 rounded-b-xl pb-6">
                    <div className="flex justify-between rounded-t-3xl ">
                        <div className="w-1/2 text-sm py-3 text-center bg-other_challenges rounded-tl-3xl text-white_color">Confirm Rewards</div>
                        <div className="w-1/2 text-sm py-3 text-center bg-other_challenges_opacity text-white_color rounded-tr-3xl">Rewards Given</div>
                    </div>
                    <div className="py-3 flex justify-end">
                        <div className="flex">
                            <div className="text-sm pr-3">Sort by: Name</div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="px-6">
                        <table className="table-auto w-full">
                            <thead className="border-b py-3 border-vici_gray">
                                <tr className="py-3">
                                    <th className="py-3 text-left font-normal text-vici_secondary_text">Participant</th>
                                    <th className="py-3 text-left font-normal text-vici_secondary_text">Reward</th>
                                    <th className="py-3 text-center font-normal text-vici_secondary_text">Status</th>
                                    <th className="py-3 text-center font-normal text-vici_secondary_text">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-3">
                                        <div className="flex">
                                            <input type="checkbox" className="mt-2 mr-3 border-vici_gray"/>
                                            <img src="/img/explore/avatar.png" width={30} />
                                            <span className="text-sm pl-3 pt-1">Lorem Ipsum</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex">
                                            <div>
                                                <img src="/img/rewards_gift.png" width={20} />
                                            </div>
                                            <span className="pl-3 text-sm">Watch</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center">
                                            <div className="text-xs px-3 py-1 rounded-full text-white_color italic bg-dark_gray">Waiting on participant</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button className="text-vici_secondary text-sm">Cancel</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Rewards