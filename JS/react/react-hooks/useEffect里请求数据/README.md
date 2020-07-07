## How to fetch data with React Hooks?

[来源链接:https://www.robinwieruch.de/react-hooks-fetch-data](https://www.robinwieruch.de/react-hooks-fetch-data)

当前时间：2020-07-07，目前 react 请求数据，依旧使用 react hooks，以后 react 会使用 Suspense

数据的请求，和处理一般需要注意以下几点：

- loading
- error
- data
- 以及数据请求回来的处理

```javascript
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const useDataApi = (initialUrl, initialData = {}) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useDataApi;
```
