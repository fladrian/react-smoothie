import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Service from "../services/smoothies.service";

export default () => {
  const [liquids, setLiquids] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [fruits, setFruits] = useState([]);
  const { handleSubmit, register } = useForm();

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const newSmoothie = await Service.AddSmoothie(values);
      newSmoothie.status === 200 && alert("New Smoothie Created!");
    } catch (error) {
      console.error(error);
    }
  };

  const getAllIngredients = async () => {
    try {
      const liquidsData = await Service.GetAllLiquids();
      liquidsData.status === 200 && setLiquids(liquidsData.data);

      const proteinsData = await Service.GetAllProteins();
      proteinsData.status === 200 && setProteins(proteinsData.data);

      const fruitsData = await Service.GetAllFruits();
      fruitsData.status === 200 && setFruits(fruitsData.data);
    } catch (error) {
      console.info(error);
    }
  };

  useEffect(() => {
    getAllIngredients();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="title" ref={register} />

      <select name="fruits" ref={register}>
        {fruits.map((fruit, index) => (
          <option key={index} value={fruit._id}>
            {fruit.name}
          </option>
        ))}
      </select>

      <select name="proteins" ref={register}>
        {proteins.map((protein, index) => (
          <option key={index} value={protein._id}>
            {protein.name}
          </option>
        ))}
      </select>

      <select name="liquids" ref={register}>
        {liquids.map((liquid, index) => (
          <option key={index} value={liquid._id}>
            {liquid.name}
          </option>
        ))}
      </select>

      <input name="tastes" ref={register} />

      <button type="submit">Submit</button>
    </form>
  );
};
