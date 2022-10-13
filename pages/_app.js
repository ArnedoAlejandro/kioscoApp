import '../styles/globals.css'
import { SuperProvider } from "../context/SuperProvider"

function MyApp({ Component, pageProps }) {
  return (
    <SuperProvider>
      <Component {...pageProps} />
    </SuperProvider>
  )
}

export default MyApp
