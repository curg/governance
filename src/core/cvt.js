import Caver from 'caver-js'
import constants from './constants'

let cvt_abi = require('../abis/CVT.json');

function getCVTContract() {
    let caver = new Caver(window.klaytn)
    let cvt = new caver.contract(cvt_abi, constants.CVT_ADDRESS);
    return cvt
}

export const balanceOf = async (address) => {
    if(window.klaytn) {
        let contract = getCVTContract()
        return await contract.methods.balanceOf(address).call()
    } else {
        throw new Error("Unable to connect to klaytn")
    }
}