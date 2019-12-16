import * as React from 'react';
import * as styles from '../css/main.scss';
import { UuidGenerator } from '../helpers';
import { Link, Container, IContainer } from '.';

type BreadcrumbType = {
  title: string;
  href?: string;
};

interface IBreadcrumbs extends IContainer {
  links: BreadcrumbType[];
  useNormalAnchor?: boolean;
}

export class Breadcrumbs extends React.Component<IBreadcrumbs, any> {
  public render() {
    return (
      <Container {...this.props} className={styles.breadcrumbs}>
        {this.props.links.map((link, index) => {
          const result = [];
          result.push(
            <Link key={UuidGenerator.generate()} href={link.href} useNormalAnchor={this.props.useNormalAnchor}>
              {link.title}
            </Link>
          );

          if (index < this.props.links.length - 1) {
            result.push(<span key={UuidGenerator.generate()}> > </span>);
          }

          return result;
        })}
      </Container>
    );
  }
}
