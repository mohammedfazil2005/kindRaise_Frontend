
import Hero from './components/Hero'
import ExploreContent from './components/ExploreContent'
import { useState } from 'react'

function Explore() {
    const [search,setSearch]=useState<string>('')
    const [page,setPage]=useState(0)
  return (
    <div>
      <Hero setSearch={setSearch} setPage={setPage}/>
      <ExploreContent search={search} page={page} setPage={setPage}/>
    </div>
  )
}

export default Explore
