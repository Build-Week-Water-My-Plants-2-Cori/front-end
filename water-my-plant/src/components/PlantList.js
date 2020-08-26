import React, { useState } from "react";
// import axios from "axios";
import AxiosWithAuth from "./AxiosWithAuth";

// id 	integer 	Yes 	Yes 	Plants id (auto generated)
// nickname 	string 	Yes 	No 	Plants Nickname
// species 	string 	Yes 	No 	Plants Species
// h2oFrequency 	integer 	No 	No 	Plants Water Frequency
// photo  string 	No 	No 	Plants Picture or Location

const initialPlant = {
  id: "",
  nickname: "",
  species: "",
  h2oFrequency: "",
  photo: "",
};

const PlantList = ({ plants, updatePlants }) => {
  // console.log(plants);
  const [editing, setEditing] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState(initialPlant);

  const editPlant = (plant) => {
    setEditing(true);
    setPlantToEdit(plant);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    AxiosWithAuth()
      .put(`/api/plants/${plantToEdit.id}`, plantToEdit)
      .then((res) => {
        // console.log("SaveEdit res:", res.data);
        updatePlants(
          plants.map((plant) => {
            if (plant.id === plantToEdit.id) {
              return res.data;
            } else return plant;
          })
        );
      })
      .catch((err) => console.log("SaveEdit err", err));
  };

  const deletePlant = (plant) => {
    AxiosWithAuth()
      .delete(`api/plants/${plant.id}`)
      .then((res) => {
        // console.log("deletePlant res:", res.data);
        updatePlants(
          plants.filter((item) => {
            return item.id !== plant.id;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="plants-wrap">
      <p>plants</p>
      <ul>
        {plants.map((plant) => (
          <li key={plant.plant} onClick={() => editPlant(plant)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePlant(plant);
                }}
              >
                x
              </span>{" "}
              {plant.plant}
            </span>
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit plant</legend>
          <label>
            Plants Nickname:
            <input
              onChange={(e) =>
                setPlantToEdit({ ...plantToEdit, nickname: e.target.value })
              }
              value={plantToEdit.nickname}
            />
          </label>
          <label>
            Plants Species:
            <input
              onChange={(e) =>
                setPlantToEdit({ ...plantToEdit, species: e.target.value })
              }
              value={plantToEdit.species}
            />
          </label>
          <label>
            Plants Water Frequency:
            <input
              onChange={(e) =>
                setPlantToEdit({ ...plantToEdit, h2oFrequency: e.target.value })
              }
              value={plantToEdit.h2oFrequency}
            />
          </label>
          <label>
            Picture or Location:
            <input
              onChange={(e) =>
                setPlantToEdit({
                  ...plantToEdit,
                  photo: e.target.value,
                })
              }
              value={plantToEdit.photo}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PlantList;
