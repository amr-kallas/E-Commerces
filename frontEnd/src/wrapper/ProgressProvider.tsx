import { useRef, useState } from 'react'
import progress from '../context/ProgressContext'
type MyObject={
  id:string,
  num?:number
}
const Progress = ({ children }: { children: React.ReactNode }) => {
  const [percentage, setPercentage] = useState<MyObject[]>([]);
  const indexRef=useRef<number>(-1)
  return (
    <progress.Provider value={{ percentage, setPercentage,indexRef }}>
      {children}
    </progress.Provider>
  )
}
export default Progress
