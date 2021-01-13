import React from 'react'
import { useRecoilState } from 'recoil'
import { accountState } from '../../state'

const AccountSideView = () => {
    const [account, setAccount] = useRecoilState(accountState)

    const RenderActive = () => {
        return (
            <>
                <div className="row">
                    <div className="col-md-4">
                        <span className="card-subtitle">KLAY</span>
                    </div>
                    <div className="col-md-8">
                        <h4>{account.balance} KLAY</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <span className="card-subtitle">CGT</span>
                    </div>
                    <div className="col-md-8">
                        <h4>1000000 CGT</h4>
                    </div>
                </div>
            </>
        )
    }

    const RenderInactive = () => {
        return (
            <div className="row">
                <div className="col-md-12 mt-3 mb-3 text-center">
                    <span className="text-secondary">Not Connected</span>
                </div>
            </div>
        )
    }

    return (
        <div className="card mb-3 bg-light">
            <div className="card-header">
                <h4 className="card-header-title">Account { account && ( "(" + account.shortAddress + ")" ) }</h4>
            </div>
            <div className="card-body">
                { account && (
                    <RenderActive />
                )}
                { !account && (
                    <RenderInactive />
                )}
            </div>
        </div>
    )
}

export default AccountSideView