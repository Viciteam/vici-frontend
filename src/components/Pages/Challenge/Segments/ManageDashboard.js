import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Overview from '../Dashboard/Overview';
import Participants from '../Dashboard/Participants';
import Actions from '../Dashboard/Actions';
import Rewards from '../Dashboard/Rewards';
import History from '../Dashboard/History';
import Settings from '../Dashboard/Settings'

class ManageDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          activeTab : 0
        };
        this.handleSelect = this.handleSelect.bind(this);
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
                            <Overview />
                        </TabPanel>
                        <TabPanel>
                            <Participants />
                        </TabPanel>
                        <TabPanel>
                            <Actions />
                        </TabPanel>
                        <TabPanel>
                            <Rewards />
                        </TabPanel>
                        <TabPanel>
                            <History />
                        </TabPanel>
                        <TabPanel>
                            <Settings />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }

}

export default ManageDashboard