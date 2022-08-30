import { useQuery } from "urql"
import { GET_PRODUCT_QUERY } from "../../lib/query"
import { useRouter } from 'next/router';
import { 
  DetailsStyle, 
  ProductInfo, 
  Quantity, 
  Buy
 } from "../../styles/ProductDetails";
 import { AiFillPlusCircle,AiFillMinusCircle } from 'react-icons/ai';
 import { useStateContext } from "../../lib/context";
 import toast from 'react-hot-toast'
 import { useEffect } from 'react';

export default function ProductDetails(){
 const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext()
 console.log(qty)

useEffect(() =>{
  setQty(1)
},[]);

  const { query } = useRouter();
  // console.log(query);
  const [results] = useQuery({
    query:GET_PRODUCT_QUERY,
    variables: {slug: query.slug },
  });
  const {data,fetching,error} = results;
  if(fetching) return <p>Loading...</p>
  if(error) return <p>Oh no...{error.message}</p>
  // console.log(data);
  const {title,description,image} = data.products.data[0].attributes;
  
  const notify = () => {
    toast.success(`${title} added to your cart`, {
      duration: 1500,
      // icon:'👏'
    });
  }
  return(
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Cantidad</span>
          <button  onClick={decreaseQty}>
            <AiFillMinusCircle />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty}/>
          </button>
        </Quantity>
        <Buy onClick={() => {
          onAdd(data.products.data[0].attributes, qty);
          notify();
        }}>
          Agregar al carrito
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  )
}