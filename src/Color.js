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
		let c = 1 - this.r / 255;
		let m = 1 - this.g / 255;
		let y = 1 - this.b / 255;
		let k = Math.min(c, Math.min(m, y));

		c = (c - k) / (1 - k);
		m = (m - k) / (1 - k);
		y = (y - k) / (1 - k);

		c = Math.round(c * 10000) / 100;
		m = Math.round(m * 10000) / 100;
		y = Math.round(y * 10000) / 100;
		k = Math.round(k * 10000) / 100;

		c = isNaN(c) ? 0 : c;
		m = isNaN(m) ? 0 : m;
		y = isNaN(y) ? 0 : y;
		k = isNaN(k) ? 0 : k;

		return `CMYK(${c.toFixed(0)}%, ${m.toFixed(0)}%, ${y.toFixed(0)}%, ${k.toFixed(0)}%)`;
	}
}

export default RGBColor;
