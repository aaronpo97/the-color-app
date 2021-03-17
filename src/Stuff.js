import { useState, useEffect } from 'react';
import Color from './Color';
import { Container, Segment, Button, Header, Table, Divider } from 'semantic-ui-react';
import ColorTable from './ColorTable';

const getRandomColor = () => {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);
	return new Color(red, green, blue);
};
const App = () => {
	const [toggledColor, setToggledColor] = useState(new Color(0, 0, 0));
	const [savedColors, setSavedColors] = useState([]);

	useEffect(() => {
		document.body.style.backgroundColor = toggledColor.rgbString();
		document.title = `Current Colour: ${toggledColor.hex()}`;
	}, [toggledColor]);

	const handleDelete = deletedRGB => {
		const newSavedColors = savedColors.filter(item => item.rgbString() !== deletedRGB);
		setSavedColors(newSavedColors);
	};
	const renderSaved = () => {
		return savedColors.map((color, i) => {
			return (
				<div style={{ paddingTop: '1em', paddingBottom: '1em' }} key={color.rgbString()}>
					<div style={{ backgroundColor: color.hex(), height: '5vw' }}></div>
					<ColorTable />
					<Button onClick={() => setToggledColor(color)}>Go back to {color.rgbString()}</Button>

					<Button onClick={() => handleDelete(color.rgbString())}> Delete saved color: {color.rgbString()} </Button>
					<Divider />
				</div>
			);
		});
	};

	const savedColorInfo = () => {
		return savedColors.length ? (
			<Segment raised padded style={{ marginBottom: '100px' }}>
				<Header size='medium' as='h2'>
					Saved colours:
				</Header>
				{renderSaved()}
				<Button onClick={() => setSavedColors([])}>Clear saved colors</Button>
			</Segment>
		) : null;
	};

	return (
		<Container text>
			<Segment raised padded style={{ marginTop: '100px' }}>
				<Header as='h1' size='huge'>
					The Random Colour App by Aaron William Po
				</Header>
			</Segment>
			<Segment raised padded>
				<Header as='h2' size='medium'>
					Colour Info
				</Header>
				<Table>
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
				<Button secondary onClick={() => setToggledColor(getRandomColor)}>
					Click me to change the background color!
				</Button>
				<Button
					secondary
					onClick={() => {
						if (savedColors.includes(toggledColor)) {
							return alert('Color already saved.');
						}
						setSavedColors([toggledColor, ...savedColors]);
					}}>
					Save color!
				</Button>
			</Segment>
			{savedColorInfo()}
		</Container>
	);
};

export default App;
