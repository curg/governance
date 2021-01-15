import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Link, useRouteMatch } from 'react-router-dom'

import { accountState, activeState } from '../state'
import { getBallot, getWeightAt, voteAt } from '../core/ballots'
import VoteStepView from './components/VoteStepView'

const VoteProceedView = () => {
    const match = useRouteMatch('/vote/proceed/:id')
    const active = useRecoilValue(activeState)
    const account = useRecoilValue(accountState)

    const [ballot, setBallot] = useState({})
    const [errors, setErrors] = useState({})
    const [receipt, setReceipt] = useState(null)
    const [weightList, setWeightList] = useState([])
    const [voted, setVoted] = useState(false)
    const [weight, setWeight] = useState(0)
    const [id, setId] = useState(0)

    useEffect(() => {
        if(active && account && match) {
            initialize()
        }
    }, [active])

    const initialize = () => {
        let id = match.params.id

        getBallot(id).then(ballot => {
            setId(id)
            setBallot(ballot)

            let _weightList = ballot.proposals.map(x => "")
            setWeightList(_weightList)
        })

        getWeightAt(id, account.address).then(res => {
            setWeight(res.weights_)
            setVoted(res.voted_)
        })
    }

    const setWeightValue = (index, value) => {
        let weights = [...weightList]
        weights[index] = value
        setWeightList(weights)
    }

    const validate = () => {
        let errors = {}

        for(var i = 0; i < weightList.length; i++) {
            if(weightList[i] === "") {
                errors["weight"] = "투표권 수를 입력해주세요."
                setErrors(errors)
                return false
            }

            if(!Number.isInteger(Number(weightList[i]))) {
                errors["weight"] = "숫자만 입력 가능합니다."
                setErrors(errors)
                return false
            }
        }

        let sum = weightList.reduce((a, b) => Number(a) + Number(b));
        if(sum > Number(weight)) {
            errors["weight"] = "보유한 투표권 보다 많은 수를 투표할 수 없습니다."
            setErrors(errors)
            return false
        }

        setErrors({})
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validate() && active && account) {
            let proposals = weightList
                .map((x,idx) => { return {id:idx, v: Number(x)} } )
                .filter(x => x.v > 0)
                .map(x => x.id)
            let weights = weightList
                .map((x,idx) => { return {id:idx, v: Number(x)} })
                .filter(x => x.v > 0)
                .map(x => x.v)

            voteAt(id, proposals, weights, account.address)
                .then(receipt => {
                    initialize()
                    setReceipt(receipt)
                })
        }
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
                                { (receipt && receipt.status) && (
                                    <div className="alert alert-soft-success card-alert">
                                        <label className="mb-0">투표가 완료되었습니다.</label>
                                        <span className="font-size-sm">{ receipt.transactionHash }</span>
                                    </div>
                                ) }
                                { (receipt && !receipt.status) && (
                                    <div className="alert alert-soft-danger card-alert">
                                        <label className="mb-0">이미 투표를 완료한 경우, 투표가 실패됩니다.</label>
                                        <span className="font-size-sm">{ receipt.transactionHash }</span>
                                    </div>
                                ) }
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
                                            <span className="text-muted">{ weight }</span>
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
                                                    <div className="col-md-6 mb-3" key={`proposal-${index}`}>
                                                        <div class="form-control">
                                                            <i className="tio-agenda-view-outlined mr-2"></i>
                                                            <span class="media-body">{value}</span>
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            className="form-control form-control-flush"
                                                            value={weightList[index]}
                                                            onChange={(e) => setWeightValue(index, e.target.value)}
                                                            placeholder="0" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    { errors["weight"] && (
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p className="text-danger">{errors["weight"]}</p>
                                            </div>
                                        </div>
                                    ) }
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            { !voted && (
                                                <button type="submit" className="btn btn-sm btn-block btn-primary"><i className="tio-send mr-1"></i>제출하기</button>
                                            ) }
                                            { voted && (
                                                <button type="button" className="btn btn-sm btn-block btn-secondary" disabled={true}>어이쿠 이런, 이미 투표를 진행하셨네요</button>
                                            ) }
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