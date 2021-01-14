import React from 'react'

const ProposalView = ({ proposals, winner }) => {
    return proposals.map((value, index) => {
        return (
            <div className="col-md-12 text-left mb-3" key={value + String(index)}>
                <label className="input-label mb-0">안건 {index+1}</label>
                <span>{value}</span>
                { winner == index && ( <span className="badge badge-soft-success ml-2">채택</span> ) }
            </div>  
        )
    })
}

const BallotListView = ({ ballots }) => {
    return ballots.map((item, index) => {
        return (
            <div className="row" key={String(index)}>
                <div className="col-md-12 mb-5">
                    <div className="card card-hover-shadow h-100">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <span className="font-size-sm"><i className="tio-time mr-1"></i>POSTED {item.currentTime_}</span>
                            </div>
                        </div>
                        <div className="row align-items-center text-left">
                            <div className="col-md-6">
                                <h4>
                                    {item.ended_ && (<span className="badge badge-soft-secondary p-2 mr-2">투표 종료</span>)}
                                    {!item.ended_ && (<span className="badge badge-soft-success p-2 mr-2">투표 진행중</span>)}
                                    {item.name_}
                                </h4>
                            </div>
                            <div className="col-md-6 text-right">
                                
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <ProposalView proposals={item.proposals} winner={Number(item.winningProposal_)} />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    })
}

export default BallotListView