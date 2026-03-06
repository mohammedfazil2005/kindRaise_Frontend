import { motion } from 'framer-motion';
import { Heart, Share2, Star } from 'lucide-react';
import React, { useState } from 'react'
import ExploreCatgories from './ExploreCatgories';
import ExploreCard from './ExploreCard';

// const categories = [
//   "All Categories",
//   "Environment",
//   "Education",
//   "Health",
//   "Animal Welfare",
//   "Human Rights",
// ];



const ExploreContent = () => {
  
  return (
      <section className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8">
       <ExploreCatgories/>
       <ExploreCard/>
      </div>
    </section>
  )
}

export default ExploreContent
