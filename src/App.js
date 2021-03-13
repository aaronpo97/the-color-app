import { useState, useEffect } from 'react';

import Color from './Color';
import { Container, Segment, Button, Header, Table } from 'semantic-ui-react';
import RenderSaved from './RenderSaved';

const getRandomColor = () => {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return new Color(red, green, blue);
};

const App = () => {
	const [toggledColor, setToggledColor] = useState(new Color(0, 0, 0));
	const [backgroundColor, setBackgroundColor] = useState(toggledColor.rgbString());
	const [savedColors, setSavedColors] = useState([]);

	useEffect(() => {
		setBackgroundColor(toggledColor.rgbString());
	}, [toggledColor]);
	useEffect(() => {
		document.body.style.backgroundColor = backgroundColor;
	}, [backgroundColor]);

	return (
		<>
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

					<Table definition>
						<Table.Body>
							<Table.Row>
								<Table.Cell>RGB</Table.Cell>
								<Table.Cell>{toggledColor.rgbString()}</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>HEX</Table.Cell>
								<Table.Cell>{toggledColor.hex()}</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>HSL</Table.Cell>
								<Table.Cell>{toggledColor.hsl()}</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>CMYK</Table.Cell>
								<Table.Cell>{toggledColor.cmyk()}</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>

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

				<Segment raised padded style={{ marginBottom: '100px' }}>
					<Header size='medium' as='h2'>
						Saved colours:
					</Header>
					<RenderSaved savedColors={savedColors} setToggledColor={setToggledColor} setSavedColors={setSavedColors} />
					<Button onClick={() => setSavedColors([])}>Clear saved colors</Button>
				</Segment>
			</Container>
		</>
	);
};

export default App;
