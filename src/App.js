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

function App() {
  return (
    <RecoilRoot>
        <Router>
          <div className="App">
            <Header />
            <Switch>
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
