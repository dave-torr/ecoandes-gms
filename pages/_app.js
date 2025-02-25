import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from "@vercel/speed-insights/next"



export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Analytics />
      {/* <SpeedInsights/> */}
    </SessionProvider>
  )
}