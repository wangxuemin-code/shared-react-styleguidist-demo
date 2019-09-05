import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';

interface IProps extends IContainer {
  variant?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'disabled'
    | 'light'
    | 'dark'
    | 'success'
    | 'warning'
    | 'danger';
  headline?: string;
  title?: string;
  subtitle?: string;
}

export class HighlightedInfo extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    let classes: string[] = [styles.informationContainer, this.props.variant || ''];

    let headlineClasses: string[] = [styles.headlineContainer, this.props.variant || ''];

    classes = classes.filter(function(el) {
      return el != '';
    });

    headlineClasses = headlineClasses.filter(function(el) {
      return el != '';
    });

    return (
      <Container>
        {this.props.headline && (
          <Container className={headlineClasses.join(' ')} position={'absolute'}>
            {this.props.headline}
          </Container>
        )}
        <Container className={classes.join(' ')} position={'relative'}>
          {this.props.children}
          {!this.props.children && (
            <>
              <p className={'title'}>{this.props.title}</p>
              <p className={'subtitle'}>{this.props.subtitle}</p>
            </>
          )}
        </Container>
      </Container>
    );
  }
}
