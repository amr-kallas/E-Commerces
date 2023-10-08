import { RouterProvider } from "react-router-dom"
import routes from "./routes"
import Wrapper from './wrapper'
function App() {

  return (
    <Wrapper>
      <RouterProvider router={routes} />
    </Wrapper>
  )
}

export default App
