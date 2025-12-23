import React from 'react'

const SearchComponent = ({searchCourse, courseSearchUserFunction}) => {
  return (
    
     <header className='App-header'>
        <h1>Ifunanya's Shopping Cart</h1>
        <div className='search-bar'>
            <input type='text' placeholder='search for products'
            value={searchCourse}
            onChange={courseSearchUserFunction}/>
        </div>
        </header> 
    
  );
}

export default SearchComponent;
