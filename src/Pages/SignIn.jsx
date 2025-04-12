import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuDashboard from "../Components/MenuDashboard";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SignIn() {
    return (
        <div className="xl:flex lg:block">
            <aside className="xl:w-78 lg:mx-auto xl:mx-0">
                <MenuDashboard />
            </aside>
            <div className="xl:mx-15 lg:mx-45">
                <Link to={'/'}>
                    <FontAwesomeIcon icon={faArrowLeft} className="text-2xl font-bold mb-3 bg-slate-700 light:bg-cyan-50 rounded-full p-2 hover:bg-slate-600 light:hover:bg-cyan-100 light:text-black" />
                </Link>
                <header>
                    <h1 className="text-2xl font-bold light:text-black">¿Cómo registrarse en MangaFox?</h1>
                </header>
                <main>
                    <p className="text-sm p-2 text-gray-300 light:text-gray-400">Para acceder a nuestras funcionalidades de manga, necesitas tener una cuenta en MangaDex. Aquí te explicamos cómo hacerlo:</p>
                    <h2 className="text-xl font-semibold my-5 light:text-black">Pasos para registrarse MangaDex</h2>
                    <ol className="mx-5 text-gray-300 light:text-gray-400">
                        <li><FontAwesomeIcon icon={faCheck} className="mr-1 text-sm text-orange-300 light:text-orange-400"/>Haz clic en el siguiente enlace para  <a href="https://auth.mangadex.org/realms/mangadex/login-actions/registration?client_id=mangadex-frontend-stable&tab_id=wVUvojsQ0Pg" target="blank" className="text-orange-300 light:text-orange-400 cursor-pointer underline decoration-1">registrarte en MangaDex.</a>
                        </li>
                        <li><FontAwesomeIcon icon={faCheck} className="mr-1 text-sm text-orange-300 light:text-orange-400"/>Crea tu cuenta con un correo electrónico y una contraseña.</li>
                        <li><FontAwesomeIcon icon={faCheck} className="mr-1 text-sm text-orange-300 light:text-orange-400"/>Una vez que hayas completado el registro, regresa aquí para continuar.</li>
                    </ol>
                    <p className="my-5 light:text-black">Una vez registrado, podrás iniciar sesion desde nuestro sitio y acceder a tus mangas y listas.</p>
                    <p className="text-sm light:text-black">¿Ya creaste tu cuenta? <Link to={'/'} className="text-gray-300 light:text-gray-400 underline decoration-1">Iniciar Sesion</Link></p>
                </main>
            </div>
        </div>
    )
}

export default SignIn;