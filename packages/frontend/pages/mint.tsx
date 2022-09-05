import Head from 'next/head';
import { Main } from '@/components/Main';
import { Box, Text } from '@chakra-ui/react';
import { useAccount, useEnsName, useSigner } from "wagmi";
import { useEffect, useState } from 'react';
import { trimAddress } from '@/utils/address';
import Connected from '@/components/svg/Connected';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import EggPicker from '@/components/EggPicker';
import { useRouter } from 'next/router'
import { useContract } from '@/hooks/useContract';
import EggLoader from '@/components/svg/EggLoader';
import toast from 'react-hot-toast';
import { useElementTheme } from '@/hooks';
import { useRandomElement } from '@/hooks/useElementTheme';
import { toastError } from '@/utils/error';

interface Step {
  copy: Array<string>,
  button: string | null,
  buttonFn: string,
  buttonDisabled?: boolean
}

interface FnMap {
  mint: () => void,
  increment: () => void,
  hatch: () => void
}

type FnMapKeys = keyof FnMap;

const steps: Step[] = [
  {
    copy: [
      'Say hello to Tamiko!',
      'Tamiko is a non-fungible friend that lives completely on - chain.'
    ],
    button: 'Next',
    buttonFn: 'increment'
  },
  {
    copy: ['Tamiko recently laid some eggs and is looking for new parents to take care of them.', 'Do you want one?'],
    button: 'Yes please',
    buttonFn: 'increment'
  },
  {
    copy: ['Choose your Tamiko Egg.', 'You can have it for free, just take good care of it.'],
    button: 'Mint',
    buttonDisabled: true,
    buttonFn: 'null'
  },
  {
    copy: ['Choose your Tamiko Egg.', 'You can have it for free, just take good care of it.'],
    button: 'Mint',
    buttonFn: 'mint',
  },
  {
    copy: ['Confirm in your wallet'],
    button: null,
    buttonFn: 'null',
  },
  {
    copy: ['Minting your tamkio egg. This can take a couple of minutes...'],
    button: null,
    buttonFn: 'null'
  },
  {
    copy: ['Congratulations!'],
    button: 'Hatch your Tamiko',
    buttonFn: 'hatch'
  }
]

export default function Mint() {
  const [color] = useElementTheme()
  const router = useRouter()
  const [step, setStep] = useState<number>(0)
  const [mintedId, setMintedId] = useState<number>(0)
  const { address } = useAccount()
  const setRandomColor = useRandomElement()
  const trimedAddress = address ? trimAddress(address) : ''
  const { data: ensName } = useEnsName({
    address,
  })
  const { data: signer } = useSigner()
  const tamikoContract = useContract('Tamiko', signer)

  const introP = `Hey ${ensName || trimedAddress}`
  const successP = `You’re now the proud parent of tamiko ${mintedId}.`

  const increment = () => {
    setStep(step + 1)
  }

  const mint = async () => {
    setStep(4)

    try {
      const tx = await tamikoContract.mint()
      setStep(5)
      const receipt = await tx.wait()
      const event = receipt.events.find((e: { event: string }) => e.event === 'Mint')
      const tokenId = event.args._tokenId.toNumber()

      setStep(6)
      setMintedId(tokenId)

      const token = await tamikoContract.tokenURI(tokenId)
    } catch (e: any) {
      setStep(3)
      toastError(e)
    }
  }

  const hatch = () => {
    router.push(`/app/tamiko/${mintedId}`)
  }

  const fnMap: FnMap = {
    increment,
    mint,
    hatch
  }

  const handleEggSelect = () => {
    setStep(3)
  }

  useEffect(() => {
    if (color === 'neutral') {
      setRandomColor(['neutral'])
    }
  }, [])

  if (!address) {
    router.push('/')
    return false;
  }

  return (
    <>
      <Head>
        <title>Tamiko - Mint</title>
      </Head>
      <Main>
        <div>
          <Box mb={8}>
            {(step === 0 || step === 1) && (
              <Connected />
            )}
            {(step === 2 || step === 3) && (
              <EggPicker onSelect={handleEggSelect} />
            )}
            {(step === 4 || step === 5 || step === 6) && (
              <EggLoader />
            )}
          </Box>
          {step === 0 && (<Text>{introP}</Text>)}
          {steps[step].copy.map(p => {
            return (
              <Text mb={2} key={p}>{p}</Text>
            )
          })}
          {step === 6 && (
            <Text>{successP}</Text>
          )}
        </div>
      </Main>
      <Footer>
        {steps[step].button && (
          <Button disabled={steps[step].buttonDisabled} onClick={fnMap[steps[step].buttonFn as FnMapKeys]}>{steps[step].button}</Button>
        )}
      </Footer>
    </>
  );
}
