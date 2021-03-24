import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './header.scss';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from '../../Firebase/firebase.utils';

import CartIcon from '../card-icon/Cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import { selectorCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { 
    HeaderContainer, 
    LogoContainer, 
    OptionsContainer, 
    OptionLink, 
} from './header.style'


const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to='/crwn-clothing'>
            <Logo className='logo'></Logo>
        </LogoContainer>

        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            {/* <OptionLink to='/shop'>CONTACT</OptionLink> */}
            {
                currentUser ?
                (<OptionLink to='/signin' as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>) :
                (<OptionLink to='/signin'>SIGN IN</OptionLink>)
            }
            <CartIcon />
        </OptionsContainer>
        { hidden ? 
            null
            :
            <CartDropdown />
        }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectorCartHidden
});


export default connect(mapStateToProps)(Header);