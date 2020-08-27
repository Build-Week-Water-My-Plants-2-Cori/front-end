import React, { useState, useEffect } from "react";
// import axios from "axios";

import PlantList from "./PlantList";
import { fetchApi } from "./fetchApi";

const PlantsPage = () => {
  const [plantList, setPlantList] = useState([]);

  useEffect(() => {
    fetchApi().then((res) => {
      console.log(res.data);
      setPlantList(
        res.map((plant) => {
          if (plant.id === res.id) {
            return res;
          } else {
            return plant;
          }
        })
      );
    });
  }, []);

  return (
    <>
      <PlantList plants={plantList} updatePlants={setPlantList} />
    </>
  );
};

export default PlantsPage;
