import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import PT from 'prop-types';
import axiosWithAuth from '../axios';

export default function Articles(props) {
  // ✨ where are my props? Destructure them here
   const {
    // articles = [],
    articles,
    getArticles,
    setCurrentArticleId,
    currentArticleId
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

  const updateArticle = (articleId) => {
    setCurrentArticleId(articleId)
    navigate('/edit-article')
  }

  const deleteArticle = (articleId) => {
    axiosWithAuth()
    .delete(`/articles/${articleId}`)
    .then(() => {
      getArticles()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      <h2>Articles</h2>
      {
        articles && articles.length ? articles.map((art) => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button disabled={currentArticleId !== art.article_id} onClick={updateArticle}>Edit</button>
                  <button disabled={currentArticleId !== art.article_id} onClick={deleteArticle}>Delete</button>
                </div>
              </div>
            )
          }) : 'No articles yet'
      }
    </div>
  )
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
