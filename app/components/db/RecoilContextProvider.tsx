"use client"

import { RecoilRoot, atom } from "recoil"

export const userState = atom({
  key: "userState",
  default: null,
})

export default function RecoilContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RecoilRoot>{children}</RecoilRoot>
}