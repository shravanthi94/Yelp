import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './form.module.css';
import spinner from '../layout/Spinner';
import {
  updateDish,
  getCurrentDashboard,
  uploadDishImage,
} from '../../actions/dashboard';

const UpdateItem = ({
  dashboard: { menu, loading },
  updateDish,
  history,
  getCurrentDashboard,
  uploadDishImage,
  location,
}) => {
  const [formData, setformData] = useState({
    name: '',
    ingredients: '',
    price: '',
    description: '',
    category: '',
  });

  const [image, setimage] = useState({
    file: '',
    fileText: 'Choose image...',
  });

  // Get the state of the item to be updated
  const item = menu.filter((each) => each.item_id === location.state.itemId);

  useEffect(() => {
    getCurrentDashboard();
    if (item[0]) {
      setformData({
        name: loading || !item[0].item_name ? '' : item[0].item_name,
        ingredients:
          loading || !item[0].item_ingredients ? '' : item[0].item_ingredients,
        price: loading || !item[0].item_price ? '' : item[0].item_price,
        description:
          loading || !item[0].item_description ? '' : item[0].item_description,
        category:
          loading || !item[0].item_category ? '' : item[0].item_category,
      });
    }
  }, [loading]);

  const { name, ingredients, price, description, category } = formData;

  const onImageChange = (e) => {
    setimage({
      file: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  };

  const onUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image.file);
    uploadDishImage(formData, location.state.itemId);
  };

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateDish(formData, history, location.state.itemId);
  };

  return loading && menu === null ? (
    spinner
  ) : (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Update Dish</h1>
        <form onSubmit={(e) => onUpload(e)}>
          <br />
          <div className={styles.form_group}>
            <label className={styles.form_label}>Item pictures</label>
            <br /> <br />
            <input
              type='file'
              class='custom-file-input'
              name='image'
              accept='image/*'
              onChange={(e) => onImageChange(e)}
            />
            <label htmlFor='image'>{image.fileText}</label>
          </div>
          <button type='submit' className={styles.btn}>
            Upload
          </button>
        </form>
        <hr />
        <p className='lead'>
          <i class='fas fa-utensils'></i> List your amazing dishes here...
        </p>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Dish Name</label>
            <br />
            <small className={styles.form_text}>This field is required.</small>
            <input
              className={styles.my_text}
              type='text'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Main Ingredients</label>
            <br />
            <small className={styles.form_text}>This field is required.</small>
            <input
              className={styles.my_text}
              type='text'
              name='ingredients'
              value={ingredients}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Price</label>
            <br />
            <small className={styles.form_text}>
              The amount is in USD ($12.50, $32.54)
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='price'
              value={price}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Description</label>
            <br />
            <small className={styles.form_text}>
              We sell continental, Italian...
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Category</label>
            <br />
            <small className={styles.form_text}>
              Appetizer, Salads, Main Course , Desserts, Beverages
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='category'
              value={category}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' value='Update Dish' className={styles.btn} />
          <div className={styles.btn_grey}>
            <Link to='/restaurant/profile'>Cancel</Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

UpdateItem.propTypes = {
  updateDish: PropTypes.func.isRequired,
  getCurrentDashboard: PropTypes.func.isRequired,
  uploadDishImage: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, {
  updateDish,
  getCurrentDashboard,
  uploadDishImage,
})(withRouter(UpdateItem));
