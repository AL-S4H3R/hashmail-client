import { Button, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { ethers, utils, providers } from 'ethers'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { abi, address as deployedContract } from '../contract'
import Auth from '../components/Auth'

const AuthPage: NextPage = () => {
    
    const { account, active, activateBrowserWallet }  = useEthers()    
    const [ registrationStatus, setRegistrationStatus ] = useState(false)

    return(
        <Stack h='100vh'>
            <HStack px={{ base: 4, md: 8 }} py={8} align={'center'} justify={'space-between'}>
				<Heading fontFamily={'Mulish'}>hashM@il</Heading>
                {
                    active ? 
                    <Button>Disconnect</Button> :
                    <Button onClick={() => activateBrowserWallet()}>Login with Web3</Button>
                }
			</HStack>
            {
                active && <Auth />
            }
        </Stack>
    )
}

export default AuthPage