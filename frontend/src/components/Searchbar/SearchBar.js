import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

const SearchBar = (props) => {
  return (
    <Fragment>
      <div className='search'>
        <div class='left-side'>
          <input
            type='text'
            placeholder="tacos, cheap dinner, Max's"
            class='field request'
          />
          <div class='field-wrapper'>
            <span class='field-title find'>Find</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
