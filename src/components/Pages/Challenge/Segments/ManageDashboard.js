import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Overview from '../Dashboard/Overview';
import Participants from '../Dashboard/Participants';
import Actions from '../Dashboard/Actions';
import Rewards from '../Dashboard/Rewards';
import History from '../Dashboard/History';
import Settings from '../Dashboard/Settings'
import auth from '../../../../services/auth';
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.vici.life/api/',
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization' : 'Bearer '+auth.getAccessToken(),
    }
})

class ManageDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          activeTab : 0,
          challengeDetails : []
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount(){
        api.get('challenge/'+window.location.pathname.split('/')[3]).then(
          (response) => {
            console.log('response -> ', response.data.challenges);
            let challenges = response.data.challenges[0];

            if(challenges.owner_id !== auth.user().id){
              window.location="/challenge/" +window.location.pathname.split('/')[3] 
            }
            this.setState({challengeDetails: challenges});
          }
        ).catch((error) => {
            console.log('error -> ', error);
        });
    }


    handleSelect(index){
        this.setState({
          activeTab: index
        });
    }
      
    render () {
        return (
            <div className="container mx-auto">
                <div className=" mt-12">
                    <Tabs defaultIndex={0} className="mt-6" onSelect={index => this.handleSelect(index)} >
                        <TabList className="flex justify-evenly cursor-pointer shadow-vici rounded-2xl text-sm">
                            <Tab className={`w-1/6 py-2 text-center rounded-l-2xl ${this.state.activeTab == 0 ? 'bg-other_challenges text-white_color' : ''}`}>Overview</Tab>
                            <Tab className={`w-1/6 py-2 text-center ${this.state.activeTab == 1 ? 'bg-other_challenges text-white_color' : ''}`}>Participants</Tab>
                            <Tab className={`w-1/6 py-2 text-center ${this.state.activeTab == 2 ? 'bg-other_challenges text-white_color' : ''}`}>Actions</Tab>
                            <Tab className={`w-1/6 py-2 text-center ${this.state.activeTab == 3 ? 'bg-other_challenges text-white_color' : ''}`}>Rewards</Tab>
                            <Tab className={`w-1/6 py-2 text-center ${this.state.activeTab == 4 ? 'bg-other_challenges text-white_color' : ''}`}>History</Tab>
                            <Tab className={`w-1/6 py-2 text-center rounded-r-2xl ${this.state.activeTab == 5 ? 'bg-other_challenges text-white_color' : ''}`}>Settings</Tab>
                        </TabList>

                        <TabPanel>
                            <Overview details={this.state.challengeDetails} />
                        </TabPanel>
                        <TabPanel>
                            <Participants details={this.state.challengeDetails} />
                        </TabPanel>
                        <TabPanel>
                            <Actions details={this.state.challengeDetails} />
                        </TabPanel>
                        <TabPanel>
                            <Rewards details={this.state.challengeDetails} />
                        </TabPanel>
                        <TabPanel>
                            <History details={this.state.challengeDetails} />
                        </TabPanel>
                        <TabPanel>
                            <Settings details={this.state.challengeDetails} />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }

}

export default ManageDashboard