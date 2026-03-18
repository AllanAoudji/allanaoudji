type MessageCallback<T> = {
	type: "success" | "error" | "warning";
	message: string;
	data: T | null;
};

export default MessageCallback;
