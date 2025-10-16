"use client"

import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const params = useParams()
    const slug = params.slug
  return (
    <div>{slug}</div>
  )
}

export default page