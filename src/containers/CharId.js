// import Header from "../components/Header";
import { useParams , Link, useNavigate} from "react-router-dom";
import { useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "../img/logo.png";
import "./CharId.scss";
// import Favoris from "./Favoris";

const CharId = ({token, setToken, toggleModal, setToggleModal,
    nameModal, setNameModal, userName, refName, setRefName}) => {
    const {characterId} = useParams();
    const [data, setData] = useState({});
    const [sourcePic, setSourcePic] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async () => {
            const response = await axios.get(`https://marvel-back-node-v1.herokuapp.com/character/${characterId}`)
            setData(response.data);
            setSourcePic(`${response.data.thumbnail.path}.${response.data.thumbnail.extension}`);
            setIsLoading(false);
        }
        fetchData();
    },[characterId])
    const handleClick = async () =>{
        try {
            const fav = {"name": data.name, "description": data.description, "image": sourcePic, "token":token}
            // console.log(fav);
            const response = await axios.post("https://marvel-back-node-v1.herokuapp.com/favoris/add",fav)
            console.log("response data::",response.data);
            // setRefName(fav.token);
            setRefName(response.data);
            navigate("/favoris");
        } catch (error) {
          // console.log(error);
            // alert();
        }
    }
    return isLoading?(
                <div>En cours de chargement</div>
            ):( <>
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
                        </div>
                            
                            )}
            </div>
            <div className="body">
                <div className="presentation">
                    <img id="big-pic" src={sourcePic} alt="big-char-pic"/>
                    <div className="infos">
                        <h1>{data.name}</h1>
                        <p>{data.description}</p>
                        <button onClick={handleClick}>Ajoutez aux favoris</button>
                    </div>
                </div>
                <div className="comicsList">
                    <Link to={`/comics/${characterId}`} state={{
                        id:characterId}}
                        style={{color:"black", textDecoration:"none", fontSize:"2rem"}}> Voir ses apparitions</Link>
                </div>
            </div>
            </>
            );
}

export default CharId;