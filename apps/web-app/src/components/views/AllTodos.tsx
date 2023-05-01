import React, { useEffect, useState } from 'react'
import {
  Center,
  VStack,
  Text,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Tag,
  Button
} from '@chakra-ui/react'
import { CheckCircleIcon, TimeIcon } from '@chakra-ui/icons'

import { Todo } from '../../models'
import BigCard from '../layout/BigCard'
import useCompose from '../../hooks/useCompose'

const Legend: React.FC = () => (
  <Tr>
    <Th key='task'>Task</Th>
    <Th key='description'>Description</Th>
    <Th key='tags'>Tags</Th>
    <Th key='action'>Action</Th>
  </Tr>
)

const AllTodos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const did = useCompose((state) => state.did)
  const getAllTodos = useCompose((state) => state.getAllTodos)
  const changeTodoStatus = useCompose((state) => state.changeTodoStatus)

  const loadAllTodos = async () => {
    const queryAllTodos = await getAllTodos()
    if (queryAllTodos != null && queryAllTodos?.viewer) setTodos(queryAllTodos.viewer.todoList.edges)
  }

  const handleChangeStatus = async (id: string, status: string) => {
    changeTodoStatus(id, status)
      .then((res) => {
        loadAllTodos()
      })
      .catch((err) => {
        console.error('err', err)
      })
  }

  useEffect(() => {
    loadAllTodos()
  }, [])

  useEffect(() => {
    loadAllTodos()
  }, [did])

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
          <VStack w='100%'>
            <Table variant='striped' w='100%' colorScheme='whiteAlpha'>
              <Thead>
                <Legend />
              </Thead>
              <Tbody>
                {todos.length > 0 ? (
                  todos.map((todo: Todo, index: number) => {
                    if (todo.node.status === 'hide') return null
                    const tagsList: string[] = []
                    todo.node.tags.split(',').map((tag: string) => tagsList.push(tag))
                    return (
                      <Tr key={index}>
                        <Td key='task'>
                          <Text fontSize='md' fontWeight='bold' pb='1rem'>
                            {todo.node.status === 'pending' && <TimeIcon color='orange.500' />}
                            {todo.node.status === 'finish' && <CheckCircleIcon color='green.500' />}
                            &nbsp;
                            {todo.node.title}
                          </Text>
                        </Td>
                        <Td key='description'>{todo.node.description}</Td>
                        <Td key='tags'>
                          {tagsList &&
                            tagsList.length > 0 &&
                            tagsList.map(
                              (tag: string, index: number) =>
                                tag != '' && (
                                  <Tag key={index} size='sm' variant='solid' colorScheme='blue' mr='1'>
                                    {tag}
                                  </Tag>
                                )
                            )}
                        </Td>
                        <Td key='action'>
                          {todo.node.status === 'pending' && (
                            <Button
                              size='xs'
                              colorScheme='green'
                              mr='1'
                              onClick={async () => handleChangeStatus(todo.node.id, 'finish')}>
                              Finished
                            </Button>
                          )}
                          <Button
                            size='xs'
                            colorScheme='red'
                            onClick={async () => handleChangeStatus(todo.node.id, 'hide')}>
                            Hide
                          </Button>
                        </Td>
                      </Tr>
                    )
                  })
                ) : (
                  <Tr>
                    <Td colSpan={4}>No Todos</Td>
                  </Tr>
                )}
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
