import React, { useState, useEffect } from "react";
import Service from "../services/smoothies.service";

export default () => {
  //Hooks
  const [smoothies, setSmoothies] = useState([]);

  const getAllSmoothies = async () => {
    try {
      const smoothiesData = await Service.GetAllSmoothies();
      smoothiesData.status === 200 && setSmoothies(smoothiesData.data);
    } catch (error) {
      console.info(error);
    }
  };

  useEffect(() => {
    getAllSmoothies();
  }, []);

  return (
    <div>
      {smoothies.map((smoothie, index) => {
        const { title, tastes, fruits, liquids, proteins } = smoothie;
        return (
          <div key={index}>
            <div>{title}</div>
            <p>{tastes}</p>
            <div>
              Frutas:
              {fruits.map((f, k) => (
                <div key={k}>
                  <span>{f.name} - [{f.value}]</span>
                </div>
              ))}
            </div>
            <p>
              Liquidos: {liquids.name} - [{liquids.value}]
            </p>
            <p>Proteinas: {proteins.name}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
}