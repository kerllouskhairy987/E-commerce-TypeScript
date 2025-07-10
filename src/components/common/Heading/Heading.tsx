import { memo } from "react"

const Heading = memo(({ title }: { title: string }) => {
    return (
        <div className="mb-3 text-capitalize" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{title}</div>
    )
})

export default Heading