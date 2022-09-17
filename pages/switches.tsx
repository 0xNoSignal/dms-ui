import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useContractRead } from 'wagmi'
import abi from '../helpers/ABI'


export default function Switches() {

  const { data, isError, isLoading } = useContractRead({
    addressOrName: '0xbdfbfCBA69B83b74D3CD89421e50C6997654b799',
    contractInterface: abi,
    functionName: 'isAlive',
    chainId: 4, // Rinkeby
  })
  const { address, isConnected } = useAccount()
  

  if (isLoading)
    return (
      <div>
        Loading...
      </div>
    )
  if (isError)
    return (
      <div>
        Failed to load
      </div>
    )
  if (data?.toString() === 'true')
    return (
      <div>
        Switch is Alive
      </div>
    )
  if (data?.toString() !== 'true')
    return (
      <div>
        Switch is Dead
      </div>
    )
  return (<div>
    No data {data} :(
  </div>)
}
