import React /*, { useState, useEffect, useCallback, useMemo }*/ from 'react';
import { useSelector, /*useDispatch*/ } from "react-redux";
import Menu from "../components/Menu";

export const MenuContainer = () => {
    const { authority_level } = useSelector(state => state.user);
    console.log(authority_level);
    return (
        <Menu authority_level={authority_level}/>
    );
}