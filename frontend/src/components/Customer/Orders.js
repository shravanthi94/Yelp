import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './form.module.css';
import spinner from '../layout/Spinner';
import { getAllOrders } from '../../actions/cusOrder';

const Orders = ({ getAllOrders, orders: { allorders, loading } }) => {
  useEffect(() => {
    getAllOrders();
  }, []);

  const displayOrders = (orders) => {
    return orders.map((order) => {
      return (
        <tr>
          <td>{order.restaurant_name}</td>
          <td>{order.item_name}</td>
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
        <Link to='/customer/orders/received' className={styles.top_btn}>
          Received
        </Link>
        <Link to='/customer/orders/preparing' className={styles.top_btn}>
          Preparing
        </Link>
        <Link to='/customer/orders/delivery' className={styles.top_btn}>
          Delivery
        </Link>
        <Link to='/customer/orders/pickup' className={styles.top_btn}>
          Pickup
        </Link>
        <br />
        <hr />
        <h1 className={styles.title}>All Orders</h1>
        <table>
          <tr>
            <th>Restaurant Name</th>
            <th>Item Name</th>
            <th>Order Date</th>
            <th>Delivery Option</th>
            <th>Order Status</th>
          </tr>
          {displayOrders(allorders)}
        </table>
      </div>
    </Fragment>
  );
};

Orders.propTypes = {
  getAllOrders: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.cusOrder,
});

export default connect(mapStateToProps, { getAllOrders })(Orders);
