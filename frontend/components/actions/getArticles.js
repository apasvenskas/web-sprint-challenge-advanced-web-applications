import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getArticles = ()   => {
    const [articles, setArticles] = useState([]);
    const [spinnerOn, setSpinnerOn] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    // ✨ implement
    // We should flush the message state, turn on the spinner
    setMessage(''),
    setSpinnerOn(true)
    // and launch an authenticated request to the proper endpoint.
    axios.get(articlesUrl, {
      headers: {
        'Auhorization': localStorage.getItem('token')
      }
    })    
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    .then (response => {
      if(response.status === 200) {
        setArticles(response.data)
        setMessage('Article Fetched Succesfully!')
      }
      setSpinnerOn(false)
    })
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    if(error.response.status === 401) {
        navigate("/login");
    } else {
      setMessage(error.response.data.message)
    }
    // Don't forget to turn off the spinner!
    setSpinnerOn(false)
  }

  export default getArticles;