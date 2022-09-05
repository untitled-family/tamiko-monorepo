import AppLayout from '@/components/AppLayout'
import TamikoHatch from '@/components/contract/TamikoHatch'
import TamikoImage from '@/components/contract/TamikoImage'
import TamikoInfo from '@/components/contract/TamikoInfo'
import TamikoStrength from '@/components/contract/TamikoStrength'
import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Tamiko = () => {
  const router = useRouter()
  const { id } = router.query
  const intId = parseInt(id as string, 10)

  return (
    <AppLayout>
      <Box w='full'>
        {id && (
          <>
            <TamikoImage tokenId={intId} />
            <Text>Tamiko: {id}</Text>
            <TamikoInfo tokenId={intId} />
            <TamikoStrength tokenId={intId} />
            <TamikoHatch tokenId={intId} />
          </>
        )}
      </Box>
    </AppLayout>
  )
}

export default Tamiko
