import { RouterProvider } from "react-router-dom"
import routes from "./routes"
import Wrapper from './wrapper'
import { Suspense } from "react"
import TopBarSlider from "./components/feedback/TopBarSlider"
function App() {

  return (
    <Wrapper>
      <Suspense fallback={<TopBarSlider/>}>
      <RouterProvider router={routes} />
      </Suspense>
    </Wrapper>
  )
}

export default App
