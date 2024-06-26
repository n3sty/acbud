import React from 'react';
import ThemeSwitcher from './themeswitcher';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar dark:bg-secondary">
      <div className='navbar-start'>
        <a href="/" className='btn btn-ghost text-xl'>ACBUDs</a>
      </div>
      <div className='navbar-end'>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;