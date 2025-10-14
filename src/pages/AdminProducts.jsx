import React, { useEffect, useMemo, useState } from 'react';
import { Box, Badge, Heading, Image, Text, useToast } from '@chakra-ui/react';
import DataTable from '../components/DataTable';
import axios from 'axios';
import { formatCurrencyINR, normalizeProduct } from '../models/Product';

export default function AdminProducts() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8080/products');
        const normalized = res.data.map(normalizeProduct);
        if (mounted) setRows(normalized);
      } catch (e) {
        const message = e?.message || 'Failed to fetch products';
        setError(message);
        toast({ title: 'Error', description: message, status: 'error' });
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [toast]);

  const columns = useMemo(() => [
    {
      header: 'ID', accessor: 'id', sortable: true, searchable: false,
    },
    {
      header: 'Image', accessor: 'image', sortable: false, searchable: false,
      cell: (value) => (
        <Image src={value} alt="product" boxSize="50px" objectFit="cover" borderRadius="md" />
      ),
    },
    {
      header: 'Name', accessor: 'name', sortable: true, searchable: true,
    },
    {
      header: 'Category', accessor: 'category', sortable: true, searchable: true,
    },
    {
      header: 'Price', accessor: 'offerPriceValue', sortable: true, searchable: false,
      cell: (_, row) => (
        <Box>
          <Text>{formatCurrencyINR(row.offerPrice)}</Text>
          {row.actualPriceValue && row.discountPercent > 0 && (
            <Text fontSize="xs" color="gray.500">MRP {formatCurrencyINR(row.actualPrice)} · {row.discountPercent}% off</Text>
          )}
        </Box>
      ),
    },
    {
      header: 'Stock', accessor: 'inStock', sortable: true, searchable: false,
      cell: (value) => (
        <Badge colorScheme={value ? 'green' : 'red'}>{value ? 'In stock' : 'Out of stock'}</Badge>
      ),
    },
    {
      header: 'Rating', accessor: 'rating', sortable: true, searchable: false,
      cell: (value) => <Badge>{value}</Badge>,
    },
  ], []);

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <Heading size="md" mb={4}>Products</Heading>
      {error && <Text color="red.500" mb={2}>{error}</Text>}
      <DataTable
        columns={columns}
        data={rows}
        initialSortKey="name"
        initialSortDirection="asc"
        initialPageSize={10}
        globalSearchPlaceholder="Search name or category..."
      />
    </Box>
  );
}
