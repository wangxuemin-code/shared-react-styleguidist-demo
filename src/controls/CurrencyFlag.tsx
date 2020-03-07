import * as React from 'react';
import { countries, currencies, lookup } from 'country-data';
import { IContainer, Container } from '.';
import { AntCustomIcon } from '../index-prod';
import { antTableCellFixRightFirst } from '../css/main.scss';

interface IProps extends IContainer {
  country: string;
  type: 'currencies' | 'name' | 'alpha2';
  showName: boolean;
}

interface IState extends IContainer {
  country: any;
}

const malaysiaSvg = () => (
  <svg version='1.1' id='Layer_1' viewBox='0 0 512 512' width='2em' height='2em'>
    <circle style={{ fill: '#F0F0F0' }} cx='256' cy='256' r='256' />
    <g>
      <path style={{ fill: '#D80027' }} d='M244.87,256H512c0-23.107-3.08-45.489-8.819-66.783H244.87V256z' />
      <path
        style={{ fill: '#D80027' }}
        d='M244.87,122.435h229.556c-15.671-25.572-35.706-48.175-59.069-66.783H244.87V122.435z'
      />
      <path
        style={{ fill: '#D80027' }}
        d='M256,512c60.249,0,115.626-20.824,159.357-55.652H96.643C140.374,491.176,195.751,512,256,512z'
      />
      <path
        style={{ fill: '#D80027' }}
        d='M37.574,389.565h436.852c12.581-20.528,22.337-42.969,28.755-66.783H8.819
 		C15.236,346.596,24.993,369.037,37.574,389.565z'
      />
    </g>
    <path style={{ fill: '#0052B4' }} d='M256,256c0-141.384,0-158.052,0-256C114.616,0,0,114.616,0,256H256z' />
    <g>
      <path
        style={{ fill: '#FFDA44' }}
        d='M170.234,219.13c-34.962,0-63.304-28.343-63.304-63.304s28.343-63.304,63.304-63.304
 		c10.901,0,21.158,2.757,30.113,7.609c-14.048-13.737-33.26-22.217-54.461-22.217c-43.029,0-77.913,34.883-77.913,77.913
 		s34.884,77.913,77.913,77.913c21.201,0,40.413-8.48,54.461-22.217C191.392,216.373,181.136,219.13,170.234,219.13z'
      />
      <polygon
        style={{ fill: '#FFDA44' }}
        points='188.073,111.304 199.312,134.806 224.693,128.942 213.327,152.381 233.739,168.568 
 		208.325,174.297 208.396,200.348 188.073,184.05 167.749,200.348 167.819,174.297 142.405,168.568 162.817,152.381 151.45,128.942 
 		176.833,134.806 	'
      />
    </g>
  </svg>
);

const singaporeSvg = () => (
  <svg version='1.1' x='0px' y='0px' viewBox='0 0 512 512' width='2em' height='2em'>
    <circle style={{ fill: '#F0F0F0' }} cx='256' cy='256' r='256' />
    <path style={{ fill: '#D80027' }} d='M0,256.001C0,114.616,114.616,0,256,0s256,114.616,256,256.001' />
    <g>
      <path
        style={{ fill: '#F0F0F0' }}
        d='M155.826,133.564c0-37.298,26.213-68.456,61.217-76.101c-5.38-1.174-10.961-1.811-16.696-1.811
 		c-43.031,0-77.913,34.882-77.913,77.913s34.882,77.913,77.913,77.913c5.733,0,11.315-0.637,16.696-1.812
 		C182.039,202.021,155.826,170.863,155.826,133.564z'
      />
      <polygon
        style={{ fill: '#F0F0F0' }}
        points='256,61.217 261.526,78.222 279.407,78.222 264.94,88.733 270.466,105.738 256,95.229 
 		241.534,105.738 247.06,88.733 232.594,78.222 250.474,78.222 	'
      />
      <polygon
        style={{ fill: '#F0F0F0' }}
        points='212.625,94.608 218.15,111.614 236.031,111.614 221.565,122.124 227.091,139.129 
 		212.625,128.62 198.157,139.129 203.684,122.124 189.217,111.614 207.098,111.614 	'
      />
      <polygon
        style={{ fill: '#F0F0F0' }}
        points='299.376,94.608 304.903,111.614 322.783,111.614 308.316,122.124 313.843,139.129 
 		299.376,128.62 284.91,139.129 290.436,122.124 275.97,111.614 293.85,111.614 	'
      />
      <polygon
        style={{ fill: '#F0F0F0' }}
        points='282.681,144.695 288.207,161.701 306.087,161.701 291.621,172.211 297.147,189.216 
 		282.681,178.707 268.215,189.216 273.741,172.211 259.275,161.701 277.154,161.701 	'
      />
      <polygon
        style={{ fill: '#F0F0F0' }}
        points='229.32,144.695 234.845,161.701 252.727,161.701 238.26,172.211 243.787,189.216 
 		229.32,178.707 214.853,189.216 220.379,172.211 205.913,161.701 223.794,161.701 	'
      />
    </g>
  </svg>
);

const usSvg = () => (
  <svg version='1.1' x='0px' y='0px' viewBox='0 0 512 512' width='2em' height='2em'>
    <circle style={{ fill: '#F0F0F0' }} cx='256' cy='256' r='256' />
    <g>
      <path style={{ fill: '#D80027' }} d='M244.87,256H512c0-23.106-3.08-45.49-8.819-66.783H244.87V256z' />
      <path
        style={{ fill: '#D80027' }}
        d='M244.87,122.435h229.556c-15.671-25.572-35.708-48.175-59.07-66.783H244.87V122.435z'
      />
      <path
        style={{ fill: '#D80027' }}
        d='M256,512c60.249,0,115.626-20.824,159.356-55.652H96.644C140.374,491.176,195.751,512,256,512z'
      />
      <path
        style={{ fill: '#D80027' }}
        d='M37.574,389.565h436.852c12.581-20.529,22.338-42.969,28.755-66.783H8.819
 		C15.236,346.596,24.993,369.036,37.574,389.565z'
      />
    </g>
    <path
      style={{ fill: '#0052B4' }}
      d='M118.584,39.978h23.329l-21.7,15.765l8.289,25.509l-21.699-15.765L85.104,81.252l7.16-22.037
 	C73.158,75.13,56.412,93.776,42.612,114.552h7.475l-13.813,10.035c-2.152,3.59-4.216,7.237-6.194,10.938l6.596,20.301l-12.306-8.941
 	c-3.059,6.481-5.857,13.108-8.372,19.873l7.267,22.368h26.822l-21.7,15.765l8.289,25.509l-21.699-15.765l-12.998,9.444
 	C0.678,234.537,0,245.189,0,256h256c0-141.384,0-158.052,0-256C205.428,0,158.285,14.67,118.584,39.978z M128.502,230.4
 	l-21.699-15.765L85.104,230.4l8.289-25.509l-21.7-15.765h26.822l8.288-25.509l8.288,25.509h26.822l-21.7,15.765L128.502,230.4z
 	 M120.213,130.317l8.289,25.509l-21.699-15.765l-21.699,15.765l8.289-25.509l-21.7-15.765h26.822l8.288-25.509l8.288,25.509h26.822
 	L120.213,130.317z M220.328,230.4l-21.699-15.765L176.93,230.4l8.289-25.509l-21.7-15.765h26.822l8.288-25.509l8.288,25.509h26.822
 	l-21.7,15.765L220.328,230.4z M212.039,130.317l8.289,25.509l-21.699-15.765l-21.699,15.765l8.289-25.509l-21.7-15.765h26.822
 	l8.288-25.509l8.288,25.509h26.822L212.039,130.317z M212.039,55.743l8.289,25.509l-21.699-15.765L176.93,81.252l8.289-25.509
 	l-21.7-15.765h26.822l8.288-25.509l8.288,25.509h26.822L212.039,55.743z'
    />
  </svg>
);

const japanSvg = () => (
  <svg version='1.1' x='0px' y='0px' viewBox='0 0 512 512' width='2em' height='2em'>
    <circle style={{ fill: '#F0F0F0' }} cx='256' cy='256' r='256' />
    <circle style={{ fill: '#D80027' }} cx='256' cy='256' r='111.304' />
  </svg>
);

const indiaSvg = () => (
  <svg version='1.1' width='2em' height='2em' x='0px' y='0px' viewBox='0 0 512 512'>
    <circle style={{ fill: '#F0F0F0' }} cx='256' cy='256' r='256' />
    <path
      style={{ fill: '#FF9811' }}
      d='M256,0C154.506,0,66.81,59.065,25.402,144.696h461.195C445.19,59.065,357.493,0,256,0z'
    />
    <path
      style={{ fill: '#6DA544' }}
      d='M256,512c101.493,0,189.19-59.065,230.598-144.696H25.402C66.81,452.935,154.506,512,256,512z'
    />
    <circle style={{ fill: '#0052B4' }} cx='256' cy='256' r='89.043' />
    <circle style={{ fill: '#F0F0F0' }} cx='256' cy='256' r='55.652' />
    <polygon
      style={{ fill: '#0052B4' }}
      points='256,187.326 273.169,226.264 315.473,221.663 290.337,256 315.473,290.337 273.169,285.736 
 	256,324.674 238.831,285.736 196.527,290.336 221.663,256 196.527,221.663 238.831,226.264 '
    />
  </svg>
);

const euroSvg = () => (
  <svg version='1.1' x='0px' y='0px' width='2em' height='2em' viewBox='0 0 512 512'>
    <circle style={{ fill: '#0052B4' }} cx='256' cy='256' r='256' />
    <g>
      <polygon
        style={{ fill: '#FFDA44' }}
        points='256.001,100.174 264.29,125.683 291.11,125.683 269.411,141.448 277.7,166.957 
 		256.001,151.191 234.301,166.957 242.59,141.448 220.891,125.683 247.712,125.683 	'
      />
      <polygon
        style={{ fill: '#FFDA44' }}
        points='145.814,145.814 169.714,157.99 188.679,139.026 184.482,165.516 208.381,177.693 
 		181.89,181.889 177.694,208.381 165.517,184.482 139.027,188.679 157.992,169.714 	'
      />
      <polygon
        style={{ fill: '#FFDA44' }}
        points='100.175,256 125.684,247.711 125.684,220.89 141.448,242.59 166.958,234.301 151.191,256 
 		166.958,277.699 141.448,269.411 125.684,291.11 125.684,264.289 	'
      />
      <polygon
        style={{ fill: '#FFDA44' }}
        points='145.814,366.186 157.991,342.286 139.027,323.321 165.518,327.519 177.693,303.62 
 		181.89,330.111 208.38,334.307 184.484,346.484 188.679,372.974 169.714,354.009 	'
      />
      <polygon
        style={{ fill: '#FFDA44' }}
        points='256.001,411.826 247.711,386.317 220.891,386.317 242.591,370.552 234.301,345.045 
 		256.001,360.809 277.7,345.045 269.411,370.552 291.11,386.317 264.289,386.317 	'
      />
      <polygon
        style={{ fill: '#FFDA44' }}
        points='366.187,366.186 342.288,354.01 323.322,372.975 327.519,346.483 303.622,334.307 
 		330.112,330.111 334.308,303.62 346.484,327.519 372.974,323.321 354.009,342.288 	'
      />
      <polygon
        style={{ fill: '#FFDA44' }}
        points='411.826,256 386.317,264.289 386.317,291.11 370.552,269.41 345.045,277.699 360.81,256 
 		345.045,234.301 370.553,242.59 386.317,220.89 386.317,247.712 	'
      />
      <polygon
        style={{ fill: '#FFDA44' }}
        points='366.187,145.814 354.01,169.714 372.975,188.679 346.483,184.481 334.308,208.38 
 		330.112,181.889 303.622,177.692 327.519,165.516 323.322,139.027 342.289,157.991 	'
      />
    </g>
  </svg>
);

export class CurrencyFlag extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    country: '',
    type: 'name',
    showName: false
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      country: {}
    };
  }

  public componentDidMount = () => {
    this.getCountry(this.props.country, this.props.type);
  };

  public render() {
    return (
      <Container display={'flex'}>
        <AntCustomIcon component={this.renderIcon(this.state.country)} style={{ marginRight: '10px' }} />
        {this.props.showName && this.props.type === 'currencies' && (
          <>
            {this.state.country.code}
            {' - '}
            {this.state.country.name}
          </>
        )}
      </Container>
    );
  }

  private getCountry = (input: any, type: 'currencies' | 'name' | 'alpha2') => {
    input = String(input);
    let country;
    if (type === 'currencies') {
      country = currencies.all.filter((currency: any) => currency.code.toUpperCase() === input.toUpperCase())[0];
    } else {
      input =
        type === 'name'
          ? input
              .split(' ')
              .map((char: string) =>
                char
                  .charAt(0)
                  .toUpperCase()
                  .concat(char.slice(1))
              )
              .join(' ')
          : input.toUpperCase();
      country = lookup.countries({ [type]: input })[0];
    }
    this.setState({ country });
  };

  private renderIcon = (country: any) => {
    switch (country.name) {
      case 'Malaysia':
      case 'Malaysian ringgit':
        return malaysiaSvg;
        break;
      case 'Singapore':
      case 'Singapore dollar':
        return singaporeSvg;
        break;
      case 'United States':
      case 'United States dollar':
        return usSvg;
        break;
      case 'Japan':
      case 'Japanese yen':
        return japanSvg;
        break;
      case 'India':
      case 'Indian rupee':
        return indiaSvg;
        break;
      case 'European Union':
      case 'Euro':
        return euroSvg;
        break;

      default:
        break;
    }
  };
}

export default CurrencyFlag;
