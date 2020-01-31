import { countries } from 'country-data';
const updateData: any = {
  'Iran, Islamic Republic Of': 'Iran',
  "Lao People's Democratic Republic": 'Laos',
  'Korea, Republic Of': 'South Korea',
  "Korea, Democratic People's Republic Of": 'North Korea',
  'Syrian Arab Republic': 'Syria',
  'Tanzania, United Republic Of': 'Tanzania',
  'Venezuela, Bolivarian Republic Of': 'Venezuela',
  'Viet Nam': 'Vietnam',
  'Bolivia, Plurinational State Of': 'Bolivia',
  'Bosnia & Herzegovina': 'Bosnia And Herzegovina',
  'Virgin Islands (British)': 'British Virgin Islands',
  'Brunei Darussalam': 'Brunei',
  'Cabo Verde': 'Cape Verde',
  'Republic Of Congo': 'Congo (Republic Of)',
  "Côte d'Ivoire": "Cote D'Ivoire (Ivory Coast)",
  'Heard Island And McDonald Islands': 'Heard And Mcdonald Islands',
  Macao: 'Macau',
  'Macedonia, The Former Yugoslav Republic Of': 'Macedonia',
  'Micronesia, Federated States Of': 'Micronesia',
  'Timor-Leste, Democratic Republic of': 'Timor-Leste',
  'Vatican City State': 'Vatican',
  'Wallis And Futuna': 'Wallis And Futuna Island'
};
const countriesData = countries.all.map((v) => {
  return {
    ...v,
    name: !!updateData[v.name] ? updateData[v.name] : v.name
  };
});
export default {
  all: countriesData
};
