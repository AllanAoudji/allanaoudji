import { Edge } from "./edge";

export type Connection<T> = {
	edges: Array<Edge<T>>;
};
