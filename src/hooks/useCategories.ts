// react hooks
import { useEffect } from "react"
// redux hooks
import { useAppDispatch, useAppSelector } from "@/store/hooks"
// redux actions
import { actGetCategories, categoryCleanUp } from "@/store/categories/categoriesSlice"

const useCategories = () => {
    const dispatch = useAppDispatch()
    const { loading, records, error } = useAppSelector(state => state.categories)
    // console.log(loading, records, error)

    useEffect(() => {
        const promise = dispatch(actGetCategories())
        return () => {
            dispatch(categoryCleanUp())
            promise.abort()
        }
    }, [dispatch])

    return {loading, records, error}
}

export default useCategories