import PromoCard from "src/products/components/PromoCard";
import { supabase } from "supabase";
import Image from "next/image";

export default function ProductPage({ product }) {
  console.log(product)
  return (
    <section className="product-section">
      <article className="product">
        <div className="product-wrap">
          <Image 
            width={1000}
            height={1000}
            src={`/assets/${product.slug}.png`}
            alt={product.name}
          />
        </div>
        <section>
          <header>
            <h3>{product.name}</h3>
          </header>
          <section>
            <div className="">
              <p>{product.description}</p>
            </div>
          </section>
        </section>
        <section>
          <PromoCard />
        </section>
      </article>
    </section>  
  )
}

export async function getStaticPaths() {
  const {data: products} = await supabase.from("product").select("slug")

  const paths = products.map(product => ({
    params: {
      slug: product.slug
    }
  }))
  console.log(paths)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const slug = context.params.slug

  let { data: product, error } = await supabase
  .from('product')
  .select("*")
  .eq('slug', slug)
  .single() // method to return data as a single object instead as an array

  return {
    props: { 
      product
    }
  }
}
