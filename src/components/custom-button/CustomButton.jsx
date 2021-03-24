import React from 'react';
// import './customButton.scss';
import { CustomButtonContainer } from './customButton.style';

const CustomButton = ({children, ...props}) => (
    <CustomButtonContainer {...props}>
        {children}
    </CustomButtonContainer>
);

export default CustomButton;