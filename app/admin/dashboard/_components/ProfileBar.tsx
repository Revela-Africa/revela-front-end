import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard'
import React from 'react'

const ProfileBar = ({collapsed}:{collapsed:boolean}) => {

    const {user} =useAuthGuard()
  return (
   <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2">
            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.id}`}
              alt="avatar"
              className="w-8 h-8 rounded-full bg-[#FFF7E4] shrink-0"
            />
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground truncate">
                  {user?.fullName}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Operations Lead
                </p>
              </div>
            )}
          </div>
        </div>
  )
}

export default ProfileBar
