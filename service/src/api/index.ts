import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery, CustomRequest } from '@/api/baseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: builder => ({
    get: builder.query<any,  CustomRequest>({
      query: ({ pathParams, queryParams, data}) => ({
        path: '/posts/{postNo}',
        method: 'get',
        request: {
          pathParams,
          queryParams,
          data,
        }
      }),
    }),
    post: builder.mutation<any, CustomRequest>({
      query: ({ pathParams, queryParams, data }) => ({
        path: '/posts',
        method: 'post',
        request: {
          pathParams,
          queryParams,
          data,
        }
      }),
    }),
  }),
});

export const {
  useGetQuery,
  usePostMutation,
} = api;