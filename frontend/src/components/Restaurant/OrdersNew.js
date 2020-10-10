import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './form.module.css';

const OrdersNew = ({ order: { allOrders }, setAlert }) => {
  const displayOrders = (orders) => {
    return orders.map((order) => {
      return (
        <Fragment>
          <tr>
            <td>{order.customer_name}</td>
            <td>{order.order_date.substring(0, 10)}</td>
            <td>{order.delivery_option}</td>
            <td>{order.order_type}</td>
            <td>{order.order_status}</td>
          </tr>
        </Fragment>
      );
    });
  };

  let newOrders = allOrders.filter((order) => order.order_type === 'NEW');

  if (newOrders.length === 0) {
    setAlert('None to display', 'danger');
    return <Redirect to='/restaurant/orders' />;
  }

  return (
    <Fragment>
      <div className='container'>
        <h1 className={styles.order_title}>NEW Orders placed by customers</h1>
        <table className={styles.orders_data}>
          <tr>
            <th>Customer name</th>
            <th>Order Date</th>
            <th>Delivery Option</th>
            <th>Order Type</th>
            <th>Current Order Status</th>
          </tr>
          {displayOrders(newOrders)}
        </table>
        <br /> <br />
        <Link to='/restaurant/orders' className={styles.top_btn}>
          Back
        </Link>
      </div>
    </Fragment>
  );
};

OrdersNew.propTypes = {
  setAlert: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.resOrder,
});

export default connect(mapStateToProps, { setAlert })(OrdersNew);
