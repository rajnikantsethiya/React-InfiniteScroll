import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-Types";

function VListWithBatching({ itemHeight }) {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const itemRef = useRef(null);

  function onIntersection (list) {
    const first = list[0];
    if (first.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  };

  // will be called based on the products
  useEffect(() => {
    const newObserver = new IntersectionObserver(onIntersection, {
        rootMargin: "100px", // Trigger loading before reaching the element
      });
    if (newObserver && itemRef.current) {
      newObserver.observe(itemRef.current);
    }
    return () => {
      if (newObserver) {
        newObserver.disconnect();
      }
    };
  }, [products]);

  const fetchMoreItems = async () => {
    // We can't use the custom hook here as the fetchMoreItems is not a react component.
    // I am using this just to show an example
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10}`
    );
    const data = await response.json();
    console.log(data);
    
    if (data.products.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prev) => [...prev, ...data.products]);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      {products?.map((item) => 
        <div key={item.id} style={{ height: itemHeight }}>{item.title}</div>
      )}
      {hasMore && <div ref={itemRef}>Loading...</div>}
    </>
  );
};

VListWithBatching.propTypes = {
    itemHeight: PropTypes.number
}

export default VListWithBatching;
