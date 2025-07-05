interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;

}

const Button = ({ children, className, ...rest }: IProps) => {
    return (
        <button className={`btn bg-secondary text-white  ${className}`}
            {...rest}
        >{children}</button>
    )
}

export default Button