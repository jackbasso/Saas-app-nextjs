import PromoCard from "src/products/components/PromoCard";
import { supabase } from "supabase";
import Image from "next/image";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import SubscriberCard from "src/products/components/SubscriberCard";

export default function ProductPage({ product }) {
  const [productContent, setProductContent] = useState(null);
  const session = useSession();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    async function getProductContent() {
      const { data: productContent } = await supabaseClient.from('product_content')
      .select('*').eq('id', product.product_content_id).single();
      setProductContent(productContent)
    };

    getProductContent()
  }, [supabaseClient])
  
  return (
    <section className="product-section">
      <article className="product">
        <div className="product-wrap">
          {productContent?.download_url && (
            <a href={`/assets/${productContent.download_url}`} download className="download-link large-button">
              <span className="large-button-text">Download</span>
            </a>
          )}
          { productContent?.video_url ? (
            <ReactPlayer control url={productContent.video_url} />
          ) : (
            <Image 
            width={1000}
            height={1000}
            src={`/assets/${product.slug}.png`}
            alt={product.name}
          />
          )}
          
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
          { session ? <SubscriberCard /> : <PromoCard /> }
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
