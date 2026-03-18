type ActionError = { message: string; type: "error" };

type ActionSuccess<T> = { data: T; type: "success" };

type ActionWarning<T> = { data: T; message: string; type: "warning" };

type ActionReponse<T> = ActionError | ActionSuccess<T> | ActionWarning<T>;

export default ActionReponse;
