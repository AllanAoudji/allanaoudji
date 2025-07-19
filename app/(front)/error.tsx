"use client";

type Props = {
	error: Error;
};

export default function Error({ error }: Readonly<Props>) {
	return <div>{error.message}</div>;
}
