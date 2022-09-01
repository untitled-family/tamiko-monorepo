import { useRouter } from 'next/router'

const Tamiko = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Tamiko: {id}</p>
}

export default Tamiko
