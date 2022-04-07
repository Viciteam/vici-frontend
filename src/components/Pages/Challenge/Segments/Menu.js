import './../../../styles/challenge.css';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'

class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive,
            isSaveStatus: false
        }

        this.saveAsTemplate = this.saveAsTemplate.bind(this); 
        this.backToNewChallenge = this.backToNewChallenge.bind(this); 
    }

    saveAsTemplate(){
        let issavestatus = this.state.isSaveStatus;
        this.setState({isSaveStatus: !issavestatus});
        this.props.isSaveAsTemplete(!issavestatus);
    }

    backToNewChallenge(){
        window.location.replace('/challenge/new');
    }

    render () {
        
        const selectedMenu = parseInt(this.props.isactive);
        // console.log('this state ->', selectedMenu);
        return (
            <div className="goal-menu-inner">
                <div className="dmenu-main">
                    <div className={"dmenu-item " + (selectedMenu === 1 ? 'active_tab' : (selectedMenu >= 2 ? 'done_tab' : ''))}>
                        <div className="ditem-stage">1</div>
                        <div className="ditem-title">Title & Description</div>
                    </div>
                    <div className={"dmenu-item " + (selectedMenu === 2 ? 'active_tab' : (selectedMenu >= 3 ? 'done_tab' : ''))}>
                        <div className="ditem-stage">2</div>
                        <div className="ditem-title">Set Goals & Milestones</div>
                    </div>
                    <div className={"dmenu-item " + (selectedMenu === 3 ? 'active_tab' : (selectedMenu >= 4 ? 'done_tab' : ''))}>
                        <div className="ditem-stage">3</div>
                        <div className="ditem-title">Audience & Duration</div>
                    </div>
                    <div className={"dmenu-item " + (selectedMenu === 4 ? 'active_tab' : '')}>
                        <div className="ditem-stage">4</div>
                        <div className="ditem-title">Customize Appearance</div>
                    </div>
                </div>
                <div className="dsideoptions">
                    <div className="dsitem">
                        <div className="ds-item-icon no-icon">
                            &nbsp;
                        </div>
                        <div className="ds-item-text" onClick={() => this.saveAsTemplate()}>
                            <button className={(this.state.isSaveStatus ? 'active-save-templete-button': 'inactive-save-templete-button')}>Save as Template</button>
                        </div> 
                    </div>
                    <div className="dsitem" onClick={() => this.backToNewChallenge()}>
                        <div className="ds-item-icon">
                            <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                        </div>
                        <div className="ds-item-text">
                            Challenge Types
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu