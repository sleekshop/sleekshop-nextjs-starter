import { setCookies, getCookie } from 'cookies-next';
import axios from "axios";
import qs from "qs";

export default function getProduct(req, res) {
  const {
    email,
    delivery_companyname,
    delivery_firstname,
    delivery_lastname,
    delivery_street,
    delivery_number,
    delivery_zip,
    delivery_city,
    id_payment_method
  } = req.body;
  const session = getCookie('session', { req, res });

  console.log(delivery_firstname);

  return axios.post(process.env.SERVER, qs.stringify({
    licence_username: process.env.LICENCE_USERNAME,
    licence_password: process.env.LICENCE_PASSWORD,
    request: 'set_order_details',
    session: session,
    id_payment_method: id_payment_method,
    id_delivery_method: 1,
    email: email,
    delivery_companyname: delivery_companyname,
    delivery_firstname: delivery_firstname,
    delivery_lastname: delivery_lastname,
    delivery_street: delivery_street,
    delivery_number: delivery_number,
    delivery_zip: delivery_zip,
    delivery_city: delivery_city
  }))
    .then((response) => {
      return res.status(200).json({...response.data})
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).json({error})
    })
  
}
