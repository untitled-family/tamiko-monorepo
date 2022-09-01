import AppLayout from '@/components/AppLayout'
import TamikoImage from '@/components/contract/TamikoImage'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Tamiko = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <AppLayout>
      <Box w='full'>
        <p>Tamiko: {id}</p>
        {id && (
          <TamikoImage tokenId={id} />
        )}
      </Box>
    </AppLayout>
  )
}

export default Tamiko
