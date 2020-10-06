import React from 'react';

import Header from '../../components/Header/index';
import Login from '../../components/Login';

import styles from './Popup.module.scss';

const Popup = () => {
  return (
    <div className={styles.rootContainer}>
      <Header />
      <Login />
    </div>
  );
};

export default Popup;
