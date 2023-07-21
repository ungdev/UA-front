import PropTypes from 'prop-types';

const Navbar = ({ isLoggedIn, action }) => {
  return 'Navbar';
};

Navbar.propTypes = {
  /**
   * Is the user logged in ?
   */
  isLoggedIn: PropTypes.bool.isRequired,
  /**
   * An object reprensenting the action and state parameters passed in the url
   */
  action: PropTypes.shape({ action: PropTypes.string, state: PropTypes.string }),
};

Navbar.defaultProps = {
  action: { action: '', state: '' },
};

export default Navbar;
