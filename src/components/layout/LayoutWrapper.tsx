import { Box, Flex, Grid, GridItem, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { VscGithubInverted } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import MenuButton from "../common/MenuButton";

interface LayoutWrapperProps {
    children: ReactNode
}

 
const LayoutWrapper: FunctionComponent<LayoutWrapperProps> = ({children}) => {
    const {colorMode, toggleColorMode} = useColorMode();
    const {pathname} = useLocation();

    return ( 
        <Box>
            <Flex
                as="header"
                direction="row"
                align="space-between"
                justify="center"
                paddingX={{sx: '1rem', md: '5rem'}}
                sx={{
                    backgroundColor: `${colorMode === "dark" ? "gray.900": "gray.100"}`,
                    color: `${colorMode === "dark" ? "gray.100": "gray.900"}`,
                    height: '80px',
                    width: '100vw',
                    overflowX: 'hidden'
                }}
            >
                <Grid 
                    width="100%" 
                    height="100%" 
                    templateColumns={{
                        sx: "1fr 1fr 0.5fr", 
                        sm: "4fr 1fr 1fr", 
                        md: "8fr 1fr 1fr)"
                    }} 
                    alignItems="center">
                    <GridItem >
                        <Flex align="center">
                            <VscGithubInverted fontSize="23" />
                            <Text 
                                fontWeight="bold" 
                                marginLeft="12px" 
                                fontSize="2xl"
                            >
                                RepoBrowser
                            </Text> 
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Flex direction="row" justify="end">
                            {
                                pathname === "/" ?
                                <MenuButton 
                                    link="/users"
                                    text="Users"
                                />
                                : <MenuButton 
                                    link="/"
                                    text="Repos"
                                />
                            }
                        </Flex>
                    </GridItem>
                    <GridItem textAlign="end">
                        {
                            colorMode === "dark" ?
                            (
                                <IconButton
                                    outline="none!important" 
                                    variant="link" 
                                    aria-label='light-mode'
                                    fontSize="24px"
                                    icon={<MdLightMode/>}
                                    onClick={() => toggleColorMode()}
                                />
                            ) : (
                                <IconButton
                                    outline="none!important" 
                                    variant="link" 
                                    aria-label='dark-mode'
                                    fontSize="24px"
                                    icon={<MdDarkMode/>}
                                    onClick={() => toggleColorMode()}
                                />
                            )
                        }
                    </GridItem>
                </Grid>
            </Flex>
            <Box>
                {children}
            </Box>
        </Box>
     );
}
 
export default LayoutWrapper;