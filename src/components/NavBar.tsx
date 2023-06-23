import { useEffect } from 'react';
import { themeChange } from 'theme-change';

const themes = [
  {
    emoji: '🌙',
    name: 'dark',
  },
  {
    emoji: '☀️',
    name: 'light',
  },
  {
    emoji: '🧁',
    name: 'cupcake',
  },
  {
    emoji: '🐝',
    name: 'bumblebee',
  },
  {
    emoji: '💎',
    name: 'emerald',
  },
  {
    emoji: '💰',
    name: 'corporate',
  },
  {
    emoji: '😎',
    name: 'synthwave',
  },
];

const ThemeSelector = () => {
  useEffect(() => themeChange(false), []);

  return (
    <select className='select w-full max-w-xs' data-choose-theme>
      <option disabled>Theme</option>
      {themes.map((theme) => (
        <option key={theme.name} value={theme.name}>
          {theme.emoji} {theme.name}
        </option>
      ))}
    </select>
  );
};

const NavBar = () => {
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className='p-2'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className='btn btn-ghost normal-case text-xl'>Lunchify</a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className='p-2'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        <ThemeSelector />
      </div>
    </div>
  );
};

export default NavBar;
