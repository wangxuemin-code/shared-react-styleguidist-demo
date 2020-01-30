import * as React from 'react';
import * as styles from '../css/main.scss';
import { WrapperContainer, Container, IContainer, Grid, Link, Image } from '.';
import ReactIcon from '@ant-design/icons';

interface IProps extends IContainer {
  detailed?: boolean;
  noWrapper?: boolean;
}

export class Footer extends React.Component<IProps, any> {
  facebookIcon = () => (
    <svg fill='currentColor' width='1em' height='1em' viewBox='0 0 448 512'>
      <path d='M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z' />
    </svg>
  );
  twitterIcon = () => (
    <svg fill='currentColor' width='1em' height='1em' viewBox='0 0 512 512'>
      <path d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z' />
    </svg>
  );
  linkedinIcon = () => (
    <svg fill='currentColor' width='1em' height='1em' viewBox='0 0 448 512'>
      <path d='M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z' />
    </svg>
  );
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
                        variant='light'
                        padding={{ topRem: 2 }}
                        target='_blank'
                        href='https://www.istox.com/about-us'
                        useNormalAnchor={true}
                      >
                        About Us
                      </Link>
                      <br />
                      <Link
                        variant='light'
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
                        variant='light'
                        padding={{ topRem: 2 }}
                        target='_blank'
                        href='https://istox.zendesk.com/hc/en-us'
                        useNormalAnchor={true}
                      >
                        FAQ
                      </Link>
                      <br />
                      <Link
                        variant='light'
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
                  <Container className={styles.socialIcons} padding={{ topRem: 0.6 }} float={'right'}>
                    <Link
                      variant='light'
                      underline={false}
                      padding={{ rightRem: 1 }}
                      target='_blank'
                      href='https://www.facebook.com/iSTOXsg/'
                      useNormalAnchor={true}
                    >
                      <ReactIcon component={this.facebookIcon} />
                    </Link>
                    <Link
                      variant='light'
                      underline={false}
                      padding={{ rightRem: 1 }}
                      target='_blank'
                      href='https://www.linkedin.com/company/istox/'
                      useNormalAnchor={true}
                    >
                      <ReactIcon component={this.linkedinIcon} />
                    </Link>
                    <Link
                      variant='light'
                      underline={false}
                      target='_blank'
                      href='https://twitter.com/istoxexchange'
                      useNormalAnchor={true}
                    >
                      <ReactIcon component={this.twitterIcon} />
                    </Link>
                  </Container>
                </Grid.Col>
              </Grid.Row>
            )}
            <Grid.Row fitted padding={{ topRem: this.props.detailed ? 2 : 0 }}>
              <Grid.Col col={6}>
                <Container className={'small'} float={'left'}>
                  © iSTOX 2020. All rights reserved.
                </Container>
              </Grid.Col>
              <Grid.Col col={6}>
                <Container className={'small'} float={'right'}>
                  <Link
                    variant='light'
                    margin={{ rightRem: 1 }}
                    href='https://www.istox.com/Company/iSTOX_Terms_and_Conditions.pdf'
                    useNormalAnchor={true}
                  >
                    Terms and Conditions
                  </Link>
                  <Link
                    variant='light'
                    margin={{ rightRem: 1 }}
                    href='https://www.istox.com/privacy'
                    useNormalAnchor={true}
                  >
                    Privacy Policy
                  </Link>
                  <Link variant='light' href='https://www.istox.com/cookie' useNormalAnchor={true}>
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
