import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Link, useRouteMatch } from 'react-router-dom'

import { accountState, activeState } from '../state'
import { getBallot, getWeightAt, joinAt } from '../core/ballots'
import { balanceOf } from '../core/cvt'

import VoteStepView from './components/VoteStepView'

const VoteCreateView = () => {
    const match = useRouteMatch('/vote/create/:id')
    const active = useRecoilValue(activeState)
    const account = useRecoilValue(accountState)

    const [amount, setAmount] = useState("")
    const [errors, setErrors] = useState({})
    const [ballot, setBallot] = useState({})
    const [weight, setWeight] = useState(0)
    const [cvtToken, setCVTToken] = useState(0)

    const [id, setId] = useState(0)
    const [alarm, setAlarm] = useState(null)

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

        // 투표권 정보 가져오기
        getWeightAt(id, account.address).then(res => {
            setWeight(res.weights_)
        })

        // CVT 수량 가져오기
        balanceOf(account.address).then(balance => {
            setCVTToken(balance)
        })
    }

    const validate = () => {
        let hasError = false;
        let errors = {}

        if(amount === "") {
            errors["amount"] = "수량을 입력해주세요."
            hasError = true
        } else if(!Number.isInteger(Number(amount))) {
            errors["amount"] = "숫자만 입력 가능합니다."
            hasError = true
        } else if(Number(amount) > Number(cvtToken)) {
            errors["amount"] = "보유한 CVT 토큰 개수 만큼만 교환 가능 합니다."
            hasError = true
        }

        setErrors(errors)
        return !hasError
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if(validate() && active) {
            joinAt(id, amount, account.address).then(receipt => {
                setAlarm({ receipt: receipt })
                initialize()
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
                                { (alarm && alarm.receipt.status) && (
                                    <div className="alert alert-soft-success card-alert">
                                        <label className="mb-0">투표권이 생성되었습니다.</label>
                                        <span className="font-size-sm">{ alarm.receipt.transactionHash }</span>
                                    </div>
                                ) }
                                { (alarm && !alarm.receipt.status) && (
                                    <div className="alert alert-soft-danger card-alert">
                                        <label className="mb-0">실패: 이미 투표를 완료했거나 투표시간이 지난 경우 투표권을 생성할 수 없습니다</label>
                                        <span className="font-size-sm">{ alarm.receipt.transactionHash }</span>
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
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="input-label">생성할 투표권 수량</label>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="input-label text-muted">현재 CVT : {cvtToken}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                value={amount}
                                                onChange={e => setAmount(e.target.value)}
                                                placeholder="0" />
                                            { errors["amount"] && (<p className="text-danger">{errors["amount"]}</p>) }
                                            <p className="bg-light p-2 mt-2">
                                                1 CVT는 1개의 투표권으로 교환됩니다.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <button type="submit" className="btn btn-sm btn-block btn-primary">투표권 생성</button>
                                        </div>
                                        <div className="col-md-6">
                                            <Link to={`/vote/proceed/${id}`} className="btn btn-sm btn-block btn-soft-secondary">다음 단계로 <i className="tio-chevron-right ml-1"></i></Link>
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

export default VoteCreateView