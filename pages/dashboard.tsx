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
    useDisclosure
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { BiSearchAlt } from 'react-icons/bi'
import { BsMailbox2 } from 'react-icons/bs'
import { FiSettings, FiMail } from 'react-icons/fi'
import axios from 'axios'
import { useEthers } from '@usedapp/core'

const Dashboard: NextPage = () => {

    const { account } = useEthers()
    const { onOpen, isOpen, onClose } = useDisclosure()
    
    const sendMail = async () => {
        const res = await axios.post(
            'http://localhost:8080/sendMail',
            {
                to_address: account,
                from_address: account,
                subject: 'This is a test subject',
                email_body: 'This is an email'
            }
        )
        console.log(res.data)
    }    

    return(
        <Stack h='100vh' fontFamily={'Mulish'} spacing={0}>
            <HStack 
                p={4} 
                borderBottom={'1px'} 
                align={'center'}
                borderBottomColor={'gray.300'} 
                justify={'space-between'}
                spacing={8}
            >
                <HStack align={'center'} spacing={2}>
                    <Icon as={BsMailbox2} fontSize={'4xl'}/>
                    <Heading fontFamily={'Mulish'} fontSize={'2xl'}>hashm@il.io</Heading>
                </HStack>
                <InputGroup>
                    <InputLeftElement ml={8} children={<BiSearchAlt />} />
                    <Input ml={8} placeholder='Search Mail' rounded={'full'} variant={'filled'} />
                </InputGroup>
                <Icon as={FiSettings} fontSize={'2xl'}/>
                <Icon as={FiSettings} fontSize={'2xl'}/>
                <Icon as={FiSettings} fontSize={'2xl'}/>
                {/* <Badge fontSize={'lg'} p={2} colorScheme={'green'} rounded={'full'}>ONLINE</Badge> */}
                <Button size={'md'} letterSpacing={'wider'} px={6} rounded={'xl'}>Logout</Button>
            </HStack>
            <Flex w='full' h='full'>
                <Stack w='20%' h='full' borderRight={'1px'} borderColor={'gray.300'} p={4}>
                    <Button leftIcon={<FiMail />} onClick={onOpen}>Create Mail</Button>
                </Stack>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your Hashmail</ModalHeader>
                    <ModalBody>
                        <Stack spacing={4}>
                            <InputGroup>
                                <InputLeftAddon children='To: ' w='20%'/>
                                <Input />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon children='Subject: ' w='20%'/>
                                <Input />
                            </InputGroup>
                            <Textarea />
                        </Stack>
                    </ModalBody>
                    <ModalFooter alignItems={'center'}>
                        <Button>Cancel</Button>
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