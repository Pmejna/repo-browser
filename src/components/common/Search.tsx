import { Box, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useMemo, useState} from "react";
import {MdSearch} from 'react-icons/md';
import { useRepoSearch } from "../../hooks/hooks";
import CustomTablePaginated from "./CustomTable";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { tableData } from "../../types/data";


interface SearchProps {
    searchTermFromURL: string;
}
 
const Search: FunctionComponent<SearchProps> = ({searchTermFromURL}) => {
    const [searchTerm, setSearchTerm] = useState(searchTermFromURL ? `?${searchTermFromURL}` : "");
    const [query, setQuery] = useState(`q=${searchTerm}&sort=stars&order=desc&page=1&per_page=100`);
    const [shouldFetch, setShouldFetch] = useState(searchTerm === '' ? false : true);
    const { data, isError, isLoading } = useRepoSearch(shouldFetch, query);
    
    const handleSubmit = () => {
        setShouldFetch(true)
        window.history.replaceState(null, '', `/${searchTerm}`)
    }

    const delayDebounceFn = setTimeout(() => {
        handleSubmit();
      }, 350)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setQuery(`q=${e.target.value}&sort=stars&order=desc&page=1&per_page=100`)
        setShouldFetch(false);
    }
    
    dayjs.extend(customParseFormat);
    const formatDate = (date: string) => {
        return dayjs(`${date}`).format('DD-MM-YYYY');
    }

    useEffect(() => {
          return () => clearTimeout(delayDebounceFn)
    }, [searchTerm, delayDebounceFn]);

    const tableData = useMemo(() => {
        if (data && data.items) {
            return data.items.map((item: any): tableData => {
                return {
                    name: item.name,
                    owner: item.owner.login,
                    stars: item.stargazers_count,
                    created_at: formatDate(item.created_at),
                }
            })} else {
                return [];
            }
        }, [data])
        
    const columns = useMemo(() => [
        {
            Header: "Name", 
            accessor: "name"
        },
        {
            Header: "Owner", 
            accessor: "owner"
        },
        {
            Header: "Stars", 
            accessor: "stars"
        },
        {
            Header: "Created At", 
            accessor: "created_at"
        },
    ], []);

    
    return ( 
        <Box>
            <Box>
                <form>
                    <InputGroup width={"100%"}>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<MdSearch color='gray.300' />}
                        />
                        <Input 
                            type='text' 
                            placeholder='Search Github repositories'
                            onChange={(e) => handleSearch(e)} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        />
                    </InputGroup>
                </form>
            </Box>
            <Box  marginY="2.6rem" overflowX="auto">
                {
                    (data.message && !data.errors) && (
                    <Text>{`${data.message}`}</Text>
                    )
                }
                {
                    data.items?.length === 0 ? (
                        <Text>
                            {
                             isError && `We apologize for the inconveniences: an error have occurred.`
                            }
                            
                            {
                                data && `No results found.`
                            }
                        </Text>
                    ) : (
                        <CustomTablePaginated 
                            data={tableData} 
                            isLoading={isLoading} 
                            columns={columns} 
                            numberOfItems={data.total_count}
                        />
                    )
                }
            </Box>
        </Box>
     );
}
 
export default Search;

