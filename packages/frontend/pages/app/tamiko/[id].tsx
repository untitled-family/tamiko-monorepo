import AppLayout from '@/components/AppLayout'
import TamikoHatch from '@/components/contract/TamikoHatch'
import TamikoImage from '@/components/contract/TamikoImage'
import TamikoInfo from '@/components/contract/TamikoInfo'
import TamikoOwners from '@/components/contract/TamikoOwners'
import TamikoStrength from '@/components/contract/TamikoStrength'
import { useElementTheme } from '@/hooks'
import { useTamikoMetadata } from '@/hooks/useTamikoMetadata'
import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Tamiko = () => {
  const router = useRouter()
  const { id } = router.query
  const [, setColor] = useElementTheme()
  const intId = parseInt(id as string, 10)
  const { properties, abilities, metadata, refresh } = useTamikoMetadata(intId)
  const hasHatched = parseInt(properties?.hatchStatus as string) >= 2

  useEffect(() => {
    if (!hasHatched) {
      // @ts-ignore
      setColor('neutral')
    } else {
      // @ts-ignore
      setColor('bug')
    }
  }, [hasHatched])

  return (
    <AppLayout>
      <Box w='full'>

        {!isNaN(intId) && (
          <>
            <TamikoImage tokenId={intId} hasHatched={hasHatched} />
            <Text fontSize='lg'>Tamiko: #{id}</Text>
            <TamikoInfo properties={properties} tokenId={intId} />
            <TamikoOwners metadata={metadata} tokenId={intId} />
            {hasHatched && (
              <TamikoStrength abilities={abilities} />
            )}
            {!hasHatched && (
              <TamikoHatch properties={properties} tokenId={intId} onHatch={refresh} />
            )}
          </>
        )}
      </Box>
    </AppLayout>
  )
}

export default Tamiko
