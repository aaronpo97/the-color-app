import { useState, useEffect } from 'react';
import getRandomColor from './Color';
import RGBColor from './RGBColor';
import { Container, Segment, Button, Header } from 'semantic-ui-react';
import RenderSaved from './RenderSaved';
import TableA from './TableA';

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

				<TableA
					pairs={[
						['RGB', toggledColor.rgbString()],
						['HEX', toggledColor.hex()],
						['HSL', toggledColor.hsl()],
						['CMYK', toggledColor.cmyk()],
					]}
				/>

				<Button onClick={() => setToggledColor(getRandomColor)}>Click me to change the background color!</Button>
				<Button
					onClick={() => {
						if (savedColors.includes(toggledColor)) {
							return alert('Color already saved.');
						}
						setSavedColors([toggledColor, ...savedColors]);
					}}>
					Save color!
				</Button>
			</Segment>
			{RenderSaved(savedColors, setSavedColors, toggledColor, setToggledColor)}
		</Container>
	);
};

export default App;
