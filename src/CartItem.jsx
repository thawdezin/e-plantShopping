import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem, updateQuantity } from './CartSlice'

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.items)

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.toString().replace('$', ''))
      return total + cost * item.quantity
    }, 0)
  }

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.toString().replace('$', ''))
    return cost * item.quantity
  }

  const handleContinueShopping = (e) => {
    onContinueShopping(e)
  }

  const handleCheckoutShopping = () => {
    alert('Coming Soon')
  }

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))
  }

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))
    } else {
      dispatch(removeItem(item.name))
    }
  }

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName))
  }

  return (
    <div className="cart-container">
      <h2 className="cart-header">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Start adding plants!</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, idx) => (
              <div key={idx} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">{item.cost}</p>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => handleDecrement(item)}>-</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemove(item.name)}>Remove</button>
                </div>
                <div className="cart-item-subtotal">
                  <p>${calculateTotalCost(item).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <strong>Total: </strong>
              <span>${calculateTotalAmount().toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <button className="continue-btn" onClick={handleContinueShopping}>Continue Shopping</button>
              <button className="checkout-btn" onClick={handleCheckoutShopping}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartItem
