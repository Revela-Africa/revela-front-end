import { StoredUser } from "@/lib/auth/token"


interface Props {
  user: StoredUser | null
}

export function AppHeader({ user }: Props) {
  return (
    <div className="flex items-center justify-between pt-2">
      <div>
        <p className="text-[20px] text-[#D4900A] font-normal tracking-[-0.75px] ">
          Hello,{" "}
          <span className="font-extrabold">
            {user?.fullName?.split(" ")[0] ?? "there"}
          </span>
        </p>
        <p className="text-base font-medium text-[#6A6A6A]">No dumping. Only cashing.</p>
      </div>


    </div>
  )
}