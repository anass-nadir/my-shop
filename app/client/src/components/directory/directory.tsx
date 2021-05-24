import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import MenuItem from '../menuItem/menuItem';
// import withContainer from '../../hoc/withContainer';

import './directory.scss';

const Directory = () => {
  const categories = useAppSelector(
    ({ product: { categories } }) => categories
  ) as ICategory[];
  return (
    (categories && (
      <div className='directory-menu'>
        {categories.map((item: ICategory) => (
          <MenuItem key={item._id} {...item} />
        ))}
      </div>
    )) || <h1>There&lsquo;s nothing to display for now</h1>
  );
};

// export default withContainer({ stateName: 'product' })(Directory);
export default Directory;
