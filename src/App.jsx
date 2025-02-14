import VList from "./VList";
import useFetch from "./hooks/useFetch";
import VListWithBatching from "./VListWithIntersectionObserver";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function App() {
  const [theme, setTheme] = useState("light");
  const { t, i18n } = useTranslation();
  const items = useFetch("https://jsonplaceholder.typicode.com/comments");
  const ChangeLng = (e) => {
    console.log(e.target.value);
    i18n.changeLanguage(e.target.value);
  };
  return (
    <div
      style={{
        background: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "sapce-between" }}>
        <h2>{t('Welcome')}</h2>
        <button
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
        >
          Change theme
        </button>
          <select name="Select Language" onChange={ChangeLng} >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
      </div>
      <div
        style={{
          width: "1000px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3>{t('listWithTopSpace')}</h3>
          <VList list={items} width={400} height={500} itemHeight={50} />
        </div>
        <div>
          <h3>{t('listWithObserver')}</h3>
          <div style={{ width: "400px" }}>
            <VListWithBatching itemHeight={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
