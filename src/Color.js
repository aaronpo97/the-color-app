import RGBColor from './RGBColor';

const getRandomColor = () => {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);
	return new RGBColor(red, green, blue);
};

export default getRandomColor;
