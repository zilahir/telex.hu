import React from 'react';

import styles from './Header.module.scss';
import telexLogo from '../../assets/img/telex/logo.png';

const Header = () => (
  <div className={styles.greetingsContainer}>
    <img src={telexLogo} alt="telex" />
  </div>
);

export default Header;
