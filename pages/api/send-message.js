import { getCookie } from 'cookies-next';
import axios from "axios";
import qs from "qs";

export default function sendMessage(req, res) {
  const { email, message } = req.body;
  const session = getCookie('session', { req, res });

  console.log(email, message);
  
}
