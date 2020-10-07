import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Dashboard.module.css';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';

const Images = ({ location, setAlert }) => {
  const images = location.state.images;
  console.log(images);
  if (images === '1' || !images) {
    setAlert('No images added', 'danger');
  }
  let files = images.split(',');
  console.log(files);
  files.shift();

  const displayImages = () => {
    return files.map((file) => {
      return (
        <img
          className='dish_img'
          src={`http://localhost:3001/images/dish/${file}`}
          alt='Dish_Image'
        />
      );
    });
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.heading}>Dish Images:</h1>
        <p>{displayImages()}</p>
        <Link to='/restaurant/profile' className={styles.btn}>
          Back
        </Link>
      </div>
    </Fragment>
  );
};

Images.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Images);
