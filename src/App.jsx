import React, { useState } from 'react';
import './App.css';
import SearchComponent from './SearchComponent.jsx';
import UserCartComponent from './UserCartComponent.jsx';
import ShowCourseComponent from './ShowCoursecomponent.jsx';
import sportsJacket from './assets/IMG_1819.png';
import tweedJacket from './assets/IMG_5915.jpg';
import twopiece from './assets/IMG_5918.jpg';

//STATE means data that can change, when the setcourses is called, 
// it updaes with new value, inside the usestate is the initial value

function App() {
  const [courses, setCourses] =
  useState([
    { 
      id: 1,
      name: 'Sports jacket',
      price: 1400,
      image: sportsJacket
    },
    {
      id: 2,
      name: 'tweed jacket',
      price: 5000,
      image: tweedJacket
    },
    {
      id: 3,
      name: '2-piece set',
      price: 9000,
      image: twopiece
    }
  ]);
  //building properties for the pieces to be sold//
  const [cartCourses, setCartCourses] = useState ([]); //tracks items in cart starts at 0 and then updates
  const [searchCourse, setSearchCourse] = useState(''); // for what is typed in search bar
  //setting to nothing initially//

const addCourseToCartFunction = (GFGcourse) => {
  const alreadyCourses = cartCourses
  .find(item => item.product.id === GFGcourse.id);
  if (alreadyCourses) {
    const latestCartUpdate = cartCourses.map(item => item.product.id === GFGcourse.id ?
       {...item, quantity: item.quantity + 1 }
      : item
    ); //already checks if item exists is in cart,
    //  the if block says if item in cart already then update by addingb qnty with 1 and keep other items unchanged
    setCartCourses(latestCartUpdate);
  } else {
    setCartCourses([...cartCourses, {product: GFGcourse, quantity:1}]); //if item does not exist, add new item with 1
  }
  };
  const deleteCourseFromCartFunction = (GFGcourse) => {
    const updatedCart = cartCourses
    .filter(item => item.product.id !== GFGcourse.id);
    setCartCourses(updatedCart);
  };//the filter creates new array w/o a item, removes item from cart 
  const totalAmountCalculationFunction = () => {
    return cartCourses.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }; //.reduce loops thru all cart items and calculates price qty, and it starts the total at 0
  const courseSearchUserFunction = (event) => {
    setSearchCourse(event.target.value); //the event is the change like typing, 
    // then target is like object with props like values and type, here value is a string 
  };// updates the search course
  const filterCourseFunction = courses.filter((course) => 
    course.name.toLowerCase().includes(searchCourse.toLowerCase())); //the lowercase converted to string,
    //  then it compares the course name with what is in search course, returns true if found
  
  return(
    <div className='App'> 
    <SearchComponent searchCourse={searchCourse} courseSearchUserFunction = {courseSearchUserFunction}/>
    <main className='App-main'>
      <ShowCourseComponent courses={courses}
      filterCourseFunction={filterCourseFunction}
      addCourseToCartFunction={addCourseToCartFunction}/>
      <UserCartComponent cartCourses={cartCourses} deleteCourseFromCartFunction={deleteCourseFromCartFunction}
      totalAmountCalculationFunction={totalAmountCalculationFunction}
      setCartCourses={setCartCourses}/>
    </main>
    </div>
  );// contains what will be rendered, all the results and connects the functions to the components
}






export default App;