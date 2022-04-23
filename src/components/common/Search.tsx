import { Box, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react";
import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {MdSearch} from 'react-icons/md';
import { TiDelete } from "react-icons/ti";
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
    const [shouldFetch, setShouldFetch] = useState(false);
    const { data, isError, isLoading } = useRepoSearch(shouldFetch, query);
    let inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const memoizedHandleSubmit = useCallback(
        () => {
            setShouldFetch(true)
            window.history.replaceState(null, '', `/${searchTerm}`)
        },
        [searchTerm],
      );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShouldFetch(false);
        setSearchTerm(`?${e.target.value}`);
        setQuery(`q=${e.target.value}&sort=stars&order=desc&page=1&per_page=100`)
    }

    const resetSearch = () => {
        inputRef.current.value = "";
        setShouldFetch(false);
        setSearchTerm("");
        setQuery(``)
    }

    
    dayjs.extend(customParseFormat);
    const formatDate = (date: string) => {
        return dayjs(`${date}`).format('DD-MM-YYYY');
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            memoizedHandleSubmit();
          }, 500)
      
          return () => clearTimeout(delayDebounceFn)
    }, [searchTerm, memoizedHandleSubmit]);

    const tableData = useMemo(() => {
        if (data && data.items) {
            return data.items.map((item: any): tableData => {
                return {
                    name: item.name,
                    owner: item.owner.login,
                    stars: item.stargazers_count,
                    created_at: formatDate(item.created_at),
                    link: item.html_url
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
            Header: "Link", 
            accessor: "link",
            Cell: (e: any) => <a rel="noreferrer" target="_blank" href={e.value}>Click</a>
        },
        {
            Header: "Created At", 
            accessor: "created_at"
        },
    ], []);

    console.log(data, 'dds')
    
    return ( 
        <Box>
            <Box>
                <form>
                    <InputGroup width={"100%"}>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<MdSearch  />}
                            sx={{color: 'gray.500', fontSize: '1.2rem'}}
                        />
                        <InputRightElement
                            onClick={() => resetSearch()}
                            children={<TiDelete />}
                            sx={{ cursor: 'pointer', color: 'red.500', fontSize: '1.5rem' }}
                        />
                        <Input 
                            type='text' 
                            placeholder='Search Github repositories'
                            onChange={(e) => handleSearch(e)} 
                            ref={inputRef}
                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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

