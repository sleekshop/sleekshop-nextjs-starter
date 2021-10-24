import axios from "axios"
import { useEffect, useState } from "react"

import CartProducts from "../components/cart-products"
import Step1 from "../components/checkout/step-1"
import Step2 from "../components/checkout/step-2"
import Step3 from "../components/checkout/step-3"

import {useUser} from "../context/user-context"

export default function Checkout() {
  const {user} = useUser()

  const [payments, setPayments] = useState(null)
  const [cartItems, setCartItems] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [activePayment, setActivePayment] = useState(null)
  const [orderComplete, setOrderComplete] = useState(false)

  useEffect(async () => {
    try {
      const paymentRes = await axios.get('/api/get-payment-methods')
      const cartRes = await axios.get('/api/get-cart')
      await setPayments(paymentRes.data)
      await setCartItems(cartRes.data)
      await setActivePayment(Object.values(paymentRes.data)[1])
    } catch (error) {
      console.error(error)
    }
  }, [])

  const formSubmit = (e) => {
    e.preventDefault()

    if (currentStep == 1) {
      setCurrentStep(currentStep + 1)
    }

    if (currentStep == 2) {
      const {
        email,
        delivery_companyname,
        delivery_firstname,
        delivery_lastname,
        delivery_street,
        delivery_number,
        delivery_zip,
        delivery_city
      } = e.target.elements;

      axios.post('/api/set-order-details')
        .then(res => {
          const id = res.data.order_number
          axios.post('/api/do-payment', {id: id})
            .then(res => {
              setCurrentStep(currentStep + 1)
              if (res.data.object != "error") {
                axios.post('/api/checkout')
                .then(res => {
                  if (res.data.status == "success") {
                    setOrderComplete(true)
                  }
                  
                })
              }
            })

        })
    }

  }

  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-700 text-2xl font-medium">Kasse</h3>
      <div className="flex flex-col lg:flex-row mt-8">
        <div className="w-full lg:w-1/2 order-2">
          <div className="flex items-center">
            <button className={`flex text-sm ${currentStep == 1 ? 'text-blue-500' : 'text-gray-500'} focus:outline-none`}>
              <span className={`flex items-center justify-center ${currentStep == 1 ? 'text-white bg-blue-500' : 'border-2 border-gray-500'} rounded-full h-5 w-5 mr-2`}>1</span> Lieferung / Adresse
            </button>

            <button className={`flex text-sm ml-8 ${currentStep == 2 ? 'text-blue-500' : 'text-gray-500'} focus:outline-none`}>
              <span className={`flex items-center justify-center ${currentStep == 2 ? 'text-white bg-blue-500' : 'border-2 border-gray-500'} rounded-full h-5 w-5 mr-2`}>2</span> Zahlung
            </button>

            <button className={`flex text-sm ml-8 ${currentStep == 3 ? 'text-blue-500' : 'text-gray-500'} focus:outline-none`}>
              <span className={`flex items-center justify-center ${currentStep == 3 ? 'text-white bg-blue-500' : 'border-2 border-gray-500'} rounded-full h-5 w-5 mr-2`}>3</span> Bestellabschluss
            </button>
          </div>
          <form className="mt-8" onSubmit={formSubmit}>
            <div className={currentStep == 1 ? '' : 'hidden'}>
              <Step1 user={user}/>
            </div>

            <div className={currentStep == 2 ? '' : 'hidden'}>
              <Step2 payments={payments} activePayment={activePayment} setActivePayment={setActivePayment}/>
            </div>

            <div className={currentStep == 3 ? '' : 'hidden'}>
              <Step3 orderComplete={orderComplete} />
            </div>

            <div className="flex items-center justify-between mt-8">
              {currentStep != 1 ? <button onClick={() => setCurrentStep(currentStep - 1)} className="flex items-center text-gray-700 text-sm font-medium rounded hover:underline focus:outline-none">
                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                <span className="mx-2">Zurück</span>
              </button> : <div></div>}

              <button type="submit" className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                <span>Weiter</span>
                <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
            </div>
          </form>
        </div>
        <CartProducts cartItems={cartItems} />
      </div>
    </div>
  )
}