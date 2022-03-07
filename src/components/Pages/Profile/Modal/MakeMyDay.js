import React from 'react';
import { useState, useEffect, useRef } from 'react';

function MakeMyDay ({ closeModal }) {
    let [actions, setActions] = useState([]);


    return (
        <div className="bg-vici_black bg-opacity-50 fixed inset-0 flex justify-center items-center z-20">
            <div className="bg-white_color xl:w-5/12 lg:w-1/2 md:w-8/12 sm:w-full rounded-lg pb-10">
                <div className="flex justify-between p-6 bg-primary_background rounded-lg">
                    <div className="text-lg font-bold">
                    </div>
                    <div>
                        <div onClick={() => {closeModal()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20.7266 16.5L16.7266 20.5L10.7266 14.4983L4.72656 20.5L0.726562 16.5L6.72656 10.5L0.726562 4.5L4.72656 0.5L10.7266 6.5L16.7266 0.5L20.7266 4.5L14.7249 10.5L20.7266 16.5Z" fill="#EB5757"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="w-8/12 mx-auto">
                    <div className="text-center text-xl font-bold">What can you do to make today a great day?</div>
                    <div className="mt-6">
                        <input type="text" className="w-full p-3 text-xl border-b focus:outline-none" placeholder="Challenge title" />
                    </div>
                    <div className="mt-6">
                        <button className="flex p-3 border border-bottom_gray w-full text-left rounded-3xl text-vici_secondary font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M12 4v16m8-8H4" />
                            </svg>
                            Add an action
                        </button>
                    </div>
                    <div className="mt-4">
                        <button className="flex p-3 border border-bottom_gray w-full text-left rounded-3xl text-vici_secondary font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M12 4v16m8-8H4" />
                            </svg>
                            Add a challenge
                        </button>
                    </div>
                </div>
                <div className="m-12 ">
                    <div className="font-bold text-vici_secondary_text">Suggested challenges to add</div>
                    <div className="">
                        <div className="flex w-full overflow-x-hidden relative ">
                            <div className="w-3/4 flex mx-auto mt-6 pb-3 shadow-border_shadow">
                                <div className="cursor-pointer">
                                    <div>
                                        <img src="/img/dummy/makemyday/Frame 1.png" />
                                    </div>
                                </div>
                                <div className="mx-3 cursor-pointer">
                                    <div>
                                        <img src="/img/dummy/makemyday/Frame 2.png" />
                                    </div>
                                </div>
                                <div className="cursor-pointer">
                                    <div>
                                        <img src="/img/dummy/makemyday/Frame 3.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute right-0 top-28 mr-8 z-10">
                                <button className="bg-white_color p-2 rounded-full text-vici_secondary shadow-border_shadow_button">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-bottom_gray pt-6">
                    <div className="flex justify-end px-6">
                        <button onClick={() => {closeModal()}} className="py-2 px-3 border border-bottom_gray uppercase text-medium_gray rounded-lg text-sm mr-3">Back</button>
                        <button onClick={() => {closeModal()}} className="py-2 px-3 text-sm bg-primary_color text-white_color rounded-lg">Save and create challenge</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MakeMyDay