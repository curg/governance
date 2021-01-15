import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Link, useRouteMatch } from 'react-router-dom'

import { activeState } from '../state'
import { getBallot } from '../core/ballots'
import VoteStepView from './components/VoteStepView'

const VoteProceedView = () => {
    const match = useRouteMatch('/vote/proceed/:id')
    const active = useRecoilValue(activeState)
    const [ballot, setBallot] = useState({})
    const [id, setId] = useState(0)

    useEffect(() => {
        if(active && match) {
            let id = match.params.id
            getBallot(id).then(ballot => {
                setId(id)
                setBallot(ballot)
            })
        }
    }, [active])

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
            <div className="row justify-content-md-center mt-10 mb-15">
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-lg-12">
                            <VoteStepView activeId={2} />
                        </div>
                        <div className="col-lg-12 mt-5">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        <Link to={`/vote/create/${id}`} className="btn btn-sm btn-ghost-secondary mr-2 mb-1"><i className="tio-chevron-left"></i></Link>
                                        투표 진행하기
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <div className="row form-group">
                                        <div className="col-md-3">
                                            <label className="text-dark">이름</label>
                                        </div>
                                        <div className="col-md-9">
                                            <span className="text-muted">{ ballot.name_ }</span>
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-3">
                                            <label className="text-dark"><i className="tio-ticket mr-1"></i>보유 투표권 수</label>
                                        </div>
                                        <div className="col-md-9">
                                            <span className="text-muted">0</span>
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-3">
                                            <label className="text-dark"><i className="tio-time mr-1"></i>POSTED</label>
                                        </div>
                                        <div className="col-md-9">
                                            <span className="text-muted">{ ballot.currentTime_ }</span>
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-3">
                                            <label className="text-dark"><i className="tio-time mr-1"></i>투표 종료일</label>
                                        </div>
                                        <div className="col-md-9">
                                            <span className="text-muted">{ ballot.endTime_ }</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="input-label">안건 리스트</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {
                                            ballot.proposals && ballot.proposals.map((value, index) => {
                                                return (
                                                    <div className="col-md-6 mb-3">
                                                        <div class="form-control">
                                                            <div class="custom-control custom-radio custom-radio-reverse">
                                                                <input type="radio" class="custom-control-input" name="proposal" id={`proposal-${index}`} />
                                                                <label class="custom-control-label media align-items-center" for={`proposal-${index}`}>
                                                                    <i class="tio-agenda-view text-muted mr-2"></i>
                                                                    <span class="media-body">{value}</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-12">
                                            <label className="input-label">투표권 수량 입력</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                placeholder="0" />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <button type="submit" className="btn btn-sm btn-block btn-primary"><i className="tio-send mr-1"></i>제출하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    )
}

export default VoteProceedView