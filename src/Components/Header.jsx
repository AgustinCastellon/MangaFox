import { faGear, faMoon, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

import MangaSearch from './MangaSearch';
function Header() {


    return (
        <div className='relative mb-50'>
            <div className="absolute top-0 left-0 right-0 bottom-0 h-60 z-1 bg-linear-to-t from-gray-900 to-transparent"></div>
            <div className='absolute top-0 left-0 right-0 bottom-0 h-60 z-0 bg-[url(/hero3.jpeg)] bg-cover bg-center brightness-50'></div>
            <nav className='flex justify-between pt-3 z-10 relative'>
                <Link to={'/'}>
                    <div className='flex basis-64 pl-5 items-center'>
                        <img src="/foxIcon2.svg" alt="Logo" className='w-10' />
                        <h1 className='text-4xl font-bold'>MangaFox</h1>
                    </div>
                </Link>
                <div className="flex basis-128">
                    <MangaSearch/>
                </div>
                <div className='flex basis-64 justify-end gap-5 pr-5'>
                    <button className='flex justify-center cursor-pointer items-center text-center rounded-full bg-gray-900 w-10 hover:border-2'>
                        <FontAwesomeIcon icon={faUser} className='text-2xl' />
                    </button>
                    <button className='flex justify-center cursor-pointer items-center text-center rounded-full bg-gray-900 w-10 hover:border-2'>
                        <FontAwesomeIcon icon={faMoon} className='text-2xl' />
                    </button>
                    <button className='flex justify-center cursor-pointer  items-center text-center rounded-full bg-gray-900 w-10 hover:border-2'>
                        <FontAwesomeIcon icon={faGear} className='text-2xl' />
                    </button>
                </div>
            </nav>
        </div>
    )

}

export default Header;