import { 
    TableCaption, 
    Tbody, 
    Th, 
    Thead, 
    Tr, 
    Table, 
    Td, 
    Spinner, 
    Flex, 
    Tooltip, 
    IconButton, 
    Select,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberDecrementStepper,
    Text
  } from "@chakra-ui/react";
  import {
    BsChevronDoubleLeft,
    BsChevronLeft,
    BsChevronDoubleRight,
    BsChevronRight,
    BsChevronDown,
    BsChevronUp
  } from 'react-icons/bs';
  import { FunctionComponent } from "react";
  import { 
    useTable, 
    usePagination, 
    TableInstance, 
    UsePaginationInstanceProps, 
    UseSortByInstanceProps, 
    UsePaginationState, 
    useSortBy 
  } from "react-table";
  
  interface CustomTablePaginatedProps {
      data: any
      isLoading: boolean
      columns: any
      numberOfItems: number
  }
  
  export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
    UsePaginationInstanceProps<T> &
    UseSortByInstanceProps<T> & {
      state: UsePaginationState<T>;
    };
   
  const CustomTablePaginated: FunctionComponent<CustomTablePaginatedProps> = ({ 
      columns, 
      data, 
      isLoading, 
      numberOfItems
    }) => {
      // Use the state and functions returned from useTable to build your UI
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, 
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
      } = useTable(
        {
          columns,
          data,
          initialState: { 
            pageIndex: 0,
            sortBy: [
              {
                id: "name",
                desc: false
              }
            ]
          }
        },
        useSortBy,
        usePagination
      ) as TableInstanceWithHooks<any>;
      
      return (
        <>
          {
            isLoading ? <Spinner/>
            : (
  
                data.length === 0 ? (
                <Text></Text>
                ) : 
                (
                <>
                    <Table {...getTableProps()}>
                    {
                        data && (
                            <TableCaption 
                                background="gray.900" 
                                color="gray.100"
                            >
                                Github repository 
                                <Text 
                                    as="span" 
                                    color="blue.500"
                                >
                                    {numberOfItems ? numberOfItems : 0}
                                </Text> 
                                search results
                            </TableCaption>
                        )
                    } 
                    <Thead backgroundColor={"blue.500"}>
                        {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {
                            headerGroup.headers.map((column, index) => (
                            <Th 
                                textAlign={index === 3 ? 'end' : 'start'}
                                fontSize="md" color={"#fff"}
                                {...column.getHeaderProps(column.getSortByToggleProps())}>
                                <Flex justifyContent={index === 3 ? 'flex-end' : 'flex-start'}>
                                {column.render("Header")}
                                {column.isSorted ? (
                                    column.isSortedDesc ? (
                                        <BsChevronDown width={4} height={4} />
                                    ) : (
                                        <BsChevronUp width={4} height={4} />
                                    )
                                    ) : (
                                    ""
                                    )}
                                </Flex>
                            </Th>
                            ))}
                        </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                            {row.cells.map((cell, index) => {
                                return (
                                <Td textAlign={index === 3 ? 'end' : 'start'}{...cell.getCellProps()}>{cell.render("Cell")}</Td>
                                );
                            })}
                            </Tr>
                        );
                        })}
                    </Tbody>
                    </Table>
            
                <Flex justifyContent="space-between" m={4} alignItems="center">
                    <Flex>
                        <Tooltip label="First Page">
                        <IconButton
                            onClick={() => gotoPage(0)}
                            isDisabled={!canPreviousPage}
                            aria-label="First Page"
                            fontSize={'md'}
                            icon={<BsChevronDoubleLeft />}
                            mr={4}
                        />
                        </Tooltip>
                        <Tooltip label="Previous Page">
                        <IconButton
                            onClick={previousPage}
                            isDisabled={!canPreviousPage}
                            aria-label="Previous Page"
                            icon={<BsChevronLeft />}
                        />
                        </Tooltip>
                    </Flex>
            
                    <Flex alignItems="center">
                        <Text sx={{flexShrink: "0"}} mr={8}>
                        Page{" "}
                        <Text fontWeight="bold" as="span">
                            {pageIndex + 1}
                        </Text>{" "}
                        of{" "}
                        <Text fontWeight="bold" as="span">
                            {pageOptions.length}
                        </Text>
                        </Text>
                        <Text sx={{flexShrink: "0"}}>Go to page:</Text>{" "}
                        <NumberInput
                        ml={2}
                        mr={8}
                        w={28}
                        min={1}
                        max={pageOptions.length}
                        onChange={(value) => {
                            const page = value ? (+value - 1) : 0;
                            gotoPage(page);
                        }}
                        defaultValue={pageIndex + 1}
                        >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                        <Select
                        w={32}
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                        >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                            </option>
                        ))}
                        </Select>
                    </Flex>
            
                    <Flex>
                        <Tooltip label="Next Page">
                        <IconButton
                            onClick={nextPage}
                            isDisabled={!canNextPage}
                            aria-label="Next Page"
                            icon={<BsChevronRight />}
                        />
                        </Tooltip>
                        <Tooltip label="Last Page">
                        <IconButton
                            onClick={() => gotoPage(pageCount - 1)}
                            isDisabled={!canNextPage}
                            aria-label="Last Page"
                            icon={<BsChevronDoubleRight />}
                            ml={4}
                        />
                        </Tooltip>
                    </Flex>
                </Flex>
            </>
            )
            )
          }
        </>
        )
    }
    
   
  export default CustomTablePaginated;
  
  