import './../../../styles/challenge.css';
import React from 'react';

import Switch from "react-switch";
import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBars, faEllipsisV, faGlobeEurope, faMapMarkerAlt, faImage, faCrosshairs, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

class AddSocialAction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive,
            socialType: 'facebook',

            isOpenSingleRewardModal: false, // open social action modal,
            

            // facebook options
            isFacebookLoginEnabled: false,
            isFacebookVisitEnabled: false,
            isFacebookViewPostEnabled: false,
            isFacebookJoinGroupEnabled: false,
            isFacebookSelectPhotoVideoEnabled: false,

            // facebook Login Options
            isFacebookLoginAllowToLikePage: false,
            isFacebookLoginEnabledrepeat: false,

            // facebook Visit Options
            isFacebookVisitAllowToLikePage: false,
            isFacebookVisitEnabledrepeat: false,

            sFacebookViewAllowToLikePage: false,
            isFacebookViewEnabledrepeat: false,
            
            // twitter
            isTwitterFollowAUserEnabled: false,
            isTwitterViewATweetEnabled: false,
            isTwitterRetweetATweetEnabled: false,
            isTwitterTweetEnabled: false,

            isTheTwitterFollowUserEnableRepeatAction: false,
            isTwitterViewATweetEnabledRepeat: false,
            isTwitterRetweetaTweetEnableRepeat: false,

            // youtube
            isYoutubeVisitChannelEnabled: false,
            isYoutubeVisitChannelEnableRepeat: false,

            // instagram
            isInstagramSelectPhotoVideoEnabled: false,
            isInstagramSelectVisitAPost: false,
            isInstagramSelectVisitAProfile: false,
            isInstagramShowPhotoVideoEnabledRepeat: false,
            isInstagramVisitaPostEnabledRepeat: false,
            isTwitterSendAPostEnabledRepeat: false,
            isInstagramVisitaProfileEnabledRepeat: false,

            // social settings values
            socialSettingsValues: []
        }

        this.socialOpenOptions = this.socialOpenOptions.bind(this);
        this.socialCloseOptions = this.socialCloseOptions.bind(this);

        this.toogleCustomSocialActions = this.toogleCustomSocialActions.bind(this);
        this.toogleInviteFriendsActions = this.toogleInviteFriendsActions.bind(this);
        this.toogleFacebookActions = this.toogleFacebookActions.bind(this);
        this.toogleInstagramActions = this.toogleInstagramActions.bind(this);
        this.toogleTwitterActions = this.toogleTwitterActions.bind(this);
        this.toogleYoutubeActions = this.toogleYoutubeActions.bind(this);
        this.toogleTiktokActions = this.toogleTiktokActions.bind(this);

        this.toogleFacebookLogin = this.toogleFacebookLogin.bind(this);
        this.toogleFacebookVisit = this.toogleFacebookVisit.bind(this);
        this.toogleFacebookViewPost = this.toogleFacebookViewPost.bind(this);
        this.toogleFacebookJoinGroup = this.toogleFacebookJoinGroup.bind(this);
        this.toogleFacebookSelectPhotoVideo = this.toogleFacebookSelectPhotoVideo.bind(this);

        this.onSocialActionChange = this.onSocialActionChange.bind(this);
        
        // facebook login options
        this.toogleFacebookLoginAllowToLikePage = this.toogleFacebookLoginAllowToLikePage.bind(this);
        this.toogleFacebookLoginEnableRepeat = this.toogleFacebookLoginEnableRepeat.bind(this);

        // facebook view options
        this.toogleFacebookViewAllowToLikePage = this.toogleFacebookViewAllowToLikePage.bind(this);
        this.toogleFacebookViewEnableRepeat = this.toogleFacebookViewEnableRepeat.bind(this);
        this.toogleFacebookVisitEnableRepeat = this.toogleFacebookVisitEnableRepeat.bind(this);

        // instagram options
        this.toogleInstagramSelectPhotoVideo = this.toogleInstagramSelectPhotoVideo.bind(this);
        this.toogleInstagramVisitAPost = this.toogleInstagramVisitAPost.bind(this);
        this.toogleInstagramVisitAProfile = this.toogleInstagramVisitAProfile.bind(this);
        this.toogleInstagramShowPhotoVideoEnableRepeat = this.toogleInstagramShowPhotoVideoEnableRepeat.bind(this);
        this.toogleInstagramVisitaPostEnableRepeat = this.toogleInstagramVisitaPostEnableRepeat.bind(this);
        this.toogleInstagramVisitaProfileEnableRepeat = this.toogleInstagramVisitaProfileEnableRepeat.bind(this);

        // twitter
        this.toogleTwitterFollowAUser = this.toogleTwitterFollowAUser.bind(this);
        this.toogleTwitterViewATweet = this.toogleTwitterViewATweet.bind(this);
        this.toogleTwitterRetweetaTweet = this.toogleTwitterRetweetaTweet.bind(this);
        this.toogleTwitterTweet = this.toogleTwitterTweet.bind(this);

        this.toogleTweeterSendaTweetEnableRepeat = this.toogleTweeterSendaTweetEnableRepeat.bind(this);

        this.toogleTwitterFollowUserEnableRepeatAction = this.toogleTwitterFollowUserEnableRepeatAction.bind(this);
        this.toogleTwitterViewATweetEnableRepeat = this.toogleTwitterViewATweetEnableRepeat.bind(this);

        this.toogleTwitterRetweetatweetEnableRepeat = this.toogleTwitterRetweetatweetEnableRepeat.bind(this);

        // youtube
        this.toogleYoutubeVisitChannel = this.toogleYoutubeVisitChannel.bind(this);

        this.saveSocialSettings = this.saveSocialSettings.bind(this);
        this.updateSocialValues = this.updateSocialValues.bind(this);

    }

    socialOpenOptions(){
        console.log('open modal');
        this.setState({isOpenSingleRewardModal: true});
    }

    socialCloseOptions(){
        this.setState({isOpenSingleRewardModal: false});
    }

    toogleCustomSocialActions(){
        console.log('shiowe iasd');
        this.setState({socialType: 'custom_social_action'});
    }

    toogleInviteFriendsActions(){
        this.setState({socialType: 'invite_friend'});
    }

    toogleFacebookActions(){
        this.setState({socialType: 'facebook'});
    }

    toogleInstagramActions(){
        this.setState({socialType: 'instagram'});
    }

    toogleTwitterActions(){
        this.setState({socialType: 'twitter'});
    }

    toogleYoutubeActions(){
        this.setState({socialType: 'youtube'});
    }

    toogleTiktokActions(){
        this.setState({socialType: 'tiktok'});
    }

    toogleFacebookLogin(){
        let isFacebookAllow = !this.state.isFacebookLoginEnabled;
        this.setState({isFacebookLoginEnabled: isFacebookAllow});
        this.updateSocialValues('enable_login_with_facebook', isFacebookAllow);
    }

    toogleFacebookVisit(){
        let isFacebookVisitActive = !this.state.isFacebookVisitEnabled;
        this.setState({isFacebookVisitEnabled: isFacebookVisitActive});
        this.updateSocialValues('visit_on_facebook_is_active', isFacebookVisitActive);
    }

    toogleFacebookViewPost(){
        let isFacebookViewPostEnable = !this.state.isFacebookViewPostEnabled;
        this.setState({isFacebookViewPostEnabled: isFacebookViewPostEnable});
        this.updateSocialValues('view_facebook_post_is_active', isFacebookViewPostEnable);
    }

    toogleFacebookJoinGroup(){
        let isFacebookJoinGroup = !this.state.isFacebookJoinGroupEnabled;
        this.setState({isFacebookJoinGroupEnabled: isFacebookJoinGroup});
        this.updateSocialValues('join_facebook_enabled_is_active', isFacebookJoinGroup);
    }

    toogleFacebookSelectPhotoVideo(){
        this.setState({isFacebookSelectPhotoVideoEnabled: !this.state.isFacebookSelectPhotoVideoEnabled});
    }

    toogleFacebookLoginAllowToLikePage(){
        let allowToLikePage = !this.state.isFacebookLoginAllowToLikePage;
        this.setState({isFacebookLoginAllowToLikePage: allowToLikePage});
        this.updateSocialValues('facebook_login_allow_to_like_page', allowToLikePage);
    } 

    toogleFacebookLoginEnableRepeat(){
        let isEnableRepeat = !this.state.isFacebookLoginEnabledrepeat;
        this.setState({isFacebookLoginEnabledrepeat: isEnableRepeat});
        this.updateSocialValues('login_with_facebook_enable_repeat', isEnableRepeat);
    }

    toogleFacebookViewAllowToLikePage(){
        let likePageAfterEntring = !this.state.isFacebookVisitAllowToLikePage
        this.setState({isFacebookVisitAllowToLikePage: !this.state.isFacebookVisitAllowToLikePage});
        this.updateSocialValues('visit_on_facebook_allow_like_page', likePageAfterEntring);
    }

    toogleFacebookViewEnableRepeat(){
        let viewOnFacebookRepeatAction = !this.state.isFacebookViewEnabledrepeat;
        this.setState({isFacebookViewEnabledrepeat: viewOnFacebookRepeatAction});
        this.updateSocialValues('visit_facebook_post_enable_repeat_action', viewOnFacebookRepeatAction);
    }

    toogleFacebookVisitEnableRepeat(){
        let visitOnFacebookRepeatAction = !this.state.isFacebookVisitEnabledrepeat;
        this.setState({isFacebookVisitEnabledrepeat: visitOnFacebookRepeatAction});
        this.updateSocialValues('visit_on_facebook_enable_repeat_action', visitOnFacebookRepeatAction);
    }

    // instagram options
    toogleInstagramSelectPhotoVideo(){
        let instaSelectPhotoEnable = !this.state.isInstagramSelectPhotoVideoEnabled;
        this.setState({isInstagramSelectPhotoVideoEnabled: instaSelectPhotoEnable});
        this.updateSocialValues('insta_show_photo_enabled', instaSelectPhotoEnable);
    }

    toogleInstagramVisitAPost(){
        let instaVisitPost = !this.state.isInstagramSelectVisitAPost;
        this.setState({isInstagramSelectVisitAPost: instaVisitPost});
        this.updateSocialValues('insta_visit_post_enabled', instaVisitPost);
    }

    toogleInstagramVisitAProfile(){
        let instaVisitProfile = !this.state.isInstagramSelectVisitAProfile;
        this.setState({isInstagramSelectVisitAProfile: instaVisitProfile});
        this.updateSocialValues('insta_visit_profile_enabled', instaVisitProfile);
    }

    toogleInstagramShowPhotoVideoEnableRepeat(){
        this.setState({isInstagramShowPhotoVideoEnableRepeat: !this.state.isInstagramShowPhotoVideoEnableRepeat});
    }

    toogleYoutubeVisitChannelEnableRepeat(){
        let youtubeVisitChannel = !this.state.isYoutubeVisitChannelEnableRepeat;
        this.setState({isYoutubeVisitChannelEnableRepeat: youtubeVisitChannel});
        this.updateSocialValues('youtube_visit_channel_enabled', youtubeVisitChannel);
    }

    toogleInstagramVisitaPostEnableRepeat(){
        let instaVisitPost = !this.state.isInstagramVisitaPostEnabledRepeat;
        this.setState({isInstagramVisitaPostEnabledRepeat: instaVisitPost});
        this.updateSocialValues('insta_visit_post_enable_repeat_action', instaVisitPost);
    }

    toogleInstagramVisitaProfileEnableRepeat(){
        let instaVisitProfile = !this.state.isInstagramVisitaProfileEnabledRepeat;
        this.setState({isInstagramVisitaProfileEnabledRepeat: instaVisitProfile});
        this.updateSocialValues('insta_visit_profile_enable_repeat_action', instaVisitProfile);
    }

    toogleTweeterSendaTweetEnableRepeat(){
        let TwitterSendaTweetEnableRepeat = !this.state.isTwitterSendAPostEnabledRepeat
        this.setState({isTwitterSendAPostEnabledRepeat: TwitterSendaTweetEnableRepeat});
        this.updateSocialValues('twitter_send_a_tweet_enable_repeat_action', TwitterSendaTweetEnableRepeat);
    }

    // twitter
    toogleTwitterFollowAUser(){
        let TwitterFollowUser = !this.state.isTwitterFollowAUserEnabled;
        this.setState({isTwitterFollowAUserEnabled: TwitterFollowUser});
        this.updateSocialValues('twitter_follow_a_user_enabled', TwitterFollowUser);
    }

    toogleTwitterViewATweet(){
        let ViewATweet = !this.state.isTwitterViewATweetEnabled;
        this.setState({isTwitterViewATweetEnabled: ViewATweet});
        this.updateSocialValues('twitter_view_a_tweet_enabled', ViewATweet);
    }

    toogleTwitterRetweetaTweet(){
        let EnableRetweet = !this.state.isTwitterRetweetATweetEnabled;
        this.setState({isTwitterRetweetATweetEnabled: EnableRetweet});
        this.updateSocialValues('twitter_retweet_enabled', EnableRetweet);
    }

    toogleTwitterTweet(){
        let sendATweet = !this.state.isTwitterTweetEnabled;
        this.setState({isTwitterTweetEnabled: sendATweet});
        this.updateSocialValues('twitter_send_a_tweet_enabled', sendATweet);
    }

    // youtube
    toogleYoutubeVisitChannel(){
        let youtubeVisitChannel = !this.state.isYoutubeVisitChannelEnabled;
        this.setState({isYoutubeVisitChannelEnabled: youtubeVisitChannel});
        this.updateSocialValues('youtube_visit_channel_enabled', youtubeVisitChannel);
    }

    toogleTwitterFollowUserEnableRepeatAction(){
        let twitterFollowAUserEnableRepeat = !this.state.isTheTwitterFollowUserEnableRepeatAction;
        this.setState({isTheTwitterFollowUserEnableRepeatAction: twitterFollowAUserEnableRepeat});
        this.updateSocialValues('twitter_follow_user_enable_repeat', twitterFollowAUserEnableRepeat);
    }

    toogleTwitterViewATweetEnableRepeat(){
        let twitterViewATweekEnable = !this.state.isTwitterViewATweetEnabledRepeat;
        this.setState({isTwitterViewATweetEnabledRepeat: twitterViewATweekEnable});
        this.updateSocialValues('twitter_view_a_tweet_enable_repeat', twitterViewATweekEnable);
    }

    toogleTwitterRetweetatweetEnableRepeat(){
        let twitterRetweeterEnableRepeat = !this.state.isTwitterRetweetaTweetEnableRepeat;
        this.setState({isTwitterRetweetaTweetEnableRepeat: twitterRetweeterEnableRepeat});
        this.updateSocialValues('twitter_retweet_enable_repeat', twitterRetweeterEnableRepeat);
    }

    onSocialActionChange(){
        let socialActions = !this.state.socialActionSLide;
        this.setState({socialActionSLide: socialActions});
        this.updateSocialValues('social_action_enabled', socialActions);
        // this.populateInput('social_action', socialActions)
    }



    saveSocialSettings(){
        console.log('save settings');
        this.props.getData(this.state.socialSettingsValues);
    }

    updateSocialValues(index, value){
        let final_info = this.state.socialSettingsValues;
        final_info[index] = value;
        this.setState({socialSettingsValues: final_info});

        console.log('info -> ', final_info);
    }

    render () {
        const socialActionBottomOptions = () => {
            return (
                <div className="d-reward-settings-ops">
                    <button className="cancelReward" onClick={() => this.socialCloseOptions()}>Cancel</button>
                    <button className="saveReward" onClick={() => this.saveSocialSettings()}>Save and Add actions</button>
                </div>
            );
        }

        const socialOptions = () => {
            if(this.state.socialType === 'facebook'){
                let LoginWithFacebookInput = () => {
                    if(this.state.isFacebookLoginEnabled){
                        return (
                            <div className="d-social-value-section">
                                <div className="d-social-value-item">
                                    <label htmlFor="">Instructions</label>
                                    <input type="text" placeholder="Enter using Facebook" onChange={(e) => this.updateSocialValues('login_with_facebook_instructions' ,e.target.value)}/>
                                </div>
                                <div className="d-social-item d-enable-user-to-like-page">
                                    <div className="d-social-item-text">After entering, give the user option to Like a Page?</div>
                                    <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleFacebookLoginAllowToLikePage} checked={this.state.isFacebookLoginAllowToLikePage} /></div>
                                </div>
                                <div className={"d-social-value-item d-like-page-after-login" + (this.state.isFacebookLoginAllowToLikePage ? 'enabled-allow-like-page' : "")}>
                                    <label htmlFor="">Page URL</label>
                                    <input type="text" placeholder="https://www.facebook.com/JanesWidgets" onChange={(e) => this.updateSocialValues('login_with_facebook_page_url' ,e.target.value)}/>
                                </div>
                                <div className="d-social-segmented-values">
                                    <div className="d-social-left-segment">
                                        <div className="d-social-item d-enable-repeat-action">
                                            <div className="d-social-item-text">Enable repeated action </div>
                                            <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleFacebookLoginEnableRepeat} checked={this.state.isFacebookLoginEnabledrepeat} /></div>
                                        </div>
                                    </div>
                                    <div className="d-social-right-segment">
                                        <div className="d-social-value-item d-value-points">
                                            <label htmlFor="">Points</label>
                                            <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('login_with_facebook_assign_points' ,e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-social-values-additional-options " + (this.state.isFacebookLoginEnabledrepeat ? 'repeated-action-enabled' : "")}>
                                    <div className="d-social-value-item d-max-points">
                                        <label htmlFor="">Maximum points per</label>
                                        <select name="" id="" onChange={(e) => this.updateSocialValues('login_with_facebook_maximum_points_per_date' ,e.target.value)}>
                                            <option >Day</option>
                                            <option >Week</option>
                                            <option >Month</option>
                                            <option >Year</option>
                                        </select>
                                        <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('login_with_facebook_maximum_points_per_number' ,e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                };

                let VisitFacebookOption = () => {
                    if(this.state.isFacebookVisitEnabled){
                        return (
                            <div className="d-social-value-section">
                                <div className="d-social-value-item">
                                    <label htmlFor="">Enter URL</label>
                                    <input type="text" placeholder="https://www.facebook.com/JanesWidgets" onChange={(e) => this.updateSocialValues('visit_on_facebook_url' ,e.target.value)}/>
                                </div>
                                <div className="d-social-value-item">
                                    <label htmlFor="">Instructions</label>
                                    <input type="text" placeholder="Enter using Facebook" onChange={(e) => this.updateSocialValues('visit_on_facebook_instructions' ,e.target.value)}/>
                                </div>
                                <div className="d-social-item d-enable-user-to-like-page">
                                    <div className="d-social-item-text">After entering, give the user option to Like a Page?</div>
                                    <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleFacebookViewAllowToLikePage} checked={this.state.isFacebookVisitAllowToLikePage} /></div>
                                </div>
                                <div className={"d-social-value-item d-like-page-after-login" + (this.state.isFacebookVisitAllowToLikePage ? 'enabled-allow-like-page' : "")}>
                                    <label htmlFor="">Page URL</label>
                                    <input type="text" placeholder="https://www.facebook.com/JanesWidgets" onChange={(e) => this.updateSocialValues('visit_on_facebook_like_page_page_url' ,e.target.value)}/>
                                </div>
                                <div className="d-social-segmented-values">
                                    <div className="d-social-left-segment">
                                        <div className="d-social-item d-enable-repeat-action">
                                            <div className="d-social-item-text">Enable repeated action </div>
                                            <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleFacebookVisitEnableRepeat} checked={this.state.isFacebookVisitEnabledrepeat} /></div>
                                        </div>
                                    </div>
                                    <div className="d-social-right-segment">
                                        <div className="d-social-value-item d-value-points">
                                            <label htmlFor="">Points</label>
                                            <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('visit_on_facebook_assign_points' ,e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-social-values-additional-options " + (this.state.isFacebookVisitEnabledrepeat ? 'repeated-action-enabled' : "")}>
                                    <div className="d-social-value-item d-max-points">
                                        <label htmlFor="">Maximum points per</label>
                                        <select name="" id="" onChange={(e) => this.updateSocialValues('visit_on_facebook_maximum_points_per_date' ,e.target.value)}>
                                            <option >Day</option>
                                            <option >Week</option>
                                            <option >Month</option>
                                            <option >Year</option>
                                        </select>
                                        <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('visit_on_facebook_maximum_points_per_number' ,e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                };

                let ViewPostOption = () => {
                    if(this.state.isFacebookViewPostEnabled){
                        return (
                            <div className="d-social-value-section">
                                <div className="d-social-value-item">
                                    <label htmlFor="">Enter Facebook post URL</label>
                                    <input type="text" placeholder="https://www.facebook.com/JanesWidgets" onChange={(e) => this.updateSocialValues('view_facebook_post_url' ,e.target.value)}/>
                                </div>
                                <div className="d-social-value-item">
                                    <label htmlFor="">Instructions</label>
                                    <input type="text" placeholder="Enter using Facebook" onChange={(e) => this.updateSocialValues('view_facebook_post_instructions' ,e.target.value)}/>
                                </div>
                                <div className="d-social-segmented-values">
                                    <div className="d-social-left-segment">
                                        <div className="d-social-item d-enable-repeat-action">
                                            <div className="d-social-item-text">Enable repeated action </div>
                                            <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleFacebookViewEnableRepeat} checked={this.state.isFacebookViewEnabledrepeat} /></div>
                                        </div>
                                    </div>
                                    <div className="d-social-right-segment">
                                        <div className="d-social-value-item d-value-points">
                                            <label htmlFor="">Points</label>
                                            <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('view_facebook_post_assign_points' ,e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-social-values-additional-options " + (this.state.isFacebookViewEnabledrepeat ? 'repeated-action-enabled' : "")}>
                                    <div className="d-social-value-item d-max-points">
                                        <label htmlFor="">Maximum points per</label>
                                        <select name="" id="" onChange={(e) => this.updateSocialValues('view_facebook_post_maximum_points_per_date' ,e.target.value)}>
                                            <option >Day</option>
                                            <option >Week</option>
                                            <option >Month</option>
                                            <option >Year</option>
                                        </select>
                                        <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('view_facebook_post_maximum_points_per_number' ,e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                };

                let JoinGroupOption = () => {
                    if(this.state.isFacebookJoinGroupEnabled){
                        return (
                            <div className="d-social-value-section">
                                <div className="d-social-value-item">
                                    <label htmlFor="">Enter Facebook Group API</label>
                                    <input type="text" placeholder="****************************" onChange={(e) => this.updateSocialValues('facebook_group_api' ,e.target.value)}/>
                                </div>
                            </div>
                        );
                    }
                };

                let SelectPhotoVideoOption = () => {
                    if(this.state.isFacebookSelectPhotoVideoEnabled){
                        return (
                            <div className="d-social-value-section">
                                <div className="d-social-value-item">
                                    <label htmlFor="">show options soon</label>
                                </div>
                            </div>
                        );
                    }
                };

                return (
                    <div className="d-social-items">
                        <h3>Facebook Actions</h3>
                        <div className="d-social-options-container">
                            <div className="d-social-item">
                                <div className="d-social-item-text">Login with Facebook <span data-tip="This action will award the user with an entry for logging into Facebook -- award<br />the entry during login or ask the user to Like your Facebook page after login." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleFacebookLogin} checked={this.state.isFacebookLoginEnabled} /></div>
                                {LoginWithFacebookInput()}
                            </div>
                            <div className="d-social-item">
                                <div className="d-social-item-text">Visit on Facebook <span data-tip="This action allows you to ask participants to visit a Facebook Page." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleFacebookVisit} checked={this.state.isFacebookVisitEnabled} /></div>
                                {VisitFacebookOption()}
                            </div>
                            <div className="d-social-item">
                                <div className="d-social-header">
                                    <div className="d-social-item-text">View Post <span data-tip="This action allows you to ask participants to view a Facebook Post." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                    <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleFacebookViewPost} checked={this.state.isFacebookViewPostEnabled} /></div>
                                </div>
                                {ViewPostOption()}
                            </div>
                            <div className="d-social-item">
                                <div className="d-social-header">
                                    <div className="d-social-item-text">Join Facebook Group <span data-tip="This action allows you to ask participants to join a Facebook Group." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                    <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleFacebookJoinGroup} checked={this.state.isFacebookJoinGroupEnabled} /></div>
                                </div>
                                {JoinGroupOption()}
                            </div>
                            <div className="d-social-item">
                                <div className="d-social-header">
                                    <div className="d-social-item-text">Select image/photo <span data-tip="Select an image that corresponds to your page/post." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                    <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleFacebookSelectPhotoVideo} checked={this.state.isFacebookSelectPhotoVideoEnabled} /></div>
                                </div>
                                {SelectPhotoVideoOption()}
                            </div>
                        </div>
                        <ReactTooltip html="true" />
                    </div>
                );
            }

            if(this.state.socialType === 'twitter'){

                let FollowAUser = () => {
                    if(this.state.isTwitterFollowAUserEnabled){
                        return (
                            <div className="d-instagram-visit-a-post">
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Instructions</label>
                                        <input type="text" placeholder="" onChange={(e) => this.updateSocialValues('twitter_follow_a_instructions' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Username</label>
                                        <input type="text" placeholder="@someone" onChange={(e) => this.updateSocialValues('twitter_username' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-segmented-values">
                                    <div className="d-social-left-segment">
                                        <div className="d-social-item d-enable-repeat-action">
                                            <div className="d-social-item-text">Enable repeated action </div>
                                            <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleTwitterFollowUserEnableRepeatAction} checked={this.state.isTheTwitterFollowUserEnableRepeatAction} /></div>
                                        </div>
                                    </div>
                                    <div className="d-social-right-segment">
                                        <div className="d-social-value-item d-value-points">
                                            <label htmlFor="">Points</label>
                                            <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('twitter_follow_user_assign_points' ,e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-social-values-additional-options " + (this.state.isTheTwitterFollowUserEnableRepeatAction ? 'repeated-action-enabled' : "")}>
                                    <div className="d-social-value-item d-max-points">
                                        <label htmlFor="">Maximum points per</label>
                                        <select name="" id="" onChange={(e) => this.updateSocialValues('twitter_follow_user_maximum_points_per_date' ,e.target.value)}>
                                            <option >Day</option>
                                            <option >Week</option>
                                            <option >Month</option>
                                            <option >Year</option>
                                        </select>
                                        <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('twitter_follow_user_maximum_points_per_number' ,e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                };

                let ViewATweet = () => {
                    if(this.state.isTwitterViewATweetEnabled){
                        return (
                            <div className="d-instagram-visit-a-post">
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Instructions</label>
                                        <input type="text" placeholder="" onChange={(e) => this.updateSocialValues('twitter_view_a_tweet_instructions' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Twitter Post URL</label>
                                        <input type="text" placeholder="https://twitter.com/vici/status/1227713580572103" onChange={(e) => this.updateSocialValues('twitter_view_a_tweet_post_url' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-segmented-values">
                                    <div className="d-social-left-segment">
                                        <div className="d-social-item d-enable-repeat-action">
                                            <div className="d-social-item-text">Enable repeated action </div>
                                            <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleTwitterViewATweetEnableRepeat} checked={this.state.isTwitterViewATweetEnabledRepeat} /></div>
                                        </div>
                                    </div>
                                    <div className="d-social-right-segment">
                                        <div className="d-social-value-item d-value-points">
                                            <label htmlFor="">Points</label>
                                            <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('twitter_view_a_tweet_assign_points' ,e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-social-values-additional-options " + (this.state.isTwitterViewATweetEnabledRepeat ? 'repeated-action-enabled' : "")}>
                                    <div className="d-social-value-item d-max-points">
                                        <label htmlFor="">Maximum points per</label>
                                        <select name="" id="" onChange={(e) => this.updateSocialValues('twitter_view_a_tweet_maximum_points_per_date' ,e.target.value)}>
                                            <option >Day</option>
                                            <option >Week</option>
                                            <option >Month</option>
                                            <option >Year</option>
                                        </select>
                                        <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('twitter_view_a_tweet_maximum_points_per_number' ,e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                };

                let ReTweet = () => {
                    if(this.state.isTwitterRetweetATweetEnabled){
                        return (
                            <div className="d-instagram-visit-a-post">
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Instructions</label>
                                        <input type="text" placeholder="" onChange={(e) => this.updateSocialValues('twitter_retweet_instructions' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Tweet URL</label>
                                        <input type="text" placeholder="https://twitter.com/vici/status/1227713580572103" onChange={(e) => this.updateSocialValues('twitter_retweet_tweet_url' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-segmented-values">
                                    <div className="d-social-left-segment">
                                        <div className="d-social-item d-enable-repeat-action">
                                            <div className="d-social-item-text">Enable repeated action </div>
                                            <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleTwitterRetweetatweetEnableRepeat} checked={this.state.isTwitterRetweetaTweetEnableRepeat} /></div>
                                        </div>
                                    </div>
                                    <div className="d-social-right-segment">
                                        <div className="d-social-value-item d-value-points">
                                            <label htmlFor="">Points</label>
                                            <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('twitter_retweet_assign_points' ,e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-social-values-additional-options " + (this.state.isTwitterRetweetaTweetEnableRepeat ? 'repeated-action-enabled' : "")}>
                                    <div className="d-social-value-item d-max-points">
                                        <label htmlFor="">Maximum points per</label>
                                        <select name="" id="" onChange={(e) => this.updateSocialValues('twitter_retweet_maximum_points_per_date' ,e.target.value)}>
                                            <option >Day</option>
                                            <option >Week</option>
                                            <option >Month</option>
                                            <option >Year</option>
                                        </select>
                                        <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('twitter_retweet_maximum_points_per_number' ,e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                };

                let Tweet = () => {
                    if(this.state.isTwitterTweetEnabled){
                        return (
                            <div className="d-instagram-visit-a-post">
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Instructions</label>
                                        <input type="text" placeholder="" onChange={(e) => this.updateSocialValues('twitter_send_a_tweet_instructions' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Tweet</label>
                                        <input type="text" placeholder="I'm in the running to win a Widget Pro thanks to @JanesWidgets! #win #widgets" onChange={(e) => this.updateSocialValues('twitter_send_a_tweet_content' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-segmented-values">
                                    <div className="d-social-left-segment">
                                        <div className="d-social-item d-enable-repeat-action">
                                            <div className="d-social-item-text">Enable repeated action </div>
                                            <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleTweeterSendaTweetEnableRepeat} checked={this.state.isTwitterSendAPostEnabledRepeat} /></div>
                                        </div>
                                    </div>
                                    <div className="d-social-right-segment">
                                        <div className="d-social-value-item d-value-points">
                                            <label htmlFor="">Points</label>
                                            <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('twitter_send_a_tweet_assign_points' ,e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-social-values-additional-options " + (this.state.isTwitterSendAPostEnabledRepeat ? 'repeated-action-enabled' : "")}>
                                    <div className="d-social-value-item d-max-points">
                                        <label htmlFor="">Maximum points per</label>
                                        <select name="" id="" onChange={(e) => this.updateSocialValues('twitter_send_a_tweet_maximum_points_per_date' ,e.target.value)}>
                                            <option >Day</option>
                                            <option >Week</option>
                                            <option >Month</option>
                                            <option >Year</option>
                                        </select>
                                        <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('twitter_send_a_tweet_maximum_points_per_number' ,e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                };


                return (
                    <div className="d-social-items">
                        <h3>Twitter Actions</h3>
                        <div className="d-social-options-container">
                            <div className="d-social-item">
                                <div className="d-social-header">
                                    <div className="d-social-item-text">Follow a user <span data-tip="This action allows you to ask participants to follow a Twitter Account." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                    <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleTwitterFollowAUser} checked={this.state.isTwitterFollowAUserEnabled} /></div>
                                </div>
                                {FollowAUser()}
                            </div>
                            <div className="d-social-item">
                                <div className="d-social-header">
                                    <div className="d-social-item-text">View a Tweet <span data-tip="This action allows you to ask participants to view a Tweet." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                    <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleTwitterViewATweet} checked={this.state.isTwitterViewATweetEnabled} /></div>
                                </div>
                                {ViewATweet()}
                            </div>
                            <div className="d-social-item">
                                <div className="d-social-header">
                                    <div className="d-social-item-text">Retweet a tweet <span data-tip="This action allows you to ask participants to Retweet a Tweet." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                    <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleTwitterRetweetaTweet} checked={this.state.isTwitterRetweetATweetEnabled} /></div>
                                </div>
                                {ReTweet()}
                            </div>
                            <div className="d-social-item">
                                <div className="d-social-header">
                                    <div className="d-social-item-text">Tweet <span data-tip="This action allows you to ask participants to Tweet." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                    <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleTwitterTweet} checked={this.state.isTwitterTweetEnabled} /></div>
                                </div>
                                {Tweet()}
                            </div>
                        </div>
                        <ReactTooltip html="true" />
                    </div>
                );
            }

            if(this.state.socialType === 'instagram'){

                let VisitAPost = () => {
                    if(this.state.isInstagramSelectVisitAPost){
                        return (
                            <div className="d-instagram-visit-a-post">
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Instructions</label>
                                        <input type="text" placeholder="" onChange={(e) => this.updateSocialValues('insta_visit_post_instructions' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Media URL</label>
                                        <input type="text" placeholder="http://instagram.com/p/blDoYMvlZu/" onChange={(e) => this.updateSocialValues('insta_visit_post_url' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-segmented-values">
                                    <div className="d-social-left-segment">
                                        <div className="d-social-item d-enable-repeat-action">
                                            <div className="d-social-item-text">Enable repeated action </div>
                                            <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleInstagramVisitaPostEnableRepeat} checked={this.state.isInstagramVisitaPostEnabledRepeat} /></div>
                                        </div>
                                    </div>
                                    <div className="d-social-right-segment">
                                        <div className="d-social-value-item d-value-points">
                                            <label htmlFor="">Points</label>
                                            <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('insta_visit_post_assign_points' ,e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-social-values-additional-options " + (this.state.isInstagramVisitaPostEnabledRepeat ? 'repeated-action-enabled' : "")}>
                                    <div className="d-social-value-item d-max-points">
                                        <label htmlFor="">Maximum points per</label>
                                        <select name="" id="" onChange={(e) => this.updateSocialValues('insta_visit_post_maximum_points_per_date' ,e.target.value)}>
                                            <option >Day</option>
                                            <option >Week</option>
                                            <option >Month</option>
                                            <option >Year</option>
                                        </select>
                                        <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('insta_visit_post_maximum_points_per_number' ,e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                };

                let VisitAPProfile = () => {
                    if(this.state.isInstagramSelectVisitAProfile){
                        return (
                            <div className="d-instagram-visit-a-post">
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Instructions</label>
                                        <input type="text" placeholder="" onChange={(e) => this.updateSocialValues('insta_visit_profile_instructions' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Profile URL</label>
                                        <input type="text" placeholder="Nike or http://instagram.com/nike" onChange={(e) => this.updateSocialValues('insta_visit_profile_url' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-segmented-values">
                                    <div className="d-social-left-segment">
                                        <div className="d-social-item d-enable-repeat-action">
                                            <div className="d-social-item-text">Enable repeated action </div>
                                            <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleInstagramVisitaProfileEnableRepeat} checked={this.state.isInstagramVisitaProfileEnabledRepeat} /></div>
                                        </div>
                                    </div>
                                    <div className="d-social-right-segment">
                                        <div className="d-social-value-item d-value-points">
                                            <label htmlFor="">Points</label>
                                            <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('insta_visit_profile_assign_points' ,e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-social-values-additional-options " + (this.state.isInstagramVisitaPostEnabledRepeat ? 'repeated-action-enabled' : "")}>
                                    <div className="d-social-value-item d-max-points">
                                        <label htmlFor="">Maximum points per</label>
                                        <select name="" id="" onChange={(e) => this.updateSocialValues('insta_visit_profile_maximum_points_per_date' ,e.target.value)}>
                                            <option >Day</option>
                                            <option >Week</option>
                                            <option >Month</option>
                                            <option >Year</option>
                                        </select>
                                        <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('insta_visit_profile_maximum_points_per_number' ,e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                };

                let SelectPhotoVideoOption = () => {
                    if(this.state.isInstagramSelectPhotoVideoEnabled){
                        return (
                            <div className="d-instagram-option-items">
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">show options soon</label>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                };

                return (
                    <div className="d-social-items">
                        <h3>Instagram</h3>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">Select image/photo <span data-tip="This action allows you to ask participants to visit an Instagram Profile." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleInstagramSelectPhotoVideo} checked={this.state.isInstagramSelectPhotoVideoEnabled} /></div>
                            </div>
                            {SelectPhotoVideoOption()}
                        </div>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">Visit a Post <span data-tip="This action allows you to ask participants to view an Instagram Post." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleInstagramVisitAPost} checked={this.state.isInstagramSelectVisitAPost} /></div>
                            </div>
                            {VisitAPost()}
                        </div>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">Visit a Profile <span data-tip="Select an image that corresponds to your page/post." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleInstagramVisitAProfile} checked={this.state.isInstagramSelectVisitAProfile} /></div>
                            </div>
                            {VisitAPProfile()}
                        </div>
                        <ReactTooltip html="true" />
                    </div>
                );
            }

            if(this.state.socialType === 'youtube'){

                let VisitChannel = () => {
                    if(this.state.isYoutubeVisitChannelEnabled){
                        return (
                            <div className="d-instagram-option-items">
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Instructions</label>
                                        <input type="text" placeholder="" onChange={(e) => this.updateSocialValues('youtube_visit_channel_instructions' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-value-section">
                                    <div className="d-social-value-item">
                                        <label htmlFor="">Channel URL</label>
                                        <input type="text" placeholder="https://www.youtube.com/user/LondonGrammar" onChange={(e) => this.updateSocialValues('youtube_visit_channel_url' ,e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-social-segmented-values">
                                    <div className="d-social-left-segment">
                                        <div className="d-social-item d-enable-repeat-action">
                                            <div className="d-social-item-text">Enable repeated action</div>
                                            <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleYoutubeVisitChannelEnableRepeat} checked={this.state.isYoutubeVisitChannelEnableRepeat} /></div>
                                        </div>
                                    </div>
                                    <div className="d-social-right-segment">
                                        <div className="d-social-value-item d-value-points">
                                            <label htmlFor="">Points</label>
                                            <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('youtube_visit_channel_assign_points' ,e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-social-values-additional-options " + (this.state.isInstagramShowPhotoVideoEnableRepeat ? 'repeated-action-enabled' : "")}>
                                    <div className="d-social-value-item d-max-points">
                                        <label htmlFor="">Maximum points per</label>
                                        <select name="" id="" onChange={(e) => this.updateSocialValues('youtube_visit_channel_maximum_points_per_date' ,e.target.value)}>
                                            <option >Day</option>
                                            <option >Week</option>
                                            <option >Month</option>
                                            <option >Year</option>
                                        </select>
                                        <input type="number" defaultValue="0" onChange={(e) => this.updateSocialValues('youtube_visit_channel_maximum_points_per_number' ,e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                };

                return (
                    <div className="d-social-items">
                        <h3>Youtube</h3>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">Visit youtube channel <span data-tip="This action allows you to ask participants to visit a YouTube Channel." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleYoutubeVisitChannel} checked={this.state.isYoutubeVisitChannelEnabled} /></div>
                            </div>
                            {VisitChannel()}
                        </div>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">Subscribe to channel <span data-tip="This action allows you to ask participants to subscribe to a YouTube Channel." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleYoutubeVisitChannel} checked={false} disabled/></div>
                            </div>
                        </div>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">Watch a video <span data-tip="This action allows you to ask participants to watch a YouTube video." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleYoutubeVisitChannel} checked={false} disabled/></div>
                            </div>
                        </div>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">Comment a video <span data-tip="This action allows you to ask participants to comment on a YouTube video." className="d-social-question-info"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                                <div className="d-social-item-switch"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.toogleYoutubeVisitChannel} checked={false} disabled/></div>
                            </div>
                        </div>
                        <ReactTooltip html="true" />
                    </div>
                );
            }

            if(this.state.socialType === 'custom_social_action'){
                return (
                    <div className="d-social-items">
                        <h3>Custom social actions</h3>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">Action Name</div>
                            </div>
                            <div className="d-social-value">
                                <input type="text" placeholder="Action Name" onChange={(e) => this.updateSocialValues('custom_action_name' ,e.target.value)}/>
                            </div>
                        </div>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">URL if applicable</div>
                            </div>
                            <div className="d-social-value">
                                <input type="text" placeholder="www.facebookpage.com" onChange={(e) => this.updateSocialValues('custom_action_url' ,e.target.value)}/>
                            </div>
                        </div>
                        <h3>Verify</h3>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">Question</div>
                            </div>
                            <div className="d-social-value">
                                <input type="text" placeholder="type here..." onChange={(e) => this.updateSocialValues('custom_action_question' ,e.target.value)}/>
                            </div>
                        </div>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">Answer</div>
                            </div>
                            <div className="d-social-value">
                                <input type="text" placeholder="" onChange={(e) => this.updateSocialValues('custom_action_answer' ,e.target.value)}/>
                            </div>
                        </div>
                    </div>
                );
            }

            if(this.state.socialType === 'invite_friend'){
                return (
                    <div className="d-social-items">
                        <h3>Invite Friends</h3>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">Give points every:</div>
                            </div>
                            <div className="d-social-value">
                                <input type="text" placeholder="" onChange={(e) => this.updateSocialValues('invite_give_points_every' ,e.target.value)}/>
                            </div>
                        </div>
                        <div className="d-social-item">
                            <div className="d-social-header">
                                <div className="d-social-item-text">Points per invite</div>
                            </div>
                            <div className="d-social-value">
                                <input type="number" defaultValue="1" onChange={(e) => this.updateSocialValues('invite_points_per_invite' ,e.target.value)}/>
                            </div>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="social-inner">
                <div className="cg-label">
                    <div className="cgl-name">Social Actions</div>
                    <div className="cgl-doptions"><Switch onColor='#FFCA28' height={20} width={40} onChange={this.onSocialActionChange} checked={this.state.socialActionSLide} /></div>
                </div>
                <div className="cg-input dactivity">
                    <div className="subheader">Actions that help spread the word, build awareness and increase challenge engagement</div>
                    <div className="social-action-list"></div>
                    <div className="add-social-action">
                        <button onClick={() => this.socialOpenOptions()}><span><FontAwesomeIcon icon={faPlus} /></span> Add Social Action</button>
                    </div>
                </div>
                <ReactModal
                    isOpen={this.state.isOpenSingleRewardModal}
                    contentLabel="Example Modal"
                    className="social_action_modal"
                    ariaHideApp={false}
                >
                    <div className="d-rewards-settings-modal d-social-modal-size">
                        <h4>Social Actions</h4>
                        <div className="d-social-settings-list">
                            <div className="d-social-left-side" >
                                <div className="d-social-settings">
                                    <div className="d-social-settings-dropdown">
                                        <select>
                                            <option >Choose from saved settings</option>
                                        </select>
                                    </div>
                                    <div className="d-social-setting-sub">
                                        <button>Save social settings</button>
                                    </div>
                                </div>
                                <div className="d-social-show-items">
                                    <div className={"d-social-show-item " + (this.state.socialType === 'facebook' ? 'active' : '')} onClick={() => this.toogleFacebookActions()}>
                                        <div className="d-social-item-icon">
                                            <span className="facebook"><FontAwesomeIcon icon={faFacebook} /></span>
                                        </div>
                                        <div className="d-social-item-text">Facebook</div>
                                        <div className="d-social-item-action"><FontAwesomeIcon icon={faPlus} /></div>
                                    </div>
                                    <div className={"d-social-show-item " + (this.state.socialType === 'instagram' ? 'active' : '')} onClick={() => this.toogleInstagramActions()}>
                                        <div className="d-social-item-icon">
                                            <span className="instagram"><FontAwesomeIcon icon={faInstagram} /></span>
                                        </div>
                                        <div className="d-social-item-text">Instagram</div>
                                        <div className="d-social-item-action"><FontAwesomeIcon icon={faPlus} /></div>
                                    </div>
                                    <div className={"d-social-show-item " + (this.state.socialType === 'twitter' ? 'active' : '')} onClick={() => this.toogleTwitterActions()}>
                                        <div className="d-social-item-icon">
                                            <span className="twitter"><FontAwesomeIcon icon={faTwitter} /></span>
                                        </div>
                                        <div className="d-social-item-text">Twitter</div>
                                        <div className="d-social-item-action"><FontAwesomeIcon icon={faPlus} /></div>
                                    </div>
                                    <div className={"d-social-show-item " + (this.state.socialType === 'youtube' ? 'active' : '')} onClick={() => this.toogleYoutubeActions()}>
                                        <div className="d-social-item-icon">
                                            <span className="youtube"><FontAwesomeIcon icon={faYoutube} /></span>
                                        </div>
                                        <div className="d-social-item-text">Youtube</div>
                                        <div className="d-social-item-action"><FontAwesomeIcon icon={faPlus} /></div>
                                    </div>
                                    {/* <div className={"d-social-show-item " + (this.state.socialType === 'tiktok' ? 'active' : '')} onClick={() => this.toogleTiktokActions()}>
                                        <div className="d-social-item-icon">
                                            <span className="tiktok"><FontAwesomeIcon icon={faTiktok} /></span>
                                        </div>
                                        <div className="d-social-item-text">Tiktok</div>
                                        <div className="d-social-item-action"><FontAwesomeIcon icon={faPlus} /></div>
                                    </div> */}
                                    <div className={"d-social-show-item no-icon-part " + (this.state.socialType === 'invite_friend' ? 'active' : '')} onClick={() => this.toogleInviteFriendsActions()}>
                                        <div className="d-social-item-text">Invite Friends</div>
                                        <div className="d-social-item-action"><FontAwesomeIcon icon={faPlus} /></div>
                                    </div>
                                    <div className={"d-social-show-item no-icon-part " + (this.state.socialType === 'custom_social_action' ? 'active' : '')} onClick={() => this.toogleCustomSocialActions()}>
                                        <div className="d-social-item-text">Custom Social Action</div>
                                        <div className="d-social-item-action"><FontAwesomeIcon icon={faPlus} /></div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-social-right-side" >
                                {socialOptions()}
                            </div>
                        </div>
                        {socialActionBottomOptions()}
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default AddSocialAction