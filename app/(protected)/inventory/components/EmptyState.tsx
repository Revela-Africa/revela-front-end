import Link from 'next/link'
import React from 'react'

const EmptyState = () => {
  return (
           <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[#FFF7E4] flex items-center justify-center">
            <span className="text-3xl">🚗</span>
          </div>
          <div>
            <p className="font-bold text-foreground">No vehicles yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Submit your first vehicle to get started
            </p>
          </div>
          <Link
            href="/intake"
            className="bg-[#E8A020] text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Enroll New Vehicle
          </Link>
        </div>
  )
}

export default EmptyState
