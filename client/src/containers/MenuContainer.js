import React /*, { useState, useEffect, useCallback, useMemo }*/ from 'react';
import { useSelector, /*useDispatch*/ } from "react-redux";
import Menu from "../components/Menu";
import { useLocation } from 'react-router-dom';

export const MenuContainer = (props) => {
    const { authority_level } = useSelector(state => state.user);
    const {pathname} = useLocation();
    return (
        <Menu authority_level={authority_level}/>
    );
}