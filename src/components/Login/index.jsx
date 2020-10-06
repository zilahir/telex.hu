import React, { useState } from 'react';
import { cloudFnPost } from '../../requests';
import { apiEndpoints } from '../../requests/apiEndpoints';

import styles from './Login.module.scss';

/**
 * @author zilahir
 * @function Login
 * */

const Login = () => {
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();

  function handleLogin() {
    cloudFnPost(apiEndpoints.authUser, {
      email: userName,
      password
    }).then(result => {
      console.debug('authResult', result);
    });
  }
  return (
    <div className={styles.loginContainer}>
      <div className={styles.oneInput}>
        <label>Felhasználói név</label>
        <input
          type="text"
          className={styles.input}
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div className={styles.oneInput}>
        <label>Jelszó</label>
        <input
          type="password"
          className={styles.input}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <div className={styles.oneInput}>
        <button
          className={styles.loginBtn}
          type="button"
          onClick={() => handleLogin()}
        >
          GYÍÍHAHH
        </button>
      </div>
    </div>
  );
};

export default Login;
