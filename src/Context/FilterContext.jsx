// context/FilterContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const FilterContext = createContext();

const DEFAULT_FILTERS = {
    contentRating: ["safe", "suggestive", "erotica"],
    demographic: [],
    status: [],
};

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState(() => {
        // Intentar cargar desde localStorage al iniciar
        const saved = localStorage.getItem("filters");
        return saved ? JSON.parse(saved) : DEFAULT_FILTERS;
    });

    const updateFilter = (key, values) => {
        setFilters(prev => {
            const updated = { ...prev, [key]: values };
            localStorage.setItem("filters", JSON.stringify(updated));
            return updated;
        });
    };

    // (Opcional) si querés sincronizar cuando cambia todo el objeto
    useEffect(() => {
        localStorage.setItem("filters", JSON.stringify(filters));
    }, [filters]);

    return (
        <FilterContext.Provider value={{ filters, updateFilter }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => useContext(FilterContext);