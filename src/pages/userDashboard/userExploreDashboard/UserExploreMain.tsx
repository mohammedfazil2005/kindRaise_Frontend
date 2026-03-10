import React from 'react'
import HeaderExplore from './components/HeaderExplore'

import UserExploreCard from './components/UserExploreCard'
import UserExploreCategories from './components/UserExploreCategories'

const UserExploreMain = () => {
  return (
    <div>
      <HeaderExplore/>
      <div className="grid grid-cols-12 gap-8">
      <UserExploreCategories />
      <UserExploreCard />
      </div>
  </div>
  )
}

export default UserExploreMain
