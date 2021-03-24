import React from 'react';
import { connect } from 'react-redux';
import './CollectionItem.scss';
// import CustomButton from '../custom-button/CustomButton'
import { addItems } from '../../redux/cart/cart.action';

const CollectionItem = ({item, addItems}) => {
    const {name, price, imageUrl} = item;
    return(
        <div className='collection-item'>
            <div 
                className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div> 

            <div className="custom-button" onClick= {() => addItems(item)}>ADD TO CART</div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addItems: item => dispatch(addItems(item))
});



export default connect(null, mapDispatchToProps)(CollectionItem);
