// import { Navigate } from "react-router-dom";
import { Link , useNavigate} from "react-router-dom";
import { useState, useEffect} from "react";
import Cookies from "js-cookie";
// import Paginate from "../components/Paginate";
// import Characters from "../components/Characters";
// import ListComics from "../components/ListComics";
import AllFav from "../components/AllFav";
import logo from "../img/logo.png";
import axios from "axios";


const Favoris = ({token, setToken,
    userName, setUserName,
    toggleModal, setToggleModal,
    nameModal, setNameModal, refName}) => {
    const [fav, setFav] = useState([]);
    // const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // const tok = {"token": refName}
        const fetchData = async () =>{

            // console.log("fav",fav);
            // console.log("ref",refName)
            const tok = {"token": refName}     
            const response = await axios.post("https://marvel-back-node-v1.herokuapp.com/favoris",tok) 
            // console.log("al",refName);
            setFav(response.data);
            setIsLoading(false);
        }
        fetchData();
    },[refName])

    const navigate = useNavigate();
        return isLoading?(<span>En cours de chargement</span>) :(<>
                <div className="header">
    
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
                            navigate("/")
                            }}>Signup</button>
                        <button onClick={()=>{

                            setToggleModal(true);
                            setNameModal("login");
                            navigate("/")
                            }}>Login</button>
                    </div>):(
                    <div className="account">
                        <span style={{color:"white", fontFamily:"Marvel", fontSize:"2rem"}}>Bienvenue {userName}</span>
                        <button onClick={()=>{
                            setToken(null);
                            Cookies.remove("userToken");
                        }}>Logout</button>
                    </div>)}
                </div>
                {!token ? (<div className="body" style={{color:"black", fontSize:"2rem", fontWeight:"700"}}>
                        <span style={{marginTop:"2rem"}}>Connecte toi pour enregistrer tous tes personnages ou comics preferés</span>
                            </div>):
                        (<div className="body">
                            {fav.map((each, index)=>{
                                // console.log(fav);
                                return <AllFav each={each} key={index}/>
                            })}
                        </div>)}
            {/* {/* {data.count > 100 && ( */}
              {/* <Paginate page={page} setPage={setPage} numberOfPages={numberOfPages}/>)} */}
            </>);
        
}

export default Favoris;