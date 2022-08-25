import { useMemo, useCallback, useState } from 'react';
import { debounce } from 'lodash';

// import mockData from './MOCK_DATA.json'
import mockData from '.././db.json';

const DELAY = 300;

export const useSearch = (initialValue) => {
  const [data, setData] = useState(initialValue);

  const getData = useCallback(
    debounce(
      (value) => {
        // call API here
        const result = mockData.filter(
          (item) => item.id      );
        setData(result);
      },
      DELAY,
    ),
    [],
  );

  console.log("data2" , data);
  return useMemo(
    () => [data, getData],
    [data, getData],
  );
}