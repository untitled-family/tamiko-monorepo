import AppLayout from '@/components/AppLayout'
import TamikoHatch from '@/components/contract/TamikoHatch'
import TamikoImage from '@/components/contract/TamikoImage'
import TamikoInfo from '@/components/contract/TamikoInfo'
import TamikoOwners from '@/components/contract/TamikoOwners'
import TamikoStrength from '@/components/contract/TamikoStrength'
import { useTamikoMetadata } from '@/hooks/useTamikoMetadata'
import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Tamiko = () => {
  const router = useRouter()
  const { id } = router.query
  const intId = parseInt(id as string, 10)
  const { properties, abilities, metadata, refresh } = useTamikoMetadata(intId)

  return (
    <AppLayout>
      <Box w='full'>
        {id && (
          <>
            <TamikoImage tokenId={intId} />
            <Text>Tamiko: {id}</Text>
            <TamikoInfo properties={properties} tokenId={intId} />
            <TamikoOwners metadata={metadata} tokenId={intId} />
            <TamikoStrength abilities={abilities} />
            <TamikoHatch properties={properties} tokenId={intId} onHatch={refresh} />
          </>
        )}
      </Box>
    </AppLayout>
  )
}

export default Tamiko
