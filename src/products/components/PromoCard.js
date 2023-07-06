import Link from "next/link";

export default function PromoCard() {

  return (
    <section>
      <div className="">
        <div className="">
          <h4>Instant Access</h4>
          <p style={{fontSize: "1rem"}}>Access this product plus dozen of others when you subscribe</p>
        </div>
      </div>
      <Link href="/pricing"  className="primary button">
        Purchase
      </Link>
    </section>
  )
}
