import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar.jsx'
import { Route,Routes } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct.jsx'
import ListProduct from '../../Components/ListProduct/ListProduct.jsx'

const Admin = () => {
    return (
        <div className='admin'>
            <Sidebar/>
            <Routes>
                <Route path="/addproduct" element={<AddProduct/>}/>
                <Route path="/listproduct" element={<ListProduct/>}/>
            </Routes>
        </div>
    )
}

export default Admin