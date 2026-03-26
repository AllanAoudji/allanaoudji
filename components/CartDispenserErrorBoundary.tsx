"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class CartDispenserErrorBoundary extends Component<Props, State> {
	state = { hasError: false };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		// En cas d'erreur, on rend les children sans CartProvider
		return this.props.children;
	}
}
