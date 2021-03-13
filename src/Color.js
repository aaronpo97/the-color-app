class RGBColor {
	constructor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	hex() {
		const hexRed = this.r.toString(16).length === 1 ? '0' + this.r.toString(16) : this.r.toString(16);
		const hexGreen = this.g.toString(16).length === 1 ? '0' + this.g.toString(16) : this.g.toString(16);
		const hexBlue = this.b.toString(16).length === 1 ? '0' + this.b.toString(16) : this.b.toString(16);

		return `#${hexRed + hexGreen + hexBlue}`.toUpperCase();
	}

	rgbString() {
		return `rgb(${this.r}, ${this.g}, ${this.b})`;
	}

	hsl() {
		const r1 = this.r / 255;
		const g1 = this.g / 255;
		const b1 = this.b / 255;

		const maxColor = Math.max(r1, g1, b1);
		const minColor = Math.min(r1, g1, b1);

		const calculateLight = () => (maxColor + minColor) / 2;

		const calculateSaturation = () => {
			if (calculateLight() < 0.5) {
				return (maxColor - minColor) / (maxColor + minColor);
			} else {
				return (maxColor - minColor) / (2.0 - maxColor - minColor);
			}
		};

		const calculateHue = () => {
			if (r1 === maxColor) {
				return (g1 - b1) / (maxColor - minColor);
			} else if (g1 === maxColor) {
				return 2.0 + (b1 - r1) / (maxColor - minColor);
			} else {
				return 4.0 + (r1 - g1) / (maxColor - minColor);
			}
		};

		const hue = calculateHue() * 60;

		const h = hue < 0 ? hue + 360 : hue;
		const s = calculateSaturation() * 100;
		const l = ((maxColor + minColor) / 2) * 100;

		return `HSL(${h ? h.toFixed(0) : 0}°, ${s ? s.toFixed(0) : 0}%, ${l ? l.toFixed(0) : 0}%)`;
	}

	cmyk() {
		return 'i need to implement this lol';
	}
}

export default RGBColor;
