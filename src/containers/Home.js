import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Characters from "../components/Characters";
import Paginate from "../components/Paginate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./Home.scss";

const Home = ({name, setName, favCharacter, setFavCharacter,
                favComic,setFavComic,
                token,setToken,
                toggleModal, setToggleModal,
                nameModal, setNameModal}) => {

    
    const [page, setPage] = useState(1);

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () =>{
            const response = await axios.get(`https://marvel-back-node-v1.herokuapp.com/characters?name=${name}&page=${page}`) 
            setData(response.data);
            setIsLoading(false);
        }
        fetchData();
    },[name,page])
    let numberOfPages = Math.floor(data.count / 100);
    data.count % 100 > 0 && numberOfPages++;
    return  isLoading?(
                <div>En cours de chargement</div>
            ):( <>
                    <Header favCharacter={favCharacter} setFavCharacter={setFavCharacter}
                                                        favComic={favComic} setFavComic={setFavComic}
                                                        token={token} setToken={setToken}
                                                        toggleModal={toggleModal} setToggleModal={setToggleModal}
                                                        nameModal={nameModal} setNameModal={setNameModal}/>
                    <div className="search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input id="searchBar" name="CharSearch" type="text"
                                placeholder="exemple : Alex Power .." 
                                onChange={(e)=>{setName(e.target.value);}}></input>
                    </div>
                    <div className="body">
                        {data.results.map((char, index)=>{
                            return <Characters key={index} char={char} token={token}/>
                        })}
                        
                    </div>
                    {data.count > 100 && (
                        <Paginate page={page} setPage={setPage} numberOfPages={numberOfPages}/>)}
                </>
            );
}

export default Home;