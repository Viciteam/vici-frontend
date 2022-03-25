//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Content  from './components/Content'
import Footer from './components/Footer'
import Thankyou from './components/ThankyouPage/Thankyou';
import ThankyouHeader from './components/ThankyouPage/Header';
import NewThankyouPage from './components/ThankyouPage/NewThankyouPage';

// import ProfileHeader from './components/Pages/Profile/Header';
import ProfileContent from './components/Pages/Profile/mainProfileContent';

import Profile from './components/Pages/Profile/Index'

import PrivacyPolicy from './components/Pages/Privacy/PrivacyPolicy'
import TermsConditions from './components/Pages/Privacy/TermsConditions';
import CookiePolicy from './components/Pages/Privacy/CookiePolicy';

import GuestContent from './components/Pages/Guest/GuestContent';

import ContactHeader from './components/Pages/ContactUs/ContactHeader'
import ContactContent from './components/Pages/ContactUs/ContactContent';

import ClanChallenge from './components/Pages/Clan/Challenge';
import ClanIndex from './components/Pages/Clan/Index';
import ClanMembers from './components/Pages/Clan/Members';
import ClanHeader from './components/Pages/Clan/Header';
import { JoinProvider } from './components/Pages/Clan/JoinedContext';
import { ProfileProvider } from './components/Pages/Profile/ProfileContext';

import LoginPage from './components/Pages/Auth/Login';
import auth from './services/auth';
import LoginModal from './components/Pages/Auth/LoginModal';

import NewChallenge from './components/Pages/Challenge/NewChallenge';
import GoalChallengeOne from './components/Pages/Challenge/GoalChallengeOne';
import GoalContestOne from './components/Pages/Challenge/GoalContestOne';
import LeaaderboardChallengeOne from './components/Pages/Challenge/LeaaderboardChallengeOne';
import PreChallenge from './components/Pages/Challenge/PreChallenge';
import ManageDashboard from './components/Pages/Challenge/Segments/ManageDashboard';

import ViewChallenge from './components/Pages/Challenge/ViewChallenge';

import ExploreChallenge from './components/Pages/Challenge/Explore/ExploreChallenge'

import Onboarding from './components/Pages/Onboarding/Onboarding';

import Messages from './components/Pages/Messages/Messages'
import SearchResults from './components/Pages/Search/SearchResults';
import CookieService from './services/CookieService';
import axios from 'axios';


axios.interceptors.request.use(function (config){
  const token = CookieService.get("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

//mParticle
/* var mParticle = require('mparticle');

var mapi = new mParticle.EventsApi(new mParticle.Configuration(
    'us1-b1e387f78b309744b5ee9ef4be89bb4e',
    'yMg8DLEZKYf7XQ6xYLvwCRat3sfh8wbicrllSxAfrnR1id6FuqamMSujsbg79ryH')); */

//mParticle


function App() {

  function handleCloseModal () {
    return true
  }

  return (
    <Router>
      <div className="bg-primary_background font-nunito">
          <Switch>
           <Route exact path="/">
              <ClanHeader />
              <ProfileContent />
            </Route>
            <Route exact path="/waitlist">
              <Header />
              <Content />
              <Footer />
            </Route>
            <Route path="/waitlist-thanks">
              <ThankyouHeader />
              {/* <Thankyou /> */}
              <NewThankyouPage />
            </Route>

            <Route path="/profile/:id">
              <ProfileProvider>
                <ClanHeader />
                <Profile />
              </ProfileProvider>
            </Route>
            <Route path="/onboarding">
              <ClanHeader />
              <Onboarding />
            </Route>
            <Route path="/guest">
              <ClanHeader />
              <GuestContent />
            </Route>
            <Route path="/contact-us">
              <ContactHeader />
              <ContactContent />
            </Route>
            <Route exact path="/clan/">
              <ClanHeader />
              <JoinProvider>
                <ClanIndex />
              </JoinProvider>
            </Route>
            <Route path="/clan/members">
              <ClanHeader />
              <ClanMembers />
            </Route>
            <Route path="/clan/challenge">
              <ClanHeader />
              <ClanChallenge />
            </Route>
            <Route path="/challenge/dashboard/:id">
              <ClanHeader />
              <ManageDashboard />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/challenge/new">
              <ClanHeader />
              <NewChallenge />
            </Route>
            <Route exact path="/challenge/goal">
              <ClanHeader />
              <GoalChallengeOne />
            </Route>
            <Route exact path="/challenge/goal/:id">
              <ClanHeader />
              <GoalChallengeOne />
            </Route>
            <Route exact path="/challenge/contest">
              <ClanHeader />
              <GoalContestOne />
            </Route>
            <Route exact path="/challenge/leaderboard">
              <ClanHeader />
              <LeaaderboardChallengeOne />
            </Route>
            <Route path="/challenge/goal/pre-challenge">
              <ClanHeader />
              <PreChallenge />
            </Route>
            <Route exact path="/challenge/view">
              <ClanHeader />
              <ViewChallenge />
            </Route>
            <Route path="/challenge/:id">
              <ClanHeader />
              <ViewChallenge/>
            </Route>
            <Route path="/challenge/explore">
              <ClanHeader />
              <ExploreChallenge />
            </Route>
            <Route path="/search-results">
              <ClanHeader />
              <SearchResults />
            </Route>
            {
              auth.isAuthenticated() ? 
              <Route path="/messages">
                <ClanHeader />
                <Messages />
              </Route>
              :
              <LoginModal closeModal={handleCloseModal} />
            }
            
            <Route path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route path="/terms-and-conditions">
              <TermsConditions />
            </Route>
            <Route path="/cookie-policy">
              <CookiePolicy />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
