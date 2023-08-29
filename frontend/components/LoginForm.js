import React, { useState } from 'react'
import PT from 'prop-types'
import useLogin from './login'


const initialFormValues = {
  username: '',
  password: '',
}

const loginRedirect = async ({ username, password }) => {
  setSpinnerOn(true);
  const res = await axios.post(loginUrl, { username, password });

  if (res.status === 200) {
    localStorage.setItem("token", res.data.token);
    setMessage(res.data.message);
    setSpinnerOn(false);
    navigate("/articles");
  } else {
    setMessage(res.data.message);
    setSpinnerOn(false);
  }
};

export default function LoginForm(props) {
  // ✨ where are my props? Destructure them here
  const [values, setValues] = useState(initialFormValues)
  const {login, message, spinnerOn} = useLogin();
 
  const onChange = evt => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // ✨ implement
    login(values)
    // setValues(initialFormValues)
    setMessage(`Here are your articles, ${values.username}`);
  }

  const isDisabled = () => {
    // ✨ implement
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
    const trimmedUsername = values.username.trim();
    const trimmedPassword = values.password.trim();
    return trimmedUsername < 3 || trimmedPassword.length <8;
  };

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      {spinnerOn && <p>Loading...</p>}
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}