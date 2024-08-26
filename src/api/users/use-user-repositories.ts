import { Env } from '@/env';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';
import { QueryKeys } from '../query-keys';
import type { RepositoryType } from '../types';

type Variables = {
	searchValue: string;
};

type Response = RepositoryType[];

export const useUserRepositoriesQuery = createQuery<Response, Variables, AxiosError>({
	queryKey: [QueryKeys.UserRepositoriesQuery],
	fetcher: ({ searchValue }) => {
		return client.get(`${Env.API_URL}/users/${searchValue}/repos`, {}).then((res) => res.data);
	},
});
