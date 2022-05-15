import "../components/ListComics.scss";
import coming from  "../img/coming.webp";

const ListComics = ({com}) => {
    const path = com.thumbnail.path;
    const ext = com.thumbnail.extension;
    const notFound = path.search("image_not_available");
    return  <div id="comic" >
                <div className="title">
                  <h4>{com.title}</h4>
                </div>
                {notFound === -1 ?(<img id="pic" src ={`${path}.${ext}`} alt="CharPic"/>):(<img id="pic" src = {coming} alt="comingPic"/>)}
                <div className="description">
                    {com.description ? (<p>{com.description}</p>):(<p>Description coming soon</p>)}
                </div>
            </div> 

            
}

export default ListComics;