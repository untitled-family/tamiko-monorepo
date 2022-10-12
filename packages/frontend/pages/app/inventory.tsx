import Head from "next/head"
import AppLayout from "@/components/AppLayout"
import { GetTamikoItems } from "@/components/contract/GetTamikoItems"

export default function Inventory() {
  return (
    <>
      <Head>
        <title>Tamiko - Inventory</title>
      </Head>
      <AppLayout>
        <GetTamikoItems />
      </AppLayout>
    </>
  )
}
