const Big = require('big.js')

export const shortAddress = (address) => {
    let firstName = address.substr(0, 6)
    let len = address.length
    let lastName = address.substr(len-6, len)
    return firstName + "..." + lastName
}

export const formatBalance = (balance) => {
    return Big(balance.toString()).div(Big(10).pow(18)).toFixed(6)
}