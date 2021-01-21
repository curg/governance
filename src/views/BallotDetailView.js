import React, { useState, useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import { useRecoilValue } from 'recoil'
import { getBallot, getVoteEvents } from '../core/ballots'
import { activeState, accountState } from '../state' 

const BallotDetailView = () => {
    let active = useRecoilValue(activeState)
    let account = useRecoilValue(accountState)
    let match = useRouteMatch()

    const [id, setId] = useState(0)
    const [ballot, setBallot] = useState({})
    const [votes, setVotes] = useState([])

    useEffect(() => {
        if(active && account && match) {
            initialize()
        }
    }, [active])

    const initialize = () => {
        let id = match.params.id

        // 투표 정보 가져오기
        getBallot(id).then(ballot => {
            setId(id)
            setBallot(ballot)
        })

        getVoteEvents(id).then(votes => {
            setVotes(votes.map(x => x.returnValues))
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-md-center mt-15 mb-5">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">
                                <Link to="/ballots" className="btn btn-sm btn-ghost-secondary mr-2 mb-1"><i className="tio-chevron-left"></i></Link>
                                안건 자세히 보기
                            </h4>
                        </div>
                        <div className="card-body">
                            <div className="row form-group">
                                <div className="col-md-4"><label className="text-dark">안건 제목</label></div>
                                <div className="col-md-8">{ ballot ? ballot.name_ : "" }</div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-4"><label className="text-dark"><i className="tio-time mr-1"></i>POSTED</label></div>
                                <div className="col-md-8">{ ballot ? ballot.currentTime_ : "" }</div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-4"><label className="text-dark"><i className="tio-time mr-1"></i>투표 종료 시간</label></div>
                                <div className="col-md-8">{ ballot ? ballot.endTime_ : "" }</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                (ballot && ballot.proposals) && ballot.proposals.map((value, index) => {
                    return (
                        <div className="row justify-content-md-center mb-5" key={`proposal-${index}`}>
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title text-muted">
                                            안건 {index+1} {value}
                                            { (ballot.ended_ && Number(ballot.winningProposal_) == index) && ( <span className="badge badge-soft-primary ml-1">채택</span> ) }
                                        </h5>
                                    </div>
                                    <table className="table table-borderless table-thead-bordered table-nowrap table-align-middle mb-0 pb-0">
                                        <thead className="thead-light">
                                            <tr>
                                                <th width="70%">투표자</th>
                                                <th>투표권</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                votes && votes.filter(x => x.proposal == index).map(item => {
                                                    return (
                                                        <tr>
                                                            <td>{item.who}</td>
                                                            <td className="text-dark">{item.weights}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                (votes && votes.filter(x => x.proposal == index).length == 0) && (
                                                    <tr>
                                                        <td colSpan={2} className="text-center pt-5 pb-5 text-muted">아직 투표한 사람이 없습니다 :(</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                        <tfoot className="thead-light mb-0">
                                            <tr>
                                                <th>총 득표</th>
                                                <th>
                                                    { votes && votes.filter(x => x.proposal == index).reduce((a,b) => a + Number(b.weights), 0)}
                                                </th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BallotDetailView