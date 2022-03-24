import './../../../styles/profiles.css';
import React from 'react';
// import ReactModal from 'react-modal';
// import { HexColorPicker } from "react-colorful";
import auth from '../../../../services/auth';
import CookieService from '../../../../services/CookieService';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTimes } from '@fortawesome/free-solid-svg-icons'

class SideProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            uinfo: this.props.uinfo,
            showOptions: false,
            isModalOpen: false,
            mainColor: '#c6ad23',
            showColorChange: false,
            createClanConfirm: false,
            openEmojis: false,
            emoji: '/img/emoticons/happy.png',
            emojiText: 'happy',
        }
        this.data_initialize = this.data_initialize.bind(this);
        this.createClan = this.createClan.bind(this);
        this.joinClan = this.joinClan.bind(this);
        this.openClanOptions = this.openClanOptions.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changeColorOption = this.changeColorOption.bind(this);
        this.createClanNow = this.createClanNow.bind(this);
        this.handleOpenEmojis = this.handleOpenEmojis.bind(this);
    }

    data_initialize(){
        console.log('stats', this.state.uinfo.stats);
    }
    

    handleOpenEmojis(){
        console.log('open imoji')
        if(this.state.openEmojis){
            this.setState({ openEmojis: false });
        }else{
            this.setState({ openEmojis: true });
        }
    }

    createClan(){
        console.log('create a clan clicked');
        this.setState({isModalOpen: true});
        this.setState({showOptions: false});
    }

    joinClan(){
        console.log('join a clan');
    }

    openClanOptions(){
        console.log('openClanOptions');
        if(this.state.showOptions){
            this.setState({showOptions: false});
        } else {
            this.setState({showOptions: true});
        }
        

    }

    closeModal(){
        this.setState({isModalOpen: false});
    }

    changeColor(vals){
        // console.log(vals);
        this.setState({mainColor: vals});
        this.setState({showColorChange: true});
    }

    changeColorOption(){
        console.log('change color');
        if(this.state.showColorChange){
            this.setState({showColorChange: false});
        } else {
            this.setState({showColorChange: true});
        }
    }

    createClanNow(){
        this.setState({createClanConfirm: true});
    }

    openNewChallenge(){
        console.log('open challenge');
    }



    render () {
        const data_i = () => {
            // this.data_initialize()
            // return this.state.uinfo;
            // const dstats = this.state.uinfo;

            // console.log('dinfo', dstats);
        }
        const user_info = this.state.uinfo;

        const profile_main_image = () => {
            let show_image = '';
            const user_profile = CookieService.get("user_profile");
            if(user_profile !== undefined ){
                if(user_profile.fb_user_id !== undefined){
                    console.log('user profile from sideber -> ', user_profile.fb_user_id);
                    return "https://graph.facebook.com/"+user_profile.fb_user_id+"/picture?type=large&width=320&height=320";
                } else {
                    return auth.userProfile() ? auth.userProfile().profpic_link : '/img/avatarguest.png';
                }
            } else {
                return auth.userProfile() ? auth.userProfile().profpic_link : '/img/avatarguest.png';
            }
        }

        let badges = [
            {
                id: 1,
                badge: '/img/badge.png' 
            },
            {
                id: 2,
                badge: '/img/badge.png' 
            },
            {
                id: 3,
                badge: '/img/badge.png' 
            },
        ]

        let emojis = [
            {
                name: 'happy',
                emoji: '/img/emoticons/happy.png',
            },
            {
                name: 'just fine',
                emoji: '/img/emoticons/justfine.png',
            },
            {
                name: 'sad',
                emoji: '/img/emoticons/sad.png',
            },
            {
                name: 'tired',
                emoji: '/img/emoticons/tired.png',
            },
            {
                name: 'angry',
                emoji: '/img/emoticons/angry.png',
            },
            {
                name: 'pressured',
                emoji: '/img/emoticons/pressured.png',
            },
            {
                name: 'burn-out',
                emoji: '/img/emoticons/burn-out.png',
            },
            {
                name: 'inspired',
                emoji: '/img/emoticons/inspired.png',
            },
            {
                name: 'other',
                emoji: '/img/emoticons/other.png',
            }
        ]
        
        return (
            <div className="sd-inner">
                { data_i() }
                <div className="main-profile">
                    <div className="header relative">
                        <div className="header-inner">
                            <div className="hi-left">
                                <div className="levelrate">Lvl {user_info.level}</div>
                                <div className="flex cursor-pointer">
                                   <img src="/img/dummy/fitness.png" />
                                   <span className="pl-1">Fitness Clan</span>
                                   <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                   </button>
                                </div>
                                {/* <div className="dshowclan">
                                    <div className="showedClan" onClick={this.openClanOptions}>{user_info.clan}</div>
                                    <div className={"clanlist " + (this.state.showOptions ? 'open_clan_option' : 'close_clan_option')}>
                                        <div className="dcl-inner">
                                            <ul>
                                                <li>
                                                    <div className="dicon">i</div>
                                                    <div className="dname">The Ibial Team - Lvl 50</div>
                                                </li>
                                                <li>
                                                    <div className="dicon">i</div>
                                                    <div className="dname">Fitness Club - Lvl 10</div>
                                                </li>
                                                <li className="create_clan" onClick={this.createClan}>Create Clan</li>
                                                <li className="join_clan" onClick={this.joinClan}>Join Clan</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ReactModal
                                        isOpen={this.state.isModalOpen}
                                        contentLabel="Example Modal"
                                        className="create_clan_modal"
                                        ariaHideApp={false}
                                    >
                                        <div className={"dcreate_clan_inner " + (this.state.createClanConfirm ? 'hide_form' : '')}>
                                            <div className="header_part">
                                                <div className="dtitle">
                                                    <h2>Create a Clan</h2>
                                                </div>
                                                <div className="dclose">
                                                    <button onClick={this.closeModal}><FontAwesomeIcon icon={faTimes} /></button>
                                                </div>
                                            </div>
                                            <div className="content_part">
                                                <div className="dconts">
                                                    Clans are communities of people with shared interests, goals and challenges
                                                </div>
                                                <div className="dformlist">
                                                    <div className="df_item">
                                                        <label htmlFor="">Clan name</label>
                                                        <input type="text"/>
                                                    </div>
                                                    <div className="df_item">
                                                        <label htmlFor="">Clan Description</label>
                                                        <textarea placeholder=""></textarea>
                                                    </div>
                                                    <div className="df_item">
                                                        <label htmlFor="">Clan Color <span>(can be changed later)</span></label>
                                                        <div className="dcolortag">
                                                            <div className="colorswatch" onClick={this.changeColorOption}>
                                                                <div className="xswatch" style={{ background: this.state.mainColor, borderColor: this.state.mainColor }}>&nbsp;</div>
                                                            </div>
                                                            <div className="colorinput">
                                                                <input type="text" value={this.state.mainColor} read-only />
                                                            </div>
                                                        </div>
                                                        <div className={"colorpicker " + (this.state.showColorChange ? 'open_color_option' : 'close_color_option')}>
                                                            <HexColorPicker color={this.state.mainColor} onChange={this.changeColor} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="dbuttonups">
                                                    <button className="dcancel" onClick={this.closeModal}>Cancel</button>
                                                    <button className="dcreate" onClick={this.createClanNow}>Create Clan</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"dcreate_clan_inner dcreatedconfirm " + (this.state.createClanConfirm ? 'confirmed_on' : 'confirmed_off')}>
                                            <div className="header_part">
                                                <div className="dtitle">
                                                </div>
                                                <div className="dclose">
                                                    <button onClick={this.closeModal}><FontAwesomeIcon icon={faTimes} /></button>
                                                </div>
                                            </div>
                                            <div className="dmainmessage">
                                                <div className="dmessagemain">Your clan has been created!</div>
                                                <div className="dclanname"><a href="">Running Club</a></div>
                                            </div>
                                            <div className="dbuttonups">
                                                <button className="dcancel" onClick={this.closeModal}>Close</button>
                                                <button className="dcreate">Invite Friends</button>
                                            </div>
                                        </div>
                                    </ReactModal>
                                </div> */}
                            </div>
                            <div className="hi-right">
                                <div className="dcreatechallenge">
                                    <a href="/challenge/new">
                                        <div className="dimage"><img alt="" src="/img/challenge_question.png"/></div>
                                        <div className="dtext">Challenge</div>
                                    </a>
                                </div>
                            </div>
                            <br className="clear"/>
                        </div>
                        
                        <div className="p-2 absolute top-28 bg-vici_bg_button rounded-lg text-white_color">
                            <a href="/profile" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </a>
                            <a href="#" className="">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </a>
                        </div>
                        
                    </div>
                    {
                        auth.isAuthenticated() ? 
                        <div>
                            <div className="h-2 w-1/2 bg-primary_color"></div>
                            <div className="avatar flex justify-center bg-vici_prof_bg py-10">
                                <div className="d-profile-avatar">
                                    <div className="d-profile-avatar-inner">
                                        <img src={profile_main_image() ? profile_main_image() : '/img/avatarguest.png'} alt="" className="object-cover rounded-full w-40 h-40" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex justify-center p-6 bg-primary_color">
                            <div>
                                <img alt="" src="/img/avatarguest.png"></img>
                            </div>
                        </div>
                    }
                    
                    <div className="user-details">
                        <div className="ud-inner">
                            <div className="flex justify-between side-profile-name">
                                <div className="w-48 truncate">
                                    <h3><a href='/profile' className="overflow-hidden truncate">{ auth.isAuthenticated() ? auth.userProfile() !== 'undefined' && auth.userProfile() ? auth.userProfile().name : auth.user().name : 'Guest User'}</a></h3>
                                </div>
                                <div className="flex">
                                    {
                                        badges.map((item, i) => (
                                            <img src={item.badge} key={i} className="w-8 h-8 ml-2" />
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="grid grid-cols-3 mt-3 pb-3 border-b border-vici_gray side-profile-badge">
                                    <div className="text-center badge-data">
                                        <div className="font-bold">0</div>
                                        <div className="badge-details">Following</div>
                                    </div>
                                    <div className="text-center badge-data">
                                        <div className="font-bold">0</div>
                                        <div className="badge-details">Followers</div>
                                    </div>
                                    <div className="text-center badge-data">
                                        <div className="font-bold">0</div>
                                        <div className="badge-details">Friends</div>
                                    </div>
                            </div>
                            <div className="flex mt-6 justify-between side-feeling">
                                <div className="flex">
                                    <img src="/img/waving.png" className="w-6 h-6 mt-2" />
                                    <div className="pl-3 pt-2 text-sm font-bold text-vici_secondary_text">How do you feel today?</div>
                                </div>
                                <div className="relative">
                                    <div onClick={this.handleOpenEmojis} className="flex border side-feeling-content p-1 rounded-full border-bottom_gray cursor-pointer">
                                        <img src={this.state.emoji} />
                                        <span className="text-sm font-bold pl-2 pt-1 capitalize">{ this.state.emojiText }</span>
                                        <div className="pt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    {
                                        this.state.openEmojis &&
                                        <div className="absolute p-3 bg-white_color w-32 shadow-card_border rounded-md">
                                            {
                                                emojis.map((item, i) => (
                                                    <div onClick={()=>this.setState({ emoji: item.emoji, emojiText: item.name, openEmojis: false})} key={i} className="flex py-2 cursor-pointer">
                                                        <img src={item.emoji} />
                                                        <span className="capitalize text-sm font-bold pl-2">{ item.name }</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="mt-6">
                                <div className="font-bold text-vici_secondary_text">Top Activities</div>
                                <div className="mt-3 px-3 py-2 flex bg-vici_light_gray rounded-lg">
                                    <img src="/img/activities/fitness.png" />
                                    <img src="/img/activities/reading.png" className="ml-3" />
                                    <img src="/img/activities/games.png" className="ml-3" />
                                </div>
                            </div>
                            {/* <div className="stats">
                                <ul>
                                    <li>
                                        <div className="dpointicon" style={{background: "#ffca28"}}>&nbsp;</div>
                                        <div className="dpointtext">0</div>
                                    </li>
                                    <li>
                                        <div className="dpointicon" style={{background: "#9b51e0"}}>&nbsp;</div>
                                        <div className="dpointtext">0</div>
                                    </li>
                                    <li>
                                        <a href="/">visit store</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="dinfo">
                                <ul>
                                    {Object.keys(user_info.social_info).map( (key, item) => 
                                        <li key={key}>
                                            <div className="dnum">{user_info.social_info[key]}</div>
                                            <div className="dtext">{key}</div>
                                        </li>
                                    )}
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideProfile