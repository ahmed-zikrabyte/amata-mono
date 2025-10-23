import React, { Suspense } from 'react'
import Profile from '../../components/profile/profile-page'

const ProfilePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile />
    </Suspense>
  )
}

export default ProfilePage