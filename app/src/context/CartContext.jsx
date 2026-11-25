import { createContext, useContext, useMemo, useState } from 'react'
import { initialCarts } from '../data/menu'
import { roundMoney } from '../utils/format'

const CartContext = createContext(null)

function unitPriceFor(item, entry) {
  if (!item.sizes) return item.price
  const chosen = item.sizes.find((size) => size.label === entry?.size)
  return (chosen ?? item.sizes.find((size) => size.label === item.defaultSize) ?? item.sizes[0]).price
}

export function CartProvider({ children }) {
  const [carts, setCarts] = useState(() => structuredClone(initialCarts))
  const [notes, setNotes] = useState({ signature: '', pizza: '' })

  function changeQty(flow, id, delta) {
    setCarts((prev) => {
      const flowCart = { ...prev[flow] }
      const current = flowCart[id] ?? { qty: 0 }
      const nextQty = Math.max(0, (current.qty ?? 0) + delta)
      if (nextQty === 0) {
        delete flowCart[id]
      } else {
        flowCart[id] = { ...current, qty: nextQty }
      }
      return { ...prev, [flow]: flowCart }
    })
  }

  function setSize(flow, id, size) {
    setCarts((prev) => ({
      ...prev,
      [flow]: {
        ...prev[flow],
        [id]: { ...(prev[flow][id] ?? { qty: 1 }), size },
      },
    }))
  }

  function setNote(flow, text) {
    setNotes((prev) => ({ ...prev, [flow]: text }))
  }

  const value = useMemo(
    () => ({ carts, notes, changeQty, setSize, setNote }),
    [carts, notes],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}

export function useCartDetails(flow, items) {
  const { carts, notes } = useCart()

  return useMemo(() => {
    const cart = carts[flow] ?? {}
    const lines = items
      .filter((item) => (cart[item.id]?.qty ?? 0) > 0)
      .map((item) => {
        const entry = cart[item.id]
        const qty = entry.qty
        const unitPrice = unitPriceFor(item, entry)
        const size = item.sizes
          ? item.sizes.find((option) => option.label === entry.size)?.label ?? item.defaultSize
          : null

        let receiptDetail = item.trayNote ?? ''
        if (item.receiptNote?.startsWith('Size:')) {
          const sizeLabel = item.receiptSizeLabel?.[size] ?? size
          receiptDetail = `Size: ${sizeLabel} • ${qty} × $${unitPrice.toFixed(2)}`
        } else if (item.receiptNote?.startsWith('1 ×')) {
          receiptDetail = `${qty} × $${unitPrice.toFixed(2)}`
        }

        return {
          ...item,
          qty,
          size,
          unitPrice,
          lineTotal: roundMoney(unitPrice * qty),
          receiptDetail,
        }
      })

    const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.lineTotal, 0))
    const totalQty = lines.reduce((sum, line) => sum + line.qty, 0)

    return {
      lines,
      subtotal,
      itemCount: lines.length,
      totalQty,
      note: notes[flow] ?? '',
    }
  }, [carts, notes, flow, items])
}
