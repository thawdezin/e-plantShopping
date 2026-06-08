import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from './CartSlice'

const plantsArray = [
  {
    category: 'Aromatic Plants',
    plants: [
      {
        name: 'Lavender',
        image: 'https://cdn.pixabay.com/photo/2020/04/13/16/49/lavender-5040373_1280.jpg',
        description: 'Fragrant purple blooms that promote relaxation and calmness.',
        cost: '$15',
      },
      {
        name: 'Jasmine',
        image: 'https://cdn.pixabay.com/photo/2018/04/26/21/56/jasmine-3353290_1280.jpg',
        description: 'Sweet-scented white flowers that bloom in the evening.',
        cost: '$18',
      },
      {
        name: 'Rosemary',
        image: 'https://cdn.pixabay.com/photo/2024/09/05/14/30/ai-generated-9025704_1280.jpg',
        description: 'Woody perennial herb with fragrant needle-like leaves.',
        cost: '$12',
      },
      {
        name: 'Mint',
        image: 'https://cdn.pixabay.com/photo/2022/07/18/13/19/peppermint-7330239_1280.jpg',
        description: 'Refreshing herb with a cool, invigorating aroma.',
        cost: '$10',
      },
      {
        name: 'Eucalyptus',
        image: 'https://cdn.pixabay.com/photo/2023/10/20/10/29/eucalyptus-8329195_1280.jpg',
        description: 'Tall evergreen with a distinctive camphoraceous fragrance.',
        cost: '$22',
      },
      {
        name: 'Gardenia',
        image: 'https://cdn.pixabay.com/photo/2018/03/15/14/13/gardenia-3228111_1280.jpg',
        description: 'Creamy white flowers with an intoxicating sweet perfume.',
        cost: '$20',
      },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      {
        name: 'Aloe Vera',
        image: 'https://cdn.pixabay.com/photo/2019/03/06/22/17/aloe-vera-4039226_1280.jpg',
        description: 'Succulent known for its soothing gel that heals burns and cuts.',
        cost: '$16',
      },
      {
        name: 'Tulsi (Holy Basil)',
        image: 'https://cdn.pixabay.com/photo/2024/01/25/07/24/tulsi-8531437_1280.jpg',
        description: 'Sacred herb used in Ayurveda for respiratory health and immunity.',
        cost: '$11',
      },
      {
        name: 'Turmeric',
        image: 'https://cdn.pixabay.com/photo/2019/06/02/14/36/turmeric-4246112_1280.jpg',
        description: 'Golden rhizome with powerful anti-inflammatory properties.',
        cost: '$14',
      },
      {
        name: 'Ginger',
        image: 'https://cdn.pixabay.com/photo/2024/09/23/05/16/ai-generated-9068765_1280.jpg',
        description: 'Pungent root used to treat nausea, colds, and digestive issues.',
        cost: '$13',
      },
      {
        name: 'Lemon Balm',
        image: 'https://cdn.pixabay.com/photo/2018/08/22/13/25/lemon-balm-3622692_1280.jpg',
        description: 'Lemon-scented herb that reduces stress and improves sleep.',
        cost: '$12',
      },
      {
        name: 'Echinacea',
        image: 'https://cdn.pixabay.com/photo/2017/06/28/12/01/echinacea-2450559_1280.jpg',
        description: 'Purple coneflower that boosts the immune system.',
        cost: '$17',
      },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      {
        name: 'Snake Plant',
        image: 'https://cdn.pixabay.com/photo/2023/05/17/05/21/sansevieria-7999383_1280.jpg',
        description: 'Nearly indestructible plant that thrives on neglect and low light.',
        cost: '$20',
      },
      {
        name: 'ZZ Plant',
        image: 'https://cdn.pixabay.com/photo/2024/02/21/21/39/zz-plant-8588888_1280.jpg',
        description: 'Glossy-leaved plant that tolerates low light and irregular watering.',
        cost: '$25',
      },
      {
        name: 'Pothos',
        image: 'https://cdn.pixabay.com/photo/2018/05/11/12/31/pothos-3390515_1280.jpg',
        description: 'Trailing vine with heart-shaped leaves, perfect for beginners.',
        cost: '$14',
      },
      {
        name: 'Spider Plant',
        image: 'https://cdn.pixabay.com/photo/2020/11/18/07/23/spider-plant-5754606_1280.jpg',
        description: 'Hardy plant with arching leaves that produces baby spiderettes.',
        cost: '$12',
      },
      {
        name: 'Peace Lily',
        image: 'https://cdn.pixabay.com/photo/2022/04/15/15/29/flowers-7134081_1280.jpg',
        description: 'Elegant white blooms that thrive in low light with minimal care.',
        cost: '$18',
      },
      {
        name: 'Cast Iron Plant',
        image: 'https://cdn.pixabay.com/photo/2023/10/25/09/21/indoor-plant-8339674_1280.jpg',
        description: 'Tough as nails, tolerates poor soil, low light, and neglect.',
        cost: '$22',
      },
    ],
  },
]

function ProductList() {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const [addedToCart, setAddedToCart] = useState({})

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant))
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }))
  }

  const isInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName)
  }

  return (
    <div className="product-grid">
      {plantsArray.map((categoryData, idx) => (
        <div key={idx} className="category-section">
          <h2 className="category-title">{categoryData.category}</h2>
          <div className="plant-card-container">
            {categoryData.plants.map((plant, pIdx) => (
              <div key={pIdx} className="plant-card">
                <img src={plant.image} alt={plant.name} className="plant-image" />
                <div className="plant-info">
                  <h3 className="plant-name">{plant.name}</h3>
                  <p className="plant-description">{plant.description}</p>
                  <p className="plant-cost">{plant.cost}</p>
                  <button
                    className={`add-to-cart-btn ${isInCart(plant.name) ? 'added' : ''}`}
                    onClick={() => handleAddToCart(plant)}
                    disabled={isInCart(plant.name)}
                  >
                    {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
