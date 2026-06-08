import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProductList from './ProductList'
import CartItem from './CartItem'
import AboutUs from './AboutUs'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const cart = useSelector(state => state.cart.items)
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  const renderPage = () => {
    switch (currentPage) {
      case 'product':
        return <ProductList />
      case 'cart':
        return <CartItem onContinueShopping={() => setCurrentPage('product')} />
      case 'about':
        return <AboutUs />
      default:
        return (
          <div className="landing-page">
            <div className="landing-content">
              <h1 className="landing-title">Paradise Nursery</h1>
              <p className="landing-subtitle">Your Green Oasis Awaits</p>
              <p className="landing-description">
                Discover the perfect plants for your home. From aromatic herbs to
                low-maintenance greens, find your green companion today!
              </p>
              <button className="get-started-btn" onClick={() => setCurrentPage('product')}>
                Get Started
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-links">
          <button className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`} onClick={() => setCurrentPage('landing')}>Home</button>
          <button className={`nav-link ${currentPage === 'product' ? 'active' : ''}`} onClick={() => setCurrentPage('product')}>Plants</button>
          <button className={`nav-link ${currentPage === 'about' ? 'active' : ''}`} onClick={() => setCurrentPage('about')}>About</button>
        </div>
        <div className="nav-cart" onClick={() => setCurrentPage('cart')}>
          <span className="cart-icon">&#x1F6D2;</span>
          <span className="cart-count">{totalItemsCount}</span>
        </div>
      </nav>

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
