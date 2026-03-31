type ExtractVariables<T> = T extends { variables: infer V } ? V : never;

export default ExtractVariables;
