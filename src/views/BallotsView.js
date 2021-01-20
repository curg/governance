import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Link } from 'react-router-dom'

import AccountSideView from './components/AccountSideView'
import BallotListView from './components/BallotListView'
import { activeState, ballotState } from '../state'
import { fetchBallots } from '../core/ballots'

const BallotsView = () => {
    const [active, setActive] = useRecoilState(activeState)
    const [ballots, setBallots] = useRecoilState(ballotState)

    useEffect(() => {
        if(active) {
            fetchBallots().then(ballots => {
                setBallots(ballots);
            })
        }
    }, [active])

    return (
        <div className="container">
            <div className="page-header">
                <div className="row mt-5 align-items-end">
                    <div className="col-lg-8">
                        <h2>안건</h2>
                        <p className="p-0 m-0">CURG 거버넌스에서 진행한 투표 안건들 중 최근 10개만을 보여줍니다</p>
                    </div>
                    <div className="col-lg-4 text-right">
                        <Link to={"/create/ballot"} className="btn btn-primary">새 안건 추가하기</Link>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-9">
                    <BallotListView />
                </div>
                <div className="col-md-3">
                    <AccountSideView />
                </div>
            </div>
        </div>
    )
}

export default BallotsView