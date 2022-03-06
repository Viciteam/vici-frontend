import './../../styles/challenge.css';
import React from 'react';

import { withRouter } from 'react-router-dom'

import Menu from './Segments/Menu'

// import steps
import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'

import Switch from "react-switch";

import ReactModal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBars, faEllipsisV, faGlobeEurope, faMapMarkerAlt, faImage, faCrosshairs, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

import { HexColorPicker } from "react-colorful";

import ReactTooltip from 'react-tooltip';

import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.vici.life/api/',
  headers: {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization' : 'Bearer 1|74Q5WHcDLDhCb5M9NtabCridB2ZN68CGFaS5r2yN',
    'X-CSRF-TOKEN': '1|74Q5WHcDLDhCb5M9NtabCridB2ZN68CGFaS5r2yN'
  }
})

class GoalChallengeOne extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            challengeID: this.props.match.params.id,
            uinfo: this.props.uinfo,
            activepart: 'title',
            stepnumber: 2,
            menuActive: 3,
            activityList: [{"activity": ""}],
            checked: false,
            showCountry: false,
            showState: false,
            showCity: false,
            showDropOptions: false,
            showOptionOne: true,
            showOptionTwo: false,
            selectedColor: '#03488d',
            selectedPreviewHeaderImage: '/img/prev-header.png',
            socialActionSLide: false,
            
            
            allowPenalty: false,
            participantsLocation: false,
            enableFormAfterJoining: false,
            
            // challenge form
            formDetails: {
                'details': {}
            },
            challengeTitle: '',
            title: '',

            // challenge form
            stepOneData: [],
            stepTwoData: [],
        }
        this.createActive = this.createActive.bind(this);
        this.proceedToNext = this.proceedToNext.bind(this);
        this.proceedToPrev = this.proceedToPrev.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openCountry = this.openCountry.bind(this);
        this.showDropBase = this.showDropBase.bind(this);
        this.activateItem = this.activateItem.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changePrevHeader = this.changePrevHeader.bind(this);
        
        
        this.handleStepTwoPreviousStep = this.handleStepTwoPreviousStep.bind(this);
        
        
        this.toogleChangeChallengePrivacy = this.toogleChangeChallengePrivacy.bind(this);
        this.toogleSelectSpecificLocation = this.toogleSelectSpecificLocation.bind(this);
        this.toogleEnableFormAfterJoining = this.toogleEnableFormAfterJoining.bind(this);
        
        // change tab
        this.populateInput = this.populateInput.bind(this);
        this.submitChallengeForm = this.submitChallengeForm.bind(this);

        this.handleStepOneCallback = this.handleStepOneCallback.bind(this);
        this.handleStepTwoCallback = this.handleStepTwoCallback.bind(this);

        this.activity_list = [
            {"activity": ""}
        ];
    }
    
    

    

    toogleChangeChallengePrivacy(){
        console.log();
    }

    toogleSelectSpecificLocation(e){
        console.log('istrue -> ', e);
        if(e === 'select_location'){
            this.populateInput('selected_location', 'specific')
            this.setState({participantsLocation: true});
        } else {
            this.populateInput('selected_location', 'anywhere')
            this.setState({participantsLocation: false});
        }
    }

    toogleEnableFormAfterJoining(){
        let enableForm = !this.state.enableFormAfterJoining;
        this.setState({enableFormAfterJoining: enableForm});
        this.populateInput('enable_form_after_joining', enableForm)
    } 

    createActive(setactive){
        console.log('Type ->', setactive);
        this.setState({activepart: setactive})
    }

    populateInput(state, e){
      let dform = this.state.formDetails;
      dform[state] = e;
      this.setState({formDetails: dform});
    //   console.log('changed '+state+' -> ', e);
    }
    
    proceedToNext(){
        let stepnum = this.state.stepnumber + 1;
        let menuitem = this.state.menuActive + 1;
        this.setState({stepnumber: stepnum})
        this.setState({menuActive: menuitem})
    }

    proceedToPrev(){
        let stepnum = this.state.stepnumber - 1;
        let menuitem = this.state.menuActive - 1;
        this.setState({stepnumber: stepnum})
        this.setState({menuActive: menuitem})
    }

    handleStepTwoPreviousStep(){
        this.proceedToPrev();
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    /** Page 2 */

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

    showDropBase(){
        if(this.state.showDropOptions === false){
            this.setState({showDropOptions: true})
        } else {
            this.setState({showDropOptions: false})
        }

    }

    activateItem(showOption){
        console.log('show option ->', showOption);



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

    changeColor(vals){
        // console.log(vals);
        this.setState({selectedColor: vals});
        this.populateInput('challenge_color', vals)
    }

    changePrevHeader(selectedTodo){
        this.setState({selectedPreviewHeaderImage: selectedTodo});
    }

    
    
    submitChallengeForm(){
        console.log(this.state.formDetails);

        let formDetails = this.state.formDetails;

        let params = [];

        params['name'] = formDetails.challengeTitle;
        params['description'] = formDetails.instructions_rules;
        params['is_template'] = 'No';
        params['owner_id'] = '1';
        params['details'] = [];

        Object.keys(formDetails).forEach(function(key) {
            let subdetails = [];
            console.log('dkeys ->', key);
            if(key !== 'details' || key !== 'challengeTitle' || key !== 'instructions_rules'){
                subdetails['field'] = key;
                subdetails['data'] = formDetails[key];
                console.log('subdetails ->', subdetails);
                params['details'].push(subdetails);
            }
        });

        let parameters = JSON.stringify(params);

        api.post('/challenge', parameters)
        .then((response) => {
            console.log(response);
        });

        //     api.get('challenge/'+this.state.challengeID).then(
        //     (response) => {
        //       console.log('response -> ', response.data.challenges);
        //       let challenges = response.data.challenges[0];

        //       let challenge_details = [];
        //       challenge_details['name'] = challenges.name;
        //       challenge_details['description'] = challenges.description;
        //       this.setState({challengeDetails: challenge_details});
            
        //     //   this.setState({challengeActions: challenges.actions});

        //       // challenge actions
        //     }
        //   ).catch((error) => {
        //     console.log('error -> ', error);
        //   });
        
        console.log('params ->', params);
    }

    handleStepOneCallback(StepOneInfo){
        console.log('step one info -> ', StepOneInfo);
        this.setState({stepOneData: StepOneInfo});
        this.proceedToNext();
    }

    handleStepTwoCallback(SteptwoInfo){
        console.log('step two info -> ', SteptwoInfo);
        this.setState({stepTwoData: SteptwoInfo});
        this.proceedToNext();
    }

    render () {
        const tip_images = [
            '/img/challenge_tip1.png',
            '/img/challenge_tip2.png',
            '/img/challenge_tip3.png',
        ];

        const tip_message = [
            'Remember a good title catches your reader\'s interest. But don\'t just be a clickbait. Keep It Short, Simple, and on Point.',
            'Measurable goals are easier to gauge. Just choose and click!',
            'A goal with a deadline helps you achieve it much quicker.',
        ]

        const challenge_photo = [
            '/img/prev-header.png',
            '/img/prev-header1.png',
            '/img/prev-header2.png',
            '/img/prev-header3.png',
        ];

        const todoItems = challenge_photo.map((todo, index) =>
            // Only do this if items have no stable IDs
            <li key={index}>
                <div className={"dlistimage " + (this.state.selectedPreviewHeaderImage === todo ? 'ditem-active' : "")}>
                    <div className="dlimg-base" onClick={() => this.changePrevHeader(todo)} style={{background: 'url('+todo+') no-repeat center center'}}>&nbsp;</div>
                </div>
            </li>
        );
        
        return (
            <div className="challenges-goal-page-inner">
                <ReactTooltip />
                <div className="cgoal-inner">
                    <div className="cgoal-left">
                        <div className="cgoal-left-inner">
                            <div className="dtitle">
                                <div className="dimage">
                                    <img src="/img/ch_goal.png" alt="" />
                                </div>
                                <div className="dtext">
                                    Goal Challenge
                                </div>
                            </div>
                            <div className="dmenu-side">
                                <Menu isactive={this.state.menuActive} />
                            </div>
                        </div>
                    </div>

                    <div className="cgoal-center">

                          <div className={"dstep step_one " + (this.state.stepnumber === 0 ? 'isactive_tab' : '')}>
                              <StepOne callBack={this.handleStepOneCallback} />
                          </div>

                          <div className={"dstep step_one " + (this.state.stepnumber === 1 ? 'isactive_tab' : '')}>
                              <div className="cgoal-center-inner">
                                  <StepTwo callBack={this.handleStepTwoCallback} toBack={this.handleStepTwoPreviousStep}/>
                              </div>
                          </div>

                          <div className={"dstep step_one " + (this.state.stepnumber === 2 ? 'isactive_tab' : '')}>
                              <div className="cgoal-center-inner">
                                  <h2>Audience & Duration</h2>

                                  <div className={"cg-item " + (this.state.activepart === 'three_challenge_privacy' ? 'active_item' : '')} onFocus={() => this.createActive('three_challenge_privacy') }>
                                      <div className="cg-label">Challenge Privacy</div>
                                      <div className="cg-input dactivity">
                                          <div className="dc_privacy">
                                              <select name="" className="dc_privacy_setting" onChange={(e) => this.populateInput('challenge_privacy', e.target.value)}>
                                                  <option >Invite Only</option>
                                                  <option >Invite Only</option>
                                                  <option >Invite Only</option>
                                              </select>
                                          </div>
                                      </div>
                                  </div>

                                  <div className={"cg-item " + (this.state.activepart === 'three_locations_of_participants' ? 'active_item' : '')} onFocus={() => this.createActive('three_locations_of_participants') }>
                                      <div className="cg-label">Location of participants</div>
                                      <div className="cg-input dactivity">

                                          <div className="dlp-inner">
                                              <div className="dlp-item">
                                                  <div className="dlp-radio">
                                                      <input type="radio" name="participants_location" onChange={() => this.toogleSelectSpecificLocation('anywhere')} />
                                                  </div>
                                                  <div className="dlp-label"><FontAwesomeIcon icon={faGlobeEurope} /> Anywhere</div>
                                              </div>
                                              <div className="dlp-item">
                                                  <div className="dlp-radio">
                                                      <input type="radio" name="participants_location" onChange={() => this.toogleSelectSpecificLocation('select_location')} />
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
                                                                  <div className="dinputselect">
                                                                      <input type="text" placeholder="Search.." />
                                                                  </div>
                                                                  <div className="dcountrylist">
                                                                      <ul>
                                                                          <li>Afghanistan</li>
                                                                          <li>Albania</li>
                                                                          <li>Algeria</li>
                                                                          <li>American Samoa</li>
                                                                          <li>Andorra</li>
                                                                          <li>Angola</li>
                                                                          <li>Anguilla</li>
                                                                          <li>Antigua & Barbuda</li>
                                                                          <li>Argentina</li>
                                                                          <li>Armenia</li>
                                                                          <li>Aruba</li>
                                                                          <li>Australia</li>
                                                                          <li>Austria</li>
                                                                          <li>Azerbaijan</li>
                                                                          <li>Bahamas</li>
                                                                          <li>Bahrain</li>
                                                                          <li>Bangladesh</li>
                                                                          <li>Barbados</li>
                                                                          <li>Belarus</li>
                                                                          <li>Belgium</li>
                                                                          <li>Belize</li>
                                                                          <li>Benin</li>
                                                                          <li>Bermuda</li>
                                                                          <li>Bhutan</li>
                                                                          <li>Bolivia</li>
                                                                          <li>Bonaire</li>
                                                                          <li>Bosnia & Herzegovina</li>
                                                                          <li>Botswana</li>
                                                                          <li>Brazil</li>
                                                                          <li>British Indian Ocean Ter</li>
                                                                          <li>Brunei</li>
                                                                          <li>Bulgaria</li>
                                                                          <li>Burkina Faso</li>
                                                                          <li>Burundi</li>
                                                                          <li>Cambodia</li>
                                                                          <li>Cameroon</li>
                                                                          <li>Canada</li>
                                                                          <li>Canary Islands</li>
                                                                          <li>Cape Verde</li>
                                                                          <li>Cayman Islands</li>
                                                                          <li>Central African Republic</li>
                                                                          <li>Chad</li>
                                                                          <li>Channel Islands</li>
                                                                          <li>Chile</li>
                                                                          <li>China</li>
                                                                          <li>Christmas Island</li>
                                                                          <li>Cocos Island</li>
                                                                          <li>Colombia</li>
                                                                          <li>Comoros</li>
                                                                          <li>Congo</li>
                                                                          <li>Cook Islands</li>
                                                                          <li>Costa Rica</li>
                                                                          <li>Cote DIvoire</li>
                                                                          <li>Croatia</li>
                                                                          <li>Cuba</li>
                                                                          <li>Curacao</li>
                                                                          <li>Cyprus</li>
                                                                          <li>Czech Republic</li>
                                                                          <li>Denmark</li>
                                                                          <li>Djibouti</li>
                                                                          <li>Dominica</li>
                                                                          <li>Dominican Republic</li>
                                                                          <li>East Timor</li>
                                                                          <li>Ecuador</li>
                                                                          <li>Egypt</li>
                                                                          <li>El Salvador</li>
                                                                          <li>Equatorial Guinea</li>
                                                                          <li>Eritrea</li>
                                                                          <li>Estonia</li>
                                                                          <li>Ethiopia</li>
                                                                          <li>Falkland Islands</li>
                                                                          <li>Faroe Islands</li>
                                                                          <li>Fiji</li>
                                                                          <li>Finland</li>
                                                                          <li>France</li>
                                                                          <li>French Guiana</li>
                                                                          <li>French Polynesia</li>
                                                                          <li>French Southern Ter</li>
                                                                          <li>Gabon</li>
                                                                          <li>Gambia</li>
                                                                          <li>Georgia</li>
                                                                          <li>Germany</li>
                                                                          <li>Ghana</li>
                                                                          <li>Gibraltar</li>
                                                                      </ul>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div className="dll-item">
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
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className={"cg-item " + (this.state.activepart === 'three_enable_form' ? 'active_item' : '')} onFocus={() => this.createActive('three_enable_form')}>
                                      <div className="cg-label">Enable form</div>
                                      <div className="cg-input dactivity">
                                          <div className="subheader">Collect additional information from participants</div>
                                          <div className="ditem-flow"><div className="dflowtext">Show after joining</div> <Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleEnableFormAfterJoining} checked={this.state.enableFormAfterJoining} /></div>
                                      </div>
                                  </div>


                                  <div className={"cg-item " + (this.state.activepart === 'three_challenge_duration' ? 'active_item' : '')} onFocus={() => this.createActive('three_challenge_duration') }>
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
                                                              <input type="text" name="" placeholder="Start Date" onChange={(e) => this.populateInput('challenge_duration_fixed_start_date', e.target.value)} />
                                                          </div>
                                                          <div className="cd-input-item">
                                                              <input type="text" name="" placeholder="End Date" onChange={(e) => this.populateInput('challenge_duration_fixed_end_date', e.target.value)} />
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


                                  <div className="dnext-button">
                                      <button className="prev-arrow" onClick={() => this.proceedToPrev()}>Back</button>
                                      <button className="next-arrow" onClick={() => this.proceedToNext()}>Next &rarr;</button>
                                  </div>
                              </div>
                          </div>

                          <div className={"dstep step_one " + (this.state.stepnumber === 3 ? 'isactive_tab' : '')}>
                              <div className="cgoal-center-inner">
                                  <h2>Customize Appearance</h2>

                                  <div className="dshowstep4">
                                      <div className={"dshowsitem " + (this.state.activepart === 'four_change_photo' ? 'active_item' : '')} onFocus={() => this.createActive('four_change_photo')}>
                                          <div className="dtitle">
                                              <div className="diconbase"><FontAwesomeIcon icon={faImage} /></div>
                                              <div className="dheaderb">Challenge Photo or Icon</div>
                                          </div>
                                          <div className="dinfosection">
                                              <div className="dheaderpart">
                                                  dropdown
                                              </div>
                                              <div className="dphotoslist">
                                                  <ul>
                                                      <li><img alt="" src="/img/s4img0.png" className=""/></li>
                                                      {todoItems}

                                                  </ul>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="dshowsitem">
                                          <div className="dtitle">
                                              <div className="diconbase"><FontAwesomeIcon icon={faCrosshairs} /></div>
                                              <div className="dheaderb">Challenge Color</div>
                                          </div>
                                          <div className="dinfosection">
                                              <div className="designcolorbase">
                                                  <div className="designcolorleft"><HexColorPicker color={this.state.selectedColor} onChange={this.changeColor} /></div>
                                                  <div className="designcolorright">
                                                      <div className="dcolorbasetext">Color Code</div>
                                                      <div className="dcolorvals">
                                                          <div className="dcolorprev" style={{backgroundColor: this.state.selectedColor}}>&nbsp;</div>
                                                          <div className="dcolortext">{this.state.selectedColor}</div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="dnext-button">
                                      <button className="prev-arrow" onClick={() => this.proceedToPrev()}>Back</button>
                                      <button className="next-arrow" onClick={() => this.submitChallengeForm()}>Publish Challenge &rarr;</button>
                                  </div>
                              </div>
                          </div>


                    </div>
                    <div className="cgoal-right">
                        <div className="cgoal-right-inner" style={{display: this.state.stepnumber < 2 ? 'block' : 'none' }} >
                            <div className="dimage"><img src={tip_images[this.state.stepnumber]} alt="" /></div>
                            <div className="dtipbase">Tip { this.state.stepnumber + 1}</div>
                            <div className="dtextinfo">{tip_message[this.state.stepnumber]}</div>
                        </div>
                        <div className="cgoal-right-inner withopts"  style={{display: this.state.stepnumber === 3 ? 'block' : 'none' }} >
                            <div className="withops-inner">
                                <h3>Preview</h3>
                                <div className="withops-show-card">
                                    <h4>Card</h4>
                                    <div className="wsc-inner">
                                        <div className="prev-image">
                                            <img src={this.state.selectedPreviewHeaderImage} alt="" />
                                        </div>
                                        <div className="prev-sm-header">DAILY</div>
                                        <div className="prev-mg-header">HEALTHY SPIRITS!</div>
                                        <div className="prev-mg-desc">For me to discipline myself to drink water more often.</div>
                                        <div className="prev-tags">
                                            <ul>
                                                <li style={{backgroundColor: this.state.selectedColor}}>Health</li>
                                                <li style={{backgroundColor: this.state.selectedColor}}>Health</li>
                                                <li style={{backgroundColor: this.state.selectedColor}}>Health</li>
                                            </ul>
                                        </div>
                                        <div className="prev-participants">
                                            <div className="dpart-list">
                                                <div className="dname">
                                                    <div className="dphoto">
                                                        <img src="/img/prof_icon.png" alt="" />
                                                    </div>
                                                    <div className="dfname">John S. White</div>
                                                </div>
                                                <div className="dnumjoins">20 Joined</div>
                                            </div>
                                        </div>
                                        <div className="prev-instructions">instructions</div>
                                    </div>

                                    <h4>Progress bars, buttons & milestones</h4>
                                    <div className="wsc-inner dprogresspart">
                                        <div className="dprogressbase" style={{backgroundColor: this.state.selectedColor+"70"}}>
                                            <div className="dprogressvals" style={{backgroundColor: this.state.selectedColor, width: '60%'}}>&nbsp;</div>
                                        </div>
                                    </div>

                                    <div className="doptionspart">
                                        <div className="doptleft">
                                            <div className="donut-chart-block block">
                                                <div className="donut-chart" style={{backgroundColor: this.state.selectedColor+"70"}}>
                                                    <div id="part1" className="portion-block"><div className="circle" style={{backgroundColor: this.state.selectedColor}}></div></div>
                                                    <p className="center"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="doptright">
                                            <div className="doptr-item diconpin" style={{color: this.state.selectedColor}}>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            </div>
                                            <div className="doptr-item no-bg">
                                                <button style={{backgroundColor: this.state.selectedColor}}>Join Challenge</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(GoalChallengeOne)
