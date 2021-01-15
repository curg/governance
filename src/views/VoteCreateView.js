import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Link, useRouteMatch } from 'react-router-dom'

import { activeState } from '../state'
import { getBallot } from '../core/ballots'
import VoteStepView from './components/VoteStepView'

const VoteCreateView = () => {
    const match = useRouteMatch('/vote/create/:id')
    const active = useRecoilValue(activeState)
    const [ballot, setBallot] = useState({})

    useEffect(() => {
        if(active && match) {
            let id = match.params.id
            getBallot(id).then(ballot => {
                setBallot(ballot)
            })
        }
    }, [active])

    return (
        <div className="container">
            <div className="row justify-content-md-center mt-10 mb-15">
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-lg-12">
                            <VoteStepView activeId={1} />
                        </div>
                        <div className="col-lg-12 mt-5">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        <Link to="/ballots" className="btn btn-sm btn-ghost-secondary mr-2 mb-1"><i className="tio-chevron-left"></i></Link>
                                        투표권 생성
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
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="input-label">생성할 투표권 수량</label>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="input-label text-muted">현재 CVT : 0</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                placeholder="0" />
                                            <p className="bg-light p-2 mt-2">
                                                1 CVT는 1개의 투표권으로 교환됩니다.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <button type="button" className="btn btn-sm btn-block btn-primary">투표권 생성</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn btn-sm btn-block btn-soft-secondary">다음 단계로 <i className="tio-chevron-right ml-1"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoteCreateView