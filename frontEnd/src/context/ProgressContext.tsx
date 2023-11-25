import { createContext, useContext } from 'react'
type MyObject = {
  id: string
  num?: number
}
type prog = {
  percentage: MyObject[]
  setPercentage: React.Dispatch<React.SetStateAction<MyObject[]>>
  indexRef:React.MutableRefObject<number>
}

const initialValue = {
  percentage: [],
  setPercentage: () => {},
  indexRef:{current:-1}
}

const progress = createContext<prog>(initialValue)

export const useProgressContext = () => useContext(progress)

export default progress
