import { Button, Table, Divider } from 'semantic-ui-react';
const ColorSquare = props => {
	return <div style={{ backgroundColor: props.color, height: '5vw' }} className={props.className}></div>;
};
const RenderSaved = ({ savedColors, setToggledColor, setSavedColors }) => {
	return savedColors.map((color, i) => {
		return (
			<div style={{ paddingTop: '1em', paddingBottom: '1em' }} key={i}>
				<ColorSquare color={color.rgbString()} />
				<Table>
					<Table.Body>
						<Table.Row>
							<Table.Cell>RGB</Table.Cell>
							<Table.Cell>{color.rgbString()}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>HEX</Table.Cell>
							<Table.Cell>{color.hex()}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>HSL</Table.Cell>
							<Table.Cell>{color.hsl()}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>CMYK</Table.Cell>
							<Table.Cell>{color.cmyk()}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
				<Button onClick={() => setToggledColor(color)}>Go back to {color.rgbString()}</Button>

				<Button
					onClick={() => {
						alert('you need to work on this you idiot');
					}}>
					Delete saved color: {color.rgbString()}
				</Button>
				<Divider />
			</div>
		);
	});
};

export default RenderSaved;
