import AppLayout from '@/components/AppLayout'
import { useRouter } from 'next/router'

const Tamiko = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <AppLayout>
      <p>Tamiko: {id}</p>
    </AppLayout>
  )
}

export default Tamiko
