import { useState, useEffect } from 'react';
import getRandomColor from './Color';
import RGBColor from './RGBColor';
import { Container, Segment, Button, Header, Grid } from 'semantic-ui-react';
import RenderSaved from './RenderSaved';
import Table from './Table';

const App = () => {
	const [toggledColor, setToggledColor] = useState(new RGBColor(0, 0, 0));
	const [savedColors, setSavedColors] = useState([]);

	useEffect(() => {
		document.body.style.backgroundColor = toggledColor.rgbString();
		document.title = `Current Colour: ${toggledColor.hex()}`;
	}, [toggledColor]);

	const saveColor = () => {
		if (savedColors.includes(toggledColor)) {
			return alert('Colour already saved.');
		}
		setSavedColors([toggledColor, ...savedColors]);
	};
	return (
		<Container text>
			<Segment raised padded style={{ marginTop: '100px' }}>
				<Header as='h1' size='huge'>
					The Random Colour App by ayerble
				</Header>
			</Segment>
			<Segment raised padded>
				<Header as='h2' size='medium'>
					Colour Info
				</Header>

				<Table
					pairs={[
						['RGB', toggledColor.rgbString()],
						['HEX', toggledColor.hex()],
						['HSL', toggledColor.hsl()],
						['CMYK', toggledColor.cmyk()],
					]}
				/>
				<Grid columns={2} divided>
					<Grid.Row>
						<Grid.Column>
							<Button fluid onClick={() => setToggledColor(getRandomColor)}>
								Change the background colour!
							</Button>
						</Grid.Column>
						<Grid.Column>
							<Button fluid onClick={() => saveColor()}>
								Save colour!
							</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
			{RenderSaved(savedColors, setSavedColors, setToggledColor)}
		</Container>
	);
};

export default App;
