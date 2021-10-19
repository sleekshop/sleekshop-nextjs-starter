import { useEffect, useState } from "react"
import Link from 'next/link'

const colors = {
  "orange": "bg-yellow-500",
  "himmelblau": "bg-blue-200",
  "blau": "bg-blue-600",
  "pink": "bg-pink-400",
  "schwarz": "bg-gray-700"

}

export default function ColorVariants({product}) {
  const [variants, setVariants] = useState([])

  useEffect(() => {
    if (product) {
      let array = [{
        ...product.attributes.color,
        permalink: product.seo.permalink
      }];

      Object.keys(product.variations).map(item => {
        array.push({
          ...product.variations[item].attributes.color,
          permalink: product.variations[item].seo.permalink
        })
      })

      setVariants(array)
    }
  }, [])

  if (variants.length) {
    return (
      <div>
        <label className="text-gray-700 text-sm" htmlFor="count">Farbe:</label>
        <div className="flex items-center mt-1">
          {variants.map((variant) => {
            return (
              <Link key={variant.id} href={`/products/${variant.permalink}`}>
                
                <button 
                  className={`h-5 w-5 rounded-full border-2 border-grey-200 mr-2 focus:outline-none ${variant.value == product.attributes.color.value && 'border-black'} ${colors[variant.value]}`}
                >
                </button>
              </Link>
            )
          })}
        </div>
      </div>
    )
  } else {
    return <div></div>
  }


}