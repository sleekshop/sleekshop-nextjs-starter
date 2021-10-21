import { useState } from "react"

export default function Step1() {
  const [userType, setUserType] = useState('privat')
  return (
    <div>
      <div className="mt-8">

        <div className="mb-4 flex">
          <label className="block w-full">
            <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="E-Mail" name="email" required/>
          </label>
        </div>

        <div className="flex mb-4">
          <div>
            <input type="radio" id="privat" name="userType" value="privat" checked={userType == 'privat'} onChange={() => setUserType('privat')}/>
            <label className="ml-1 text-sm text-gray-700" htmlFor="privat">Privat</label>
          </div>
          <div className="ml-4">
            <input type="radio" id="firma" name="userType" value="firma" checked={userType == 'firma'} onChange={() => setUserType('firma')} />
            <label className="ml-1 text-sm text-gray-700" htmlFor="firma">Firma</label>
          </div>
        </div>

        <h4 className="text-sm text-gray-500 font-medium">Lieferadresse</h4>

        {userType == 'firma' && <div className="mt-4 flex">
          <label className="block w-full">
            <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Firmenname" name="delivery_companyname" />
          </label>
        </div>}


        <div className="mt-4 flex">
          <label className="block w-6/12">
            <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Vorname" name="delivery_firstname" required/>
          </label>
          <label className="block w-6/12 ml-3">
            <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Nachname" name="delivery_lastname" required/>
          </label>
        </div>

        <div className="mt-4 flex">
          <label className="block flex-1">
            <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Straße" name="delivery_street" required/>
          </label>
          <label className="block  ml-3 w-3/12">
            <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Nummer" name="delivery_number" required/>
          </label>
        </div>

        <div className="mt-4 flex">
          <label className="block w-3/12">
            <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="PLZ" name="delivery_zip" required/>
          </label>
          <label className="block flex-1 ml-3">
            <input type="text" className="block w-full bg-white rounded-md border p-2 focus:outline-none" placeholder="Ort" name="delivery_city" required/>
          </label>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-sm text-gray-500 font-medium">Lieferung</h4>
        <div className="mt-6">

          <button className="flex items-center justify-between w-full bg-white rounded-md border-2 border-blue-500 p-4 focus:outline-none">
            <label className="flex items-center">
              <input type="radio" className="form-radio h-5 w-5 text-blue-600" checked /><span className="ml-2 text-sm text-gray-700">Standard</span>
            </label>
            <span className="text-gray-600 text-sm">Kostenlos</span>
          </button>

          <button className="mt-3 flex items-center justify-between w-full bg-white rounded-md border p-4 focus:outline-none">
            <label className="flex items-center">
              <input type="radio" className="form-radio h-5 w-5 text-blue-600" /><span className="ml-2 text-sm text-gray-700">Express</span>
            </label>
            <span className="text-gray-600 text-sm">15,00 €</span>
          </button>
        </div>
      </div>
    </div>
  )
}