"use client"

import { useQuery } from "@apollo/client/react"
import { AdminGetUserByIdDocument } from "@/graphql/generated/graphql"
import { Mail, Phone, User, AlertCircle, Loader2 } from "lucide-react"

interface Props {
  userId: string
}

export function UserProfile({ userId }: Props) {
  const { data, loading, error } = useQuery(AdminGetUserByIdDocument, {
    variables: { userId },
    skip: !userId,
  })

  const user = data?.adminGetUserById

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-[#E7E1D8] bg-white py-8">
        <Loader2 size={20} className="animate-spin text-[#E8A020]" />
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E7E1D8] bg-white py-8 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF7E4]">
          <AlertCircle size={18} className="text-[#E8A020]" />
        </div>
        <p className="mt-2 text-xs text-[#6A6A6A]">User not found</p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-[#E7E1D8] bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF7E4]">
          <User size={18} className="text-[#E8A020]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#171D17]">
            {user.fullName}
          </p>
          <p className="truncate text-xs text-[#6A6A6A]">{user.email}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {user.phoneNumber ? (
          <a
            href={`tel:${user.phoneNumber}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#F7F2EB] py-2.5 text-xs font-semibold text-[#171D17] transition-colors hover:bg-[#E7E1D8]"
          >
            <Phone size={13} className="text-[#E8A020]" />
            Call
          </a>
        ) : (
          <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-xl bg-[#F7F2EB] py-2.5 text-xs font-semibold text-[#BFC9C3]">
            <Phone size={13} />
            No phone
          </span>
        )}

        <a
          href={`mailto:${user.email}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#F7F2EB] py-2.5 text-xs font-semibold text-[#171D17] transition-colors hover:bg-[#E7E1D8]"
        >
          <Mail size={13} className="text-[#E8A020]" />
          Email
        </a>
      </div>
    </div>
  )
}