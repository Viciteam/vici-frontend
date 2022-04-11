import React from 'react';
import { useState, useEffect, useRef } from 'react';

function DoAction ({ closeModal, doAction }) {
    let [actions, setActions] = useState(false);


    return (
        <div className="bg-vici_black bg-opacity-50 fixed inset-0 flex justify-center items-center z-20">
            <div className="bg-white_color xl:w-1/4 lg:w-1/2 md:w-8/12 sm:w-full rounded-lg pb-10">
                <div className="flex justify-between px-6 py-3 bg-primary_background rounded-lg">
                    <div className="text-lg font-bold">
                        Do Action
                    </div>
                    <div>
                        <div onClick={() => {closeModal()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20.7266 16.5L16.7266 20.5L10.7266 14.4983L4.72656 20.5L0.726562 16.5L6.72656 10.5L0.726562 4.5L4.72656 0.5L10.7266 6.5L16.7266 0.5L20.7266 4.5L14.7249 10.5L20.7266 16.5Z" fill="#EB5757"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="border-t border-bottom_gray pt-6">
                    <div className="text-center pb-6 px-3">
                        <div className="font-bold">This action requires you to submit proof when done.</div>
                        <div className="text-sm font-bold mt-6">Submit via: Link</div>
                        <div className="text-sm">Challenge creator will require you to submit a link to your action for verification</div>
                    </div>
                    <div className="px-6 pb-6 flex">
                        <input type="checkbox" checked={actions} onChange={event => setActions(actions = !actions)} className="mt-1"/>
                        <div className="pl-3 font-bold text-sm">I understand, mark action as doing</div>
                    </div>
                    <div className="flex justify-end px-6">
                        <button onClick={() => {closeModal()}} className="py-2 px-3 border border-bottom_gray uppercase text-medium_gray rounded-lg text-sm mr-3">Cancel</button>
                        <button disabled={!actions} onClick={() => {doAction()}} className="py-2 px-3 text-sm bg-primary_color text-white_color rounded-lg">Do Action</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DoAction