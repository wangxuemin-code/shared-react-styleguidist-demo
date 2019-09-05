import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import * as React from 'react';
import { Icon } from '.';
import { Image } from '.';
import { Divider } from '.';
import { Link } from '.';
import { Grid } from '.';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { WrapperContainer } from './WrapperContainer';

library.add(faFacebookSquare as any);

interface IProps extends IContainer {
  detailed?: boolean;
  noWrapper?: boolean;
}
export class Footer extends React.Component<IProps, any> {
  public render() {
    return (
      <Container display={'flex'} {...this.props} className={styles.istoxFooterContainer}>
        {this.getFooterWrapper(
          <Grid>
            {this.props.detailed && (
              <Grid.Row fitted>
                <Grid.Col col={3}>
                  <Image float={'left'} width={120} variant={'logo alt'} />
                </Grid.Col>
                <Grid.Col col={6}>
                  <Grid.Row fitted>
                    <Grid.Col col={6}>
                      <h6>Learn More</h6>
                      <Link
                        padding={{ topRem: 2 }}
                        target='_blank'
                        href='https://www.istox.com/about-us'
                        useNormalAnchor={true}
                      >
                        About Us
                      </Link>
                      <br />
                      <Link
                        padding={{ topRem: 1 }}
                        target='_blank'
                        href='https://medium.com/istox'
                        useNormalAnchor={true}
                      >
                        iSTOX News
                      </Link>
                    </Grid.Col>
                    <Grid.Col col={6}>
                      <h6>&nbsp;</h6>
                      <Link
                        padding={{ topRem: 2 }}
                        target='_blank'
                        href='https://istox.zendesk.com/hc/en-us'
                        useNormalAnchor={true}
                      >
                        FAQ
                      </Link>
                      <br />
                      <Link
                        padding={{ topRem: 1 }}
                        target='_blank'
                        href='https://www.istox.com/careers'
                        useNormalAnchor={true}
                      >
                        Jobs@iSTOX
                      </Link>
                    </Grid.Col>
                  </Grid.Row>
                </Grid.Col>
                <Grid.Col col={3}>
                  <Container float={'right'}>
                    <Link
                      underline={false}
                      padding={{ rightRem: 1 }}
                      target='_blank'
                      href='https://www.linkedin.com/company/istox/'
                      useNormalAnchor={true}
                    >
                      <Icon size='small' icon={faLinkedin} />
                    </Link>
                    <Link
                      underline={false}
                      target='_blank'
                      href='https://twitter.com/istoxexchange'
                      useNormalAnchor={true}
                    >
                      <Icon size='small' icon={faTwitterSquare} />
                    </Link>
                  </Container>
                </Grid.Col>
              </Grid.Row>
            )}
            <Grid.Row fitted padding={{ topRem: this.props.detailed ? 2 : 0 }}>
              <Grid.Col col={6}>
                <Container className={'small'} float={'left'}>
                  © iSTOX 2019. All rights reserved.
                </Container>
              </Grid.Col>
              <Grid.Col col={6}>
                <Container className={'small'} float={'right'}>
                  <Link
                    margin={{ rightRem: 1 }}
                    href='https://www.istox.com/legal#terms'
                    useNormalAnchor={true}
                  >
                    Terms and Condition
                  </Link>
                  <Link
                    margin={{ rightRem: 1 }}
                    href='https://www.istox.com/legal#privacy'
                    useNormalAnchor={true}
                  >
                    Privacy Policy
                  </Link>
                  <Link href='https://www.istox.com/legal#cookie' useNormalAnchor={true}>
                    Cookie Policy
                  </Link>
                </Container>
              </Grid.Col>
            </Grid.Row>
          </Grid>
        )}
      </Container>
    );
  }

  private getFooterWrapper(children: any) {
    if (this.props.noWrapper) {
      return children;
    } else {
      return <WrapperContainer verticalAlign='center'>{children}</WrapperContainer>;
    }
  }
}
