import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Caver from 'caver-js'

import AccountSideView from './components/AccountSideView'
import { activeState } from '../state'

const BallotsView = () => {
    const [active, setActive] = useRecoilState(activeState)
    const [totalBallots, setTotalBallots] = useState(0)
    const [ballots, setBallots] = useState([])

    useEffect(() => {
        if(active) {
            let pqv_abi = require('../abis/PQV.json');
            let caver = new Caver(window.klaytn)
            let pqv = new caver.contract(pqv_abi, "0x5ADEA015905635e64cec95931EF50c4cbB3d5167");

            fetchTotalBallots(caver, pqv);
            // pqv.methods.totalBallots().call().then(value => {
            //     pqv.methods.getBallotOf(0).call().then(res => {
            //         console.log(res);
            //         console.log(caver.utils.toAscii(res.name_));
            //     })
            // });
            // console.log(pqv);
        }
    }, [])

    const fetchTotalBallots = async (caver, contract) => {
        let value = await contract.methods.totalBallots().call()
        setTotalBallots(value);
        fetchBallots(caver, contract, value)
    }

    const fetchBallots = async (caver, contract, numberOfBallots) => {
        let minimumToRead = 5;
        let list = [];
        for(var i = numberOfBallots-1; i >= numberOfBallots-minimumToRead; i--) {
            let result = await contract.methods.getBallotOf(i).call()
            result.name_ = caver.utils.toAscii(result.name_).trim()
            list = [...list, result]

            if(i == 0) {
                break;
            }
        }
        setBallots(list)
    }

    const RenderBallots = () => {
        return ballots.map((item, index) => {
            return (
                <div className="row" key={String(index)}>
                    <div className="col-md-12 mb-5">
                        <div className="card card-hover-shadow text-center h-100">
                        <div className="card-body">
                            <div className="row align-items-center text-left mb-1">
                                <div className="col-md-6">
                                    {item.ended_ && (<span className="badge badge-soft-secondary p-2">투표 종료</span>)}
                                    {!item.ended_ && (<span className="badge badge-soft-success p-2">투표 진행중</span>)}
                                </div>
                                <div className="col-md-6 text-right">
                                    <span className="font-size-sm">{item.currentTime_}</span>
                                </div>
                            </div>
                            <div className="row text-left">
                                <div className="col">
                                    <h2 className="mt-3">{item.name_}</h2>
                                </div>
                            </div>
                            <a className="stretched-link" href="#"></a>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col">
                                    <span className="h4">19</span>
                                    <span className="d-block font-size-sm">투표자 수</span>
                                </div>
                                <div className="col column-divider">
                                    <span className="h4">33<span className="badge badge-soft-success text-sm ml-1">CGT</span></span>
                                    <span className="d-block font-size-sm">투표권 수</span>
                                </div>
                                <div className="col column-divider">
                                    <span className="h4">10:10:10</span>
                                    <span className="d-block font-size-sm">남은 종료 시간</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="container">
            <div className="page-header">
                <div className="row mt-5 align-items-end">
                    <div className="col-lg-8">
                        <h2>안건</h2>
                        <p className="p-0 m-0">CURG 거버넌스에서 진행한 투표 안건들 중 최근 5개만을 보여줍니다</p>
                    </div>
                    <div className="col-lg-4 text-right">
                        <button type="button" className="btn btn-primary">새 안건 추가하기</button>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-9">
                    <RenderBallots />
                </div>
                <div className="col-md-3">
                    <AccountSideView />
                </div>
            </div>
        </div>
    )
}

export default BallotsView