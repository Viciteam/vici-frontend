import React from 'react';
import auth from '../../../../services/auth';
import CookieService from '../../../../services/CookieService';
class Settings extends React.Component {

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
                    <div className="text-xl font-bold text-vici_secondary_text">Settings</div>
                </div>
                <div className="flex mt-6">
                    <div className="w-1/4 mr-6 pb-6 shadow-vici rounded-2xl">
                        <div>
                            <img src="/img/watch_main.png" className="w-full" />
                        </div>
                        <div className="flex justify-center mt-5">
                            <button className="text-sm font-bold text-vici_secondary">Edit challenge photo</button>
                        </div>
                        <div className="flex justify-between pt-6 px-6">
                            <div className="font-bold text-sm">Challenge color</div>
                            <div className="flex">
                                <input type="color" value="#25345C" className="h-8 w-8 rounded-xl" />
                                <div className="pl-3 pt-1 uppercase">#25345C</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4 pb-6 shadow-vici rounded-2xl">
                        <div className="bg-vici_secondary px-6 py-3 text-xl text-white_color rounded-t-2xl">
                            Title & Description
                        </div>
                        <div className="mx-6 flex justify-between py-3 border-b border-vici_gray">
                            <div>
                                <div>Title</div>
                                <div className="pt-3 text-vici_secondary_text">{ this.props.details.name }</div>
                            </div>
                            <div className="pt-4 pr-6">
                                <button className="text-sm text-vici_secondary font-bold">Edit</button>
                            </div>
                        </div>
                        <div className="mx-6 flex justify-between pb-3 pt-5 border-b border-vici_gray">
                            <div>
                                <div>Tagline</div>
                                <div className="pt-3 text-vici_secondary_text">{ this.props.details.description }</div>
                            </div>
                            <div className="pt-4 pr-6">
                                <button className="text-sm text-vici_secondary font-bold">Edit</button>
                            </div>
                        </div>
                        <div className="mx-6 flex justify-between pb-3 pt-5 border-b border-vici_gray">
                            <div>
                                <div>Instructions</div>
                                <div className="pt-3 text-vici_secondary_text">Do the completed set of actions daily </div>
                            </div>
                            <div className="pt-4 pr-6">
                                <button className="text-sm text-vici_secondary font-bold">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-6 p-6 shadow-vici rounded-2xl">
                    <div>
                        <div className="flex">
                            <span className="font-bold pr-6">Edit form</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                        </div>
                        <div className="text-xs text-vici_secondary_text pt-3">Collect additional information from participants</div>
                    </div>
                    <div>
                        <button className="flex mt-4">
                            <span className="text-xs font-bold pr-3">Show after joining</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex justify-between mt-6 p-6 shadow-vici rounded-2xl relative">
                    <div className="absolute right-0 top-0 text-sm uppercase italic bg-primary_color px-3 rounded-full text-white_color">
                        New
                    </div>
                    <div>
                        <div className="flex">
                            <span className="font-bold pr-6">Enable penalty on abandon</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                        </div>
                        <div className="text-xs text-vici_secondary_text pt-3">Participants who chose to abandon your challenge will automatically be given the penalty in the challenge.</div>
                    </div>
                    <div>
                        <label for="toggleB" class="flex items-center cursor-pointer mt-4 mr-6">
                            <div class="relative mute-chat">
                                <input type="checkbox" id="toggleB" class="sr-only" />
                                <div class="block bg-primary_color w-12 h-7 rounded-full"></div>
                                <div class="dot absolute left-1 top-1 bg-vici_gray w-5 h-5 rounded-full transition"></div>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="mt-6 p-6 shadow-vici rounded-2xl">
                    <div className="font-bold">Audience & Duration</div>
                    <div className="flex justify-between mt-6 py-3 border-b border-vici_gray">
                        <div>
                            <div>Challenge Duration</div>
                            <div className="pt-3 text-sm text-vici_secondary_text">Daily</div>
                        </div>
                        <div className="pt-4 pr-6">
                            <button className="text-sm text-vici_secondary font-bold">Edit</button>
                        </div>
                    </div>
                    <div className="flex justify-between mt-6 py-3 border-b border-vici_gray">
                        <div>
                            <div>Challenge Privacy</div>
                            <div className="pt-3 text-sm text-vici_secondary_text">Everyone</div>
                        </div>
                        <div className="pt-4 pr-6">
                            <button className="text-sm text-vici_secondary font-bold">Edit</button>
                        </div>
                    </div>
                    <div className="flex justify-between mt-6 py-3 border-b border-vici_gray">
                        <div>
                            <div>Participant’s Location</div>
                            <div className="pt-3 flex text-sm text-vici_secondary_text">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Anywhere</div>
                        </div>
                        <div className="pt-4 pr-6">
                            <button className="text-sm text-vici_secondary font-bold">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings