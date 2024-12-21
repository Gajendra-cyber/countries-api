import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError()
    console.log(error)
  return (
    <>
    <div>something went wrong!</div>
   <div> {error.status}</div>
    <div>{error.data}</div>
    </>
  )
}

export default Error