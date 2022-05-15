
import { useEffect, useState} from "react";
import {useLocation } from "react-router-dom";
import axios from "axios";
import ListComics from "./ListComics";
import Header from "./Header";

const ComicWithChar = () => {
    const [comics, setComics] = useState([]);
    const location= useLocation();
    const {id } = location.state;
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () =>{
            const response = await axios.get(`https://marvel-back-node-v1.herokuapp.com/comics/${id}`) 
            setComics(response.data.comics);
            setIsLoading(false);
        }
        fetchData();
    },[id])
    return (isLoading?(<span>hello loading</span>)
            : (<div>
                    <Header />
                    <div className="body">
                    {comics.map((each, index)=> {
                    return <ListComics com={each} key={index}/>
                    })} 
                    </div>
                </div>))
}

export default ComicWithChar;