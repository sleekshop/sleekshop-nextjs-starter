import { setCookies, getCookie } from 'cookies-next';
import axios from "axios";
import qs from "qs";

import {apiText} from '../../lang/de';

export default function getProducts(req, res) {
  const session = getCookie('session', { req, res });
  
  return axios.post(process.env.SERVER, qs.stringify({
    licence_username: process.env.LICENCE_USERNAME,
    licence_password: process.env.LICENCE_PASSWORD,
    request: 'get_products_in_category',
    id_category=1,
    language="de_DE",
    country="DE",
    order_column="price",
    order="DESC",
    left_limit=0,
    right_limit=1,
    needed_attributes='["name","price"]'
  }))
    .then((response) => {
      
      return res.status(200).json(...response.data)
    })
    .catch((error) => {
      return res.status(403).json({expired: true, message: apiText.sessionExpired})
    })
  
}
