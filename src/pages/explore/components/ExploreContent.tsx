
import  { useState, type Dispatch, type SetStateAction } from 'react'
import ExploreCatgories from './ExploreCatgories';
import ExploreCard from './ExploreCard';


type ExploreSearch={
  search:string
  page:number
  setPage:Dispatch<SetStateAction<number>>
}

const ExploreContent = ({search,page,setPage}:ExploreSearch) => {

  const [catgeory,setCategory]=useState<string>('')

  return (
      <section className="bg-gray-100 py-8 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8">
       <ExploreCatgories setCategory={setCategory} setPage={setPage}/>
       <ExploreCard category={catgeory} search={search} page={page} setPage={setPage}/>
      </div>
    </section>
  )
}

export default ExploreContent
