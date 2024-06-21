import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <h1 className="text-3xl font-bold m-5 p-2">WELCOME TO THE SURVEY WITH DYNAMIC FORMS</h1>
      <nav>
        <ul>
          <li className='text-green-700 font-semibold text-xl p-2 m-3 '><Link to="/level1">Level 1</Link></li>
          <li className='text-orange-400 font-semibold text-xl p-2 m-3'><Link to="/level2">Level 2</Link></li>
          <li className='text-red-700 font-semibold text-xl p-2 m-3'><Link to="/level3">Level 3</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
