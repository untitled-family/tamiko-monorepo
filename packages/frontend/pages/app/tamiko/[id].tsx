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
  const [color, setColor] = useElementTheme()
  const intId = parseInt(id as string, 10)
  const { properties, abilities, metadata, refresh } = useTamikoMetadata(intId)
  const hasHatched = parseInt(properties?.hatchStatus as string) >= 2

  useEffect(() => {
    if (color !== 'neutral' && !hasHatched) {
      // @ts-ignore
      setColor('neutral')
    }
  }, [])

  return (
    <AppLayout>
      <Box w='full'>
        {id && (
          <>
            <TamikoImage tokenId={intId} />
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
