import React, { useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  UnorderedList,
  ListItem,
  useDisclosure
} from '@chakra-ui/react'

const Disclaimer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    onOpen()
  }, [onOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Disclaimer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text size='md' mb={2}>
            Welcome to our web app. Please note that this is a example of a Web3 app using ComposeDB
          </Text>
          <UnorderedList>
            <ListItem mb={2}>
              The app may contain bugs, errors, or other issues that could potentially affect your experience or data.
            </ListItem>
            <ListItem mb={2}>
              We make no guarantees or warranties regarding the reliability, accuracy, or completeness of the app&apos;s
              features or content.
            </ListItem>
            <ListItem mb={2}>
              You assume all risks associated with using the app, and we are not responsible for any damages, losses, or
              liabilities that may result from your use of the app.
            </ListItem>
          </UnorderedList>
          <Text size='md'>Thank you for using our app, and please use it at your own risk.</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            I understand
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Disclaimer
