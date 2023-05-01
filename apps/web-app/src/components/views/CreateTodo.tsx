import React, { useState } from 'react'
import { Center, VStack, Text, FormControl, FormLabel, Input, FormHelperText, Tag, Button } from '@chakra-ui/react'

import BigCard from '../layout/BigCard'
import useCompose from '../../hooks/useCompose'

type Values = {
  title: string
  description: string
  tags: string
}

const CreateTodo: React.FC = () => {
  const addNewTodo = useCompose((state) => state.addNewTodo)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAdded, setIsAdded] = useState<boolean>(false)
  const [values, setValues] = useState<Values>({
    title: '',
    description: '',
    tags: ''
  })

  const handleChange = (field: keyof Values, event: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [field]: event.target.value })

  const tagsList = values.tags.split(',')

  const handleSubmit = () => {
    setIsLoading(true)
    addNewTodo(values.title, values.description, 'pending', values.tags)
      .then((res) => {
        setIsLoading(false)
        setIsAdded(true)
      })
      .catch((err) => {
        console.error('err', err)
        setIsLoading(false)
      })
  }

  return (
    <Center>
      <BigCard w='80vw' h='80vh'>
        <Center>
          <VStack>
            <Text fontSize='2xl' fontWeight='bold' pb='1rem'>
              Create Todo
            </Text>
          </VStack>
        </Center>
        <Center>
          <VStack w='80%'>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input type='title' value={values.title} onChange={(e) => handleChange('title', e)} />
              <FormHelperText>Please select a title.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input type='description' value={values.description} onChange={(e) => handleChange('description', e)} />
              <FormHelperText>Please select a description.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Tags</FormLabel>
              {tagsList &&
                tagsList.length > 0 &&
                tagsList.map(
                  (tag: string, index: number) =>
                    tag != '' && (
                      <Tag key={index} size='md' variant='solid' colorScheme='blackAlphas' m='1'>
                        {tag}
                      </Tag>
                    )
                )}
              <Input type='tag' onChange={(e) => handleChange('tags', e)} />
              <FormHelperText>Please select a tag.</FormHelperText>
            </FormControl>
            {isAdded && (
              <Text fontSize='2xl' fontWeight='bold' pb='1rem' color='green.500'>
                Todo Added
              </Text>
            )}
            <Button colorScheme='whiteAlpha' isLoading={isLoading} onClick={handleSubmit}>
              Add Todo
            </Button>
          </VStack>
        </Center>
      </BigCard>
    </Center>
  )
}

export default CreateTodo
