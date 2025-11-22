import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets'

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData)
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h2 className="text-2xl font-bold">Creations</h2>

      <div className="bg-white h-[50vh] w-full rounded-xl overflow-y-scroll">
        <div className="flex flex-wrap">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="relative group inline-block p-3 w-full sm:max-w-1/2 lg:max-w-1/3"
            >
              <img
                src={creation.content}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />

              <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
                <p className="text-sm hidden group-hover:block">
                  {creation.prompt}
                </p>
                <div className="flex gap-1 items-center">
                  <p>{creation.likes.length}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                      creation.likes.includes(user.id)
                        ? 'fill-red-500 text-red-600'
                        : 'text-white'
                    }`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                    4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
                    14.76 3 16.5 3 19.58 3 22 5.42 
                    22 8.5c0 3.78-3.4 6.86-8.55 
                    11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Community
