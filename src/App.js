import { useState, useEffect } from 'react';
import getRandomColor from './Color';
import RGBColor from './RGBColor';
import { Container, Segment, Button, Header, Grid } from 'semantic-ui-react';
import RenderSaved from './RenderSaved';
import Table from './Table';

import hexRgb from 'hex-rgb';

const App = () => {
	const [toggledColor, setToggledColor] = useState(new RGBColor(0, 0, 0));
	const [savedColors, setSavedColors] = useState([]);
	const [showSaved, setShowSaved] = useState(true);
	const [oldColors, setOldColors] = useState([]);

	useEffect(() => {
		if (!localStorage.savedColors) {
			localStorage.setItem(
				'savedColors',
				savedColors.map(savedColor => savedColor.hex())
			);
			localStorage.setItem('toggledColor', toggledColor);
			return;
		}

		setSavedColors(
			localStorage.savedColors.split(',').map(color => {
				return new RGBColor(
					hexRgb(color).red,
					hexRgb(color).green,
					hexRgb(color).blue
				);
			})
		);
	}, []);

	useEffect(() => {
		setToggledColor(savedColors[0] || toggledColor);
	}, [savedColors]);

	useEffect(() => {
		document.body.style.backgroundColor = toggledColor.rgbString();
		document.title = `Current Colour: ${toggledColor.hex()}`;
	}, [toggledColor]);

	useEffect(() => {
		setOldColors([...oldColors, toggledColor]);
	}, [toggledColor]);

	const saveColor = () => {
		if (savedColors.includes(toggledColor)) {
			return alert('Colour already saved.');
		}
		setSavedColors([toggledColor, ...savedColors]);
		localStorage.savedColors = [toggledColor, ...savedColors].map(savedColor =>
			savedColor.hex()
		);

		console.log(savedColors);
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
			<RenderSaved
				savedColors={savedColors}
				setSavedColors={setSavedColors}
				setToggledColor={setToggledColor}
				showSaved={showSaved}
				setShowSaved={setShowSaved}
			/>
		</Container>
	);
};

export default App;
