import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import {
  RecoilRoot
} from 'recoil'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Header from "./common/Header"
import HomeView from './views/HomeView'
import BallotsView from './views/BallotsView'
import BallotDetailView from './views/BallotDetailView'
import CVTView from './views/CVTView'
import CreateBallotView from './views/CreateBallotView'
import VoteCreateView from './views/VoteCreateView'
import VoteProceedView from './views/VoteProceedView'

function App() {
  return (
    <RecoilRoot>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route path="/vote/detail/:id">
                <BallotDetailView />
              </Route>
              <Route path="/vote/proceed/:id">
                <VoteProceedView />
              </Route>
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
        <ToastContainer 
          autoClose={10000}
          hideProgressBar={true} />
    </RecoilRoot>
  )
}

export default App
