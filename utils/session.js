import { setCookies } from 'cookies-next';

import { getNewSession } from './sleekshop-requests';

const getSession = () => {
  const test = getNewSession();
  console.log(test);
  setCookies('key', 'value');
}

export default getSession;