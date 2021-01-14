import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import BallotListView from './components/BallotListView'
import { fetchBallots } from '../core/ballots'
import { activeState } from '../state'

const HomeView = () => {
    const [active, setActive] = useRecoilState(activeState)
    const [ballots, setBallots] = useState([])

    useEffect(() => {
        if(active) {
            fetchBallots().then(ballots => {
                setBallots(ballots);
            })
        }
    }, [active])

    return (
        <div className="container">
            <div className="row">
                <div id="home-introduction" className="col-lg-12 text-center">
                    <span className="display-3">CURG Governance</span>
                    <p className="mt-1">CURG(Crypto United Research Group)은 블록체인 연구자들이 모여 매주 관련 연구 및 현황을 공유하는 리서치 그룹입니다.<br />
                    CURG Governance는 CURG 그룹에서 발생하는 활동에 대한 기여도에 따라 투표권을 지급하고 리서치 그룹의 의사결정을 투표로 결정하기 위한 사이트입니다.</p>
                </div>
            </div>
            <div id="home-ballots" className="row justify-content-md-center">
                <div className="col-md-8 text-center">
                    <h3>Ballots</h3>
                    <p className="lead">CURG의 지난/현재 안건들을 보여줍니다</p>
                </div>
                <div className="col-md-8 mb-4">
                    <BallotListView ballots={ballots} />
                </div>
            </div>
        </div>
    )
}

export default HomeView