import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

dayjs.extend(relativeTime);
dayjs.locale("es");

const languageMap = {
    "en": "gb",
    "es-la": "es",
    "fr": "fr",
    "pt-br": "br",
};

const getFlagUrl = (lang) => {
    const countryCode = languageMap[lang] || lang; // Usa el mapeo o el código original
    return `https://flagcdn.com/w20/${countryCode}.png`;
};

function LatestUpdatesCard({ chapters = [] }) {

    return (
        <div className="grid xl:grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-2 pl-2 pt-2 w-full border-slate-600 light:border-black xl:border-l-1 xl:h-200 scrollbar overflow-y-scroll scrollable-menu">
            {chapters?.map((chapter, index) => (
                <div key={index} className="3xl:flex xl:flex lg:flex text-xs cursor-pointer light:bg-amber-100 light:hover:bg-amber-50 hover:bg-slate-800 rounded-lg">
                    <div className="">
                        <img src={chapter.coverUrl} alt="" className="rounded-xl 3xl:w-20 3xl:h-[85px] 2xl:w-20 2xl:h-25 xl:w-20 xl:h-[85px] md:w-20 md:h-[95px] object-cover object-center" />
                    </div>
                    <div className="w-3/3 flex flex-col justify-center gap-2 ml-2 ">
                        <h1 className="font-black line-clamp-1 light:text-black">{chapter.title}</h1>
                        <div className="inline-flex gap-1">
                            <img src={getFlagUrl(chapter.translate)} alt="lang" className="object-scale-down" />
                            <p className="light:text-black">Vol.{chapter.vol} Ch.{chapter.chapter}</p>
                        </div>
                        <div className="3xl:flex 2xl:block justify-between">
                            <p className="line-clamp-1 text-sky-300 light:text-teal-600"><FontAwesomeIcon icon={faUser} className="text-gray-400"/> {chapter.user}</p>
                            <p className="text-nowrap text-gray-400 3xl:pr-2">{chapter.updatedAt ? dayjs(chapter.updatedAt).fromNow() : "unknow date"}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

LatestUpdatesCard.propTypes = {
    chapters: PropTypes.arrayOf(
        PropTypes.shape({
            coverUrl: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            translate: PropTypes.string.isRequired,
            vol: PropTypes.number.isRequired,
            chapter: PropTypes.number.isRequired,
            user: PropTypes.string.isRequired,
            updatedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]), // Fecha o string
        })
    ).isRequired,
};

export default LatestUpdatesCard;