import { atom } from 'recoil'

export const accountState = atom({
    key: 'accountState', 
    default: null
})

export const activeState = atom({
    key: 'activeState',
    default: false
})

export const contextState = atom({
    key: 'contextState',
    default: null
})

export const ballotState = atom({
    key: 'ballotState',
    default: []
})