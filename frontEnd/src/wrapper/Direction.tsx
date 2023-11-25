import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import { useTranslation } from 'react-i18next'

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

function Direction({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()

  if (i18n.language == 'ar') {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>
  } else return <>{children}</>
}
export default Direction
