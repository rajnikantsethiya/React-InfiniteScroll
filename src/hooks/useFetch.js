import { useEffect, useRef, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error("Error:", error);
          }
        };
    
        fetchData();
      }, [url]);
    return data;
}
export default useFetch;