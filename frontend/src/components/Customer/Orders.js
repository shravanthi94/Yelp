import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './form.module.css';
import { getAllOrders } from '../../actions/cusOrder';

const Orders = ({ getAllOrders }) => {
  useEffect(() => {
    getAllOrders();
  }, []);
  return <Fragment></Fragment>;
};

Orders.propTypes = {
  getAllOrders: PropTypes.func.isRequired,
};

export default connect(null, { getAllOrders })(Orders);
