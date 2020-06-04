import React, { Component } from 'react'
import { data } from "./shop.data"
import CollectionPreview from '../../components/collectionPreview/collectionPreview';
export class shop extends Component {
      constructor() {
            super()
            this.state = {
                  collections: data
            }
      }

      render() {
            const { collections } = this.state;
            return (
                  <div className='shop-page'>
                        {collections.map(({ id, ...otherCollectionProps }) => (
                              <CollectionPreview key={id} {...otherCollectionProps} />
                        ))}
                  </div>
            )
      }
}

export default shop
