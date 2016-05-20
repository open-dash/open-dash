import React from 'react';

const Header = ({ siteTitle, user }) => (
  <div id='sidebar-wrapper'>
    <ul className='sidebar-nav'>
      <li className='sidebar-brand text-center'>
        <a href='/'>
          {siteTitle}
        </a>
      </li>
      <li>
        <div className='sidebar-spacer'></div>
      </li>
      <li>
        <a  href='/'>
          Dashboard
        </a>
      </li>
      <li>
        <a  href='/users'>
          Users
        </a>
      </li>
      <li>
        <a  href='/settings'>
          Settings
        </a>
      </li>
      <li>
        <div className='sidebar-spacer'></div>
      </li>
      <li>
        <a href={`/users/${user._id}`}>Profile</a>
      </li>
      <li>
        <a href='/logout'>Logout</a>
      </li>
    </ul>
  </div>
);

export default Header;
