import { Link } from "react-router-dom"
import { Menu } from "antd"
import { useState } from "react"
import { useLocation } from 'react-router-dom'
const NavBar = ()=>{
    

    const location = useLocation();
    let current = location.pathname
    const [page, setPage] = useState(current)
    return <Menu
        mode="horizontal"
        className="navbar"
        onClick={(val)=>{setPage(val.key)}}
        selectedKeys={[page]}
        inlineIndent={50}
    >
        <Menu.Item key={"/"}>  <Link to="/"> Add Entry </Link></Menu.Item>
        <Menu.Item key={"/ViewEntry"}> <Link to="/ViewEntry"> View Entries </Link></Menu.Item>
        <Menu.Item key={"/Report"}> <Link to="/Report"> Report </Link> </Menu.Item>
 
    

    </Menu>
}



export default NavBar