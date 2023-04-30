import React from 'react'
import { Center, VStack, Text, Table, TableCaption, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react'

import BigCard from '../layout/BigCard'

const Legend: React.FC = () => (
  <>
    <Th>Task</Th>
    <Th>Description</Th>
    <Th>Tags</Th>
    <Th>Action</Th>
  </>
)

const AllTodos: React.FC = () => {
  return (
    <Center>
      <BigCard w='80vw' h='80vh'>
        <Center>
          <VStack>
            <Text fontSize='2xl' fontWeight='bold' pb='1rem'>
              All Todos
            </Text>
          </VStack>
        </Center>
        <Center>
          <VStack w='80%'>
            <Table variant='striped' w='80%' colorScheme='whiteAlpha'>
              <Thead>
                <Legend />
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Task</Td>
                  <Td>Description</Td>
                  <Td>Tags</Td>
                  <Td>Action</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Legend />
              </Tfoot>
              <TableCaption>List of all Todos</TableCaption>
            </Table>
          </VStack>
        </Center>
      </BigCard>
    </Center>
  )
}

export default AllTodos
