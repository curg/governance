import React from 'react'
import AccountSideView from './components/AccountSideView'

const BallotsView = () => {
    return (
        <div className="container">
            <div className="page-header">
                <div className="row mt-5 align-items-end">
                    <div className="col-lg-8">
                        <h2>안건</h2>
                        <p className="p-0 m-0">CURG 거버넌스에서 진행하는 투표 안건들을 보여줍니다</p>
                    </div>
                    <div className="col-lg-4 text-right">
                        <button type="button" className="btn btn-primary">새 안건 추가하기</button>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-hover-shadow text-center h-100">
                            <div className="card-body">
                                <div className="row align-items-center text-left mb-4">
                                    <div className="col">
                                        <span className="badge badge-soft-success p-2">투표 진행중</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h2 className="mb-1">12회차 스터디 CURG 모임 장소 투표</h2>
                                    <span className="font-size-sm">CURG 12회차 모임 장소에 대한 투표 안건 입니다.</span>
                                </div>

                                <small className="card-subtitle">Members</small>
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
                </div>
                <div className="col-md-3">
                    <AccountSideView />
                </div>
            </div>
        </div>
    )
}

export default BallotsView