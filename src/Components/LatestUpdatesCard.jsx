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
        <div className="grid grid-cols-1 gap-2  p-2 border-slate-600 border-l-1">
            {chapters?.map((chapter, index) => (
                <div key={index} className="3xl:flex xl:flex 2xl:block text-xs cursor-pointer hover:bg-slate-800 rounded-lg">
                    <div className="">
                        <img src={chapter.coverUrl} alt="" className="rounded-xl 3xl:w-20 3xl:h-[85px] 2xl:w-full 2xl:h-15 xl:w-20 xl:h-[85px] object-cover object-center" />
                    </div>
                    <div className="w-3/3 flex flex-col justify-center gap-2 ml-2 ">
                        <h1 className="font-black line-clamp-1">{chapter.title}</h1>
                        <div className="inline-flex gap-1">
                            <img src={getFlagUrl(chapter.translate)} alt="lang" className="object-scale-down" />
                            <p className="">Vol.{chapter.vol} Ch.{chapter.chapter}</p>
                        </div>
                        <div className="3xl:flex 2xl:block justify-between">
                            <p className="line-clamp-1 text-sky-300"><FontAwesomeIcon icon={faUser} className="text-gray-400"/> {chapter.user}</p>
                            <p className="text-nowrap text-gray-400">{chapter.updatedAt ? dayjs(chapter.updatedAt).fromNow() : "unknow date"}</p>
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