import axios from 'axios'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {useEffect, useState} from 'react'

import {useUser} from '../context/user-context'

export default function Login() {
  const {user, setUser} = useUser();
  const router = useRouter()
  const { proceedOrder } = router.query

  useEffect(() => {
    if (user.status == "active") {
      router.push('/profile')
    }
  }, [user])

  const loginSubmit = (e) => {
    e.preventDefault()

    const {
      email,
      password
    } = e.target.elements;

    axios.post('/api/login', {
      email: email.value,
      password: password.value
    })
      .then(res => {
        console.log(res);
        if (res.data.status == "SUCCESS") {
          axios.post('/api/get-user-data')
            .then(res => setUser(res.data))
        }
        if (proceedOrder) {
          router.push('/checkout')
        } else {
          router.push('/profile')
        }
        
      })
  }

  const registerSubmit = async (e) => {
    e.preventDefault()

    const {
      email,
      password,
      password2
    } = e.target.elements;

    const res = await axios.post('/api/create-user', {
      email: email.value,
      password: password.value,
      password2: password2.value
    })

    // const msg = await axios.post('https://www.sleekshop.io/send-message', {
    //   email: email.value,
    //   password: password.value,
    // })

    console.log(res);
  } 

  return (
    <div className="container mx-auto px-6">
      <div className="flex">
        <div className="w-6/12 pr-3">
          <h2 className="text-gray-700 text-2xl font-medium">Login</h2>

          <form onSubmit={loginSubmit} className="mt-4">
            <label className="block">
              <input type="email" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="E-Mail" name="email" required/>
            </label>
            <label className="block mt-3">
              <input type="password" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Passwort" name="password" required/>
            </label>

            <button type="submit" className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 mt-3">
              <span>Einloggen</span>
              <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>

            {proceedOrder && <Link href="/checkout"><a className="mt-3 inline-block border-b-2 border-blue-600" href="#">Bestellen als Gast</a></Link>}
          </form>
        </div>
        <div className="w-6/12 pl-3">
          <h2 className="text-gray-700 text-2xl font-medium">Register</h2>

          <form onSubmit={registerSubmit} className="mt-4">
            <label className="block">
              <input type="email" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="E-Mail" name="email" required/>
            </label>
            <label className="block mt-3">
              <input type="password" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Passwort" name="password" required/>
            </label>
            <label className="block mt-3">
              <input type="password" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Passwort wiederholen" name="password2" required/>
            </label>

            <button type="submit" className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 mt-3">
              <span>Registrieren</span>
              <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
