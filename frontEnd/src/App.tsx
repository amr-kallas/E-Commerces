import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import Wrapper from './wrapper'
import { Suspense } from 'react'
import TopBarSlider from '@components/feedback/TopBarSlider'
import AOS from 'aos'
import 'aos/dist/aos.css'
function App() {
  AOS.init()
  return (
    <Wrapper>
      <Suspense fallback={<TopBarSlider />}>
        <RouterProvider router={routes} />
      </Suspense>
    </Wrapper>
  )
}

export default App
