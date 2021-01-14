import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  RecoilRoot
} from 'recoil'

import Header from "./common/Header";
import HomeView from './views/HomeView';
import BallotsView from './views/BallotsView';
import CVTView from './views/CVTView';
import CreateBallotView from './views/CreateBallotView';

function App() {
  return (
    <RecoilRoot>
        <Router>
          <div className="App">
            <Header />
            <Switch>
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
