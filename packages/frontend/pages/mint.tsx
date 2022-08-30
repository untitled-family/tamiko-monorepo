import Head from 'next/head';
import { Main } from '@/components/Main';
import { Box, Text } from '@chakra-ui/react';
import { useAccount, useEnsName } from "wagmi";
import { useState } from 'react';
import { trimAddress } from '@/utils/address';
import Connected from '@/components/svg/Connected';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import EggPicker from '@/components/EggPicker';
import { useRouter } from 'next/router'

interface Step {
  copy: Array<string>,
  button: string | null,
  buttonFn: string,
  buttonDisabled?: boolean
}

interface FnMap {
  mint: () => void,
  increment: () => void
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
    copy: ['Congratulations!', 'You’re now the proud parent of tamiko 009.'],
    button: 'Hatch your Tamiko',
    buttonFn: 'null'
  }
]

export default function Mint() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const { address } = useAccount()
  const trimedAddress = address ? trimAddress(address) : ''
  const { data: ensName } = useEnsName({
    address,
  })
  const introP = `Hey ${ensName || trimedAddress}`

  const increment = () => {
    setStep(step + 1)
  }

  const mint = () => {
    console.log('mint')
    setStep(step + 1)
  }

  const fnMap: FnMap = {
    increment,
    mint
  }

  const handleEggSelect = () => {
    setStep(3)
  }

  const handleButton = () => {
    if (steps[step].buttonFn) {
      fnMap[steps[step].buttonFn as FnMapKeys]
    }

  }

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
        <Box mb={8}>
          {step < 2 && (
            <Connected />
          )}
          {step >= 2 && (
            <EggPicker onSelect={handleEggSelect} />
          )}
        </Box>
        {step === 0 && (<Text>{introP}</Text>)}
        {steps[step].copy.map(p => {
          return (
            <Text mb={2} key={p}>{p}</Text>
          )
        })}
      </Main>
      <Footer>
        {steps[step].button && (
          <Button disabled={steps[step].buttonDisabled} onClick={handleButton}>{steps[step].button}</Button>
        )}
      </Footer>
    </>
  );
}
