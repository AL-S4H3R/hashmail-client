import { useContractCall, ContractCall, useContractCalls } from '@usedapp/core'
import { abi, address } from '../../contract'
import { utils } from 'ethers'

export const useGetUser = async (account: string | null | undefined) => {
    const abiInterface = new utils.Interface(abi)
    const contractCall: ContractCall = {
        abi: abiInterface,
        address,
        method: 'getUser',
        args: [account] 
    }
    const [ isUser ] = useContractCall(contractCall) ?? []
    return isUser
}