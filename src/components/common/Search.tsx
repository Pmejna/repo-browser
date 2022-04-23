import { Box, Button, Input, InputGroup, InputLeftElement, Text, useColorMode } from "@chakra-ui/react";
import { FunctionComponent, useMemo, useState} from "react";
import {MdSearch} from 'react-icons/md';
import { useRepoSearch } from "../../hooks/hooks";
import CustomTablePaginated from "./CustomTable";

interface SearchProps {
}
 
const Search: FunctionComponent<SearchProps> = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [query, setQuery] = useState('');
    const { data, isError, isLoading } = useRepoSearch(query);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmit = () => {
        setQuery(`q=${searchTerm}&sort=stars&order=desc&page=1&per_page=100`)
    }

    const tableData = useMemo(() => {
        if (data && data.items) {
        return data.items.map((item: any) => {
            return {
                name: item.name,
                owner: item.owner.login,
                stars: item.stargazers_count,
                created_at: item.created_at
            }
        })} else {
            return [];
        }
        }, [data])

    const columns = useMemo(() => [
        {Header: "Name", accessor: "name"},
        {Header: "Owner", accessor: "owner"},
        {Header: "Stars", accessor: "stars"},
        {Header: "Created At", accessor: "created_at"},
    ], []);

    console.log(tableData);
    
    const {colorMode} = useColorMode();

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
                            onChange={(e) => handleSearch(e)}
                        />
                        <Button 
                            type="submit" 
                            bg="green.600" 
                            isLoading={isLoading}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            sx={{
                                width: "120px",
                                marginLeft: "20px",
                                backgroundColor: `${colorMode === "dark" ? "blue.900": "blue.100"}`,
                                "&:hover": {
                                    color: "gray.100",
                                    backgroundColor: "blue.400"
                                }
                            }}
                        >
                            <Text>Search</Text>
                        </Button>
                    </InputGroup>
                </form>
            </Box>
            <Box  marginY="2.6rem" overflowX="auto">
                {
                    isError || data.message || data.items.length == 0 ? (
                        <Text>
                            {
                             isError && `We apologize for the inconveniences: an error have occurred.`
                            }
                            {
                                data.message && data.message
                            }
                            {
                                tableData && `No results found.`
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

