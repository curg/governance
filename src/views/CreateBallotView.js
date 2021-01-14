import React, { useState } from 'react'

const CreateBallotView = () => {
    let [input, setInput] = useState({})
    let [errors, setErrors] = useState({})
    let [proposals, setProposals] = useState([""])

    const handleChange = (event) => {
        let _input = input;
        _input[event.target.name] = event.target.value;
        setInput(_input)
    }

    const handleProposalChange = (index, value) => {
        let _proposals = proposals
        _proposals = _proposals.map((v, idx) => {
            if(idx !== index) return value
            else return v
        })
        setProposals(_proposals)
    }

    const addProposal = () => {
        let _proposals = proposals
        _proposals.push("")
        setProposals(_proposals)
    }

    const deleteProposal = (index) => {
        let _proposals = proposals
        _proposals = _proposals.filter((v, idx) => idx !== index)
        setProposals(_proposals)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const validate = () => {

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
                            <div className="card-body">
                                <div className="form-group">
                                    <label className="input-label mb-0">안건 제목</label>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-flush" 
                                        placeholder="Subject" />
                                </div>
                                <div className="form-group">
                                    <label className="input-label mb-0">제안 #1</label>  
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            name="subject"
                                            value={input.subject}
                                            onChange={handleChange}
                                            className="form-control form-control-flush"
                                            placeholder="#1 Proposal" />
                                        <div class="input-group-append">
                                            <a class="btn btn-ghost-danger">
                                                <i class="tio-clear"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button 
                                        type="button"
                                        className="btn btn-sm btn-block btn-soft-secondary"
                                        onClick={() => addProposal()}>
                                        <i className="tio-add mr-1"></i>
                                        제안 추가
                                    </button>
                                </div>
                                <div className="form-group">
                                    <label className="input-label mb-0">투표 마감일</label>
                                    <input 
                                        type="text" 
                                        name="timeLimit"
                                        value={input.timeLimit}
                                        onChange={handleChange}
                                        className="form-control form-control-flush" 
                                        placeholder="30초" />
                                    <p className="bg-light p-2 mt-2">
                                        투표 마감일은 숫자 1당 1초로 계산되며 60보다는 큰 값이어야 합니다.
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-block btn-primary">
                                    <i className="tio-send mr-1"></i>
                                    안건 제출하기
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