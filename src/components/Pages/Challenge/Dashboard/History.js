import React from 'react';
import auth from '../../../../services/auth';
import CookieService from '../../../../services/CookieService';
class History extends React.Component {
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
                    <div className="text-xl font-bold text-vici_secondary_text">History</div>
                </div>
                <div className="shadow-vici mt-6 p-6 flex">
                    <div className="w-1/4 border-r border-bottom_gray py-3">
                        <div className="text-xl font-bold text-other_challenges">{ this.props.details.name }</div>
                        <div className="flex mt-2">
                            <img src={profile_main_image() ? profile_main_image() : '/img/avatarguest.png'} className="w-6 rounded-full" />
                            <div className="text-xs font-bold pl-2 pt-1">{auth.userProfile() ? auth.userProfile().name : auth.user().name}</div>
                        </div>
                    </div>
                    <div className="w-3/4 pt-4">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl">0 times</div>
                        </div>
                        <div className="text-sm text-center">Challenge Happened</div>
                    </div>
                </div>
                <div className="shadow-vici mt-6 rounded-2xl p-6">
                    <div className="flex justify-between">
                        <div className="font-bold">Challenge History</div>
                        <div className="flex">
                            <div className="text-sm pr-3">Sort by: Date</div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="p-3">
                        <table className="table-auto w-full">
                            <thead className="border-b py-3 border-vici_gray">
                                <tr className="py-3">
                                    <th className="py-3 text-left font-normal text-vici_secondary_text">Date</th>
                                    <th className="py-3 text-left font-normal text-vici_secondary_text">No. of participants</th>
                                    <th className="py-3 text-left font-normal text-vici_secondary_text">No. of failed actions</th>
                                    <th className="py-3 text-center font-normal text-vici_secondary_text">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-3">
                                        <div className="flex">
                                            <input type="checkbox" className="mt-2 mr-3 border-vici_gray"/>
                                            <span className="text-sm pl-3 pt-1">Oct 15, 2021</span>
                                        </div>
                                    </td>
                                    <td>24</td>
                                    <td>0</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button className="text-vici_secondary font-bold text-sm">View</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3">
                                        <div className="flex">
                                            <input type="checkbox" className="mt-2 mr-3 border-vici_gray"/>
                                            <span className="text-sm pl-3 pt-1">Oct 16, 2021</span>
                                        </div>
                                    </td>
                                    <td>64</td>
                                    <td>0</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button className="text-vici_secondary font-bold text-sm">View</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3">
                                        <div className="flex">
                                            <input type="checkbox" className="mt-2 mr-3 border-vici_gray"/>
                                            <span className="text-sm pl-3 pt-1">Oct 17, 2021</span>
                                        </div>
                                    </td>
                                    <td>124</td>
                                    <td>4</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button className="text-vici_secondary font-bold text-sm">View</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3">
                                        <div className="flex">
                                            <input type="checkbox" className="mt-2 mr-3 border-vici_gray"/>
                                            <span className="text-sm pl-3 pt-1">Oct 18, 2021</span>
                                        </div>
                                    </td>
                                    <td>241</td>
                                    <td>0</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button className="text-vici_secondary font-bold text-sm">View</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3">
                                        <div className="flex">
                                            <input type="checkbox" className="mt-2 mr-3 border-vici_gray"/>
                                            <span className="text-sm pl-3 pt-1">Oct 19, 2021</span>
                                        </div>
                                    </td>
                                    <td>124</td>
                                    <td>0</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button className="text-vici_secondary font-bold text-sm">View</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3">
                                        <div className="flex">
                                            <input type="checkbox" className="mt-2 mr-3 border-vici_gray"/>
                                            <span className="text-sm pl-3 pt-1">Oct 20, 2021</span>                                        </div>
                                    </td>
                                    <td>114</td>
                                    <td>1</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button className="text-vici_secondary font-bold text-sm">View</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3">
                                        <div className="flex">
                                            <input type="checkbox" className="mt-2 mr-3 border-vici_gray"/>
                                            <span className="text-sm pl-3 pt-1">Oct 21, 2021</span>
                                        </div>
                                    </td>
                                    <td>223</td>
                                    <td>2</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button className="text-vici_secondary font-bold text-sm">View</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3">
                                        <div className="flex">
                                            <input type="checkbox" className="mt-2 mr-3 border-vici_gray"/>
                                            <span className="text-sm pl-3 pt-1">Oct 22, 2021</span>
                                        </div>
                                    </td>
                                    <td>124</td>
                                    <td>2</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button className="text-vici_secondary font-bold text-sm">View</button>
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

export default History