type MessageCallback = {
	type: "success" | "error" | "warning";
	message: string;
} | null;

export default MessageCallback;
