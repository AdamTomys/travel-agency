import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, changeDuration, markTagChecked, markTagUnchecked} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  changeDuration: (type, value) => dispatch(changeDuration(type, value)),
  markTagChecked: tag => dispatch(markTagChecked(tag)),
  markTagUnchecked: index => dispatch(markTagUnchecked(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
