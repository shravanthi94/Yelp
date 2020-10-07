import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './form.module.css';
import { setAlert } from '../../actions/alert';
import { placeorder } from '../../actions/restaurants';

const Placeorder = ({ match, setAlert, placeorder, history }) => {
  const [deliveryOpt, setdeliveryOpt] = useState('');

  const resId = match.params.res_id;

  const onSubmit = (e) => {
    e.preventDefault();
    placeorder(resId, deliveryOpt, history);
  };

  return (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Place An Order</h1>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <select
            className='select-css'
            name='deliveryOpt'
            onChange={(e) => setdeliveryOpt(e.target.value)}
          >
            <option>Select option</option>
            <option value='DELIVERY'>Delivery</option>
            <option value='PICKUP'>Pick up</option>
          </select>
          <input type='submit' value='Place Order' className={styles.btn} />
          <div className={styles.btn_grey}>
            <Link to={`/restaurant/details/${resId}`}>Cancel</Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

Placeorder.propTypes = {
  placeorder: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { placeorder, setAlert })(withRouter(Placeorder));
