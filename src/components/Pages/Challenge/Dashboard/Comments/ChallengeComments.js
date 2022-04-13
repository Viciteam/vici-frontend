import React from 'react';
import moment from 'moment';

class ChallengeComments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render () {
        return (
            <div>
                {
                    this.props.comments.map((item, i) => (
                        <div className="mt-6">
                            <div className="flex border-b pb-3 border-medium_gray w-full">
                                <div>
                                    <img src={item.profpic_link} width={44} className="rounded-sm" />
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between">
                                        <div className="text-vici_secondary_text pl-6">{item.name_of_user}</div>
                                        <div className="text-sm pl-6 text-medium_gray">{moment(item.created_at).fromNow()}</div>
                                    </div>
                                    <div className="text-sm pl-6 text-medium_gray">{item.comment_message}</div>
                                    {
                                        item.comment_media &&
                                        <div className="px-6 py-2 max-h-80 flex justify-center">
                                            <img src={item.comment_media} className="rounded-sm max-h-80" />
                                        </div>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default ChallengeComments