import { setCookies, getCookie } from 'cookies-next';
import axios from "axios";
import qs from "qs";

export default function getProduct(req, res) {
  const { email, password } = req.body;
  const session = getCookie('session', { req, res });

  return axios.post(process.env.SERVER, qs.stringify({
    licence_username: process.env.LICENCE_USERNAME,
    licence_password: process.env.LICENCE_PASSWORD,
    request: 'login_user',
    username: email,
    password: password,
    session: session
  }))
    .then((response) => {
      return res.status(200).json({...response.data})
    })
    .catch((error) => {
      return res.status(403).json({error})
    })
  
}
