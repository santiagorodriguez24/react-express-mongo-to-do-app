const baseUrl = process.env.PUBLIC_URL;

export const ROUTE_HOME = `${baseUrl}/`;
export const ROUTE_TODOS = `${baseUrl}/todos`;
export const ROUTE_TODO = ROUTE_TODOS + '/:id';
export const ROUTE_TODO_ADD = ROUTE_TODOS + '/new';
export const ROUTE_TODO_EDIT = ROUTE_TODO + '/edit';