import * as React from 'react';
import { MyComponent } from './MyComponent';
import { Container, IContainer } from './Container';
import { Row, Col } from 'react-bootstrap';
import { Text } from './Text';
import { Icon } from './Icon';
import { faSearchMinus, faFileAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

interface IProps extends IContainer {
  title?: string;
  content?: string;
  icon?: any;
  type?: '404' | '500' | 'no_results' | 'others';
}

export class ErrorView extends MyComponent<IProps, any> {
  public static defaultProps: IProps = {
    title: '',
    content: '',
    icon: faSearchMinus,
    type: 'others'
  };
  public render() {
    let icon = this.props.icon;
    let content = this.props.content;
    let title = this.props.title;

    if (this.props.type === '404') {
      icon = faFileAlt;
      title = '404 not found';
      content = 'Nothing here...';
    } else if (this.props.type === '500') {
      icon = faExclamationCircle;
      title = 'Whoops!';
      content = 'Something unfortunate happened...';
    } else if (this.props.type === 'no_results') {
      icon = faSearchMinus;
      title = 'No results found';
      content = 'Nothing here...';
    }

    return (
      <Container {...this.props} widthPercent={100} textAlign={'center'}>
        <Row>
          <Col sm={12}>
            <Icon fontSize={200} icon={icon} color={'#858585'} />
            <Text color={'#9e9e9e'} fontSize={40}>
              {title}
            </Text>
            <Text color={'#9e9e9e'} fontSize={20} margin={{ top: 10 }}>
              {content}
            </Text>
          </Col>
        </Row>
      </Container>
    );
  }
}
