import useSWR from "swr"
import fetcher from "./fetcher"

export const useRepoSearch  = (query: string) => {
    const {data, error} = useSWR(`https://api.github.com/search/repositories?${query}`, fetcher)
    return {
        data: (data as any) || [],
        isLoading: !data && !error,
        isError: error
    }
}