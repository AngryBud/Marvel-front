import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.scss';
import CharId from "./containers/CharId";
import Home from "./containers/Home";
import Comics from "./containers/Comics";
import {useState} from "react";
import ComicWithChar from "./components/ComicWithChar";
import Favoris from "./containers/Favoris";
import Cookies from "js-cookie";

function App() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [favCharacter, setFavCharacter] = useState({});
    const [favComic, setFavComic] = useState({});
    const [token, setToken] = useState(Cookies.get("userToken" || []),{ expires: 7 });
    const [toggleModal, setToggleModal] = useState(false);
    const [nameModal, setNameModal] = useState("");
    const [userName, setUserName] = useState("");
    const [refName, setRefName] = useState("");
    // const [limit, setLimit] = useState(100);
    // const [skip, setSkip] = useState(0);
    return (  
                  <Router>
                      <Routes>
                          <Route path="/" element={<Home name={name} setName={setName} 
                                                        favCharacter={favCharacter} setFavCharacter={setFavCharacter}
                                                        favComic={favComic} setFavComic={setFavComic}
                                                        token={token} setToken={setToken}
                                                        toggleModal={toggleModal} setToggleModal={setToggleModal}
                                                        nameModal={nameModal} setNameModal={setNameModal}
                                                        userName={userName} setUserName={setUserName}/>}/>
                          <Route path="/character/:characterId" element={<CharId favCharacter={favCharacter} setFavCharacter={setFavCharacter}
                                                                                    favComic={favComic} setFavComic={setFavComic}
                                                                                    token={token} setToken={setToken}
                                                                                    userName={userName} setUserName={setUserName}
                                                                                    toggleModal={toggleModal} setToggleModal={setToggleModal}
                                                                                    nameModal={nameModal} setNameModal={setNameModal}
                                                                                    refName={refName} setRefName={setRefName}/>} />
                          <Route path="/comics" element={<Comics title={title} setTitle={setTitle} 
                                                                favCharacter={favCharacter} setFavCharacter={setFavCharacter}
                                                                favComic={favComic} setFavComic={setFavComic}
                                                                token={token} setToken={setToken}
                                                                userName={userName} setUserName={setUserName}
                                                                toggleModal={toggleModal} setToggleModal={setToggleModal}
                                                                nameModal={nameModal} setNameModal={setNameModal}/>}/>
                          <Route path="/comics/:characterId" element={<ComicWithChar favCharacter={favCharacter} setFavCharacter={setFavCharacter}
                                                                                    favComic={favComic} setFavComic={setFavComic}
                                                                                    token={token} setToken={setToken}
                                                                                    userName={userName} setUserName={setUserName}
                                                                                    toggleModal={toggleModal} setToggleModal={setToggleModal}
                                                                                    nameModal={nameModal} setNameModal={setNameModal}/>} />
                      {/* <Route/> */}
                          <Route path="/favoris" element={<Favoris token={token} setToken={setToken}
                                                                userName={userName} setUserName={setUserName}
                                                                toggleModal={toggleModal} setToggleModal={setToggleModal}
                                                                nameModal={nameModal} setNameModal={setNameModal}
                                                                refName={refName} setRefName={setRefName}/>}/>
                      </Routes>
                  </Router>

            );
}

export default App;
