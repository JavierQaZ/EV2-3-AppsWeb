import React from 'react'
import HeaderAdmin from '../../components/HeaderAdmin';
import SearchTypeAdmin from '../../components/SearchTypeAdmin';
import BookList from '../../components/BookList';

const HomeAdmin = () => {
    return (
        <>
            <HeaderAdmin/>
            <SearchTypeAdmin/>
            <BookList/>
        </>
    )
}

export default HomeAdmin;