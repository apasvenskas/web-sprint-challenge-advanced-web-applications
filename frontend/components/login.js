import React, {useState}from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

const loginUrl = 'http://localhost:9000/api/login'

export default function useLogin() {

    const [message, setMessage] = useState("");
    const [spinnerOn, setSpinnerOn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const redirectToArticles = () => {
        history.pushState("/articles");
    }

const login = ({ username, password }) => {

    //post to login api endpoint
    axios
      .post(loginUrl, { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
  
        //action to update Redux store
        dispatch(loginSucces());
        dispatch(setUserToken(res.data.token));
  
        //Fetch user data
        return dispatch(fetchUser());
      })
      .then(() => {
        setSpinnerOn(false);
        redirectToArticles();
      })
      .catch((err) => {
        alert("Invalid username or password");
        setSpinnerOn(false);
      });
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
  };
  
  return {login, message, spinnerOn};

}