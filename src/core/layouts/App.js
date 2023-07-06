import { useRouter } from "next/router";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";

// Hide Navbar after checkout
const hideNavbarPages = ['/success']

export default function AppLayout({ children }) {
  const router = useRouter()
  const hideNavbar = hideNavbarPages.includes(router.asPath)

  return (
    <>
      <Meta />
      { hideNavbar ? null : <Navbar />}
      {children}
    </>
  )
}
