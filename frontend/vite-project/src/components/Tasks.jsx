import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
const Tasks = () => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [minute, setMinute] = useState("");
    const [hour, setHour] = useState("");
    const [dayOfMonth, setDayOfMonth] = useState("");
    const [month, setMonth] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const handleCreate = async () => {
        const cronMinute = minute || '*';
        const cronHour = hour || '*';
        const cronDayOfMonth = dayOfMonth || '*';
        const cronMonth = month || '*';
        const cronDayOfWeek = dayOfWeek || '*';

        const cronSchedule = `${cronMinute} ${cronHour} ${cronDayOfMonth} ${cronMonth} ${cronDayOfWeek}`;
        console.log(cronSchedule);

        try {
            await axios.post('http://localhost:8080/send-email', { email, subject, message, cronSchedule });
            console.log("Email scheduling request sent successfully");
            setEmail("");
            setSubject("");
            setMessage("");
            setMinute("");
            setHour("");
            setDayOfMonth("");
            setMonth("");
            setDayOfWeek("");
            onClose();
        } catch (error) {
            console.error("Error scheduling email:", error);
        }
    };

    return (
        <Flex justifyContent={'center'}>
            <Button onClick={onOpen}>Create</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a new mail</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Recipient mail</FormLabel>
                            <Input ref={initialRef} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Recipient mail' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Subject</FormLabel>
                            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder='Subject' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Message</FormLabel>
                            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Message' />
                        </FormControl>

                        <Flex>
                            <FormControl mt={4}>
                                <FormLabel>Minute</FormLabel>
                                <Input value={minute} onChange={(e) => setMinute(e.target.value)} placeholder='Minute' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Hour</FormLabel>
                                <Input value={hour} onChange={(e) => setHour(e.target.value)} placeholder='Hour' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Day of Month</FormLabel>
                                <Input value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} placeholder='Day of Month' />
                            </FormControl>
                        </Flex>

                        <Flex>
                            <FormControl mt={4}>
                                <FormLabel>Month</FormLabel>
                                <Input value={month} onChange={(e) => setMonth(e.target.value)} placeholder='Month' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Day of Week</FormLabel>
                                <Input value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} placeholder='Day of Week' />
                            </FormControl>
                        </Flex>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreate}>
                            Create
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default Tasks;