import {connect} from 'react-redux';
import Countries from './Countries';
import {getAllCountries} from '../../../redux/countriesRedux';

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  
  return {
    id: id,
    countries: getAllCountries(state),
  };
};

export default connect(mapStateToProps)(Countries);
