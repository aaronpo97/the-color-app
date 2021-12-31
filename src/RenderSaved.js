import {
	Button,
	Divider,
	Segment,
	Header,
	Grid,
	Accordion,
	Icon,
} from 'semantic-ui-react';
import Table from './Table';

const RenderSaved = ({
	savedColors,
	setSavedColors,
	setToggledColor,
	showSaved,
	setShowSaved,
}) => {
	const handleDelete = deletedRGB => {
		const newSavedColors = savedColors.filter(
			item => item.rgbString() !== deletedRGB
		);
		setSavedColors(newSavedColors);
	};

	return !savedColors.length ? null : (
		<Segment raised padded style={{ marginBottom: '100px' }}>
			<Accordion>
				<Accordion.Title
					fluid
					active={showSaved === true}
					onClick={() => setShowSaved(!showSaved)}
					as='h2'>
					<Icon name='dropdown' />
					Saved Colours
				</Accordion.Title>
				<Accordion.Content active={showSaved === true}>
					{savedColors.map((color, i) => {
						return (
							<div
								style={{ paddingTop: '1em', paddingBottom: '1em' }}
								key={color.rgbString()}>
								<div
									style={{
										backgroundColor: color.hex(),
										height: '10vw',
										cursor: 'pointer',
									}}
									onClick={() => setToggledColor(color)}></div>
								<Table
									pairs={[
										['RGB', color.rgbString()],
										['HEX', color.hex()],
										['HSL', color.hsl()],
										['CMYK', color.cmyk()],
									]}
								/>

								<Grid columns={2} divided>
									<Grid.Row>
										<Grid.Column>
											<Button
												fluid
												onClick={() => setToggledColor(color)}>
												Go back to {color.rgbString()}
											</Button>
										</Grid.Column>
										<Grid.Column>
											<Button
												fluid
												onClick={() =>
													handleDelete(color.rgbString())
												}>
												Delete {color.rgbString()}
											</Button>
										</Grid.Column>
									</Grid.Row>
								</Grid>

								<Divider />
							</div>
						);
					})}
					<Button
						fluid
						onClick={() => {
							setSavedColors([]);
							localStorage.clear();
						}}>
						Clear saved colors
					</Button>
				</Accordion.Content>
			</Accordion>
		</Segment>
	);
};

export default RenderSaved;
