// import {Link} from "react-router-dom";
import coming from "../img/coming.webp"
const AllFav = ({each}) => {

  const notFound = each.image.search("image_not_available");
  return <>
          <div id="link" style={{textDecoration:"none"}} >
              <div className="name">
                <h4>{each.name}</h4>
              </div>
              {notFound === -1 ?(
              <img id="pic" src ={each.image} alt="CharPic"/>)
               :(<img id="pic" src = {coming} alt="comingPic"/>)}
              <div className="description">
                  {each.description ? (<p>{each.description}</p>):(<p>Description coming soon</p>)}
              </div>
          </div>
        </>;
}

export default AllFav;