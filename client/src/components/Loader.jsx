import React from 'react'

// Loader component (you can style this to fit your design)
const Loader = () => (
  <div className="flex justify-center items-center h-full w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 dark:border-blue-300 border-solid"></div>
  </div>
);

export default Loader
