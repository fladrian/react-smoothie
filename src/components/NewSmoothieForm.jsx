import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dropdown, Grid } from "semantic-ui-react";
import Service from "../services/smoothies.service";

export default () => {
  const [liquids, setLiquids] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [dropdownFruits, setDropdownFruits] = useState([]);
  const [multiselect, setMultiselect] = useState([]);
  const { handleSubmit, register } = useForm();

  const onSubmit = async (e, { values }) => {
    values.fruits = multiselect;
    console.log(values);

    // try {
    //   const newSmoothie = await Service.AddSmoothie(values);
    //   newSmoothie.status === 200 && alert("New Smoothie Created!");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    const getAllIngredients = async () => {
      try {
        const liquidsData = await Service.GetAllLiquids();
        liquidsData.status === 200 && setLiquids(liquidsData.data);

        const proteinsData = await Service.GetAllProteins();
        proteinsData.status === 200 && setProteins(proteinsData.data);

        const fruitsData = await Service.GetAllFruits();
        fruitsData.status === 200 && setFruits(fruitsData.data);
        const dropdownFruits = fruits.map((fruit) => ({
          key: fruit._id,
          text: fruit.name,
          value: fruit._id,
        }));
        setDropdownFruits(dropdownFruits);
      } catch (error) {
        console.info(error);
      }
    };
    getAllIngredients();
  }, [fruits]);

  const handleDropdown = (e, item) => setMultiselect(item.value);

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column tablet="8" largeScreen="6" mobile="16">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid.Row centered>
              <label htmlFor="title">
                Smoothie name:
                </label>
                <input name="title" ref={register} id="title" />
              
            </Grid.Row>

            <Grid.Row centered>
              <Dropdown
                placeholder="Frutas"
                onChange={handleDropdown}
                multiple
                selection
                options={dropdownFruits}
              />
            </Grid.Row>

            <Grid.Row centered>
              <select name="proteins" ref={register}>
                {proteins.map((protein, index) => (
                  <option key={index} value={protein._id}>
                    {protein.name}
                  </option>
                ))}
              </select>
            </Grid.Row>
            <Grid.Row centered>
              <select name="liquids" ref={register}>
                {liquids.map((liquid, index) => (
                  <option key={index} value={liquid._id}>
                    {liquid.name}
                  </option>
                ))}
              </select>
            </Grid.Row>
            <Grid.Row centered>
              <input name="tastes" ref={register} />
            </Grid.Row>
            <Grid.Row centered>
              <button type="submit">Submit</button>
            </Grid.Row>
          </form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
