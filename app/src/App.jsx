import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import CheckoutPage from './pages/CheckoutPage'
import PizzaMenuPage from './pages/PizzaMenuPage'
import SignatureMenuPage from './pages/SignatureMenuPage'

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/menu-selections" replace />} />
          <Route path="/menu-selections" element={<SignatureMenuPage />} />
          <Route path="/review-pay" element={<CheckoutPage flow="signature" />} />
          <Route path="/menu-order" element={<PizzaMenuPage />} />
          <Route path="/ready-to-pay" element={<CheckoutPage flow="pizza" />} />
          <Route path="*" element={<Navigate to="/menu-selections" replace />} />
        </Routes>
      </CartProvider>
    </HashRouter>
  )
}
