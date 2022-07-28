import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom';
import { login, addSnackbar } from '../actions';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useHistory()

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const doLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password}))
    if (result.payload) {
      navigate.replace('calculator');
    } else {
      if (result?.error?.response?.status === 403) {
        dispatch(addSnackbar({ text: 'Sinua ei kyllä päästetä sisään!'}))
      } else {
        dispatch(addSnackbar({ text: 'Ovi on epäkunnossa - tule myöhemmin uudelleen!'}))
      }
    }
  }

  return (
    <div className="login-form-wrapper container-wooden-borders">
      <form className="form-horizontal bg-blackboard p-4">
        <div className="form-group mb-4">
          <div className="">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="KutsumaNimi"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
        </div>
        <div className="form-group mb-4">
          <div>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="TunnussaNa"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <div className="form-group mt-4 mb-0">
          <div>
            <input
              type="submit"
              className="btn btn-block btn-lg btn-wood bg-wood-force"
              value="KÄY SISÄÄN"
              onClick={doLogin}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
