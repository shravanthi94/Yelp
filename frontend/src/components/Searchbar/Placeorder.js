import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './form.module.css';
import { placeorder } from '../../actions/restaurants';

const Placeorder = ({ match, placeorder, history }) => {
  const [deliveryOpt, setdeliveryOpt] = useState('');

  const resId = match.params.res_id;
  console.log(resId);
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
          <div className={styles.form_group}>
            <label className={styles.form_label}>Delivery Option</label>
            <br />
            <small className={styles.form_text}>This field is required.</small>
            <input
              className={styles.my_text}
              type='text'
              name='deliveryOpt'
              value={deliveryOpt}
              onChange={(e) => setdeliveryOpt(e.target.value)}
              required
            />
          </div>
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
};

export default connect(null, { placeorder })(withRouter(Placeorder));
