import { useState } from "react"

export default function Step2({payments, activePayment, setActivePayment}) {

  console.log(payments, activePayment);
  if (activePayment && payments) {
    return (
      <div>
        <div className="mt-8">
          {payments && Object.keys(payments).map(item => {
            if (item != 'object') {
              return (
                <button onClick={() => setActivePayment(payments[item])} className={`flex items-center justify-between w-full bg-white rounded-md border-2 ${activePayment.id == payments[item].id && 'border-blue-500'} p-4 mb-2 focus:outline-none`}>
                  <label className="flex items-center cursor-pointer" htmlFor={payments[item].id}>
                    <input 
                      type="radio" 
                      className="form-radio h-5 w-5 text-blue-600"
                      name={payments[item].id}
                      checked={activePayment.id == payments[item].id}
                      onClick={() => setActivePayment(payments[item])}
                    />
                    <span className="ml-2 text-sm text-gray-700">{payments[item].name}</span>
                  </label>
                </button>
              )
            }

          })}
        </div>
      </div>
    )
  } else {
    return <div></div>
  }

}