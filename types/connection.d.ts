import Edge from "./edge";

type Connection<T> = {
	edges: Array<Edge<T>>;
};

export default Connection;
