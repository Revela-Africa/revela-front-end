"use client"
import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import { Verified } from "lucide-react";

const ProfileCard = () => {
  const { user } = useAuthGuard();
  return (
    <div className="p-3 border-t border-border">
      <div className="flex items-center gap-2">
        <img
          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.id}`}
          alt="avatar"
          className="w-8 h-8 rounded-full bg-[#FFF7E4] shrink-0"
        />

        <div className="min-w-0">
          <p className="text-xs font-bold flex items-center gap-x-2 text-foreground truncate">
            {user?.fullName} <Verified size={15}/>
          </p>
          <p className="text-[10px] text-muted-foreground">Revela verified Inspector</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
