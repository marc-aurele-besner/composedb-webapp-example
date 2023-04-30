import React from 'react'

import CreateTodo from '../components/views/CreateTodo'

const Page: React.FC = () => {
  return <CreateTodo />
}

export async function getStaticProps() {
  return { props: { title: 'ComposeDB WebApp Example' } }
}

export default Page
