import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllRestaurantOrders,
  updateOrderStatus,
  cancelOrder,
} from '../../actions/resOrder';
import styles from './form.module.css';

const Orders = ({
  order: { allOrders },
  getAllRestaurantOrders,
  updateOrderStatus,
  cancelOrder,
}) => {
  const [orderData, setorderData] = useState({
    status: 'RECIEVED',
    id: '',
  });

  useEffect(() => {
    getAllRestaurantOrders();
  });

  const handleStatusChange = (e) => {
    e.preventDefault();
    updateOrderStatus(orderData.id, orderData.status);
  };

  const handleCancelOrder = (e, orderId) => {
    e.preventDefault();
    cancelOrder(orderId);
  };

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
            <td>
              <Fragment>
                {/* <form action='/action_page.php'> */}
                <select
                  className='select-css select-css-width'
                  name='status'
                  onChange={(e) =>
                    setorderData({
                      status: e.target.value,
                      id: order.order_id,
                    })
                  }
                >
                  <option>Select Status</option>
                  <option value='RECIEVED'>Order Recieved</option>
                  <option value='PREPARING'>Preparing</option>
                  {order.delivery_option === 'PICKUP' ? (
                    <Fragment>
                      {' '}
                      <option value='PICK UP READY'>Pick Up Ready</option>
                      <option value='PICKED UP'>Picked Up</option>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <option value='ON THE WAY'>On The Way</option>
                      <option value='DELIVERED'>Delivered</option>
                    </Fragment>
                  )}
                </select>
                <br />
                <button
                  className={styles.submit_btn}
                  onClick={(e) => handleStatusChange(e)}
                >
                  Update Status
                </button>
                {'  '}
                <button
                  className={styles.submit_btn}
                  onClick={(e) => handleCancelOrder(e, order.order_id)}
                >
                  Cancel Order
                </button>
                {/* </form> */}
              </Fragment>
            </td>
          </tr>
        </Fragment>
      );
    });
  };
  return (
    <Fragment>
      <div className='container'>
        <h1 className={styles.order_title}>Orders placed by customers</h1>
        <Link to='/restaurant/orders/new' className={styles.top_btn}>
          New Orders
        </Link>
        <Link to='/restaurant/orders/delivered' className={styles.top_btn}>
          Delivered Orders
        </Link>
        <Link to='/restaurant/orders/cancelled' className={styles.top_btn}>
          Cancelled Orders
        </Link>
        <table className={styles.orders_data}>
          <tr>
            <th>Customer name</th>
            <th>Order Date</th>
            <th>Delivery Option</th>
            <th>Order Type</th>
            <th>Current Order Status</th>
            <th>Update Status</th>
          </tr>
          {displayOrders(allOrders)}
        </table>
      </div>
    </Fragment>
  );
};

Orders.propTypes = {
  getAllRestaurantOrders: PropTypes.func.isRequired,
  updateOrderStatus: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.resOrder,
});

export default connect(mapStateToProps, {
  getAllRestaurantOrders,
  updateOrderStatus,
  cancelOrder,
})(Orders);
