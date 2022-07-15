import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import logo from "../../../ProductPhoto/favicon.jpg"
import { FaShoppingCart } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'


const Header = () => {
  return (
    <ReactNavbar
      burgerColorHover="#F32424"
      logo={logo}
      logoWidth="20vmax"
      navColor1="white"
      logoHoverSize="10px"
      logoHoverColor="#F32424"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="rgba(35, 35, 35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#F32424"
      link1Margin="1vmax"
      profileIcon={true}
      cartIcon={true}
      searchIcon={true}
      ProfileIconElement={CgProfile}
      CartIconElement={FaShoppingCart}
      SearchIconElement={AiOutlineSearch}
      cartIconUrl='/cart'
      profileIconUrl="/login"
      profileIconColor="rgba(35, 35, 35,0.8)"
      searchIconColor="rgba(35, 35, 35,0.8)"
      cartIconColor="rgba(35, 35, 35,0.8)"
      profileIconColorHover="#F32424"
      searchIconColorHover="#F32424"
      cartIconColorHover="#F32424"
      cartIconMargin="1vmax"
    />
  )
}

export default Header;
