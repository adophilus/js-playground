

export type GetUsersParams = [];


export interface IGetUsersResult {
    created_at: any;
	id: string;
	username: string | null;
};


export interface IGetUsersQuery {
    params: GetUsersParams;
    result: IGetUsersResult;
};

