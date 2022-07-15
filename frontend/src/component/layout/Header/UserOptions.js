import React, { Fragment, useState } from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = ({ user }) => {

  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { cartItems } = useSelector(state => state.cart);

  const [open, setOpen] = useState(false);

  const orders = () => {
    navigate('/orders')
  }

  const account = () => {
    navigate('/account')
  }

  const cart = () => {
    navigate('/cart')
  }

  const logoutUser = () => {
    dispatch(logout());
    alert.success("Logged Out Successfully");
    localStorage.clear();
    navigate('/login');
  }

  const dashboard = () => {
    navigate('/admin/dashboard')
  }

  const options = [
    { icon: <ListAltIcon />, name: 'Orders', func: orders },
    { icon: <PersonIcon />, name: 'Profile', func: account },
    { icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser }
  ];

  if (user.role === 'admin') {
    options.unshift({ icon: <DashboardIcon />, name: 'Dashboard', func: dashboard })
  }



  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        direction='down'
        style={{ zIndex: "11" }}
        className='speedDial'
        icon={
          <img
            className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url : '/Profile.png'}
            alt='Profile'
          />
        }
      >
        {options.map(item => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions