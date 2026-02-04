import { createContext, useContext } from "react";

type Props = {
	children: React.ReactNode;
};

type FiltersSideBarType = {};

const FiltersSideBarContext = createContext<FiltersSideBarType | undefined>(undefined);

export function FiltersSideBarProvider({ children }: Readonly<Props>) {
	return <FiltersSideBarContext.Provider value={{}}>{children}</FiltersSideBarContext.Provider>;
}

export function useFiltersSideBar() {
	const context = useContext(FiltersSideBarContext);
	if (context === undefined) {
		throw new Error("useFiltersSideBar must be used within a FiltersSideBarProvider");
	}
	return context;
}
