import React from 'react';

import styles from './Header.module.scss';
import telexLogo from '../../assets/img/telex/logo.png';

const Header = () => (
  <div className={styles.logoContainer}>
    <img src={telexLogo} alt="telex" />
    <p>community</p>
  </div>
);

export default Header;
