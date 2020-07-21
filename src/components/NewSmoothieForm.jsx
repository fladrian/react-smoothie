import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dropdown, Grid } from "semantic-ui-react";
import Service from "../services/smoothies.service";
import "../main.css";

export default () => {
  const [liquids, setLiquids] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [fruits, setFruits] = useState([]);

  const [proteinSelect, setProteinSelect] = useState("");
  const [liquidSelect, setLiquidSelect] = useState("");
  const [multiselect, setMultiselect] = useState([]);
  const { handleSubmit, register } = useForm();

  const onSubmit = async (values) => {
    values.fruits = multiselect;
    values.liquids = liquidSelect;
    values.proteins = proteinSelect;
    console.log(values);

    try {
      const newSmoothie = await Service.AddSmoothie(values);
      newSmoothie.status === 200 && alert("New Smoothie Created!");
    } catch (error) {
      console.error(error);
    }
  };

  const fillDropDown = (ingredient) => {
    const ingredients = ingredient.map(i => ({
      key: i._id,
      text: i.name,
      value: i._id,}))
    return ingredients
  }
  const handleIngredients = (item, handleIngredient) => {
    console.info(item.value)
    handleIngredient(item.value)
  }

  useEffect(() => {
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
		getAllIngredients();
  }, []);

  const dropdownFruits = fillDropDown(fruits)
  const dropdownProteins = fillDropDown(proteins)
  const dropdownLiquids = fillDropDown(liquids)

  const handleDropdownFruits = (e, item) => handleIngredients(item, setMultiselect)
  const handleDropdownProteins = (e, item) => handleIngredients(item, setProteinSelect)
  const handleDropdownLiquids = (e, item) => handleIngredients(item, setLiquidSelect)


  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column tablet="8" largeScreen="6" mobile="16">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input name="title" ref={register} id="title" />

            <Dropdown
              placeholder="Frutas"
              onChange={handleDropdownFruits}
              multiple
              selection
              options={dropdownFruits}
              className="p-input"
            />

            <Dropdown
              placeholder="Proteinas"
              onChange={handleDropdownProteins}
              selection
              options={dropdownProteins}
              className="p-input"
            />

            <Dropdown
              placeholder="Frutas"
              onChange={handleDropdownLiquids}
              selection
              options={dropdownLiquids}
              className="p-input"
            />
            <input name="tastes" ref={register} />
            <button type="submit">Submit</button>
          </form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
