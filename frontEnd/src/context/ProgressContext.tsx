import { createContext, useContext } from 'react'

type prog = {
 progressPercentage: React.MutableRefObject<never[]>
}

const progress = createContext<prog>({ progressPercentage: { current: [] } });

export const useProgressContext = () => useContext(progress);

export default progress;

