import { useState, useEffect } from 'react';
import getRandomColor from './Color';
import RGBColor from './RGBColor';
import { Container, Segment, Button, Header } from 'semantic-ui-react';
import RenderSaved from './RenderSaved';
import Table from './Table';

const App = () => {
	const [toggledColor, setToggledColor] = useState(new RGBColor(0, 0, 0));
	const [savedColors, setSavedColors] = useState([]);

	useEffect(() => {
		document.body.style.backgroundColor = toggledColor.rgbString();
		document.title = `Current Colour: ${toggledColor.hex()}`;
	}, [toggledColor]);

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

				<Button onClick={() => setToggledColor(getRandomColor)}>Click me to change the background colour!</Button>
				<Button
					onClick={() => {
						if (savedColors.includes(toggledColor)) {
							return alert('Colour already saved.');
						}
						setSavedColors([toggledColor, ...savedColors]);
					}}>
					Save colour!
				</Button>
			</Segment>
			{RenderSaved(savedColors, setSavedColors, setToggledColor)}
		</Container>
	);
};

export default App;
