import { setCookies, getCookie } from 'cookies-next';
import axios from "axios";
import qs from "qs";

export default function getProducts(req, res) {
  const session = getCookie('session', { req, res });
  
  return axios.post(process.env.SERVER, qs.stringify({
    licence_username: process.env.LICENCE_USERNAME,
    licence_password: process.env.LICENCE_PASSWORD,
    request: 'get_user_data',
    session: session
  }))
    .then((response) => {
      return res.status(200).json({...response.data})
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).json({expired: true, message: apiText.sessionExpired})
    })
  
}
