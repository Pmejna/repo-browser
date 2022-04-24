import { Avatar, Box, WrapItem } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "../components/common/Search";
import SearchHeader from "../components/common/SearchHeader";
import { formatDate } from "../helpers/formatDate";

interface FindUserProps {
    
}
 
const FindUser: FunctionComponent<FindUserProps> = () => {

    const {pathname, search} = useLocation();
    const [urlParams] = useState(search.substring(1));

    // const customAvatar = (url: string) => {
    //     return (
    //         <WrapItem>
    //             <Avatar size='2xs' src={url} />
    //         </WrapItem>
    //     )
    // }

    const tableColumns = [
        {
            Header: "Avatar", 
            accessor: "avatar",
            Cell: (e: any) => (<Avatar size='2xl' src={e.value} />)
        },
        {
            Header: "User Login", 
            accessor: "user"
        },
        {
            Header: "User Github", 
            accessor: "link",
            Cell: (e: any) => <a rel="noreferrer" target="_blank" href={e.value}>Click</a>
        },
    ];

    const tableRows = (item: any) => ({
        avatar: item.avatar_url,
        user: item.login,
        link: item.url
    });

    return ( 
        <Box marginTop="1rem" paddingX={{sx: "2rem", md: "5rem"}}>
            <Box >
                <SearchHeader 
                    title="Search for specific GitHub repository" 
                    subtitle="Enter github repository name and wait for results" 
                />
                <Search 
                    searchTermFromURL={urlParams} 
                    searchContext="users" 
                    currentLocation={pathname}
                    tableRows={tableRows} 
                    tableColumns={tableColumns}
                />
            </Box>
        </Box>
     );
}
 
export default FindUser;