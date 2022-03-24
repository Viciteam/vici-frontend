import React from 'react';
import { useState, useEffect, useRef } from 'react';

import AuthService from '../../../../services/AuthService';
import CookieService from '../../../../services/CookieService';
import mParticleService  from '../../../../services/mParticleService';
//import axios from 'axios';

function EditProfile ({ closeModal }) {
    let [profpic_link, setProfLink] = useState('/img/avatarguest.png');
    let [bgcolor, setBgColor] = useState('#FFCA28');
    let [txtcolor, setTextColor] = useState('white');
    let [username, setUsername] = useState('');
    let [validUsername, setValidUsername] = useState(true);
    let [validName, setValidName] = useState(true);
    let [name, setName] = useState('');
    let [pref_pronoun, setPrefPronoun] = useState('She/Her');
    let [bday, setBday] = useState(new Date());
    let [bio, setBio] = useState('');
    let [mission, setMission] = useState('');
    let [country, setCountry] = useState('Philippines');
    let [imgType, setImgType] = useState('');
    let [imgName, setImgName] = useState('');
    let [imgFile, setImgFile] = useState(null);
    const [profile_banner_link, setBanner] = useState()
    const fileUploader = useRef(null)
    const profileUploader = useRef(null)
    const uploadProfile = () => {
        profileUploader.current.click();
    };

    const mparticle = mParticleService;

    useEffect(() => {
        getUserProfile();
    }, []);

    const uploadBanner = () => {
        fileUploader.current.click();
      };

    async function setFile(event) {
        console.log('banner', event.target.files)
        const objectUrl = URL.createObjectURL(event.target.files[0])
        setBanner(objectUrl)

        const response = await AuthService.uploadProfPic(event.target.files[0]);
        //console.log('upload prof', response)
        if(response){
            setBanner(response.image_url)
        }

        // var mnpartdata = {
        //   image_url:response.image_url,
        // }
        // var mpartevent = 'Set Profile Banner';
        // const mpart = await mparticle.sendEvent(mpartevent,mnpartdata);

    }

    async function getUserProfile(){
        let response = await AuthService.getUserProfile()

        if(!response){
            response = {
                'user': ''
            };
            const user_information = CookieService.get("user_profile");
            response.user = user_information;
        }

        console.log('response', response)

        if(response.user){
            var mnpartdata = {
            username:response.user.name,
            }
            var mpartevent = 'Edit User Profile';
            const mpart = await mparticle.sendEvent(mpartevent,mnpartdata);
        }

        var mpartevent = 'Edit User Profile';
        // const mpart = await mparticle.sendEvent(mpartevent,mnpartdata);

        console.log('edit propfile', response)
        if(response.user){
            setBanner(response.user.profile_banner_link ? response.user.profile_banner_link : '/img/default_banner.png')
            setProfLink(response.user.profpic_link ? response.user.profpic_link : '/img/avatarguest.png')
            setBgColor(response.user.bgcolor)
            setTextColor(response.user.txtcolor)
            setUsername(response.user.username)
            setName(response.user.name)
            setPrefPronoun(response.user.pref_pronoun)
            setBday(response.user.bday)
            setBio(response.user.bio)
            setMission(response.user.mission)
            setCountry(response.user.country)
        }
    }

    async function setProfile(event) {
        console.log('profile', event.target.files)
        const objectUrl = URL.createObjectURL(event.target.files[0])
        setImgFile(event.target.files[0])
        setImgType(event.target.files[0].type.split('/')[1])
        setImgName(objectUrl.substring(objectUrl.lastIndexOf("/") + 1, objectUrl.length))
        //setProfilePreview(objectUrl)
        setProfLink(objectUrl)

        const response = await AuthService.uploadProfPic(event.target.files[0]);
        //console.log('upload prof', response)
        if(response){
            setProfLink(response.image_url)
        }


    }

    function handleChangeTextColor(event) {
        setTextColor(event.target.value)
    }

    function handleValidation() {
        if(name === ''){
            setValidName(false)
            return false
        }else if(username === ''){
            setValidUsername(false)
            return false
        }else {
            setValidUsername(true)
            setValidName(true)
            return true
        }
    }

    async function handleSubmit(){
        const data = {
            profile_banner_link,
            profpic_link,
            bgcolor,
            txtcolor,
            username,
            name,
            pref_pronoun,
            bday,
            bio: bio === '' ? '-' : bio,
            mission: mission === '' ? '-' : mission,
            country
        }
        setValidName(true)
        setValidUsername(true)
        if(handleValidation()){
            const response = await AuthService.registerUserProfile(data)
            if(response){
                console.log('uesr',response)
                CookieService.set("user_profile", response.user);
                window.location.href = "/profile/"+response.user.id;
            }
            closeModal()
        }
    }

    return (
        <div className="bg-vici_black bg-opacity-50 fixed inset-0 flex justify-center items-center z-10">
            <div className="bg-white_color xl:w-1/2 lg:w-1/2 md:w-8/12 sm:w-full rounded-lg h-screen overflow-auto">
                <div className="flex justify-between p-6 bg-primary_background rounded-lg">
                    <div className="text-lg font-bold">
                        Edit Profile
                    </div>
                    <div>
                        <div onClick={() => {closeModal()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20.7266 16.5L16.7266 20.5L10.7266 14.4983L4.72656 20.5L0.726562 16.5L6.72656 10.5L0.726562 4.5L4.72656 0.5L10.7266 6.5L16.7266 0.5L20.7266 4.5L14.7249 10.5L20.7266 16.5Z" fill="#EB5757"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="lg:w-11/12 xl:w-2/3 mx-auto my-3 rounded-2xl border border-medium_gray">

                    <div className="h-28 flex relative justify-center bg-vici_gray rounded-xl">
                        <img alt="" src={profile_banner_link} className="absolute w-full rounded-xl object-cover h-28" />
                        <button onClick={uploadBanner} className="text-vici_secondary cursor-pointer z-10">Upload Banner</button>
                        <input type="file" id="bannerfile" onChange={setFile.bind(this)}  ref={fileUploader} style={{display: "none"}}/>
                    </div>


                        <div className="flex justify-center pt-3">
                            <img alt="" src={profpic_link}  className="object-cover rounded-full w-28 h-28" />
                        </div>
                        <div className="flex justify-center my-3">
                            <button onClick={uploadProfile} className="text-vici_secondary">Upload Profile Picture</button>
                            <input type="file" id="file" onChange={setProfile.bind(this)}  ref={profileUploader} style={{display: "none"}}/>
                        </div>
                        <div className="mt-3 p-3">
                            <div className="flex">
                                <div className="">
                                    <div className="flex">
                                        <div className="text-sm text-vici_secondary_text font-bold">Profile BG Color</div>
                                        <button className="ml-2">
                                            <img alt="" src="/img/dummy/Vector.png" />
                                        </button>
                                    </div>
                                    <div className="flex mt-3">
                                        <input type="color" value={bgcolor} onChange={event => setBgColor(bgcolor = event.target.value)} className="h-10 rounded" />
                                        <div className="pl-3 pt-2 uppercase">{ bgcolor }</div>
                                    </div>
                                </div>
                                <div className="pl-12 ">
                                    <div className="flex">
                                        <div className="text-sm text-vici_secondary_text font-bold">Text Color</div>
                                        <button className="ml-2">
                                            <img alt="" src="/img/dummy/Vector.png" />
                                        </button>
                                    </div>
                                    <div className="flex mt-3">
                                        <div className={`px-3 py-2 rounded-lg ${txtcolor === 'white' ? 'bg-vici_secondary text-white_color' : ''} hover:bg-vici_secondary hover:text-white_color`}>
                                            <label className="inline-flex items-center">
                                                <input onChange={handleChangeTextColor} type="radio" className="form-radio" name="textColor" value="white" />
                                                <span className="ml-2 text-sm">White</span>
                                            </label>
                                        </div>
                                        <div className={`px-3 ml-3 py-2 rounded-lg ${txtcolor === 'black' ? 'bg-vici_secondary text-white_color' : ''} hover:bg-vici_secondary hover:text-white_color border border-medium_gray`}>
                                            <label className="inline-flex items-center">
                                                <input onChange={handleChangeTextColor} type="radio" className="form-radio" name="textColor" value="black" />
                                                <span className="ml-2 text-sm">Black</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="text-sm text-vici_secondary_text font-bold">Preview</div>
                            <div className="w-full mt-3">
                                <button style={{background: bgcolor }} className={`w-full py-2 rounded-lg ${txtcolor === 'white' ? 'text-white_color' : ''}`}>
                                    { name ? name : 'John Doe' }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mx-24 mt-6 pb-12 shadow-border_shadow">
                        <div className="flex p-3">
                            <div className="font-bold w-1/4 pt-2">
                                Username
                            </div>
                            <div className="w-3/4">
                                <input type="text" value={username} onChange={event => setUsername(username = event.target.value)} className="w-full py-2 px-3 rounded-xl border border-medium_gray" placeholder="Username" />
                                {
                                    !validUsername &&
                                    <div className="text-sm text-red">Please enter username</div>
                                }
                            </div>
                        </div>
                        <div className="flex p-3">
                            <div className="font-bold w-1/4 pt-2">
                                Name
                            </div>
                            <div className="w-3/4">
                                <input type="text" value={name} onChange={event => setName(name = event.target.value)} className="w-full py-2 px-3 rounded-xl border border-medium_gray" placeholder="Name" />
                                {
                                    !validName &&
                                <div className="text-sm text-red">Please enter name</div>
                                }
                            </div>
                        </div>
                        <div className="flex p-3">
                            <div className="font-bold w-1/4 pt-2">
                                Preferred pronouns
                            </div>
                            <div className="w-3/4">
                                <select value={pref_pronoun} onChange={event => setPrefPronoun(pref_pronoun = event.target.value)} className="w-full py-2 px-3 rounded-xl border border-medium_gray" placeholder="Name">
                                    <option>She/Her</option>
                                    <option>Mr</option>
                                    <option>Ms</option>
                                    <option>Mrs</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex p-3">
                            <div className="font-bold w-1/4 pt-2">
                                Birthdate
                            </div>
                            <div className="w-3/4">
                                <input type="date" value={bday} onChange={event => setBday(bday = event.target.value)} className="w-full py-2 px-3 rounded-xl border border-medium_gray" placeholder="DD/MM/YY" />
                            </div>
                        </div>
                        <div className="flex p-3">
                            <div className="font-bold w-1/4 pt-2">
                                Bio
                            </div>
                            <div className="w-3/4">
                               <textarea value={bio} onChange={event => setBio(bio = event.target.value)} className="w-full py-2 px-3 rounded-xl border border-medium_gray" placeholder="Tell us something about yourself"></textarea>
                            </div>
                        </div>
                        <div className="flex p-3">
                            <div className="font-bold w-1/4 pt-2">
                                Mission
                            </div>
                            <div className="w-3/4">
                               <textarea value={mission} onChange={event => setMission(mission = event.target.value)} className="w-full py-2 px-3 rounded-xl border border-medium_gray" placeholder="What is your mission in life?"></textarea>
                            </div>
                        </div>
                        <div className="flex p-3">
                            <div className="font-bold w-1/4 pt-2">
                                Country
                            </div>
                            <div className="w-3/4">
                                <select value={country} onChange={event => setCountry(country = event.target.value)} className="w-full py-2 px-3 rounded-xl border border-medium_gray" placeholder="Name">
                                    <option>Philippines</option>
                                    <option>Vietnam</option>
                                    <option>Singapore</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="my-6">
                        <div className="flex justify-center">
                            <button onClick={() => {closeModal()}} className="py-2 px-3 border border-medium_gray rounded-lg">Cancel</button>
                            <button onClick={() => {handleSubmit()}} className="py-2 px-5 border ml-3 bg-primary_color text-white_color rounded-lg">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EditProfile
