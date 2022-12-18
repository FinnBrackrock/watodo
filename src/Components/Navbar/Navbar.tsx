import './navbar.css'

type NavbarProps = {
    children: JSX.Element;
  };


const Navbar = ({ children }: NavbarProps) => {
  return (
    <div className="navbar">
        {children}
    </div>
  )
}

export default Navbar