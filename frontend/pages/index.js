import Head from "next/head"
import ProductsList from "../components/ProductsList"
import TaggedProducts from "../components/TaggedProducts"
import { getTag } from "../utils/api"
import { getProducts } from "../utils/api"
import Hero from "../components/Hero"

const HomePage = ({ data }) => {
  return (
    <div>
      <Head>
        <title>LENSComm a Strapi Next.js E-commerce</title>
      </Head>
      <Hero/>
      <TaggedProducts tags={data.tags}/>
      <ProductsList products={data.products} />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProducts()
  const tags = await getTag('trending')
  const data = {products: products, tags: tags}
  return { props: { data } }
}

export default HomePage


