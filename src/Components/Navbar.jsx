import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postLogout } from '../Redux/authReducer/action'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const user=JSON.parse(localStorage.getItem('user'))
    const auth=JSON.parse(localStorage.getItem('rentaride'))
    const user1=useSelector((store)=>{return store.authReducer.user})
    const dispatch=useDispatch()
    const handleLogout=()=>{
       dispatch(postLogout())
    }
  return (
    <nav className="navbar navbar-expand-sm navbar-light" style={{backgroundColor:"#004aad"}}>
    <button className="navbar-toggler"  type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <div className="navbar-toggler-icon" style={{color:"white"}}></div>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav" style={{display:"flex",width:"100%",margin:"auto 10% auto auto",justifyContent:"space-between",alignItems:"center"}}>
        <li className="nav-item active">
        <a className="navbar-brand" href="/"><img src="./LOGO.png" alt="Logo" width="40%"/></a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="/" style={{color:"white"}}>Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/likes" style={{color:"white"}} >Likes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/cars" style={{color:"white"}} >Cars</a>
        </li>
        {auth===true ?<li className="nav-item">
          <a className="nav-link" href="/profile" style={{color:"white"}}><AccountCircleIcon/>{`${user[0].username}`}</a>
        </li>:""}
        {auth===true ?<li className="nav-item">
          <a className="nav-link" href="/" style={{color:"white"}} onClick={handleLogout}>Logout</a>
        </li>:<li className="nav-item">
        <a className="nav-link" href="/login" style={{color:"white"}} >Log In</a>
      </li>}
      </ul>
    </div>
  </nav>
  )
}

export default Navbar