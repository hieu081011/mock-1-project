import React, { useContext, useState } from "react";
import { ls } from '../api/encyption'
const AuthContext = React.createContext();

const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    if (localStorage.getItem("auth"))
      return JSON.parse(ls.get('auth'));
    return {};
  });
  const [quizData, setQuizData] = useState(() => {
    if (localStorage.getItem("quizData")) {
      return JSON.parse(ls.get('quizData'))
      // return JSON.parse(localStorage.getItem("quizData"));
    }
    return {};
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth, quizData, setQuizData }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export default ContextProvider;
