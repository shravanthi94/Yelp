import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './form.module.css';
import { setAlert } from '../../actions/alert';
import { placeorder } from '../../actions/restaurants';

const Placeorder = ({
  match,
  setAlert,
  placeorder,
  restaurant: { menu },
  history,
}) => {
  const [deliveryOpt, setdeliveryOpt] = useState('');
  const [item, setitem] = useState('');

  const resId = match.params.res_id;

  const onSubmit = (e) => {
    e.preventDefault();
    placeorder(resId, deliveryOpt, item, history);
  };

  const displayItems = () => {
    if (!menu) {
      return '';
    }
    return menu.map((each) => {
      return (
        <Fragment>
          <option value={each.item_name}>{each.item_name}</option>
        </Fragment>
      );
    });
  };

  return (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Place An Order</h1>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <h1 className={styles.form_label}>Select an item</h1>
          <br />
          <select
            className='select-css'
            name='item'
            onChange={(e) => setitem(e.target.value)}
          >
            <option>Select option</option>
            {displayItems()}
          </select>
          <hr />
          <h1 className={styles.form_label}>Select mode of delivery</h1>
          <br />
          <select
            className='select-css'
            name='deliveryOpt'
            onChange={(e) => setdeliveryOpt(e.target.value)}
          >
            <option>Select option</option>
            <option value='DELIVERY'>Delivery</option>
            <option value='PICKUP'>Pick up</option>
          </select>
          <br />
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

const mapStateToProps = (state) => ({
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, { placeorder, setAlert })(
  withRouter(Placeorder),
);
