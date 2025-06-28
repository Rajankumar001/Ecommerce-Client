import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { GiLargeDress } from "react-icons/gi";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

import SearchInput from '../Form/SearchInput';
function Header() {
  const [cart] = useCart();
   const [auth, setAuth] = useAuth();
    const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
  <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
     <Link className="navbar-brand">
      Faishon <span>Ecommerce</span>
      </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarTogglerDemo01"
      aria-controls="navbarTogglerDemo01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
     
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>
        <li className="nav-item">
          <NavLink  to='/' className="nav-link active" aria-current="page" href="#">
            Home
          </NavLink>
        </li>
        {
          !auth.user?(<>
          <li className="nav-item">
          <NavLink  to='/register'className="nav-link" href="#">
           Register
          </NavLink>
        </li>
         <li className="nav-item">
          <NavLink  to='/login'className="nav-link" href="#">
           Login
          </NavLink>
        </li>
          </>):(<>
           <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
          </>)
        }
               <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>
      </ul>
    </div>
  </div>
</nav>
</>
  )
}

export default Header
