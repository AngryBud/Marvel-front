import "./Header.scss";
import {Link, useNavigate} from "react-router-dom";
// import { useState } from "react";
import logo from "../img/logo.png";
import Modal from "../modals/Modal";
import Cookies from "js-cookie";

const Header = ({setName, favCharacter, setFavCharacter,
    favComic,setFavComic,
    token,setToken,
    toggleModal, setToggleModal,
    nameModal, setNameModal, userName, setUserName}) => {
    const navigate = useNavigate();
    return    <div className="header">
                <Modal token={token} setToken={setToken} toggleModal={toggleModal} setToggleModal={setToggleModal}
                nameModal={nameModal} setNameModal={setNameModal} userName={userName} setUserName={setUserName}/>
                <div className="logo-nav">
                    <img src={logo} alt="logo"/>
                    <nav className="nav">
                        <Link id="linkNav" to="/">Characters</Link>
                        <Link id="linkNav" to="/comics">Comics</Link>
                        <Link id="linkNav" to="/favoris">Favoris</Link>
                    </nav>
                </div>
                {!token ? (
                <div className="account">
                            <button onClick={()=>{
                                setToggleModal(true);
                                setNameModal("signup");
                                navigate("/")}}>Signup</button>
                            <button onClick={()=>{
                                
                                setToggleModal(true);
                                setNameModal("login");
                                navigate("/")}}>Login</button>
                        </div>):(
                        <div className="account">
                            <span style={{color:"white", fontFamily:"Marvel", fontSize:"2rem"}}>Bienvenue {userName}</span>
                            <button onClick={()=>{
                                setToken(null);
                                Cookies.remove("userToken");
                            }}>Logout</button>
                        </div>
                            
                            )}
            </div>;
}

export default Header;