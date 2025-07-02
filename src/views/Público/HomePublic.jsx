import React from 'react'
import HeaderPublic from '../../components/HeaderPublic';
import SearchType from '../../components/SearchTypePublic';
import BookList from '../../components/BookList';

const HomePublic = () => {
    return (
        <>
            <HeaderPublic/>
            <SearchType/>
            <BookList/>
        </>
    )
}

export default HomePublic;