import Caver from 'caver-js'
import constants from './constants'
import moment from 'moment'

import { stringToBytes } from './utils'

let pqv_abi = require('../abis/PQV.json');

function getPQVContract() {
    let caver = new Caver(window.klaytn)
    let pqv = new caver.contract(pqv_abi, constants.PQV_ADDRESS);
    return pqv
}

export const createBallot = async (subject, proposals, timeLimit, account) => {
    if(window.klaytn) {
        let _subject = stringToBytes(subject)
        let _proposals = proposals.map(x => stringToBytes(x))
        let contract = getPQVContract()

        const receipt = await contract.methods.createBallot(_subject, _proposals, timeLimit)
                            .send({ from: account, gas: "500000" })
        return receipt
    } else {
        throw new Error("Unable to access klaytn")
    }
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

            result.id = i
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

export const getBallot = async (id) => {
    if(window.klaytn) {
        let contract = getPQVContract();
        let result = await contract.methods.getBallotOf(id).call()
        let proposals = await contract.methods.proposalsOf(id).call()
        let endTimestamp = Number(result.currentTime_) + Number(result.timeLimit_)

        result.id = id
        result.name_ = Caver.utils.toUtf8(result.name_)
        result.currentTime_ = moment.unix(result.currentTime_).format("YYYY-MM-DD HH:mm:ss")
        result.endTime_ = moment.unix(endTimestamp).format("YYYY-MM-DD HH:mm:ss")
        result.proposals = proposals.map(x => Caver.utils.toUtf8(x))

        return result
    } else {
        throw new Error("unable to access klaytn")
    }   
}

export const getWeightAt = async (ballotId, address) => {
    if(window.klaytn) {
        let contract = getPQVContract();
        let result = await contract.methods.voterAt(ballotId).call({ from: address })
        return result
    } else {
        throw new Error("unable to access klaytn")
    }
}

export const joinAt = async (ballotId, amount, address) => {
    if(window.klaytn) {
        let contract = getPQVContract()
        const receipt = await contract.methods.joinAt(ballotId, amount)
                            .send({ from: address, gas: "100000" })
        return receipt
    } else {
        throw new Error("unable to access klaytn")
    }
}

export const voteAt = async (ballotId, proposals, votes, address) => {
    if(window.klaytn) {
        let contract = getPQVContract()
        const receipt = await contract.methods.voteAt(ballotId, proposals, votes)
                            .send({ from: address, gas: "500000" })
        return receipt
    } else {
        throw new Error("unable to access klaytn")       
    }
}

export const tallyUp = async (ballotId, address) => {
    if(window.klaytn) {
        let contract = getPQVContract()
        const receipt = await contract.methods.tallyUp(ballotId).send({ from: address, gas: "500000" })
        return receipt
    } else {
        throw new Error("unable to access klaytn")
    }   
}