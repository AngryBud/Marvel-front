import FormSignup from "../components/Forms/FormSignup";
import FormLogin from "../components/Forms/FormLogin";

const Modal = ({id,token, setToken, 
                toggleModal, setToggleModal,
                nameModal, setNameModal, userName, setUserName}) => {

  return toggleModal && <div className="modal-overlay">
                            <div className="modal-wrapper">
                              <div className="modal">
                                {nameModal === "signup" && <FormSignup token={token} setToken={setToken}
                                                                      setToggleModal={setToggleModal}
                                                                      setNameModal={setNameModal}
                                                                      userName={userName} setUserName={setUserName}/>}
                                {nameModal === "login" && <FormLogin token={token} setToken={setToken}
                                                                      setToggleModal={setToggleModal}
                                                                      setNameModal={setNameModal}
                                                                      userName={userName} setUserName={setUserName}/>}
                              </div>
                            </div>
                          </div>
                        
};

export default Modal;