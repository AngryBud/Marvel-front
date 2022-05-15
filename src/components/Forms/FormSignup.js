import axios from "axios";
import { useState } from "react";
import "./FormSignup.scss";
// import FormLogin from "./FormLogin";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {AiFillEye} from 'react-icons/ai';

const FormSignup = ({token ,setToken,setToggleModal, setNameModal, userName, setUserName}) => {
    // const [userName, setUsername] = useState("");
    const [userMail, setUserMail] = useState("");
    const [userPass1, setUserPass1] = useState("");
    // const [userPass2, setUserPass2] = useState("");
    // const [newsletter, setNewsletter] = useState(false);
    // const [tokens, setTokens] = useState([]);
    // const navigate = useNavigate();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const user = {"username": userName, "email": userMail, "password": userPass1}
            const response = await axios.post("https://marvel-back-node-v1.herokuapp.com/user/signup",user) 
            setToken(Cookies.set("userToken", response.data.token));
            setToggleModal(false);

        } catch (error) {
          // console.log(error);
            // alert();
        }
  }
  return    <>  
            <div className="modal-header">
                    <h4>S'inscrire</h4>
                    <button
                      type="button"
                      className="modal-close-button"
                      onClick={()=>{setToggleModal(false)}}
                    >
                      <span>&times;</span>
                    </button>
                    </div>
            <form onSubmit={handleSubmit}>
            <div className="modal-body">
                <input name="username" placeholder="Username" type="text" onChange={(e)=>{
                        setUserName(e.target.value);
                        }}value={userName}/> 
                <input name="email" placeholder="Email" type="email"onChange={(e)=>{
                        setUserMail(e.target.value);
                        }}value={userMail} />
                <input name="password" id="pass1" placeholder="Password" type="password" onChange={(e)=>{
                        setUserPass1(e.target.value);
                        }}value={userPass1}/>
                <input name="password" id="pass2" placeholder="Confirm Password" type="password" onChange={(e)=>{
                        setUserPass1(e.target.value);
                        }}value={userPass1}/>

            </div>
                {/* <div style={{backgroungColor :"red"}} > */}
                <button id="submit" type="submit">Create</button>
                {/* </div> */}
            </form>
            <span id="alreadySignin" onClick={()=>{
              setNameModal("login");
            }}>Déjà inscrit? Connectez-vous</span>
            </>  
}

export default FormSignup;