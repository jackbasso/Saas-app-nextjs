import Image from "next/image";
import confetti from "../../public/assets/confetti.png";
import Link from "next/link";

export default function SuccessPage() {
  return (
  <div className="section bg-pink h-screen">
    <div className="container">
      <div className="section-intro welcome">
        <Image
          src={confetti}
          width={200}
          height={200}
          alt="confetti"
          className="confetti"
        />
        <h1>You&apos;re in!</h1>
        <p>You can now access everything in this site. <br /> Ready to get started?</p>
        <Link href="/login" className="large-button">
          <div className="large-button-text">Go to login</div>
        </Link>
      </div>
    </div>
  </div>
  )
}
