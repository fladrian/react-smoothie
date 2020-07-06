import React, { useState, useEffect } from 'react';
import Service from '../services/smoothies.service';
import { Accordion, Icon, Grid, Label } from 'semantic-ui-react';

export default () => {
	//Hooks
	const [smoothies, setSmoothies] = useState([]);
	const [accordion, setAccordion] = useState({ activeIndex: null });
	const [subAccordion, setSubAccordion] = useState({ activeIndex: null });

	useEffect(() => {
		const getAllSmoothies = async () => {
			try {
				const smoothiesData = await Service.GetAllSmoothies();
				smoothiesData.status === 200 && setSmoothies(smoothiesData.data);
			} catch (error) {
				console.info(error);
			}
		};
		getAllSmoothies();
	}, []);
	const handleAccordionClick = (e, item) => {
		console.info(item);
		const { index } = item;
		const { activeIndex } = accordion;
		const newIndex = activeIndex === index ? -1 : index;
		setAccordion({ activeIndex: newIndex });
	};
	const handleSubAccordionClick = (e, item) => {
		console.info(item);
		const { index } = item;
		const { activeIndex } = subAccordion;
		const newIndex = activeIndex === index ? -1 : index;
		setSubAccordion({ activeIndex: newIndex });
	};

	return (
		<Grid>
			<Grid.Row centered>
				<Grid.Column tablet='10' largeScreen='6' mobile='14'>
					{smoothies.map((smoothie, index) => {
						const { title, tastes, fruits, liquids, proteins } = smoothie;
						const { value } = liquids;
						const totalFruitValue = fruits.reduce((acc, fruit) => {
							return acc + fruit.value;
						}, 0);
						const totalValueSmoothie = value + totalFruitValue;
						console.info(title, value, totalFruitValue);
						return (
							<>
								<Accordion styled key={index}>
									<Accordion.Title
										active={accordion.activeIndex === index}
										index={index}
										onClick={handleAccordionClick}>
										<Grid>
											<Grid.Row>
												<Grid.Column width='8'>
                        <Icon name='dropdown' />
                          {title}</Grid.Column>
												<Grid.Column width='4' stretched textAlign='center'>
													<Label as='p' color='red' size='small'>
														{tastes}%
														<Label.Detail>
															<Icon name='tint' />
														</Label.Detail>
													</Label>
												</Grid.Column>
												<Grid.Column width='4' stretched textAlign='center'>
													<Label as='p' color='violet' size='small'>
														{totalValueSmoothie}
														<Label.Detail>
															<Icon name='heart' />
														</Label.Detail>
													</Label>
												</Grid.Column>
											</Grid.Row>
										</Grid>
									</Accordion.Title>
									<Accordion.Content active={accordion.activeIndex === index}>
										<Label as='div' color='green' size='large'>
											Frutas:
										</Label>
										{fruits.map((f, k) => (
											<Accordion styled key={k}>
												<Accordion.Title
													active={subAccordion.activeIndex === k}
													index={k}
													onClick={handleSubAccordionClick}>
													<Icon name='dropdown' />
													{f.name}
												</Accordion.Title>
												<Accordion.Content
													active={subAccordion.activeIndex === k}>
													<p>Valor nutricional: {f.value}</p>
												</Accordion.Content>
											</Accordion>
										))}
										<br />

										<Label as='p' color='blue' size='large'>
											Liquido:
											<Label.Detail>{liquids.name}</Label.Detail>
										</Label>
										<Label as='p' color='yellow' size='large'>
											Proteina:
											<Label.Detail>{proteins.name}</Label.Detail>
										</Label>
									</Accordion.Content>
								</Accordion>
								<br />
							</>
						);
					})}
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};
