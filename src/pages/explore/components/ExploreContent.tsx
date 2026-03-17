
import  { useState } from 'react'
import ExploreCatgories from './ExploreCatgories';
import ExploreCard from './ExploreCard';




const ExploreContent = () => {

  const [catgeory,setCategory]=useState<string>('')
  
  return (
      <section className="bg-gray-100 py-8 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8">
       <ExploreCatgories setCategory={setCategory}/>
       <ExploreCard category={catgeory}/>
      </div>
    </section>
  )
}

export default ExploreContent
