import { useEffect, useState } from "react"
import Link from 'next/link'

const colors = {
  "orange": "bg-yellow-500",
  "himmelblau": "bg-blue-200",
  "blau": "bg-blue-600",
  "pink": "bg-pink-400",
  "schwarz": "bg-gray-700"
}

export default function SizeVariants({product}) {
  const [variants, setVariants] = useState([])

  useEffect(() => {
    if (product) {
      let array = [{
        ...product.attributes.size,
        permalink: product.seo.permalink
      }];

      Object.keys(product.variations).map(item => {
        array.push({
          ...product.variations[item].attributes.size,
          permalink: product.variations[item].seo.permalink
        })
      })

      setVariants(array)
    }
  }, [])

  if (variants.length) {
    return (
      <div>
        <label className="text-gray-700 text-sm" htmlFor="count">Größe:</label>
        <div className="flex items-center mt-1">
          {variants.map((variant) => {
            return (
              <Link key={variant.id} href={`/products/${variant.permalink}`}>
                
                <button 
                  className={`h-10 w-10 rounded-full border-2 border-grey-200 mr-2 focus:outline-none ${variant.value == product.attributes.size.value && 'border-black'} ${colors[variant.value]}`}
                >
                  {variant.value}
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