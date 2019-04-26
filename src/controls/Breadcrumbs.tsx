import * as React from 'react';
import { Container, IContainer } from './Container';
import { Link } from './Link';
import * as styles from '../css/main.scss';
var uniqid = require('uniqid');

type BreadcrumbType = {
  title: string;
  href?: string;
};

interface IBreadcrumbs extends IContainer {
  links: BreadcrumbType[];
}

export class Breadcrumbs extends React.Component<IBreadcrumbs, any> {
  public render() {
    return (
      <Container {...this.props} className={styles.breadcrumbs}>
        {this.props.links.map((link, index) => {
          const result = [];
          result.push(
            <Link key={uniqid().toString()} href={link.href} useNormalAnchor>
              {link.title}
            </Link>
          );

          if (index < this.props.links.length - 1) {
            result.push(<span key={uniqid().toString()}> > </span>);
          }

          return result;
        })}
      </Container>
    );
  }
}
