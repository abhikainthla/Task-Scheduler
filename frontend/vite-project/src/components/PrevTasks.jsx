import { Box, Flex, Table, TableContainer, Tbody, Td, Text, Thead, Tr, Spinner, Alert, AlertIcon, Th, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineCancelScheduleSend } from "react-icons/md";

const PrevTasks = () => {
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const toast = useToast(); // Chakra UI toast for notifications

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/get-emails'); 
        setTasks(response.data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchTasks(); 
  }, []);

  const handleCancelSchedule = async (email) => {
    try {
      const response = await axios.post('http://localhost:8080/cancel-email', { email });
      // Filter out the canceled task from the state
      setTasks(prevTasks => prevTasks.filter(task => task.email !== email));
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "An error occurred while canceling the schedule.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex>
      <Box bg="blue.100" p={4} rounded="lg" w={'90vw'} h={'100vh'}>
        <Text fontSize="lg" color="gray.600">Tasks Being Executed</Text>
        
        {loading ? ( 
          <Spinner size="xl" />
        ) : error ? ( 
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : (
          <TableContainer bg={'gray.100'} p={4} rounded="lg">
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th>Recipient</Th>
                  <Th>Subject</Th>
                  <Th isNumeric>Time</Th>
                  <Th isNumeric>Total Sent</Th> 
                  <Th>Last Sent</Th> 
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody color="gray.600">
                {tasks.map((task, index) => (
                  <Tr key={index}>
                    <Td>{task.email}</Td>
                    <Td>{task.subject}</Td>
                    <Td isNumeric>{new Date(task.timestamp).toLocaleString()}</Td>
                    <Td isNumeric>{task.frequency?.totalSent || 0}</Td> 
                    <Td>{task.frequency?.lastSent ? new Date(task.frequency.lastSent).toLocaleString() : 'N/A'}</Td>
                    <Td>
                      <MdOutlineCancelScheduleSend 
                        size={25} 
                        onClick={() => handleCancelSchedule(task.email)} 
                        style={{ cursor: 'pointer' }}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Flex>
  );
}

export default PrevTasks;
