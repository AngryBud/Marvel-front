import "../components/ListComics.scss";
import coming from  "../img/coming.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListComics = ({com, token, refName, setRefName}) => {
    const path = com.thumbnail.path;
    const ext = com.thumbnail.extension;
    const sourcePic = `${path}.${ext}`;
    const notFound = path.search("image_not_available");
    const navigate= useNavigate();
    const handleClick = async () =>{
        try {
            const fav = {"name": com.title, "description": com.description, "image": sourcePic, "token":token}
            const response = await axios.post("https://marvel-back-node-v1.herokuapp.com/favoris/add",fav)
            console.log(response.data);
            setRefName(fav.token);
            navigate("/favoris");
        } catch (error) {
          // console.log(error);
            // alert();
        }
    }
    return  <div id="comic" >
                <div className="title">
                  <h4>{com.title}</h4>
                </div>
                {notFound === -1 ?(<img id="pic" src ={`${path}.${ext}`} alt="CharPic"/>):(<img id="pic" src = {coming} alt="comingPic"/>)}
                <div className="description">
                    {com.description ? (<p>{com.description}</p>):(<p>Description coming soon</p>)}
                </div>
                <button onClick={handleClick}>Add to fav</button>
            </div> 

            
}

export default ListComics;