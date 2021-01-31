import React from 'react';
import { withRouter } from 'react-router-dom';

import './menuItem.scss';

const MenuItem = ({ item, history, match }) => (
  <div
    className={`${item.size} menu-item`}
    onClick={() => history.push(`${match.url}shop/${item._id}`)}
  >
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${item.imageUrl})`
      }}
    />
    <div className='content'>
      <h1 className='title'>{item.title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
