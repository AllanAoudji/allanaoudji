type Props = {
	children: React.ReactNode;
};

export default function CartSectionItemQuantityContainer({ children }: Readonly<Props>) {
	return <td className="hidden whitespace-nowrap md:table-cell">{children}</td>;
}
