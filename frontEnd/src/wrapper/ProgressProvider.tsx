import { useRef, useState } from 'react'
import progress from '@context/ProgressContext'
type MyObject = {
  num?: number
}
const Progress = ({ children }: { children: React.ReactNode }) => {
  const [percentage, setPercentage] = useState<MyObject[]>([])
  const [ids, setIds] = useState<string[]>([])
  const indexRef = useRef<number>(-1)
  return (
    <progress.Provider
      value={{ ids, setIds, percentage, setPercentage, indexRef }}
    >
      {children}
    </progress.Provider>
  )
}
export default Progress
