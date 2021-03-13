import { useState, useEffect } from 'react';
import Table from './Table';
import TableInfo from './TableInfo';
import Color from './Color';

const getBackgroundColor = () => {
	const makeRandColorValues = () => Math.floor(Math.random() * 255);
	const red = makeRandColorValues();
	const green = makeRandColorValues();
	const blue = makeRandColorValues();

	const backgroundColor = new Color(red, green, blue);

	return backgroundColor;
};

const ColorSquare = props => {
	return <div style={{ backgroundColor: props.color }} className={props.className}></div>;
};

const App = () => {
	const [currentToggledColor, setToggledColor] = useState(new Color(0, 0, 0));
	const [backgroundColor, setBackgroundColor] = useState(currentToggledColor.rgbString());
	const [savedColors, setSavedColors] = useState([]);

	useEffect(() => {
		setBackgroundColor(currentToggledColor.rgbString());
	}, [currentToggledColor]);
	useEffect(() => (document.body.style.backgroundColor = backgroundColor), [backgroundColor]);

	return (
		<>
			<div className="ui raised very padded text container segment" style={{ marginTop: '2em' }}>
				<h1>The Random Color App!</h1>

				<h2>Color Info:</h2>

				<Table>
					<TableInfo header="RGB" info={currentToggledColor.rgbString()} />
					<TableInfo header="HEX" info={currentToggledColor.hex()} />
					<TableInfo header="HSL" info={currentToggledColor.hsl()} />
					<TableInfo header="CMYK" info={currentToggledColor.cmyk()} />
				</Table>

				<button onClick={() => setToggledColor(getBackgroundColor)} className="ui button">
					Click me to change the background color!
				</button>
				<button onClick={() => setSavedColors([currentToggledColor, ...savedColors])} className="ui button">
					Save Color!
				</button>
			</div>

			<div className="ui raised very padded text container segment" style={{ marginTop: '2em', marginBottom: '2em' }}>
				<h2>Saved colors</h2>

				<button className="ui button" onClick={() => setSavedColors([])}>
					Clear saved colors
				</button>

				{savedColors.map((color, i) => {
					return (
						<div style={{ marginTop: '2em', marginBottom: '2em' }}>
							<div className="ui grid" key={i}>
								<div className="ten wide column">
									<Table>
										<TableInfo header="RGB" info={color.rgbString()} />
										<TableInfo header="HEX" info={color.hex()} />
										<TableInfo header="HSL" info={color.hsl()} />
										<TableInfo header="CMYK" info={color.cmyk()} />
									</Table>
								</div>
								<ColorSquare color={color.rgbString()} className="six wide column" />
							</div>
							<button className="ui button" onClick={() => setToggledColor(color)}>
								Go back to {color.rgbString()}
							</button>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default App;
