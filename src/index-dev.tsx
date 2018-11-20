import * as React from 'react';
import { Container } from './controls';
import * as ReactDOM from 'react-dom';
import * as styles from './css/main.scss';

const render = () => {
  ReactDOM.render(
    <Container className={styles.bold}>aaaaa</Container>,
    document.getElementById('reactContainer')
  );
};

render();
