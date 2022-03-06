import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
class Participants extends React.Component {
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
        return (
            <div className="mt-6 pb-12 px-3">
                <div className="flex justify-between">
                    <div className="text-xl font-bold text-vici_secondary_text">Participants</div>
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
                        <div className="text-xl font-bold text-other_challenges">Morning Routine</div>
                        <div className="flex mt-2">
                            <img src="/img/explore/avatar.png" />
                            <div className="text-xs font-bold pl-2 pt-1">John S. Green</div>
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
                        <div className="text-sm text-center">Participants</div>
                    </div>
                    <div className="w-1/6 pt-4">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl text-other_challenges">145</div>
                            <button className="ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-vici_error" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-sm text-center">Failed Participants</div>
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
                <div className="mt-6 flex justify-between">
                    <div className="flex">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                            </svg>
                        </div>
                        <div className="pl-3 pt-1 text-sm text-vici_secondary font-bold">Export form entries to csv</div>
                    </div>
                    <div className="flex">
                        <div className="mr-3 text-sm text-vici_secondary font-bold pt-1">
                            Enable Squads to join
                        </div>
                        <label for="toggleB" class="flex items-center cursor-pointer">
                            <div class="relative mute-chat">
                                <input type="checkbox" id="toggleB" class="sr-only" />
                                <div class="block bg-primary_color w-12 h-7 rounded-full"></div>
                                <div class="dot absolute left-1 top-1 bg-vici_gray w-5 h-5 rounded-full transition"></div>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between rounded-t-3xl px-8 py-3 bg-other_challenges">
                        <div className="text-xl text-white_color">Participants</div>
                        <div className="flex">
                            <div>
                                <div className="w-1/8 mr-6 flex px-3 py-1 border border-white_color rounded-xl">
                                    <input type="search" placeholder="Search here.." className="rounded-xl focus:outline-none bg-other_challenges px-3 text-white_color" />
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white_color" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="pt-1">
                                <span className="text-sm text-white_color">Sort by: Name</span>
                            </div>
                            <button className="pb-0">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white_color ml-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <table className="table-auto w-full">
                        <thead className="border-b border-vici_gray">
                            <tr className="py-3">
                                <th className="py-3">Participant</th>
                                <th className="py-3">Clan</th>
                                <th className="py-3">Progress</th>
                                <th className="py-3">Socials</th>
                                <th className="py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3">
                                    <div className="flex">
                                        <img src="/img/explore/avatar.png" width={30} />
                                        <span className="text-sm pl-3 pt-1">John S. White</span>
                                    </div>
                                </td>
                                <td>-</td>
                                <td>
                                    <div className="flex">
                                        <div className="h-3 rounded-full bg-other_challenges w-10/12 mt-1"></div>
                                        <div className="bg-other_challenges rounded-full ml-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white_color" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <img src="/img/manage_challenge/facebook.png" />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <div className="flex">
                                            <img src="/img/manage_challenge/Path.png" />
                                            <button className="ml-3 text-sm text-other_challenges font-bold">View</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3">
                                    <div className="flex">
                                        <img src="/img/explore/avatar.png" width={30} />
                                        <span className="text-sm pl-3 pt-1">Caren Smith</span>
                                    </div>
                                </td>
                                <td className="text-sm">Fitness Clan</td>
                                <td>
                                    <div className="flex">
                                        <div className="h-3 rounded-full bg-vici_gray w-full mt-1">
                                            <div className="h-3 rounded-full bg-other_challenges  w-10/12"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <img src="/img/manage_challenge/facebook.png" />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <div className="flex">
                                            <img src="/img/manage_challenge/Path.png" />
                                            <button className="ml-3 text-sm text-other_challenges font-bold">View</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3">
                                    <div className="flex">
                                        <img src="/img/explore/avatar.png" width={30} />
                                        <span className="text-sm pl-3 pt-1">Philippe Anthony</span>
                                    </div>
                                </td>
                                <td className="text-sm">Fitness Clan</td>
                                <td>
                                    <div className="flex">
                                        <div className="h-3 rounded-full bg-vici_gray w-full mt-1">
                                            <div className="h-3 rounded-full bg-other_challenges  w-10/12"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <img src="/img/manage_challenge/facebook.png" />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <div className="flex">
                                            <img src="/img/manage_challenge/Path.png" />
                                            <button className="ml-3 text-sm text-other_challenges font-bold">View</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3">
                                    <div className="flex">
                                        <img src="/img/explore/avatar.png" width={30} />
                                        <span className="text-sm pl-3 pt-1">Kenneth Lopez</span>
                                    </div>
                                </td>
                                <td className="text-sm">Fitness Clan</td>
                                <td>
                                    <div className="flex">
                                        <div className="h-3 rounded-full bg-vici_gray w-full mt-1">
                                            <div className="h-3 rounded-full bg-other_challenges  w-10/12"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <img src="/img/manage_challenge/facebook.png" />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <div className="flex">
                                            <img src="/img/manage_challenge/Path.png" />
                                            <button className="ml-3 text-sm text-other_challenges font-bold">View</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3">
                                    <div className="flex">
                                        <img src="/img/explore/avatar.png" width={30} />
                                        <span className="text-sm pl-3 pt-1">Angela Monday</span>
                                    </div>
                                </td>
                                <td className="text-sm">Fitness Clan</td>
                                <td>
                                    <div className="flex">
                                        <div className="h-3 rounded-full bg-vici_gray w-full mt-1">
                                            <div className="h-3 rounded-full bg-other_challenges  w-10/12"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <img src="/img/manage_challenge/facebook.png" />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <div className="flex">
                                            <img src="/img/manage_challenge/Path.png" />
                                            <button className="ml-3 text-sm text-other_challenges font-bold">View</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Participants