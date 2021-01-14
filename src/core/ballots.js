import Caver from 'caver-js'
import constants from './constants'
import moment from 'moment'

let pqv_abi = require('../abis/PQV.json');

function getPQVContract() {
    let caver = new Caver(window.klaytn)
    let pqv = new caver.contract(pqv_abi, constants.PQV_ADDRESS);
    return pqv
}

export const fetchTotalBallots = async () => {
    if(window.klaytn) {
        try {
            let contract = getPQVContract();
            let value = await contract.methods.totalBallots().call()
            return value;
        } catch(err) {
            throw err;
        }
    } else {
        throw new Error("unable to access klaytn.")
    }
}

export const fetchBallots = async () => {
    if(window.klaytn) {
        let contract = getPQVContract();
        let numberOfBallots = await fetchTotalBallots();
        let minimumToRead = 10;
        let list = [];
        for(var i = numberOfBallots-1; i >= numberOfBallots-minimumToRead; i--) {
            let result = await contract.methods.getBallotOf(i).call()
            let proposals = await contract.methods.proposalsOf(i).call()
            let endTimestamp = Number(result.currentTime_) + Number(result.timeLimit_)

            result.name_ = Caver.utils.toUtf8(result.name_)
            result.currentTime_ = moment.unix(result.currentTime_).format("YYYY-MM-DD HH:mm:ss")
            result.endTime_ = moment.unix(endTimestamp).format("YYYY-MM-DD HH:mm:ss")
            result.proposals = proposals.map(x => Caver.utils.toUtf8(x))
            list = [...list, result]

            if(i == 0) {
                break;
            }
        }
        return list
    } else {
        throw new Error("unable to access klaytn")
    }
}