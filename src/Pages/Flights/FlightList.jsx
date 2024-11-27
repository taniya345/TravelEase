import React, { useEffect } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";

const getData = async (page, priceValue, from, to) => {
  let url = `https://makemytrip-api-data.onrender.com/flight?_page=${page}&_limit=5`;
  
  if (priceValue) {
    url += `&price_gte=${priceValue - 2000}&price_lte=${priceValue}`;
  }
  
  if (from) {
    url += `&from=${from}`;
  }
  if (to) {
    url += `&to=${to}`;
  }
  
  let res = await axios.get(url);
  return res.data;
};

export default function FlightList({ page, priceValue, from, to }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    getData(page, priceValue, from, to).then((res) => {
      setData(res);
    });
  }, [page, priceValue, from, to]);

  return (
    <div>
      {data.length > 0 &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <FlightCard data={item} />
            </div>
          );
        })}
    </div>
  );
}
