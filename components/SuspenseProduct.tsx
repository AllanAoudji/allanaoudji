import SubTitle from "./SubTitle";

export default function SuspenseProduct() {
	return (
		<div>
			<div className="grid grid-cols-6 gap-8 md:gap-4">
				<div className="col-span-6 md:col-span-3 lg:col-span-4">
					<div className="hidden grid-cols-2 gap-2 lg:grid">
						<div className="bg-secondary aspect-3/4" />
						<div className="bg-secondary aspect-3/4" />
						<div className="bg-secondary aspect-3/4" />
						<div className="bg-secondary aspect-3/4" />
					</div>
					<div className="block lg:hidden">
						<div className="bg-secondary aspect-3/4" />
						<div className="mt-2 grid grid-cols-4 gap-2">
							<div className="bg-secondary aspect-4/3" />
							<div className="bg-secondary aspect-4/3" />
							<div className="bg-secondary aspect-4/3" />
							<div className="bg-secondary aspect-4/3" />
						</div>
					</div>
				</div>
				<div className="col-span-6 md:col-span-3 lg:col-span-2">
					<div className="bg-secondary mb-0.5 h-8" />
					<div className="bg-secondary mb-10 h-4 w-1/2" />

					<div className="bg-secondary mb-0.5 h-6" />
					<div className="bg-secondary mb-0.5 h-6" />
					<div className="bg-secondary mb-0.5 h-4" />
					<div className="bg-secondary mb-0.5 h-4" />
					<div className="bg-secondary mb-0.5 h-4" />
					<div className="bg-secondary mb-0.5 h-4" />
					<div className="bg-secondary mb-0.5 h-4" />
					<div className="bg-secondary mb-0.5 h-4" />
					<div className="bg-secondary mb-0.5 h-4" />
					<div className="bg-secondary mb-0.5 h-4" />
					<div className="bg-secondary mb-0.5 h-4" />
					<div className="bg-secondary mb-0.5 h-4" />
					<div className="bg-secondary mb-0.5 h-4" />
				</div>
			</div>
			<div className="mt-16 lg:mt-12">
				<SubTitle>Vous aimerez peut-être...</SubTitle>
				<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
					<div>
						<div className="bg-secondary mb-2.5 aspect-3/4" />
						<div className="bg-secondary mt-2 h-4.5 w-full" />
						<div className="bg-secondary mt-0.5 h-4 w-1/2" />
					</div>
					<div>
						<div className="bg-secondary mb-2.5 aspect-3/4" />
						<div className="bg-secondary mt-2 h-4.5 w-full" />
						<div className="bg-secondary mt-0.5 h-4 w-1/2" />
					</div>
					<div>
						<div className="bg-secondary mb-2.5 aspect-3/4" />
						<div className="bg-secondary mt-2 h-4.5 w-full" />
						<div className="bg-secondary mt-0.5 h-4 w-1/2" />
					</div>
					<div>
						<div className="bg-secondary mb-2.5 aspect-3/4" />
						<div className="bg-secondary mt-2 h-4.5 w-full" />
						<div className="bg-secondary mt-0.5 h-4 w-1/2" />
					</div>
				</div>
			</div>
		</div>
	);
}
