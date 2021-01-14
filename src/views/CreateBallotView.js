import React, { useState } from 'react'

import { useRecoilState } from 'recoil'
import { createBallot } from '../core/ballots'
import { activeState, accountState } from '../state' 

const CreateBallotView = () => {
    let [active, setActive] = useRecoilState(activeState)
    let [account, setAccount] = useRecoilState(accountState)

    let [errors, setErrors] = useState({})
    let [subject, setSubject] = useState("")
    let [timeLimit, setTimeLimit] = useState("")
    let [proposals, setProposals] = useState([""])
    let [receipt, setReceipt] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault();

        if(validate() && active) {
            createBallot(subject, proposals, timeLimit, account.address)
                .then(receipt => {
                    setReceipt(receipt)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    const validate = () => {
        let errors = {}
        let hasError = false;
        if(subject === "") {
            errors["subject"] = "제목을 입력해주세요"
            hasError = true;
        }

        if(timeLimit === "") {
            errors["timeLimit"] = "종료일을 입력해주세요"
            hasError = true;
        } else if(!Number.isInteger(Number(timeLimit))) {
            errors["timeLimit"] = "종료일은 숫자만 입력가능합니다."
            hasError = true;
        } else if(Number(timeLimit) < 60) {
            errors["timeLimit"] = "60초 이상 설정해야 합니다."
            hasError = true;
        }

        if(proposals.length < 2) {
            errors["proposals"] = "제안은 2개 이상 생성해야 합니다."
            hasError = true;
        }

        setErrors(errors)
        return !hasError
    }

    const handleProposalChange = (index, value) => {
        let list = [...proposals]
        list[index] = value
        setProposals(list)
    }

    const addProposal = () => {
        let _proposals = proposals.concat([""])
        setProposals(_proposals)
    }

    const deleteProposal = (index) => {
        let _proposals = proposals
        _proposals = _proposals.filter((v, idx) => idx !== index)
        setProposals(_proposals)
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-md-center mt-15 mb-15">
                    <div className="col-lg-5">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">새 안건 추가하기</h4>
                            </div>
                            { receipt && (
                                <div className="alert alert-soft-success card-alert">
                                    <label className="mb-0">안건이 추가되었습니다.</label>
                                    <span className="font-size-sm">{ receipt.transactionHash }</span>
                                </div>
                            ) }
                            <div className="card-body">
                                <div className="form-group">
                                    <label className="input-label mb-0">안건 제목</label>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-flush" 
                                        name="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Subject" />
                                    { errors["subject"] && (<p className="text-danger font-size-sm">{errors["subject"]}</p>) }
                                </div>
                                {
                                    proposals.map((v, idx) => {
                                        return(
                                            <div className="form-group" key={`proposal-${idx}`}>
                                                <label className="input-label mb-0">제안 #{idx+1}</label>  
                                                <div className="input-group">
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-flush"
                                                        onChange={(e) => { handleProposalChange(idx, e.target.value)} }
                                                        value={proposals[idx]}
                                                        placeholder={"#" + (idx+1) + " Proposal"}  />
                                                    <div className="input-group-append">
                                                        <a className="btn btn-ghost-danger" onClick={() => deleteProposal(idx) }>
                                                            <i className="tio-clear"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="form-group">
                                    <button 
                                        type="button"
                                        className="btn btn-sm btn-block btn-soft-secondary"
                                        onClick={() => addProposal()}>
                                        <i className="tio-add mr-1"></i>
                                        제안 추가
                                    </button>
                                    { errors["proposals"] && (<p className="text-danger font-size-sm">{errors["proposals"]}</p>) }
                                </div>
                                <div className="form-group">
                                    <label className="input-label mb-0">투표 마감일</label>
                                    <input 
                                        type="text" 
                                        name="timeLimit"
                                        value={timeLimit}
                                        onChange={(e) => setTimeLimit(e.target.value)}
                                        className="form-control form-control-flush" 
                                        placeholder="30초" />
                                    { errors["timeLimit"] && (<p className="text-danger font-size-sm">{errors["timeLimit"]}</p>) }
                                    <p className="bg-light p-2 mt-2">
                                        투표 마감일은 숫자 1당 1초로 계산되며 60보다는 큰 값이어야 합니다.
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-block btn-primary"
                                    disabled={!active}>
                                    <i className="tio-send mr-1"></i>
                                    { active ? "안건 제출하기" : "Connect wallet" }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateBallotView