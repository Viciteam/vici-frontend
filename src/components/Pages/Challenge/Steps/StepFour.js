import './../../../styles/challenge.css';
import React, {useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faImage, faCrosshairs} from '@fortawesome/free-solid-svg-icons'
import Switch from "react-switch";
import { HexColorPicker } from "react-colorful";

// const inputFile = useRef(null) 
import auth from '../../../../services/auth';
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.vici.life/api/',
  headers: {
    'content-type': 'multipart/form-data',
    'Accept' : 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization' : `Bearer ${auth.getAccessToken()}`,
    'X-CSRF-TOKEN': auth.getAccessToken()
  }
})

class StepFour extends React.Component {
    constructor(props){
        super(props);
        
        this.textInput = null;

        this.setTextInputRef = element => {
            this.textInput = element;
        };

        this.focusTextInput = () => {
            // Focus the text input using the raw DOM API
            if (this.textInput) this.textInput.focus();
        };

        this.state = {
            isactive: this.props.isactive,
            activepart: 'four_change_photo',
            selectedPreviewHeaderImage: 'https://vici.life/img/prev-header.png',
            selectedColor: '#03488d',
            stepFourValues:[],
            newUploadedImage: '',
            saveAsTemplate: false,
            listofimages: [
                'https://vici.life/img/prev-header.png',
                'https://vici.life/img/prev-header1.png',
                'https://vici.life/img/prev-header2.png',
                'https://vici.life/img/prev-header3.png',
            ]
        }

        this.createActive = this.createActive.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changePrevHeader = this.changePrevHeader.bind(this);
        this.populateInput = this.populateInput.bind(this);
        this.proceedUploadImage = this.proceedUploadImage.bind(this);
        this.processFileInput = this.processFileInput.bind(this);
        this.submitChallengeForm = this.submitChallengeForm.bind(this);
        this.toogleSaveAsTemplate = this.toogleSaveAsTemplate.bind(this);
    }

    createActive(setactive){
        // console.log('Type ->', setactive);
        this.setState({activepart: setactive})
    }

    toogleSaveAsTemplate(){
        let newSaveTempalteVals = !this.state.saveAsTemplate;
        
        let dform = this.state.stepFourValues;
        dform['save_as_template'] = newSaveTempalteVals;
        this.setState({stepFourValues: dform});
        this.setState({saveAsTemplate: newSaveTempalteVals});
    }

    changeColor(vals){
        // console.log(vals);
        this.setState({selectedColor: vals});
        this.populateInput('challenge_color', vals)
        this.props.selectedcolor(vals);
    }

    populateInput(state, e){
        let dform = this.state.stepFourValues;
        dform[state] = e;
        this.setState({stepFourValues: dform});
        //   console.log('changed '+state+' -> ', dform);
    }

    changePrevHeader(selectedTodo){
        this.setState({selectedPreviewHeaderImage: selectedTodo});
        this.populateInput('challenge_image', selectedTodo)
        this.populateInput('challenge_color', '#03488d')
        this.props.selectedimage(selectedTodo);
    }

    proceedUploadImage(){
        this.inputElement.click();
    }
    
    processFileInput(event){
        // console.log('change input -> ', event.target.files[0]);
        let thefile = event.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(thefile);

        let self = this;
        const formData = new FormData();
        formData.append('image',thefile)
        api.post('/uploadFile', formData)
        .then((response) => {
            console.log(response.data);
            let newimage = self.state.listofimages;
            newimage.push(response.data.image_url);
            self.setState({ newUploadedImage: newimage})
        });

        reader.onloadend = function (e) {
            
        }.bind(this);

        // console.log('iamge url ->', url);
    }

    proceedToPrev(){
        this.props.toBack(true);
    }
    
    submitChallengeForm(){
        // console.log("submit values -> ", this.state.stepFourValues);
        this.props.callback(this.state.stepFourValues);
    }



    render () {
        const challenge_photo = [
            'https://vici.life/img/prev-header.png',
            'https://vici.life/img/prev-header1.png',
            'https://vici.life/img/prev-header2.png',
            'https://vici.life/img/prev-header3.png',
        ];

        const todoItems = this.state.listofimages.map((todo, index) =>
            // Only do this if items have no stable IDs
            <li key={index}>
                <div className={"dlistimage " + (this.state.selectedPreviewHeaderImage === todo ? 'ditem-active' : "")}>
                    <div className="dlimg-base" onClick={() => this.changePrevHeader(todo)} style={{background: 'url('+todo+') no-repeat center center'}}>&nbsp;</div>
                </div>
            </li>
        );
        
        return (
            <div className="step-four-inner">
                <h2>Customize Appearance</h2>

                <div className="dshowstep4">
                    <div className={"dshowsitem " + (this.state.activepart === 'four_change_photo' ? 'active_item' : '')} onFocus={() => this.createActive('four_change_photo')}>
                        <div className="dtitle">
                            <div className="diconbase"><FontAwesomeIcon icon={faImage} /></div>
                            <div className="dheaderb">Challenge Photo or Icon</div>
                            <input type="file" id='file' ref={input => this.inputElement = input} onChange={this.processFileInput} style={{display: 'none'}} />
                        </div>
                        <div className="dinfosection">
                            <div className="dphotoslist">
                                <ul>
                                    <li><img onClick={() => this.proceedUploadImage()} alt="" src="/img/s4img0.png" className=""/></li>
                                    {/* <li><img alt="" src={this.state.newUploadedImage} className=""/></li> */}
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
                    <div className={"cg-item " + (this.state.activepart === 'two_convert_actions' ? 'active_item' : '')} onFocus={() => this.createActive('two_convert_actions') }>
                        <div className="cg-label">
                            <div className="cgl-name">Do you want also save this as a template?</div>
                            <div className="cgl-doptions"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleSaveAsTemplate} checked={this.state.saveAsTemplate} /></div>
                        </div>
                        <div className="cg-input dactivity">
                            <div className="subheader">By saving as a template, you can reuse this same flow for another challenge.</div>
                        </div>
                    </div>
                </div>

                <div className="dnext-button">
                    <button className="prev-arrow" onClick={() => this.proceedToPrev()}>Back</button>
                    <button className="next-arrow" onClick={() => this.submitChallengeForm()}>Publish Challenge &rarr;</button>
                </div>
            </div>
        )
    }
}

export default StepFour