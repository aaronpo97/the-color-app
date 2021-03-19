import { Button, Divider, Segment, Header } from 'semantic-ui-react';
import Table from './Table';

const RenderSaved = (savedColors, setSavedColors, setToggledColor) => {
	const handleDelete = deletedRGB => {
		const newSavedColors = savedColors.filter(item => item.rgbString() !== deletedRGB);
		setSavedColors(newSavedColors);
	};

	return !savedColors.length ? null : (
		<Segment raised padded style={{ marginBottom: '100px' }}>
			<Header size='medium' as='h2'>
				Saved colours:
			</Header>
			{savedColors.map((color, i) => {
				return (
					<div style={{ paddingTop: '1em', paddingBottom: '1em' }} key={color.rgbString()}>
						<div style={{ backgroundColor: color.hex(), height: '10vw' }}></div>
						<Table
							pairs={[
								['RGB', color.rgbString()],
								['HEX', color.hex()],
								['HSL', color.hsl()],
								['CMYK', color.cmyk()],
							]}
						/>

						<Button onClick={() => setToggledColor(color)}>Go back to {color.rgbString()}</Button>
						<Button onClick={() => handleDelete(color.rgbString())}>Delete saved colour: {color.rgbString()}</Button>
						<Divider />
					</div>
				);
			})}
			<Button onClick={() => setSavedColors([])}>Clear saved colors</Button>
		</Segment>
	);
};

export default RenderSaved;
