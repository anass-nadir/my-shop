import { useHistory } from 'react-router-dom';

import './menuItem.scss';

const MenuItem = (item: ICategory) => {
  const { push } = useHistory();
  return (
    <div className='menu-item' onClick={() => push(`shop/${item._id}`)}>
      {(item.imagesUrls?.length && (
        <div
          className='background-image'
          style={{
            backgroundImage: `url(${item.imagesUrls[0]})`
          }}
        />
      )) ||
        null}
      <div className='content'>
        <h1 className='title'>{item.title?.toUpperCase()}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  );
};

export default MenuItem;
