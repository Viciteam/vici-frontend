import { useHistory } from 'react-router-dom';

const ManageChallenge = ({challenge}) => {

    const history = useHistory();

    function handleRedirect() {
        history.push("/challenge/dashboard/" + challenge.id);
    }
    return (
        <div className='p-6'>
            <div className='flex border-b border-vici_gray'>
                
                <img src="/img/manage_challenge/Frame 1665.png" />
                
                <div>
                    <div className="p-6">
                        <div className="flex">
                            <div className="font-bold text-2xl">200</div>
                            <button className="ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-vici_success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-sm text-center">Visitors</div>
                    </div>
                </div>
                <div>
                    <div className="p-6">
                        <div className="flex">
                            <div className="font-bold text-2xl">134</div>
                            <button className="ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-vici_success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-sm text-center">Joined</div>
                    </div>
                </div>
                <div>
                    <div className="p-6">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl">78%</div>
                            <button className="ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-vici_error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-sm text-center">Completion Rate</div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="py-6">
                        <div className="">
                            <div className="font-bold text-xl">Challenge Stats</div>
                        </div>
                        <button onClick={handleRedirect} className="px-3 py-2 flex bg-other_challenges justify-end text-white_color rounded-lg">
                            <div className="text-sm">Challenge Dashboard</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                {/* <div className="flex mt-4">
                    <div className="w-24 h-24 border-8 rounded-full border-medium_gray text-center pt-4">
                        <div>0</div>
                        <div className="text-xs text-medium_gray">Actions</div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ManageChallenge