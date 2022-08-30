import { ProductStyle } from "../styles/ProductStyle"
import Link from 'next/link'

export default function Product({ product }) {
    const{ title, price, image, slug} = product.attributes
    return(
        <ProductStyle>
            <Link href={`/product/${slug}`}>
            <div>
            <img src={image.data.attributes.formats.small.url} alt='' />
            </div>
            </Link>
        <h2>{title}</h2>
        <h3>$ {price}.00</h3>
        </ProductStyle>
    )
}
