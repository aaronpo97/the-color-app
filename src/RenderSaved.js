import { Button, Divider, Segment, Header } from 'semantic-ui-react';
import TableA from './TableA';

const RenderSaved = (savedColors, setSavedColors, setToggledColor) => {
	const handleDelete = deletedRGB => {
		const newSavedColors = savedColors.filter(item => item.rgbString() !== deletedRGB);
		setSavedColors(newSavedColors);
	};

	if (!savedColors.length) {
		return null;
	} else {
		return (
			<Segment raised padded style={{ marginBottom: '100px' }}>
				<Header size='medium' as='h2'>
					Saved colours:
				</Header>
				{savedColors.map((color, i) => {
					return (
						<div style={{ paddingTop: '1em', paddingBottom: '1em' }} key={color.rgbString()}>
							<div style={{ backgroundColor: color.hex(), height: '5vw' }}></div>

							<TableA
								pairs={[
									['RGB', color.rgbString()],
									['HEX', color.hex()],
									['HSL', color.hsl()],
									['CMYK', color.cmyk()],
								]}
							/>

							<Button onClick={() => setToggledColor(color)}>Go back to {color.rgbString()}</Button>
							<Button onClick={() => handleDelete(color.rgbString())}>
								Delete saved color: {color.rgbString()}
							</Button>
							<Divider />
						</div>
					);
				})}
				<Button onClick={() => setSavedColors([])}>Clear saved colors</Button>
			</Segment>
		);
	}
};
export default RenderSaved;
