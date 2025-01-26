type ErrorComponentProps = {
    children: React.ReactNode;
}

export default function ErrorComponent(
    { children }: ErrorComponentProps
) {
    return (
        <section className="">
            <span className="fs-1 fw-bold text-danger text-center">Error</span>
            <p className=""> {children || "fallback error"}</p>
        </section>
    )
}
