import React, { useState, useEffect } from 'react';
import Service from '../services/smoothies.service';
import { Accordion, Icon, Grid, Label } from 'semantic-ui-react';

export default () => {
	//Hooks
	const [smoothies, setSmoothies] = useState([]);
	const [accordion, setAccordion] = useState({ activeIndex:"" });

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
		const { index } = item;
		const { activeIndex } = accordion;
		const newIndex = activeIndex === index ? -1 : index;
		setAccordion({ activeIndex: newIndex });
	};


	return (
		<Grid>
			<Grid.Row centered>
				<Grid.Column tablet='8' largeScreen='6' mobile='16'>
					{smoothies.map((smoothie, index) => {
						const { title, tastes, fruits, liquids, proteins } = smoothie;
						const { value } = liquids;
						const totalFruitValue = fruits.reduce((acc, fruit) => {
							return acc + fruit.value;
						}, 0);
						const totalValueSmoothie = value + totalFruitValue;
						return (
							<React.Fragment key={index}>
								<Accordion styled >
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
													<Label as='div' size='small'>
														{tastes}%
														<Label.Detail>
															<Icon name='tint' color="orange"/>
														</Label.Detail>
													</Label>
												</Grid.Column>
												<Grid.Column width='4' stretched textAlign='center'>
													<Label as='div' size='small'>
														{totalValueSmoothie}
														<Label.Detail>
															<Icon name='heart' color="green" />
														</Label.Detail>
													</Label>
												</Grid.Column>
											</Grid.Row>
										</Grid>
									</Accordion.Title>
									<Accordion.Content active={accordion.activeIndex === index}>
										<Label as='h3' size='medium'>
											Frutas:
											{fruits.map((f, index) => (
												<Label.Detail key={f._id}>{f.name}</Label.Detail>
											))}
										</Label>			
										<br />
										<br />

										<Label as='h3' size='medium'>
											Liquido:
											<Label.Detail>{liquids.name}</Label.Detail>
										</Label>

										<br />
										<br />
										<Label as='h3' size='medium'>
											Proteina:
											<Label.Detail>{proteins.name}</Label.Detail>
										</Label>
									</Accordion.Content>
								</Accordion>
								<br />
							</React.Fragment>
						);
					})}
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};
