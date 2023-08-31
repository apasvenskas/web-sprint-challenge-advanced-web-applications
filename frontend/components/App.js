import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'



const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate("/")}
  const redirectToArticles = () => { navigate("/articles")}

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      setMessage('Goodbye!');
      navigate('/');
    }
  }

  const getArticles = ()   => {
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
  

      const login = async ({ username, password }) => {
        setSpinnerOn(true);
        const res = await axios.post(loginUrl, { username, password });
  
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          setMessage(res.data.message);
          // setSpinnerOn(false);
          navigate("/articles");
          // const message = `Here are your articles, ${username}!`;
          // setMessage(message);
        } else {
          setMessage(res.data.message);
          setSpinnerOn(false);
        }
      };



  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner l />
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          <Route path="articles" element={
            <>
              <ArticleForm postArticle={postArticle} updateArticle={updateArticle} deleteArticle={deleteArticle}/>
              <Articles getArticles={getArticles}/>
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
        
        }

