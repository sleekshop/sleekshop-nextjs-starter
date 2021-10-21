import numberFormat from "../utils/number-format"

export default function CartProducts({cartItems}) {
  return (
    <div className="w-full mb-8 flex-shrink-0 order-1 lg:w-1/2 lg:mb-0 lg:order-2">
      <div className="flex justify-center lg:justify-end">
        <div className="border rounded-md max-w-md w-full px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-700 font-medium">Bestellübersicht ({cartItems && cartItems.contents.length})</h3>
          </div>
          {cartItems && cartItems.contents.map(item => {
            return (
              <div key={item.id} className="flex justify-between mt-6">
                <div className="flex">
                  {/* <img className="h-20 w-20 object-cover rounded" src={(item && item.attributes && item.attributes.img1) && item.attributes.img1.value} alt="" /> */}
                  <div className="">
                    <h3 className="text-sm text-gray-600">{item.quantity}x {item.name}</h3>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{numberFormat(item.price)}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}