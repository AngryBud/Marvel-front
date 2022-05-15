// import Characters from "./Characters";
import {Link} from "react-router-dom";
import coming from "../img/coming.webp"
import "./Characters.scss";

const Characters = ({char}) => {

  const path = char.thumbnail.path;
  const ext = char.thumbnail.extension;
  const notFound = path.search("image_not_available");
  return  (<>
              <Link id="link" style={{textDecoration:"none"}} to={`/character/${char._id}`} >
                  <div className="name">
                    <h4>{char.name}</h4>
                  </div>
                  {notFound === -1 ?(<img id="pic" src ={`${path}.${ext}`} alt="CharPic"/>):(<img id="pic" src = {coming} alt="comingPic"/>)}
                  <div className="description">
                      {char.description ? (<p>{char.description}</p>):(<p>Description coming soon</p>)}
                  </div>
              </Link>
          </>
          );
}

export default Characters;