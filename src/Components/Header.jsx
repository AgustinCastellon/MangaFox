import { faGear, faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import MangaSearch from './MangaSearch';
import UserModal from './modals/UserModal';
import { useEffect, useRef, useState } from 'react';
import SettingsModal from './modals/SettingsModal';
function Header() {

    const [userModalOpen, setUserModalOpen] = useState(false);
    const [SettingModalOpen, setSettingModalOpen] = useState();
    const [theme, setTheme] = useState(() => {

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return 'dark'
        }
        return 'light'
    });
    const userModalRef = useRef();
    const settingModalRef = useRef();

    const handleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    }

    useEffect(() => {

        if (theme === 'light') {
            document.querySelector('html').classList.add('light')
        } else {
            document.querySelector('html').classList.remove('light')
        }

    }, [theme])

    const handleUserModal = (e) => {
        if (SettingModalOpen) {
            setSettingModalOpen(false);
        }
        setUserModalOpen(!userModalOpen);
        e.stopPropagation();
    }

    const handleSettingModal = (e) => {
        if (userModalOpen) {
            setUserModalOpen(false);
        }
        setSettingModalOpen(!SettingModalOpen)
        e.stopPropagation();
    }

    const handleClickOutside = (e) => {
        if (userModalRef.current && !userModalRef.current.contains(e.target)) {
            setUserModalOpen(false);
        }

        if (settingModalRef.current && !settingModalRef.current.contains(e.target)) {
            setSettingModalOpen(false);
        }
    }

    useEffect(() => {
        if (userModalOpen || SettingModalOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [userModalOpen, SettingModalOpen])

    return (
        <div className='fixed w-full top-0 z-99 pb-2 bg-slate-800 light:bg-cyan-100'>
            <nav className='flex justify-between pt-3 z-10 relative'>
                <Link to={'/'}>
                    <div className='flex pl-5 items-center'>
                        <img src="/foxIcon2.svg" alt="Logo" className='w-10' />
                        <h1 className='text-4xl font-bold light:text-black'>MangaFox</h1>
                    </div>
                </Link>
                <div className="flex justify-center grow">
                    <MangaSearch />
                </div>
                <div className='flex justify-end gap-5 pr-5'>
                    <div className='flex relative'>
                        <button onClick={handleUserModal} className='flex justify-center cursor-pointer items-center text-center rounded-full bg-gray-900 light:bg-cyan-50 w-10 light:hover:border-black hover:border-2'>
                            <motion.div
                                className='flex'
                                whileTap={{ scale: .5 }}
                            >
                                <FontAwesomeIcon icon={faUser} className='text-2xl light:text-black' />
                            </motion.div>
                            <AnimatePresence>
                                {userModalOpen && (
                                    <motion.div
                                        ref={userModalRef}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <UserModal />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                    <div className='flex'>
                        <button onClick={handleTheme} className='z-99 flex justify-center cursor-pointer items-center text-center rounded-full bg-gray-900 light:bg-cyan-50 w-10 light:hover:border-black hover:border-2'>
                            <motion.div
                                key={theme} // Se asegura de que la animación ocurra al cambiar el ícono
                                initial={{ opacity: 0, scale: 0.5 }}  // Inicializa con opacidad 0 y escala 0.5
                                animate={{ opacity: 1, scale: 1 }}    // Finaliza con opacidad 1 y escala 1
                                exit={{ opacity: 0, scale: 0.5 }}     // Vuelve a escala 0.5 y opacidad 0 al desaparecer
                                transition={{ duration: 0.5 }}  
                                className='flex justify-center items-center'
                            >
                                {theme === 'light' ?
                                    (
                                        <FontAwesomeIcon icon={faMoon} className='text-2xl light:text-black' />
                                    )
                                    : (
                                        <FontAwesomeIcon icon={faSun} className='text-2xl light:text-black' />
                                    )
                                }
                            </motion.div>
                        </button>
                    </div>
                    <div className='flex relative'>
                        <button onClick={handleSettingModal} className='flex justify-center cursor-pointer  items-center text-center rounded-full bg-gray-900 light:bg-cyan-50 w-10 light:hover:border-black hover:border-2'>
                            <motion.div
                                className='flex'
                                whileTap={{ rotate: 360 }}
                            >
                                <FontAwesomeIcon icon={faGear} className='text-2xl light:text-black' />
                            </motion.div>
                            <AnimatePresence>
                                {SettingModalOpen && (
                                    <motion.div
                                        ref={settingModalRef}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <SettingsModal />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )

}

export default Header;