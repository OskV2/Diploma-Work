import React from 'react'
import { Outlet } from "react-router-dom";
import Pagination from '../components/Back/Back';

const RootPage = () => {
  return (
    <Outlet />
  )
}

export default RootPage