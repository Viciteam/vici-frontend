import './../../../styles/challenge.css';
import React from 'react';

import Switch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faGlobeEurope, faMapMarkerAlt, faArrowDown} from '@fortawesome/free-solid-svg-icons'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class StepThree extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive,
            activepart: 'three_challenge_privacy',
            stepThreeValues: {
                "locations_country": "anywhere"
            },
            participantsLocation: false,
            showDropOptions: false,
            showCountry: false,
            showState: false,
            showCity: false,
            enableFormAfterJoining: false,
            showformPart: 1,
            maxItems: 3,
            startDate: '',
            endDate: '',
            dstates: [ 'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua & Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bonaire', 'Bosnia & Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Ter', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Canary Islands', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Channel Islands', 'Chile', 'China', 'Christmas Island', 'Cocos Island', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote DIvoire', 'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Ter', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar'],
            showAllCountry: false
        }

        this.createActive = this.createActive.bind(this);
        this.populateInput = this.populateInput.bind(this);
        this.showDropBase = this.showDropBase.bind(this);
        this.openCountry = this.openCountry.bind(this);
        this.openState = this.openState.bind(this);
        this.openCity = this.openCity.bind(this);
        this.activateItem = this.activateItem.bind(this);
        this.resetCount = this.resetCount.bind(this);
        this.toogleSelectSpecificLocation = this.toogleSelectSpecificLocation.bind(this);
        this.toogleEnableFormAfterJoining = this.toogleEnableFormAfterJoining.bind(this);
        this.proceedToNext = this.proceedToNext.bind(this);
        this.proceedToPrev = this.proceedToPrev.bind(this);
        // this.proceedToNext = this.proceedToNext.bind(this); 
        this.showAllSteps = this.showAllSteps.bind(this); 
        this.selectLocationParticipantsAll = this.selectLocationParticipantsAll.bind(this); 

        this.setStartDate = this.setStartDate.bind(this); 
        this.setEndDate = this.setEndDate.bind(this); 
    }

    setStartDate(date){
        this.setState({startDate: date});
        this.populateInput('challenge_duration_fixed_start_date', date);
    }

    setEndDate(date){
        this.setState({endDate: date});
        this.populateInput('challenge_duration_fixed_end_date', date);
    }

    populateInput(state, e){
        let dform = this.state.stepThreeValues;
        dform[state] = e;
        this.setState({stepThreeValues: dform});
    }

    toogleSelectSpecificLocation(e){
        // console.log('istrue -> ', e);
        if(e === 'select_location'){
            this.populateInput('selected_location', 'specific')
            this.setState({participantsLocation: true});
            let dform = this.state.stepThreeValues;
            dform.locations_country = [];
            this.setState({stepThreeValues: dform});
        } else {
            this.populateInput('selected_location', 'anywhere')
            let dform = this.state.stepThreeValues;
            dform.locations_country = 'anywhere';
            this.setState({stepThreeValues: dform});
            this.setState({participantsLocation: false});
        }
    }

    createActive(setactive){
        this.setState({activepart: setactive})
    }

    showDropBase(){
        if(this.state.showDropOptions === false){
            this.setState({showDropOptions: true})
        } else {
            this.setState({showDropOptions: false})
        }

    }

    resetCount(){
        this.setState({showCountry: false})
        this.setState({showState: false})
        this.setState({showCity: false})
    }

    openCountry(){
        this.resetCount();

        if(this.state.showCountry === false){
            this.setState({showCountry: true})
        } else {
            this.setState({showCountry: false})
        }
    }

    openState(){
        this.resetCount();

        if(this.state.showState === false){
            this.setState({showState: true})
        } else {
            this.setState({showState: false})
        }
    }

    openCity(){
        this.resetCount();

        if(this.state.showCity === false){
            this.setState({showCity: true})
        } else {
            this.setState({showCity: false})
        }
    }

    activateItem(showOption){
        if(showOption === "option_one"){
            this.setState({showOptionOne: true})
            this.setState({showOptionTwo: false})
            this.populateInput('challenge_duration', 'fixed')
        }

        if(showOption === "option_two"){
            this.setState({showOptionOne: false})
            this.setState({showOptionTwo: true})
            this.populateInput('challenge_duration', 'ranged')
        }
    }

    toogleEnableFormAfterJoining(){
        let enableForm = !this.state.enableFormAfterJoining;
        this.setState({enableFormAfterJoining: enableForm});
        this.populateInput('enable_form_after_joining', enableForm)
    } 

    selectLocationParticipants(item){
        let dform = this.state.stepThreeValues;
        console.log('save local participant actions -> ', dform);
        if(dform.locations_country.includes(item)){
            dform.locations_country = dform.locations_country.filter(e => e !== item)
        } else {
            dform.locations_country.push(item);
        }
        
        this.setState({stepThreeValues: dform})
        
    }

    selectLocationParticipantsAll(e){
        let dform = this.state.stepThreeValues;
        
        if(e){
            dform.locations_country = this.state.dstates;
        } else {
            dform.locations_country = [];
        }

        this.setState({stepThreeValues: dform})
        
    }

    getChecked(item){
        let dform = this.state.stepThreeValues;
        
        if(dform.locations_country.includes(item)){
            return true;
        } else {
            return false;
        }
    }

    proceedToNext(){
        this.props.callback(this.state.stepThreeValues);
    }

    proceedToPrev(){
        this.props.toBack(true);
    }

    openIdentifySteps(){
        let steps = this.state.showformPart;
        this.setState({showformPart: steps + 1});
    }

    showAllSteps(event, item){
        // console.log('show selected ->', event.target.checked);
        if(event.target.checked){
            this.setState({showformPart: 4});
		}
    }

    render () {
        
        return (
            <div className="step-three-inner">
                <h2>Audience & Duration</h2>

                <div className={"cg-item " + (this.state.activepart === 'three_challenge_privacy' ? 'active_item' : '')} onFocus={() => this.createActive('three_challenge_privacy') }>
                    <div className="cg-label">Challenge Privacy</div>
                    <div className="cg-input dactivity">
                        <div className="dc_privacy">
                            <select name="" className="dc_privacy_setting" onChange={(e) => this.populateInput('challenge_privacy', e.target.value)}>
                                <option >Invite Only</option>
                                <option >Public</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={"cg-item " + (this.state.activepart === 'three_locations_of_participants' ? 'active_item' : '')} style={(this.state.showformPart >= 2 ? {} : {display: 'none'})} onFocus={() => this.createActive('three_locations_of_participants') }>
                    <div className="cg-label">Location of participants</div>
                    <div className="cg-input dactivity">

                        <div className="dlp-inner">
                            <div className="dlp-item" onClick={() => this.toogleSelectSpecificLocation('anywhere')}>
                                <div className="dlp-radio">
                                    <input type="radio" name="participants_location" checked={!this.state.participantsLocation} onChange={()=>{}} />
                                </div>
                                <div className="dlp-label"><FontAwesomeIcon icon={faGlobeEurope} /> Anywhere</div>
                            </div>
                            <div className="dlp-item" onClick={() => this.toogleSelectSpecificLocation('select_location')}>
                                <div className="dlp-radio">
                                    <input type="radio" name="participants_location" checked={this.state.participantsLocation} onChange={()=>{}} />
                                </div>
                                <div className="dlp-label select_locations"><FontAwesomeIcon icon={faMapMarkerAlt} /> Select Locations</div>
                            </div>
                            <div className={"dlp-item ddown_list " + (this.state.participantsLocation ? 'active_item' : '')}>
                                <div className="dselectlocation" onClick={() => this.showDropBase()}>Select Location</div>
                                <div className={"dlocationlist " + (this.state.showDropOptions === true ? 'show-location-options': 'hide-location-options')}>
                                    <div className="dll-item">
                                        <div className="dll-item-label" onClick={() => this.openCountry()}>By Country <span>></span></div>
                                        <div className={"dll-item-dropdown " + (this.state.showCountry === true ? 'show-me': 'hide-me')}>
                                            <div className="dlistofcountry">
                                                {/* <div className="dinputselect">
                                                    <input type="text" placeholder="Search.." />
                                                </div> */}
                                                <div className="dcountrylist">
                                                    <ul>
                                                        <li>
                                                            <input type="checkbox" id="forselectall" onChange={(e) => this.selectLocationParticipantsAll(e.target.checked)} />
                                                            <span htmlFor='forselectall'><strong>Select All</strong></span>
                                                        </li>
                                                        {
                                                            this.state.dstates.map((item, i) => (
                                                                <li key={i}>
                                                                    <input type="checkbox" id={i} checked={this.getChecked(item)} onChange={() => this.selectLocationParticipants(item)} />
                                                                    <label htmlFor={i}>{item}</label>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="dll-item">
                                        <div className="dll-item-label" onClick={() => this.openState()}>By State <span>></span></div>
                                        <div className={"dll-item-dropdown " + (this.state.showState === true ? 'show-me': 'hide-me')}>
                                            show dropdown
                                        </div>
                                    </div>
                                    <div className="dll-item">
                                        <div className="dll-item-label" onClick={() => this.openCity()}>By City <span>></span></div>
                                        <div className={"dll-item-dropdown " + (this.state.showCity === true ? 'show-me': 'hide-me')}>
                                            show dropdown
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className={"cg-item " + (this.state.activepart === 'three_enable_form' ? 'active_item' : '')} style={(this.state.showformPart >= 3 ? {} : {display: 'none'})} onFocus={() => this.createActive('three_enable_form')}>
                    <div className="cg-label">Enable form</div>
                    <div className="cg-input dactivity">
                        <div className="subheader">Collect additional information from participants</div>
                        <div className="ditem-flow"><div className="dflowtext">Show after joining</div> <Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleEnableFormAfterJoining} checked={this.state.enableFormAfterJoining} /></div>
                    </div>
                </div> */}


                <div className={"cg-item " + (this.state.activepart === 'three_challenge_duration' ? 'active_item' : '')} style={(this.state.showformPart >= 3 ? {} : {display: 'none'})} onFocus={() => this.createActive('three_challenge_duration') }>
                    <div className="cg-label">Challenge Duration</div>
                    <div className="cg-input dactivity">
                        <div className="cd-dropbase">
                            <div className="cd-toprions-items">
                                <div className={"cd-tp-item-left cd-item-part " + (this.state.showOptionOne ? 'active_item' : 'inactive_item')} onClick={() => this.activateItem('option_one')}>Fixed Duration</div>
                                <div className={"cd-tp-item-right cd-item-part " + (this.state.showOptionTwo ? 'active_item' : 'inactive_item')} onClick={() => this.activateItem('option_two')}>Recurring Frequency</div>
                            </div>
                            <div className="dshowitems">
                                <div className={"cd-option-one dshowoptions " + (this.state.showOptionOne ? 'active_item' : 'inactive_item')}>
                                    <div className="cd-option-item">
                                        <div className="cd-input-item">
                                            <DatePicker selected={this.state.startDate} onChange={(date) => this.setStartDate(date)} placeholderText="Start Date" />
                                            {/* <input type="text" name="" placeholder="Start Date" onChange={(e) => this.populateInput('challenge_duration_fixed_start_date', e.target.value)} /> */}
                                        </div>
                                        <div className="cd-input-item">
                                            <DatePicker selected={this.state.endDate} onChange={(date) => this.setEndDate(date)} placeholderText="End Date" />
                                            {/* <input type="text" name="" placeholder="End Date" onChange={(e) => this.populateInput('challenge_duration_fixed_end_date', e.target.value)} /> */}
                                        </div>
                                        <div className="cd-input-item">
                                            <input type="text" name="" placeholder="11:00 am" onChange={(e) => this.populateInput('challenge_duration_fixed_end_time', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className={"cd-option-two dshowoptions " + (this.state.showOptionTwo ? 'active_item' : 'inactive_item')}>
                                    <div className="cd-option-item">
                                        <div className="cd-input-item">
                                            <select name="" id="" onChange={(e) => this.populateInput('challenge_duration_ranged_frequency', e.target.value)}>
                                                <option >Once</option>
                                                <option >Daily</option>
                                                <option >Weekly</option>
                                                <option >Monthly</option>
                                                <option >Set Duration</option>
                                            </select>
                                        </div>
                                        <div className="cd-input-item">
                                            <select name="" id="" onChange={(e) => this.populateInput('challenge_duration_ranged_repeat', e.target.value)}>
                                                <option >End On</option>
                                                <option >Repeat</option>
                                            </select>
                                        </div>
                                        <div className="cd-input-item">
                                            <input type="text" name="" placeholder="11:00 am" onChange={(e) => this.populateInput('challenge_duration_ranged_start_time', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="step-by-step-options" style={(this.state.showformPart < this.state.maxItems ? {} : {display: 'none'})}>
                    <div className='step-show-all'>
                        <input type="checkbox" onChange={(e) => this.showAllSteps(e, 'show_all')} /> show all steps
                    </div>
                    <div className='step-show-once'>
                        <button onClick={() => this.openIdentifySteps()}>{this.state.showformPart}/{this.state.maxItems} <FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                </div>

                <div className="dnext-button" style={(this.state.showformPart >= this.state.maxItems ? {} : {display: 'none'})}>
                    <button className="prev-arrow" onClick={() => this.proceedToPrev()}>Back</button>
                    <button className="next-arrow" onClick={() => this.proceedToNext()}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default StepThree