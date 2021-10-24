import { setCookies, getCookie } from 'cookies-next';
import axios from "axios";
import qs from "qs";

export default function getProduct(req, res) {
  const { username, email, password, password2 } = req.body;

  return axios.post(process.env.SERVER, qs.stringify({
    licence_username: process.env.LICENCE_USERNAME,
    licence_password: process.env.LICENCE_PASSWORD,
    request: 'register_user',
    language: "de_DE",
    args: JSON.stringify({
      "username": email,
      "passwd1": password,
      "passwd2": password2,
      "email": email
    })
  }))
    .then((response) => {
      return res.status(200).json({...response.data})
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).json({error})
    })
  
}
