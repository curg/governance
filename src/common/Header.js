import React, { useEffect } from 'react'
import Caver from 'caver-js'
import classnames from 'classnames'

import { Link, useLocation } from 'react-router-dom'
import { formatBalance, shortAddress } from '../core/utils'
import { useRecoilState } from 'recoil'
import { accountState, activeState } from '../state'

const Header = () => {
    const location = useLocation()
    const [ active, setActive ] = useRecoilState(activeState)
    const [ _account, _setAccount ] = useRecoilState(accountState)

    useEffect(() => {
        accessToKaikas()
    }, [active])

    // connect to injected wallet
    const connectToKaikas = () => {
        if(typeof window.klaytn !== 'undefined') {
            window.klaytn.enable().then(() => {
                accessToKaikas()
            })
        }
    }

    const accessToKaikas = () => {
        if(window.klaytn && window.klaytn.selectedAddress !== '' && typeof window.klaytn.selectedAddress !== 'undefined') {
            setActive(true)

            let account = window.klaytn.selectedAddress
            let caver = new Caver(window.klaytn)
            caver.klay.getBalance(account).then(balance => {
                _setAccount({
                    address: account,
                    balance: formatBalance(balance),
                    shortAddress: shortAddress(account)
                })
            })
        }
    }

    return (
        <header className="navbar navbar-expand-lg navbar-spacer-y navbar-light mb-3">
            <div className="container">
                <div className="navbar-nav-wrap">
                    <div className="navbar-brand-wrapper">
                        <Link className="navbar-brand" to="/" aria-label="Front"><b>CURG</b> GOVERNANCE</Link>
                    </div>

                    <button type="button" className="navbar-toggler btn btn-ghost-secondary rounded-circle ml-auto" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navbarNavMenuLightEg" data-toggle="collapse" data-target="#navbarNavMenuLightEg">
                        <i className="tio-menu-hamburger"></i>
                    </button>

                    <nav className="collapse navbar-collapse" id="navbarNavMenuLightEg">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className={
                                    classnames("nav-link", {
                                        "active": location.pathname === '/'
                                    })
                                } to="/">HOME</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={
                                    classnames("nav-link", {
                                        "active": location.pathname === '/ballots'
                                    })
                                } to="/ballots">BALLOTS</Link>
                            </li>
                            { (active && _account) && (
                                <li className="nav-item">
                                    <div className="h3 mt-2">
                                        <span className="badge badge-soft-dark">{ _account.balance } KLAY | <span className="text-primary">{ _account.shortAddress }</span></span>
                                    </div>
                                </li>
                            )}
                            { !active && (
                                <li className="nav-item">
                                    <button className="btn btn-sm btn-soft-secondary btn-wallet-connect" onClick={() => connectToKaikas()}>Connect to wallet</button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header