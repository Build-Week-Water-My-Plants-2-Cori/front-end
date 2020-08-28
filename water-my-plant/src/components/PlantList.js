import React, { useState } from "react";
import AxiosWithAuth from "./AxiosWithAuth";

const initialPlant = {
  plantid: "",
  nickname: "",
  species: "",
  frequency: "",
  photo: "",
};

const PlantList = ({ plants, updatePlants }) => {
  console.log("plants:", plants);
  const [editing, setEditing] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState(initialPlant);

  const editPlant = (plant) => {
    setEditing(true);
    setPlantToEdit(plant);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    AxiosWithAuth()
      .put(
        `https://cking-watermyplants.herokuapp.com/plants/${plantToEdit.plantid}`,
        plantToEdit
      )
      .then((res) => {
        console.log("Plant to edit res:", plantToEdit);

        updatePlants(
          plants.map((plant) => {
            if (plant.plantid === plantToEdit.plantid) {
              return plantToEdit;
            } else return plant;
          })
        );
      })
      .catch((err) => console.log("SaveEdit err", err));
  };

  const postNewPlant = (newPlant, userid) => {
    console.log("Submitted values: ", newPlant);
    AxiosWithAuth()
      .post(
        `https://cking-watermyplants.herokuapp.com/plants/${userid}`,
        newPlant
      )
      .then((res) => {
        console.log(newPlant.nickname, plantToEdit.nickname);
        if (newPlant.nickname === "Hibiscus") {
          return res.data;
        } else {
          updatePlants([res.data, ...plantToEdit]);
        }
      })
      .catch((err) => console.log("err POST forms", err));
  };
  // postNewPlant(
  //   {
  //     plantid: "6",
  //     nickname: "Hibiscus",
  //     species: "Roses",
  //     frequency: "Once per 3 days",
  //     photo: "Living room floor",
  //   },
  //   1
  // );

  const deletePlant = (plant) => {
    AxiosWithAuth()
      .delete(
        `https://cking-watermyplants.herokuapp.com/plants/${plant.plantid}`
      )
      .then((res) => {
        // console.log("deletePlant res:", res.data);
        updatePlants(
          plants.filter((item) => {
            return item.plantid !== plant.plantid;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="plants-wrap">
      <div>
        <h1>PLANTS</h1>
      </div>
      <ul>
        {plants.map((plant) => (
          <li key={plant.plantid} onClick={() => editPlant(plant)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePlant(plant);
                }}
              >
                *delete*
              </span>
              {"   "}
              {plant.nickname}
              <p>Plants Species: {plant.species}</p>
              <p>Plants Water Frequency: {plant.frequency}</p>
              <p>Picture or Location: {plant.photo}</p>
              <p></p>
            </span>
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>Edit plant</legend>
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
            Watering Frequency:
            <input
              onChange={(e) =>
                setPlantToEdit({ ...plantToEdit, frequency: e.target.value })
              }
              value={plantToEdit.frequency}
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
