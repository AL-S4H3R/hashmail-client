import { 
    Heading, 
    Button, 
    HStack, 
    Input, 
    InputGroup,
    InputLeftAddon, 
    InputLeftElement, 
    Stack, 
    Text, 
    Badge, 
    Icon,
    VStack,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Textarea,
    useDisclosure,
    Avatar,
    Circle
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { BiSearchAlt } from 'react-icons/bi'
import { BsFillCalendar2CheckFill, BsFillCloudArrowUpFill, BsMailbox2 } from 'react-icons/bs'
import { FiSettings, FiMail } from 'react-icons/fi'
import axios from 'axios'
import { useEthers } from '@usedapp/core'
import { useState } from 'react'

const testEmail = "Hi Sir,\nThis is a test email.\nRegards,\nShlok."

const Dashboard: NextPage = () => {

    const { account } = useEthers()
    
    const emails = [
        {
            from: account,
            subject: 'This is IMP'
        },
        {
            from: account,
            subject: 'This is IMP'
        }
    ]

    const { onOpen, isOpen, onClose } = useDisclosure()
    
    const [ toAddress, setToAddress] = useState('')
    const [ subject, setSubject ] = useState('')
    const [ emailBody, setEmailBody ] = useState('')

    const [ loading, setLoading ] = useState(false)

    const sendMail = async () => {
        setLoading(true)
        const res = await axios.post(
            'http://localhost:8080/sendMail',
            {
                to_address: toAddress,
                from_address: account,
                subject: subject,
                email_body: emailBody
            }
        )
        setLoading(false)
        console.log(res.data)
        onClose()
    }    

    return(
        <Stack h='100vh' fontFamily={'monospace'} spacing={0}>
            <HStack 
                p={4} 
                borderBottom={'1px'} 
                align={'center'}
                borderBottomColor={'gray.300'} 
                justify={'space-between'}
                spacing={8}
            >
                <HStack align={'center'} spacing={2} w='20%'>
                    <Icon as={BsMailbox2} fontSize={'4xl'}/>
                    <Heading fontFamily={'Mulish'} fontSize={'2xl'}>hashm@il.io</Heading>
                </HStack>
                <InputGroup>
                    <InputLeftElement ml={8} children={<BiSearchAlt />} />
                    <Input ml={8} placeholder='Search Mail' rounded={'full'} variant={'filled'} w='50%'/>
                </InputGroup>
                <Icon as={BsFillCalendar2CheckFill} fontSize={'xl'}/>
                <Icon as={BsFillCloudArrowUpFill} fontSize={'2xl'}/>
                <Icon as={FiSettings} fontSize={'2xl'}/>
                {/* <Badge fontSize={'lg'} p={2} colorScheme={'green'} rounded={'full'}>ONLINE</Badge> */}
                <Button size={'md'} letterSpacing={'wider'} px={6} rounded={'xl'}>Logout</Button>
            </HStack>
            <Flex w='full' h='full'>
                <Stack w='20%' h='full' borderRight={'1px'} borderColor={'gray.300'} p={4}>
                    <Button leftIcon={<FiMail />} onClick={onOpen}>Create Mail</Button>
                </Stack>
                <Stack w='40%' h='full' spacing={0} borderRight={'1px'} borderColor={'gray.300'}>
                    <Text p={4} borderBottom={'1px'} borderColor={'gray.400'} fontSize={'2xl'}>Your Inbox</Text>
                    {
                        emails.map((email) => {
                            return(
                                <HStack bgColor={'gray.50'} p={4} borderBottom={'1px'} as='button' borderColor={'gray.300'} align={'center'}>
                                    <Circle bgColor={'gray.200'} size={12}>AB</Circle>
                                    <VStack w='full'>
                                        <Text>{account?.substring(0,20)}</Text>
                                        <Text>{testEmail}</Text>
                                    </VStack>
                                </HStack>
                            )
                        })
                    }
                </Stack>
                <Stack p={4} fontFamily={'mono'} spacing={4}>
                    <Heading>Mail Subject</Heading>
                    <Text>From: {account}</Text>
                    <Text>{testEmail}</Text>
                </Stack>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
                <ModalOverlay />
                <ModalContent fontFamily={'monospace'}>
                    <ModalHeader>Create your Hashmail</ModalHeader>
                    <ModalBody>
                        <Stack spacing={4}>
                            <InputGroup>
                                <InputLeftAddon children='To: ' w='20%'/>
                                <Input value={toAddress} onChange={(e) => setToAddress(e.target.value)}/>
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon children='Subject: ' w='20%'/>
                                <Input value={subject} onChange={(e) => setSubject(e.target.value)}/>
                            </InputGroup>
                            <Textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)}/>
                        </Stack>
                    </ModalBody>
                    <ModalFooter alignItems={'center'}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button leftIcon={<FiMail />} color='gray.100' bgColor={'blackAlpha.900'} ml={8} onClick={() => sendMail()} colorScheme={'blackAlpha'}>
                            Send Mail
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack>
    )
}

export default Dashboard