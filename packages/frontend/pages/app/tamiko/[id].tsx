import AppLayout from '@/components/AppLayout'
import { TamikoStrength, TamikoOwners, TamikoHatch, TamikoInfo, TamikoName } from '@/components/contract'
import { useElementTheme, useTamikoMetadata } from '@/hooks'
import { AspectRatio, Box, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Tamiko = () => {
  const router = useRouter()
  const { id } = router.query
  const [, setColor] = useElementTheme()
  const intId = parseInt(id as string, 10)
  const { properties, abilities, metadata, isLoading, refresh } = useTamikoMetadata(intId)
  const hasHatched = parseInt(properties?.hatchStatus as string) >= 2

  console.log('intId', intId)
  console.log('isLoading', isLoading)

  useEffect(() => {
    if (!hasHatched) {
      setColor('neutral')
    } else {
      setColor('bug')
    }
  }, [hasHatched])

  return (
    <AppLayout>
      <Box w='full' alignSelf='flex-start'>
        {!isNaN(intId) && (
          <>
            <AspectRatio ratio={1}>
              <Image w='full' src={metadata?.image} alt={metadata?.name} />
            </AspectRatio>
          </>
        )}

        <TamikoName
          tokenId={intId}
          isLoading={isLoading}
          w='140px'
          mx='auto'
          my='5px'
          h='20px'
        />

        <TamikoInfo
          properties={properties}
          tokenId={intId}
          isLoading={isLoading}
          w='full'
          my={6}
          h='29px' />

        <TamikoOwners isLoading={isLoading} metadata={metadata} tokenId={intId} />

        {!isNaN(intId) && !isLoading && (
          <>
            {/* <TamikoOwners metadata={metadata} tokenId={intId} /> */}
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
