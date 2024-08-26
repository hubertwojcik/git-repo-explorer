import { Env } from '@/env';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';
import { QueryKeys } from '../query-keys';
import type { GitHubSearchUsersResponse } from '../types';

type Variables = {
	searchValue: string;
};

type Response = GitHubSearchUsersResponse;

export const useUsersQuery = createQuery<Response, Variables, AxiosError>({
	queryKey: [QueryKeys.UsersQuery],
	fetcher: ({ searchValue }) => {
		return client
			.get(`${Env.API_URL}/search/users`, {
				params: {
					q: searchValue,
					per_page: 5,
				},
			})
			.then((res) => res.data);
	},
});
