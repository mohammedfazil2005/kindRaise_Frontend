
import Hero from './components/Hero'
import ExploreContent from './components/ExploreContent'
import { useState } from 'react'

function Explore() {
    const [search,setSearch]=useState<string>('')
  return (
    <div>
      <Hero setSearch={setSearch}/>
      <ExploreContent search={search} />
    </div>
  )
}

export default Explore
