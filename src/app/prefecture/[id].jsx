import { useRouter } from 'next/router'
import React from 'react'

const Prefecture = () => {
  const router = useRouter();
  const { id } = router.query.id;
  return (
    <div>{id}</div>
  )
}

export default Prefecture