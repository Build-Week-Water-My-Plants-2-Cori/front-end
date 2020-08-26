import React, { useState, useEffect } from "react";
// import axios from "axios";

// import ColorList from "./ColorList";
import { fetchApi } from "./fetchApi";

const PlantsPage = () => {
  const [plantList, setPlantList] = useState([]);

  useEffect(() => {
    fetchApi().then((res) =>
      setPlantList(
        res.map((plant) => {
          if (plant.id === res.id) {
            return res;
          } else {
            return plant;
          }
        })
      )
    );
  }, []);

  return (
    <>
      {/* <ColorList colors={colorList} updateColors={setColorList} />
       */}
    </>
  );
};

export default PlantsPage;
