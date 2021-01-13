import React from 'react'

const HomeView = () => {
    return (
        <div className="container">
            <div className="row">
                <div id="home-introduction" className="col-lg-12 text-center">
                    <span className="display-3">CURG Governance</span>
                    <p className="mt-1">CURG(Crypto United Research Group)은 블록체인 연구자들이 모여 매주 관련 연구 및 현황을 공유하는 리서치 그룹입니다.<br />
                    CURG Governance는 CURG 그룹에서 발생하는 활동에 대한 기여도에 따라 투표권을 지급하고 리서치 그룹의 의사결정을 투표로 결정하기 위한 사이트입니다.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <h3>System Stats</h3>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="text-secondary">Current Owner</div>
                                    <div className="h3 mt-1">0x00ab....1234 <i className="tio-made-call"></i></div>
                                </div>
                                <div className="col-md-3">
                                    <div className="text-secondary">Total CGT</div>
                                    <div className="h3 mt-1">12,000,000 <span className="badge badge-soft-success">CGT</span></div>
                                </div>
                                <div className="col-md-3">
                                    <div className="text-secondary">Total Voters</div>
                                    <div className="h3 mt-1">12</div>
                                </div>
                                <div className="col-md-3">
                                    <div className="text-secondary">Total Ballots</div>
                                    <div className="h3 mt-1">01</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="home-ballots" className="row justify-content-md-center">
                <div className="col-md-8 text-center">
                    <h3>Ballots</h3>
                    <p className="lead">CURG의 지난/현재 안건들을 보여줍니다</p>
                </div>
                <div className="col-md-8 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <h6 className="card-subtitle">POSTED 2020년 12월 3일</h6>
                                    <h3 className="card-title">12회차 스터디 CURG 모임 장소 투표 <span className="badge badge-soft-success">투표 진행중</span></h3>
                                </div>
                                <div className="col-md-4 text-right">
                                    <span className="text-sm text-muted"><i className="tio-time mr-1"></i>투표 종료 시간<br />02시 53분 51초 남음</span>
                                </div>
                            </div>
                            <p className="mt-2">CURG 12회차 모임 장소에 대한 투표 안건 입니다.</p>
                            <div>
                                <a href="#" className="btn btn-soft-primary">View Ballots</a>
                                <span className="legend-indicator bg-primary ml-3"></span>11명 투표 완료
                                <span className="legend-indicator bg-success ml-3"></span>5700 CGT
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <h6 className="card-subtitle">POSTED 2020년 12월 3일</h6>
                                    <h3 className="card-title">12회차 스터디 CURG 모임 장소 투표 <span className="badge badge-soft-secondary">투표 마감 </span></h3>
                                </div>
                                <div className="col-md-4 text-right">
                                    <span className="text-sm text-muted"><i className="tio-time mr-1"></i>투표 종료 시간<br />02시 53분 51초 남음</span>
                                </div>
                            </div>
                            <p className="mt-2">CURG 12회차 모임 장소에 대한 투표 안건 입니다.</p>
                            <div>
                                <a href="#" className="btn btn-soft-primary">View Ballots</a>
                                <span className="legend-indicator bg-primary ml-3"></span>11명 투표 완료
                                <span className="legend-indicator bg-success ml-3"></span>5700 CGT
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <h6 className="card-subtitle">POSTED 2020년 12월 3일</h6>
                                    <h3 className="card-title">12회차 스터디 CURG 모임 장소 투표</h3>
                                </div>
                                <div className="col-md-4 text-right">
                                    <span className="text-sm text-muted"><i className="tio-time mr-1"></i>투표 종료 시간<br />02시 53분 51초 남음</span>
                                </div>
                            </div>
                            <p className="mt-2">CURG 12회차 모임 장소에 대한 투표 안건 입니다.</p>
                            <div>
                                <a href="#" className="btn btn-soft-primary">View Ballots</a>
                                <span className="legend-indicator bg-primary ml-3"></span>11명 투표 완료
                                <span className="legend-indicator bg-success ml-3"></span>5700 CGT
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <h6 className="card-subtitle">POSTED 2020년 12월 3일</h6>
                                    <h3 className="card-title">12회차 스터디 CURG 모임 장소 투표</h3>
                                </div>
                                <div className="col-md-4 text-right">
                                    <span className="text-sm text-muted"><i className="tio-time mr-1"></i>투표 종료 시간<br />02시 53분 51초 남음</span>
                                </div>
                            </div>
                            <p className="mt-2">CURG 12회차 모임 장소에 대한 투표 안건 입니다.</p>
                            <div>
                                <a href="#" className="btn btn-soft-primary">View Ballots</a>
                                <span className="legend-indicator bg-primary ml-3"></span>11명 투표 완료
                                <span className="legend-indicator bg-success ml-3"></span>5700 CGT
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeView