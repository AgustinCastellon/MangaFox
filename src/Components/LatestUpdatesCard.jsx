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
        <div className="grid grid-cols-4 gap-1">
            {chapters?.map((chapter, index) => (
                <div key={index} className="flex">
                    <div className="">
                        <img src={chapter.coverUrl} alt="" className="rounded-xl w-22 h-[110px]" />
                    </div>
                    <div className="w-2/3 flex flex-col justify-center gap-2 ml-2">
                        <h1 className="font-black text-lg line-clamp-1">{chapter.title}</h1>
                        <div className="inline-flex gap-1">
                            <img src={getFlagUrl(chapter.translate)} alt="lang" className="object-scale-down" />
                            <p className="">Vol.{chapter.vol} Ch.{chapter.chapter}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="truncate"><FontAwesomeIcon icon={faUser} /> {chapter.user}</p>
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