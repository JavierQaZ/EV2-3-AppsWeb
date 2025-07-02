import React from 'react'
import HeaderLector from '../../components/HeaderLector';
import SearchTypeLector from '../../components/SearchTypeLector';
import BookList from '../../components/BookList';

const HomeLector = () => {
    return (
        <>
            <HeaderLector/>
            <SearchTypeLector/>
            <BookList/>
        </>
    )
}

export default HomeLector;