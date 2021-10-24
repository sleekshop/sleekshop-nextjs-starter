import axios from 'axios'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'

import {useUser} from '../context/user-context'

export default function Profile() {
  const {user, setUser} = useUser();
  const router = useRouter()

  useEffect(() => {
    if (user.status != "active") {
      router.push('/login')
    }
  }, [user])

  const saveUser = (e) => {
    e.preventDefault()

    const {
      firstname,
      lastname,
      street,
      number,
      zip,
      city
    } = e.target.elements

    axios.post('/api/set-user-data', {
      firstname: firstname.value,
      lastname: lastname.valu,
      street: street.value,
      number: number.value,
      zip: zip.value,
      city: city.value
    })
      .then(res => {
        if (res.data.status == "SUCCESS") {
          axios.post('/api/get-user-data')
            .then(res => setUser(res.data))
        }
      })
  }

  const logout = (e) => {
    e.preventDefault()
    axios.post('/api/logout')
      .then(res => {
        router.push('/login')
        setUser({status: 'inacitve'})
      })
  }

  if (user.status == "active") {
    return (
      <div className="container mx-auto px-6">
        <div className="flex">
          <div className="w-4/12">
            <h1 className="text-gray-700 text-2xl font-medium">Hi, {user.attributes.firstname.value}</h1>
            <a href="#" onClick={logout} className="text-gray-600 text-sm">Logout</a>
          </div>
          <div className="w-8/12">
            <form onSubmit={saveUser}>
              <div className="mt-4 flex">
                <label className="block w-6/12">
                  <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Vorname" name="firstname" defaultValue={user.attributes.firstname.value}/>
                </label>
                <label className="block w-6/12 ml-3">
                  <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Nachname" name="lastname" defaultValue={user.attributes.lastname.value}/>
                </label>
              </div>

              <div className="mt-4 flex">
                <label className="block flex-1">
                  <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Straße" name="street" defaultValue={user.attributes.street.value}/>
                </label>
                <label className="block  ml-3 w-3/12">
                  <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Nummer" name="number" defaultValue={user.attributes.number.value}/>
                </label>
              </div>

              <div className="mt-4 flex">
                <label className="block w-3/12">
                  <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="PLZ" name="zip" defaultValue={user.attributes.zip.value}/>
                </label>
                <label className="block flex-1 ml-3">
                  <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Ort" name="city" defaultValue={user.attributes.city.value}/>
                </label>
              </div>

              <button type="submit" className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 mt-3">
                Speichern
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  } else {
    return <div>Nicht eingeloggt</div>
  }


}
