type props = {
	title: string;
};

export default function Title({ title }: props) {
	return <h1 className="text-3xl uppercase">{title}</h1>;
}
