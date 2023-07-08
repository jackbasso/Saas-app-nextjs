import Link from "next/link";
import Logo from "./Logo";
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Navbar() {
  // const user = useUser(); // include all the user data
  const session = useSession(); // include all the session data
  const supabaseClient = useSupabaseClient();

  function signOut() {
    supabaseClient.auth.signOut()
  }

  return (
    <div className="nav-container border-b-2 border-black">
      <Link href="/" >
        <Logo />
      </Link>
      {session ? (
        <div className="nav-menu">
          <Link href="/products" className="nav-link white">Products</Link>
          <a className="nav-link border-left white">Billing</a>
          <div className="nav-link black">
            <div onClick={signOut}>Sign out</div>
          </div>
        </div>
      ) : (
        <div className="nav-menu">
        <Link href="/login" className="nav-link white">Login</Link>
        <Link href="/pricing" className="nav-link black">Pricing</Link>
      </div>
      )
      }
    </div>
  )
}
