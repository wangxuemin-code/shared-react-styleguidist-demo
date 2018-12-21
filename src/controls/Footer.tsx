import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagram,
  faBlogger
} from '@fortawesome/free-brands-svg-icons';
import * as React from 'react';
import { Icon } from '.';
import * as styles from '../css/main.scss';
import { Container } from './Container';

library.add(faFacebookSquare as any);

export class Footer extends React.Component<any, any> {
  public render() {
    return (
      <Container {...this.props} className={styles.istoxFooterContainer}>
        <Container className={styles.istoxFooter}>
          <Container className={styles.iconContainer}>
            <Icon icon={faFacebookSquare} />
            <Icon icon={faTwitterSquare} />
            <Icon icon={faInstagram} />
            <Icon icon={faBlogger} />
          </Container>
          <Container className={styles.contactContainer}>
            3 Temasek Blvd, Singapore 038983
          </Container>
          <Container className={styles.copyrightContainer}>Copyright © 2018 iStox</Container>
        </Container>
      </Container>
    );
  }
}
