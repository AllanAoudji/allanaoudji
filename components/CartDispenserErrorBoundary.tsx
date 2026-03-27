"use client";

import { Component, type ReactNode } from "react";

type Props = {
	children: ReactNode;
	onError?: () => void;
};
type State = { hasError: boolean };

export default class CartDispenserErrorBoundary extends Component<Props, State> {
	state = { hasError: false };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch() {
		this.props.onError?.(); // ← notifie CartClientWrapper
	}

	render() {
		return this.props.children;
	}
}
