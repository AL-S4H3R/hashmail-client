import { Button, VStack, Input } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { ethers, utils, providers } from 'ethers'
import { FC, useEffect, useState } from 'react'
import { abi, address as deployedContract } from '../contract'

const Auth: FC = () => {

    const [ isRegistered, setIsRegistered ] = useState(false)
    const { account } = useEthers()

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        // @ts-expect-error
        if(typeof window.ethereum !== 'undefined'){
            const abiInterface = new utils.Interface(abi)
            // @ts-ignore
            const provider = new providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(deployedContract, abiInterface, provider)
            const isUser: boolean = await contract.getUser(account)
            console.log(isUser)
            setIsRegistered(isUser)
        }
	}

    const registerOnChain = async (password: string) => {
        // @ts-expect-error
        if(typeof window.ethereum !== 'undefined'){
            const abiInterface = new utils.Interface(abi)
            // @ts-ignore
            const provider = new providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(deployedContract, abiInterface, signer)
            await contract.registerUser()
            const isUser: boolean = await contract.getUser(account)
            if(isUser){
                /*
                    POST request
                    {
                        publicKey: account,
                        password
                    }
                */
            }
        }
    }

    if(!isRegistered){
        return(
            <VStack>
                <Input placeholder='Create Password'/>
                <Button onClick={() => registerOnChain('abc1234')}>Register</Button>
            </VStack>
        )
    }
    return(
        <>Login</>
    )
}

export default Auth