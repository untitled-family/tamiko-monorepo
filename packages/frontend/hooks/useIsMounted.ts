import * as React from "react"

/**
 * Know if a component has mounted or not
 * @returns true if it has mounted
 */
export const useIsMounted = (): boolean => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return mounted
}
