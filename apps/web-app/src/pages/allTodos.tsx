import React from 'react'

import AllTodos from '../components/views/AllTodos'

const Page: React.FC = () => {
  return <AllTodos />
}

export async function getStaticProps() {
  return { props: { title: 'ComposeDB WebApp Example' } }
}

export default Page
