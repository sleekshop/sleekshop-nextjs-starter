import { setCookies, getCookie } from 'cookies-next';
import axios from "axios";
import qs from "qs";

export default function doPayment(req, res) {
  const { id } = req.body;
  const session = getCookie('session', { req, res });

  console.log(id);

  return axios.post(process.env.SERVER, qs.stringify({
    licence_username: process.env.LICENCE_USERNAME,
    licence_password: process.env.LICENCE_PASSWORD,
    request: 'do_payment',
    session: session,
    id_order: id
  }))
    .then((response) => {
      console.log(response);
      return res.status(200).json({...response.data})
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).json({error})
    })
  
}
