import useSWR from "swr"
import fetcher from "./fetcher"

export const useRepoSearch  = (shouldFetch: boolean, query: string, searchContext: string) => {
    const {data, error} = useSWR(!shouldFetch ? null : `https://api.github.com/search/${searchContext}?${query}`, fetcher)
    return {
        data: (data as any) || [],
        isLoading: !data && !error && shouldFetch,
        isError: error
    }
}