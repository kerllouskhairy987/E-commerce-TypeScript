
const Heading = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mb-3 text-capitalize" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{children}</div>
    )
}

export default Heading