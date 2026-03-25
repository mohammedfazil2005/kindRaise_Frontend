
import { useState } from 'react'
import HeaderExplore from './components/HeaderExplore'

import UserExploreCard from './components/UserExploreCard'
import UserExploreCategories from './components/UserExploreCategories'
import { Outlet, useLocation } from 'react-router-dom'

const UserExploreMain = () => {
  const [page,setPage]=useState(0)
   const location = useLocation();
   const isViewCampaign = location.pathname.includes("viewcampaign")
  return (
    <>
    {isViewCampaign?(<Outlet/>):
    <div>
      <HeaderExplore setPage={setPage}/>
      <div className="grid grid-cols-12 gap-8">
        <UserExploreCategories setPage={setPage}/>
        <UserExploreCard page={page} setPage={setPage}/>
      </div>
    </div>
}
    </>
  )
}

export default UserExploreMain
