import { ChevronDown, Palette } from 'lucide-react';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';

const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
];

const ThemePreview = (props: { value: string }) => {
  return (
    <button
      className='rounded-lg outline-base-content text-left'
      data-set-theme={props.value}
      data-act-class='ACTIVECLASS'
      data-theme={props.value}
    >
      <div
        data-theme={props.value}
        className='rounded-lg bg-base-100 text-base-content w-full cursor-pointer font-sans'
      >
        <div className=' grid grid-cols-5 grid-rows-3'>
          <div className='col-span-5 row-span-3 row-start-1 flex items-center gap-2 p-3'>
            <div className='flex-grow text-sm ml-4'>{props.value}</div>{' '}
            <div className='flex h-full flex-shrink-0 flex-wrap gap-1'>
              <div className='bg-primary w-2 rounded'></div>{' '}
              <div className='bg-secondary w-2 rounded'></div>{' '}
              <div className='bg-accent w-2 rounded'></div>{' '}
              <div className='bg-neutral w-2 rounded'></div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

const ThemeSelector = () => {
  useEffect(() => themeChange(false), []);

  return (
    <div className='dropdown dropdown-end'>
      <label tabIndex={0} className='btn btn-ghost rounded-btn'>
        <Palette strokeWidth={1.5} absoluteStrokeWidth />
        Theme
        <ChevronDown size={20} strokeWidth={1.5} absoluteStrokeWidth />
      </label>
      <div
        tabIndex={0}
        className='menu dropdown-content flex-nowrap z-[1] shadow bg-base-200 rounded-box mt-2 p-3 gap-3 max-h-96 w-56 overflow-y-auto'
      >
        {themes.map((theme) => (
          <ThemePreview key={theme} value={theme} />
        ))}
      </div>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <a className='btn btn-ghost normal-case text-xl'>Lunchify</a>
      </div>
      <div className='navbar-end'>
        <ThemeSelector />
      </div>
    </div>
  );
};

export default NavBar;
