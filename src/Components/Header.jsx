import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

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
                <div className="flex basis-128 bg-gray-900  content-center w-120 rounded-2xl text-lg border border-gray-400 hover:border-white hover:border-2 hover:text-white">
                    <input
                        type="text"
                        placeholder="Search Manga..."
                        className="outline-none pl-4 grow placeholder-white"
                    />
                    <button className="pr-4">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className='flex basis-64 justify-start'>
                    <button className='cursor-pointer self-auto content-center items-center text-center rounded-full bg-gray-900 w-10 hover:border-2'>
                        <FontAwesomeIcon icon={faUser} className='text-2xl' />
                    </button>
                </div>
            </nav>
        </div>
    )

}

export default Header;