import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import PT from 'prop-types';
import axiosWithAuth from '../axios';

export default function Articles(props) {
  // ✨ where are my props? Destructure them here
   const {
    articles,
    setArticles, 
    getArticles,
    setCurrentArticleId,
    currentArticleId,
    deleteArticle,
 } = props
  // ✨ implement conditional logic: if no token exists
  // we should render a Navigate to login screen (React Router v.6)


  const token = localStorage.getItem('token')||props.token
  
  const navigate = useNavigate()

  if(!token){
    return <Navigate to="/login" />
  }

  useEffect(() => {
    // ✨ grab the articles here, on first render only
    getArticles()
  }, [])

  // const [Loading, setLoading] = useState(false);
  // useEffect(() => {
  //   // ✨ grab the articles here, on first render only
  //   setLoading(true);
  //   getArticles()
  //     .then((res) => {
  //       setArticles(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false)
  //     })
  // }, [])

  const updateArticle = (articleId) => {
    setCurrentArticleId(articleId)
    navigate('/edit-article')
  }

  

  // const deleteArticle = (articleId) => {
  //   axiosWithAuth()
  //   .delete(`/articles/${articleId}`)
  //   .then(() => {
  //     getArticles()
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

  return (
    // ✨ fix the JSX: replace `Function.prototype` with actual functions

    <div className="articles">
      <h2>Articles</h2>
      {articles?.length > 0 ? (
        articles.map((art) => {
            return (
              <div className="article" key={art.articleId}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button  onClick={updateArticle}>Edit</button>
                  <button  onClick={() => deleteArticle(art.article_id)}>Delete</button>
                </div>
              </div>
            )}
            )
        ):(
          <p>No articles yet</p>
        )}
    </div>
  );
        }

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}