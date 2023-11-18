import { useRef } from "react"
import progress from "../context/ProgressContext"

const Progress = ({ children }: { children: React.ReactNode }) => {
    const progressPercentage=useRef<never[]>([])
    return (
      <progress.Provider value={{ progressPercentage }}>
        {children}
      </progress.Provider>
    )
  }
export default Progress
