import React from 'react';

import auth from '../../../../services/auth';

class AboutMe extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render () {
        return (
            <div className="bg-vici_light_gray rounded-2xl p-2">
                <div className="py-3 px-6 font-bold">About { auth.user().id == this.props.profile.id ? 'Me' : this.props.profile.name }</div>
                <div className="bg-white_color p-3 rounded-lg">
                    <div className="shadow-border_shadow pb-3">
                        <p>
                            {
                                //auth.userProfile() ? auth.userProfile().bio : ''
                                this.props.profile.bio
                            }
                        </p>
                    </div>
                    <div className="py-3">
                        <div>
                            <div className="font-bold">Mission:</div>
                            <p>
                                {
                                    //auth.userProfile() ? auth.userProfile().mission : ''
                                    this.props.profile.mission
                                }  
                            </p>
                        </div>
                        <div className="pt-3">
                            <div className="font-bold">Preferred pronouns:</div>
                            <p>
                                {
                                    //auth.userProfile() ? auth.userProfile().pref_pronoun : ''
                                    this.props.profile.pref_pronoun
                                }  
                            </p>
                        </div>
                        <div className="pt-3">
                            <div className="font-bold">Birthdate:</div>
                            <p>
                                {
                                    //auth.userProfile() ? auth.userProfile().bday : ''
                                    this.props.profile.bday
                                }
                            </p>
                        </div>
                        <div className="pt-3">
                            <div className="font-bold">Country:</div>
                            <p>
                                {
                                    //auth.userProfile() ? auth.userProfile().country : ''
                                    this.props.profile.country
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutMe