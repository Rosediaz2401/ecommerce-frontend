import { useRouter } from "next/router";
import Image from 'next/image'
import gracias from '../public/gracias.jpg'
import styled from 'styled-components'
const { motion } = require('framer-motion')

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );
  return { props: { order } };
}

export default function Success({ order }) {
  const route = useRouter();
  console.log(order);
  return (
    <Wrapper>
      <Card
      animate={{opacity:1, scale: 1}}
      initial={{opacity:0, scale: 0.75}}
      transition={{duration: 0.75}}
      >
        <h1>¡Gracias por tu compra!</h1>
        <h2>Se ha enviado la confirmación de pedido al correo</h2>
        <h2>{order.customer_details.email}</h2>
        <InfoWrapper>
        <Address>
          <h3>Dirección</h3>
          {Object.entries(order.customer_details.address).map(
            ([key, val]) =>(
                <p key={key}>
                    {key} : {val}
                </p>
            )
          )}
        </Address>
        <OrderInfo>
          <h3>Productos</h3>
          {order.line_items.data.map(item =>(
            <div key={item.id}>
                <p>Producto: {item.description}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: {item.price.unit_amount}</p>
            </div>
          ))}
        </OrderInfo>
        </InfoWrapper>
        <button onClick={() => route.push("/")}>Continuar Comprando</button>
        <Image src={gracias} alt='gracias' />
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    margin: 5rem 15rem;
`;

const Card = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border-radius: 2rem;
    padding:3rem 3rem;

    h2{
        margin-bottom: 1rem 0rem;
    }
    button{
        color: white;
        background: var(--primary);
        font-size: 1.2rem;
        font-weight: 500;
        padding: 1rem 2rem;
        cursor: pointer;
        border-radius: 2rem;
    }
`;

const Address = styled.div`
    font-size:1rem;
    width: 100%;
`;

const OrderInfo = styled.div`
    font-size:1rem;
    width: 100%;
    div{
        padding-bottom: 1rem;
    }
`;

const InfoWrapper = styled.div`
    display: flex;
    margin: 2rem 0rem;
`