import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Articles from "./Articles";
import LoginForm from "./LoginForm";
import Message from "./Message";
import ArticleForm from "./ArticleForm";
import Spinner from "./Spinner";
import axios from "axios";

const articlesUrl = "http://localhost:9000/api/articles";
const loginUrl = "http://localhost:9000/api/login";

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState("");
  const [articles, setArticles] = useState([]);
  const [currentArticleId, setCurrentArticleId] = useState();
  const [spinnerOn, setSpinnerOn] = useState(false);

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/");
  };
  const redirectToArticles = () => {
    navigate("/articles");
  };

  // added use effect in hopes of getting spinner to work. 
  useEffect(() => {
    setSpinnerOn(true);
    // ...
    setSpinnerOn(false);
  }, [spinnerOn]);


  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      setMessage("Goodbye!");
      navigate("/");
    }
  };

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    setSpinnerOn(true);
    const token = localStorage.getItem("token");
    setMessage("");
    axios
      .get(articlesUrl, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        setArticles(res.data.articles);
      })
      .catch((err) => {
        setMessage(err?.response?.data?.message || "Something bad happened");
        if (err.response.status == 401) {
          redirectToLogin();
        }
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  const login = async ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    console.log('Loging in')
    setSpinnerOn(true)
    setMessage("");
    console.log('spinnerOn', spinnerOn)
    axios
      .post(loginUrl, { username, password })
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        setMessage(res.data.message);
        redirectToArticles();
      })
      .catch((err) => {
        const responseMessage = err?.response?.data?.message;
        setMessage(
          responseMessage || `Somethin' horrible logging in: ${err.message}`
        );
      })
      .finally(() => {
        setSpinnerOn(false)
        console.log('login complete')
      });

    console.log("spinner", spinnerOn);
  };

  const postArticle = async (article) => {
    // ✨ implement

    setSpinnerOn(true);
    const token = localStorage.getItem("token");
    setMessage("");
    axios
      .post(articlesUrl, article, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        setArticles((articles) => {
          return articles.concat(res.data.article);
        });
      })
      .catch((err) => {
        setMessage(err?.response?.data?.message || "Something bad happened");
        if (err.response.status == 401) {
          redirectToLogin();
        }
      })
      .finally(() => {
        setSpinnerOn(false);
      });
    console.log("post", token);
  };

  const updateArticle = ({ article_id, article }) => {
    const token = localStorage.getItem("token");
    article_id = Number(article_id);
    // ✨ implement
    // You got this!
    if (typeof article_id !== "number") {
      throw new Error("article_id is not a number");
    }
    axios
      .put(`http://localhost:9000/api/articles/${article_id}`, article, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setArticles((articles) => {
          return articles.map((art) => {
            return art.article_id === article_id ? res.data.article : art;
          });
        });
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("article_id", article_id);
  };

  const deleteArticle = (article_id) => {
    // ✨ implement
    const token = localStorage.getItem("token");
    setSpinnerOn(true);
    axios
      .delete(`http://localhost:9000/api/articles/${article_id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        setArticles((articles) => {
          return articles.filter((art) => {
            return art.article_id != article_id;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSpinnerOn(false);
      });
    console.log("delete", token);
  };

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
     
      <Message message={message} />
      <button id="logout" onClick={logout}>
        Logout from app
      </button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
      {spinnerOn ? <Spinner spinnerOn={true} /> : <Spinner spinnerOn={false} />}
        <Spinner spinnerOn={spinnerOn} />
        {" "}
        {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">
            Login
          </NavLink>
          <NavLink id="articlesScreen" to="/articles">
            Articles
          </NavLink>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<LoginForm login={login} spinnerOn={spinnerOn} setSpinnerOn={setSpinnerOn} />}
          />
          <Route
            path="login"
            element={<LoginForm login={login} spinnerOn={spinnerOn} setSpinnerOn={setSpinnerOn} />}
          />
          <Route
            path="articles"
            element={
              <>
                <ArticleForm
                  article={articles}
                  setArticles={setArticles}
                  updateArticle={updateArticle}
                  deleteArticle={deleteArticle}
                  setCurrentArticleId={setCurrentArticleId}
                  currentArticleId={currentArticleId}
                  currentArticle={articles.find(
                    (art) => art.article_id == currentArticleId
                  )}
                  postArticle={postArticle}
                />
                <Articles
                  articles={articles}
                  setArticles={setArticles}
                  getArticles={getArticles}
                  deleteArticle={deleteArticle}
                  updateArticle={updateArticle}
                  postArticle={postArticle}
                  setCurrentArticleId={setCurrentArticleId}
                  currentArticleId={currentArticleId}
                />
              </>
            }
          />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  );
}
