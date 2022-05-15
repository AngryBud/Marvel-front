
import ListComics from "../components/ListComics";
import Cookies from "js-cookie";
import { Link , useNavigate} from "react-router-dom";
import { useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Paginate from "../components/Paginate";
import logo from "../img/logo.png";
import "./Comics.scss";

const Comics = ({title, setTitle, token, setToken, toggleModal, setToggleModal,
  nameModal, setNameModal, userName}) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () =>{
            const response = await axios.get(`https://marvel-back-node-v1.herokuapp.com/comics?title=${title}&page=${page}`) 
            setData(response.data);
            setIsLoading(false);
        }
        fetchData();
    },[title, page])
    let numberOfPages = Math.floor(data.count / 100);
    data.count % 100 > 0 && numberOfPages++;
    return  isLoading?(
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
                    <div className="search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input id="searchBar" name="CharSearch" type="text"
                                placeholder="Recherche un comics : Apocalypse .." 
                                onChange={(e)=>{setTitle(e.target.value);}}></input>
                    </div>
                    <div className="body">
                        {data.results.map((com, index)=>{
                            return <ListComics key={index} com={com}/>
                        })}  
                    </div>
                    {data.count > 100 && (
                      <Paginate page={page} setPage={setPage} numberOfPages={numberOfPages}/>)}
                </>
            );
}

export default Comics;