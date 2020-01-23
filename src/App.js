import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const limit = 25;
  const [page, setPage] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const skip = page * limit;
    Axios.get(
      `https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=${skip}&limit=${limit}`
    ).then(response => {
      setData(response.data);
    });
  }, [page]);

  const setNewPage = nbr => {
    setPage(nbr);
  };

  const generatePagination = () => {
    const elem = [];
    for (let i = 0; i < data.count / limit; i++) {
      elem.push(
        <button onClick={() => setNewPage(i)} key={i}>
          {i}
        </button>
      );
    }
    return elem;
  };

  return (
    <div className="App">
      {data && data.offers.length}
      <div>
        {data &&
          data.offers.map((offer, index) => {
            if (offer.pictures[0])
              return <img key={index} alt="coucou" src={offer.pictures[0]} />;
            return null;
          })}
      </div>
      {data && generatePagination()}
    </div>
  );
}

export default App;
