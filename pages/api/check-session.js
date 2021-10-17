import { setCookies, getCookie } from 'cookies-next';
import axios from "axios";
import qs from "qs";

import {apiText} from '../../lang/de';

export default function getSession(req, res) {
  const session = getCookie('session', { req, res });

  if (session) {
    return res.status(200).json({expired: false})
  }

  console.log(session);
  return axios.post(process.env.SERVER, qs.stringify({
    licence_username: process.env.LICENCE_USERNAME,
    licence_password: process.env.LICENCE_PASSWORD,
    request: 'get_new_session'
  }))
    .then((response) => {
      setCookies('session', response.data.code, { req, res, expires: response.data.expiration_date });
      return res.status(200).json({expired: false})
    })
    .catch((error) => {
      return res.status(403).json({expired: true, message: apiText.sessionExpired})
    })
  
}
