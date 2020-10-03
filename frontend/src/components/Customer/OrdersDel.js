import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import styles from './form.module.css';
import spinner from '../layout/Spinner';

const OrdersDel = ({ orders: { allorders, loading }, setAlert }) => {
  const displayOrders = (orders) => {
    orders = orders.filter(
      (order) =>
        order.order_status === 'ON THE WAY' ||
        order.order_status === 'DELIVERED',
    );
    if (orders.length === 0) {
      setAlert('No orders to display', 'danger');
    }
    return orders.map((order) => {
      return (
        <tr>
          <td>{order.restaurant_name}</td>
          <td>{order.order_date.substring(0, 10)}</td>
          <td>{order.delivery_option}</td>
          <td>{order.order_status}</td>
        </tr>
      );
    });
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className='container'>
        <h1 className={styles.form_title}>Orders Placed By You</h1>
        <hr />
        <h1 className={styles.title}>Pick Up Orders</h1>
        <table>
          <tr>
            <th>Restaurant Name</th>
            <th>Order Date</th>
            <th>Delivery Option</th>
            <th>Order Status</th>
          </tr>
          {displayOrders(allorders)}
        </table>
        <br />
        <br />
        <Link to='/customer/orders' className={styles.top_btn}>
          Back to All Orders
        </Link>
      </div>
    </Fragment>
  );
};

OrdersDel.propTypes = {
  setAlert: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.cusOrder,
});

export default connect(mapStateToProps, { setAlert })(OrdersDel);
