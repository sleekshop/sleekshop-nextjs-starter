import { setCookies, getCookie } from 'cookies-next';
import axios from "axios";
import qs from "qs";

export default function setUserData(req, res) {
  const { firstname, lastname, street, number, zip, city } = req.body;
  const session = getCookie('session', { req, res });

  return axios.post(process.env.SERVER, qs.stringify({
    licence_username: process.env.LICENCE_USERNAME,
    licence_password: process.env.LICENCE_PASSWORD,
    request: 'set_user_data',
    session: session,
    attributes: JSON.stringify({
      "firstname": firstname,
      "lastname": lastname,
      "street": street,
      "number": number,
      "zip": zip,
      "city": city,
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
