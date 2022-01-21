import { setCookies, getCookie } from 'cookies-next';
import axios from "axios";
import qs from "qs";

export default function verifyUser(req, res) {
  const { userId, session } = req.body;

  console.log(userId, session);

  return axios.post(process.env.SERVER, qs.stringify({
    licence_username: process.env.LICENCE_USERNAME,
    licence_password: process.env.LICENCE_PASSWORD,
    request: 'verify_user',
    id_user: userId,
    session_id: session
  }))
    .then((response) => {
      return res.status(200).json({...response.data})
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).json({error})
    })
  
}
