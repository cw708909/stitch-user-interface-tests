export function money(value) {
  return `$${Number(value || 0).toFixed(2)}`
}

export function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100
}
