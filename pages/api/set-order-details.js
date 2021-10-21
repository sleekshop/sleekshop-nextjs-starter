import { setCookies, getCookie } from 'cookies-next';
import axios from "axios";
import qs from "qs";

export default function getProduct(req, res) {
  const { id, quantity, attributes } = req.body;
  const session = getCookie('session', { req, res });

  return axios.post(process.env.SERVER, qs.stringify({
    licence_username: process.env.LICENCE_USERNAME,
    licence_password: process.env.LICENCE_PASSWORD,
    request: 'set_order_details',
    session: session,
    delivery_companyname: "sleekcommerce",
    delivery_firstname: "test123",
    delivery_lastname: "test456",
    email: "hello@reich-michael.com",
    phone: "name"
  }))
    .then((response) => {
      return res.status(200).json({...response.data})
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).json({error})
    })
  
}
