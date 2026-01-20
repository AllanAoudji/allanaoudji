import { createContext, useCallback, useMemo, useState } from "react";

type Props = {
	children: React.ReactNode;
};
type LightBoxContectType = {
	images: null;
	updateImages: () => void;
};

const LightboxContext = createContext<LightBoxContectType | undefined>(undefined);

export function LightboxProvider({ children }: Readonly<Props>) {
	const [images, setImages] = useState<null>(null);

	const updateImages = useCallback(() => {}, []);

	const value = useMemo(() => ({ images, updateImages }), [images, updateImages]);

	return <LightboxContext.Provider value={value}>{children}</LightboxContext.Provider>;
}
