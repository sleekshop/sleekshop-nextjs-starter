import { useState } from "react"

export default function Step3({ orderDetails }) {

  console.log(orderDetails);
  if (orderDetails) {
    return (
      <div>
        <h4 className="text-sm text-gray-500 font-medium">Lieferadresse</h4>
        <p>
          {orderDetails.delivery_companyname} <br/>
          {orderDetails.delivery_firstname} {orderDetails.delivery_lastname} <br/>
          {orderDetails.delivery_street} {orderDetails.delivery_number} <br/>
          {orderDetails.delivery_zip} {orderDetails.delivery_city}
        </p>
      </div>
    )
  } else return '';



}