import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { toast } from 'react-toastify'

import { accountState, ballotState } from '../../state'
import { getBallot, tallyUp, getVoteEvents } from '../../core/ballots'

const ProposalView = ({ proposals, winner, ended }) => {
    return proposals.map((value, index) => {
        return (
            <div className="col-md-12 text-left mb-3" key={value + String(index)}>
                <label className="input-label mb-0">
                    안건 {index+1} 
                    { (ended && winner == index) && ( <span className="badge badge-soft-primary ml-1">채택</span> ) }
                </label>
                <span>{value}</span>
            </div>  
        )
    })
}

const BallotListView = () => {
    const account = useRecoilValue(accountState)
    const [ballots, setBallots] = useRecoilState(ballotState)

    const handleTallyUp = (ballotId) => {
        if(account && account.address) {
            console.log(ballotId)
            tallyUp(ballotId, account.address)
                .then(async res => {
                    if(res) {
                        let newBallot = await getBallot(ballotId)
                        let newList = ballots.map(x => {
                            if(x.id == newBallot.id) {
                                return newBallot
                            } else {
                                return x;
                            }
                        })
                        setBallots(newList)
                    }
                })
                .catch(err => {
                    toast.info("투표 결과를 보는데 실패했어요 :(")
                });
        }
    }

    return ballots.map((item, index) => {
        return (
            <div className="row" key={String(index)}>
                <div className="col-md-12 mb-5">
                    <div className="card card-hover-shadow h-100">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-2">
                                    <span className="font-size-sm"><i className="tio-time mr-1"></i>POSTED {item.currentTime_}</span>
                                </div>
                                <div className="col-md-6 text-sm-right mb-2">
                                    <span className="font-size-sm"><i className="tio-time mr-1"></i>투표 종료일 : {item.endTime_}</span>
                                </div>
                            </div>
                            <div className="row align-items-center text-left">
                                <div className="col-md-6">
                                    <h4>
                                        {item.ended_ && (<span className="badge badge-soft-secondary p-2 mr-2">투표 종료</span>)}
                                        {!item.ended_ && !item.passed && (<span className="badge badge-soft-success p-2 mr-2">투표 진행중</span>)}
                                        {!item.ended_ && item.passed && (<span className="badge badge-soft-danger p-2 mr-2">투표 시간 마감</span>)}
                                        {item.name_}
                                    </h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    {!item.ended_ && !item.passed && (<Link to={`/vote/create/${item.id}`} className="btn btn-sm btn-soft-success">투표하기</Link>)}
                                    {!item.ended_ && item.passed && (<button className="btn btn-sm btn-soft-danger" onClick={() => handleTallyUp(item.id)}>개표하기</button>)}
                                    <Link to={`/vote/detail/${item.id}`} className="btn btn-sm btn-outline-secondary ml-2">자세히보기</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <ProposalView proposals={item.proposals} winner={Number(item.winningProposal_)} ended={item.ended_} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
}

export default BallotListView