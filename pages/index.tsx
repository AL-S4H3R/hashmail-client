import type { NextPage } from 'next'
import { useContractFunction, useEthers } from '@usedapp/core'
import { Center, Stack, Heading, Text, HStack, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Checkbox } from '@chakra-ui/checkbox'
import { useState } from 'react'
import { ethers, providers, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { abi, address as deployedContract } from '../contract'
import { useGetUser } from '../utils/hooks/useGetUser'

const Home: NextPage = () => {
	
	const { activateBrowserWallet, active, account } = useEthers()
	/* 
		after the wallet is connected, checks whether the user
		exists on chain. If not -> shows create password(sign up flow),
		else -> login with password(login flow) 
	*/
	return(
		<Stack>
			<HStack px={{ base: 4, md: 8 }} py={8}>
				<Heading fontFamily={'Mulish'}>hashM@il</Heading>
			</HStack>
			<VStack fontFamily={'monospace'} align={'center'} justify={'center'}>
				<VStack>
					<Text fontSize={'3xl'}>No Spam. No BS. Pure Mail.</Text>
					{
						!active ?
						<Button fontWeight={'normal'} onClick={() => activateBrowserWallet()} w='full'>
							Login with Web3
						</Button> : 
						(
							/* 
							<VStack w='full'>
								<Input placeholder='Password' w='full' type={showPassword ? 'text' : 'password'}/>
								<Input placeholder='Confirm Password' w='full' type={showPassword ? 'text' : 'password'}/>
								<Stack w='full' alignItems={'center'} >
								<Checkbox w='full' onChange={(e) => setShowPassword(true)}>Show Password</Checkbox>
								<Button w='full' fontWeight={'light'} bgColor={'blackAlpha.900'} colorScheme={'blackAlpha'} color={'gray.50'}>
									Create Account
								</Button>
								</Stack>
							</VStack>
							*/<></>
						)
					}
				</VStack>
			</VStack>
		</Stack>
	)
} 

export default Home