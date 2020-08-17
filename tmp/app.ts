import { FC } from 'react'
import { AppProps } from 'next/app'
import I18nProvider from 'next-translate/I18nProvider'
import { SWRConfig } from 'swr'
import { DefaultLayout } from 'components'
import { GlobalContextProvider } from 'libs'
import '../styles/global.scss'

type WebVitalsMetric = {
  id: string
  name: string
  startTime: number
  value: number
  label: 'web-vital' | 'custom'
}

export const reportWebVitals = (metric: WebVitalsMetric): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log('metric: ', metric)
  }
}

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <SWRConfig
    value={{
      shouldRetryOnError: false,
      onError: (e) => { /* sentry? */ console.error(e) }
    }}
  >
    <GlobalContextProvider>
      <I18nProvider lang={pageProps.lang} namespaces={pageProps.namespaces}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </I18nProvider>
    </GlobalContextProvider>
  </SWRConfig>
)

export default App

