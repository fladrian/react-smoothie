import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dropdown, Grid } from 'semantic-ui-react';
import Service from '../services/smoothies.service';
import '../main.css';

export default () => {
	const [liquids, setLiquids] = useState([]);
	const [proteins, setProteins] = useState([]);
  const [fruits, setFruits] = useState([]);
  
  const [proteinSelect, setProteinSelect] = useState('')
  const [liquidSelect, setLiquidSelect] = useState('')
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

	const dropdownFruits = fruits.map((fruit) => ({
		key: fruit._id,
		text: fruit.name,
		value: fruit._id,
  }));
  const dropdownProteins = proteins.map((protein) => ({
		key: protein._id,
		text: protein.name,
		value: protein._id,
  }));
  const dropdownLiquids = liquids.map((liquid) => ({
		key: liquid._id,
		text: liquid.name,
		value: liquid._id,
	}));
	//setDropdownFruits(dropdown);

	const handleDropdownFruits = (e, item) => {
		console.log(item.value);
		setMultiselect(item.value);
  };
  const handleDropdownProteins = (e, item) => {
		console.log(item.value);
		setProteinSelect(item.value);
  };
  const handleDropdownLiquids = (e, item) => {
		console.log(item.value);
		setLiquidSelect(item.value);
	};

	return (
		<Grid>
			<Grid.Row centered>
				<Grid.Column tablet='8' largeScreen='6' mobile='16'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input name='title' ref={register} id='title' />

						<Dropdown
							placeholder='Frutas'
							onChange={handleDropdownFruits}
							multiple
							selection
							options={dropdownFruits}
							className='p-input'
						/>

						<Dropdown
							placeholder='Proteinas'
							onChange={handleDropdownProteins}
							selection
							options={dropdownProteins}
							className='p-input'
						/>

						<Dropdown
							placeholder='Frutas'
							onChange={handleDropdownLiquids}
							selection
							options={dropdownLiquids}
							className='p-input'
						/>

						{/* <select name='proteins' ref={register}>
							{proteins.map((protein, index) => (
								<option key={index} value={protein._id}>
									{protein.name}
								</option>
							))}
						</select>
						<select name='liquids' ref={register}>
							{liquids.map((liquid, index) => (
								<option key={index} value={liquid._id}>
									{liquid.name}
								</option>
							))}
						</select> */}
						<input name='tastes' ref={register} />
						<button type='submit'>Submit</button>
					</form>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};
