import { useMainContext } from "@/contexts/Provider"

const useSigner = () => {
  const { signer, setSigner } = useMainContext()

  return [signer, setSigner]
}

export default useSigner