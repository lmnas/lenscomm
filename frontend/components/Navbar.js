import React, { useContext } from "react";
import Link from "next/link"
import NextImage from "./Image"
import AppContext from "../context/AppContext";
import { Container, Nav, NavItem } from "reactstrap"
import { logout } from '../utils/auth'

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);
  return (
    <div className="flex justify-between ml-6 mr-6 mt-4">
      <Link href="/">
        <a>
          <NextImage
            src="/strapi.png"
            alt="home"
            className="logo"
            height="44"
            width="150"
          />
        </a>
      </Link>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <NavItem className="ml-auto">
        {user ? (
          <h5>{user.username}</h5>
        ) : (
          <Link href="/account/register">
            <a className="nav-link"> Sign up</a>
          </Link>
        )}
      </NavItem>
      <NavItem>
        {user ? (
          <Link href="/">
            <a
              className="nav-link"
              onClick={() => {
                logout();
                setUser(null);
              }}
            >
              Logout
                </a>
          </Link>
        ) : (
          <Link href="/account/login">
            <a className="nav-link">Sign in</a>
          </Link>
        )}
      </NavItem>
      <button className="snipcart-checkout flex items-center">
        <NextImage height="150" width="150" src="/cart.svg" alt="Cart" />
        <span className="snipcart-total-price ml-3 font-semibold text-sm text-indigo-500"></span>
      </button>
    </div>
  )
}

export default Navbar
