export type Tag = {
	id: string;
	name: string;
};

export type Task = {
	id: string;
	title: string;
	description: string;
	status: string;
	tags: Tag[];
	modifiedAt: Date;
};
