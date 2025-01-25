import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Pokemon = {
  name: string;
  isFavourite: boolean;
};

export const Main = () => {
  const [list, setList] = useState<Pokemon[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchItems();
  }, [offset]);

  const fetchItems = async () => {
    const { data } = await axios.get(`http://localhost:5000/pokemon/?limit=15&offset=${offset}`);
    const nextList = data.data.results.map((el: { name: string }) => ({
      name: el.name,
    }));
    const { next } = data.data;
    setHasMore(next);
    setList((prev) => {
      const existingNames = new Set(prev.map((item) => item.name));
      const uniqueItems = nextList.filter((item: Pokemon) => !existingNames.has(item.name));
      return [...prev, ...uniqueItems];
    });
  };

  return (
    <>
      <main>
        <InfiniteScroll
          dataLength={list.length}
          next={() => setOffset((prev) => prev + 15)}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more items to load</p>}
        >
          {list.map((el, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                margin: "5px 0",
                border: "1px solid #ccc",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "48px",
              }}
            >
              <span>
                {index + 1}: {el.name}
              </span>
              <button
                style={{
                  backgroundColor: el.isFavourite ? "#ffd700" : "#f0f0f0",
                  border: "none",
                }}
              >
                {el.isFavourite ? "★" : "☆"}
              </button>
            </div>
          ))}
        </InfiniteScroll>
      </main>
    </>
  );
};
