import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/store"

const getCartTotalQuantitySelector = createSelector((state: RootState) => state.cart.items, (items) => {
    // console.log("items", items)
    const totalQuantity = Object.values(items).reduce((acc, current) => acc + current, 0)
    return totalQuantity
})

export { getCartTotalQuantitySelector }