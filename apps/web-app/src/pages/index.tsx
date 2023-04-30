import React from 'react'

import Welcome from '../components/views/Welcome'

const Page: React.FC = () => {
  return <Welcome />
}

export async function getStaticProps() {
  return { props: { title: 'ComposeDB WebApp Example' } }
}

export default Page
