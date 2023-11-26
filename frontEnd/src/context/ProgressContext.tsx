import { createContext, useContext } from 'react'
type MyObject = {
  num?: number
}
type prog = {
  percentage: MyObject[]
  setPercentage: React.Dispatch<React.SetStateAction<MyObject[]>>
  ids: string[]
  setIds: React.Dispatch<React.SetStateAction<string[]>>
  indexRef: React.MutableRefObject<number>
}

const initialValue = {
  percentage: [],
  setPercentage: () => {},
  ids: [],
  setIds: () => {},
  indexRef: { current: -1 },
}

const progress = createContext<prog>(initialValue)

export const useProgressContext = () => useContext(progress)

export default progress
