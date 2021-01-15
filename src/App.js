import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {
  RecoilRoot
} from 'recoil'

import Header from "./common/Header";
import HomeView from './views/HomeView';
import BallotsView from './views/BallotsView';
import CVTView from './views/CVTView';
import CreateBallotView from './views/CreateBallotView';
import VoteCreateView from './views/VoteCreateView';

function App() {
  return (
    <RecoilRoot>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route path="/vote/create/:id">
                <VoteCreateView />
              </Route>
              <Route path="/create/ballot">
                <CreateBallotView />
              </Route>
              <Route path="/token">
                <CVTView />
              </Route>
              <Route path="/ballots">
                <BallotsView />
              </Route>
              <Route path="/">
                <HomeView />
              </Route>
            </Switch>
          </div>
        </Router>
    </RecoilRoot>
  );
}

export default App;
