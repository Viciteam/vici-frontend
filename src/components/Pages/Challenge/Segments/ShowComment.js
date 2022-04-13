import './../../../styles/challenge.css';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisV, faThumbsUp, faThumbsDown, faCommentAlt} from '@fortawesome/free-solid-svg-icons'

import moment from 'moment';

class ShowComment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive
        }
    }

    render () {
        return (
            <div className="dpost-list-item comment-item">
                <div className="dpost-list-item">
                    <div className="dpost-list-item-header">
                        <div className="dpost-list-image">
                            <img src={this.props.info.profpic_link} alt="" />
                        </div>
                        <div className="dpost-list-text">
                            <h3>{this.props.info.name_of_user}</h3>
                            <div className="dnumber">{moment(this.props.info.created_at).fromNow()}</div>
                        </div>
                        {/* <div className="dpost-list-dots">
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </div> */}
                    </div>
                    <div className="dpost-list-item-post">
                        {this.props.info.comment_message}
                    </div>
                    <div className="dpost-list-item-ops">
                        <div className="dpost-list-left">
                            <div className="lkbtn likebtn">
                                <span className="dicon"><FontAwesomeIcon icon={faThumbsUp} /></span>
                                <span className="dnum">0</span>
                            </div>
                            <div className="lkbtn dislikebtn">
                                <span className="dicon"><FontAwesomeIcon icon={faThumbsDown} /></span>
                                <span className="dnum">0</span>
                            </div>
                        </div>
                        {/* <div className="dpost-list-right">
                            <FontAwesomeIcon icon={faCommentAlt} />
                        </div> */}
                    </div>
                </div> 
            </div> 
        )
    }
}

export default ShowComment