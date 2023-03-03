// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/nprogress.css'
import Router from 'next/router'
import nProgress from 'nprogress'


Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)
export default function App({ Component, pageProps  }: AppProps) {
  
  return <Component {...pageProps} />
}
