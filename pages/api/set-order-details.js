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
    id_payment_method: 2,
    id_delivery_method: 1,
    delivery_companyname: "asdfvfg",
    delivery_firstname: "tesasdfasdg",
    delivery_lastname: "test456",
    email: "hello@reich-michael.com",
    phone: "123123"
  }))
    .then((response) => {
      return res.status(200).json({...response.data})
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).json({error})
    })
  
}
