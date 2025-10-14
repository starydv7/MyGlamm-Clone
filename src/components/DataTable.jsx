import React, { useMemo, useState } from 'react';
import { Box, Flex, Input, Select, Table, Tbody, Td, Th, Thead, Tr, IconButton, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

function defaultSort(a, b, key, direction) {
  const av = (a[key] ?? '').toString().toLowerCase();
  const bv = (b[key] ?? '').toString().toLowerCase();
  if (av < bv) return direction === 'asc' ? -1 : 1;
  if (av > bv) return direction === 'asc' ? 1 : -1;
  return 0;
}

export default function DataTable({
  columns,
  data,
  initialSortKey,
  initialSortDirection = 'asc',
  pageSizeOptions = [5, 10, 20, 50],
  initialPageSize = 10,
  globalSearchPlaceholder = 'Search...',
  onRowClick,
}) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState(initialSortKey || (columns[0]?.accessor ?? ''));
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const searchable = useMemo(() => columns.filter(c => c.searchable).map(c => c.accessor), [columns]);

  const filtered = useMemo(() => {
    if (!query) return data;
    const lower = query.toLowerCase();
    return data.filter(row => searchable.some(accessor => String(row[accessor] ?? '').toLowerCase().includes(lower)));
  }, [data, query, searchable]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const col = columns.find(c => c.accessor === sortKey);
    const sorter = col?.sorter || ((a, b) => defaultSort(a, b, sortKey, sortDirection));
    return [...filtered].sort(sorter);
  }, [filtered, sortKey, sortDirection, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  function toggleSort(accessor) {
    if (sortKey === accessor) {
      setSortDirection(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(accessor);
      setSortDirection('asc');
    }
  }

  return (
    <Box>
      <Flex mb={4} gap={2} align="center" justify="space-between">
        <Input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder={globalSearchPlaceholder}
          maxW="320px"
        />
        <Flex align="center" gap={2}>
          <Text fontSize="sm">Rows per page</Text>
          <Select size="sm" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} maxW="90px">
            {pageSizeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Select>
        </Flex>
      </Flex>

      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            {columns.map(col => (
              <Th key={col.accessor} cursor={col.sortable ? 'pointer' : 'default'} onClick={col.sortable ? () => toggleSort(col.accessor) : undefined}>
                <Flex align="center" gap={2}>
                  <span>{col.header}</span>
                  {col.sortable && sortKey === col.accessor && (
                    sortDirection === 'asc' ? <TriangleUpIcon /> : <TriangleDownIcon />
                  )}
                </Flex>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {pageData.map((row) => (
            <Tr key={row.id} _hover={{ bg: 'gray.50', cursor: onRowClick ? 'pointer' : 'default' }} onClick={onRowClick ? () => onRowClick(row) : undefined}>
              {columns.map(col => (
                <Td key={col.accessor}>
                  {col.cell ? col.cell(row[col.accessor], row) : String(row[col.accessor] ?? '')}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex mt={4} gap={2} align="center" justify="flex-end">
        <Text fontSize="sm">Page {currentPage} of {totalPages}</Text>
        <IconButton aria-label="Prev" icon={<ChevronLeftIcon />} size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} isDisabled={currentPage === 1} />
        <IconButton aria-label="Next" icon={<ChevronRightIcon />} size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} isDisabled={currentPage === totalPages} />
      </Flex>
    </Box>
  );
}
