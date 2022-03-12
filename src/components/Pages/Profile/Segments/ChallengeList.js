import './../../../styles/profiles.css';
import React from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

class ChallengeList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            uinfo: this.props.uinfo,
            challenge_id: this.props.challenge_id,
        }
    }

    render () {
        return (
            <div className="dch-item">
                <div className="ditm-inner">
                    <div className="dchallengeheadpart">
                        <div className="dpartimage">
                            <div className="dpimageinner">
                                <img alt="" src="/img/user_main.jpg"/>
                            </div>
                        </div>
                        <div className="dheadtile">
                            <h3><span className="dusername">John Peter Doe</span> created a <span className="dactivity">Challenge for herself!</span></h3>
                            <div className="dtime">5m ago</div>
                            <div className="dtags">
                                <span>health</span>
                                <span>productibity</span>
                            </div>
                        </div>
                    </div>
                    <div className="challange_content">
                        <div className="cc_inner">
                            <div className="dimage">
                                <div className="dimg-inner">
                                    <img alt="" src="/img/cards.JPG"/>
                                </div>
                            </div>
                            <div className="dinfo">
                                <div className="dinfo-inner">
                                    <div className="dfreq">Daily</div>
                                    <div className="dtitle">Healthy Spirits!</div>
                                    <div className="ddesc">Discipline yourself to drink water more ofter. Begin a healthy life with a small step</div>
                                    <div className="dstatus">
                                        <span>Current milestone:</span> 40 Glasses
                                    </div>
                                    <div className="dprogress">
                                        <div className="douter">
                                            <div className="dorange">&nbsp;</div>
                                        </div>
                                    </div>
                                    {/* <div className="dpeople">
                                        list of people
                                    </div> */}
                                    <div className="dbuttons">
                                        <button>View Challenge</button>
                                        <button className="dwhitebg">Join Challenge</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="challengebuttom">
                        <div className="dcb-inner">
                            <div className="dcleft">
                                <div className="dc-left-item">
                                    <div className="dicon">
                                        <div className="dclikable">
                                            <img alt="" src="/img/like.png"/>
                                        </div>
                                    </div>
                                    <div className="dvals">
                                        <div className="dv-inner">
                                            0
                                        </div>
                                    </div>
                                </div>
                                <div className="dc-left-item">
                                    <div className="dicon">
                                        <div className="dclikable">
                                            <img alt="" src="/img/dislike.png"/>
                                        </div>
                                    </div>
                                    <div className="dvals">
                                        <div className="dv-inner">
                                            0
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dcright">
                                <div className="dccomment">
                                    <img alt="" src="/img/comment.png"/>
                                </div>
                            </div>
                            <br className="clear" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChallengeList