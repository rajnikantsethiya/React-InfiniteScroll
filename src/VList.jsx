import { useState } from "react";
import PropTypes from "prop-Types";

const VList = ({ list, width, height, itemHeight }) => {
  const [listIndices, setListIndices] = useState([
    0,
    Math.floor(height / itemHeight),
  ]);

  const handleScroll = e => {
    const { scrollTop } = e.target;
    const startIndex = Math.floor(scrollTop/itemHeight);
    const endIndex = startIndex + Math.floor(height/itemHeight);
    setListIndices([startIndex, endIndex]);
  }
  
  const visibleList = list.slice(listIndices[0], listIndices[1] + 1);
  return (
    <div onScroll={handleScroll} style={{ width, height, background: "skyblue", overflow: "auto" }}>
      <div style={{ height: list.length * itemHeight, position: 'relative' }}>
        {visibleList.map((item, index) => {
          return (
            <div
              style={{
                height: itemHeight,
                border: "5px solid white",
                position: 'absolute',
                top: (listIndices[0] + index) * itemHeight,
                width: '100%',
                textAlign: "center"
              }}
              key={item.id}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

VList.propTypes = {
  list: PropTypes.array,
  width: PropTypes.Number,
  height: PropTypes.Number,
  itemHeight: PropTypes.Number,
};
export default VList;
