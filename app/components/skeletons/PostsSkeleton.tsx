import React from 'react'

function PostsSkeleton() {
  return (
    <div className="">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 bg-base-200 rounded-xl mt-4">
            <div className="flex items-center space-x-4">
                <div className="skeleton h-12 w-12 rounded-full"></div>
                <div className="flex-1">
                <div className="skeleton h-3 w-20"></div>
                <div className="skeleton h-3 w-10 mt-1"></div>
                </div>
            </div>
            <div className="skeleton h-52 mt-4"></div>
            </div>
        ))}
    </div>
  )
}

export default PostsSkeleton