'use strict';
import React from 'react';
import {Text, Newline} from 'ink';
import {readFile} from 'fs/promises';
const colorsCN = JSON.parse(
	await readFile(new URL('./colors_cn.json', import.meta.url), {
		assert: {type: 'json'},
	}),
);
const colorsJP = JSON.parse(
	await readFile(new URL('./colors_jp.json', import.meta.url), {
		assert: {type: 'json'},
	}),
);

const colorList = {
	red: '红',
	orange: '橙',
	yellow: '黄',
	green: '绿',
	blue: '蓝',
	purple: '紫',
	grey: '灰',
	brown: '棕',
	white: '白',
	pink: '粉',
	black: '黑',
};

const chineseColorList = {
	红: 'red',
	橙: 'orange',
	黄: 'yellow',
	绿: 'green',
	蓝: 'blue',
	紫: 'purple',
	灰: 'grey',
	棕: 'brown',
	白: 'white',
	粉: 'pink',
	黑: 'black',
};

/**
 * 
 * @param {*} array array of colors
 */
const randomColors = function (array, limit) {
	// if array length is less than limit, return entire array
	if (array.length < limit) {
		return array;
	}
	else {
		// return colors up to limit while keeping order
		let selectedIndexes = new Set();
		while (selectedIndexes.size < limit) {
			selectedIndexes.add(Math.floor(Math.random() * array.length));
		}
		return Array.from(selectedIndexes).sort((a, b) => a - b).map(index => array[index]);
	}
};

/**
 * select colorset based on flags
 * @param {*} colorset 
 * @returns colorset
 */
const selectColorSet = function (colorset) {
	switch (colorset) {
		case 'c':
			return colorsCN;
		case 'j':
			return colorsJP;
		default:
			return colorsCN;
	}
}

const colorFilter = function (color, flags) {
	const colorFile = selectColorSet(flags?.c);

	// turn chinese color into english
	if (color in chineseColorList) {
		color = chineseColorList[color];
	}

	// filter color
	let filteredColor = colorFile.filter(c => c.tag.includes(color));

	const resultColors = randomColors(filteredColor, flags?.n);

	return resultColors;
};

const chooseColorModel = function (color, flags) {
	// choose color model
	let colorModel;
	switch (flags.model) {
		case 'rgb':
			colorModel = `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`;
			isValid = true;
			break;
		case 'hex':
			colorModel = color.hex;
			isValid = true;
			break;
		case 'cmyk':
			colorModel = `cmyk(${color.cmyk.c},${color.cmyk.m},${color.cmyk.y},${color.cmyk.k})`;
			isValid = true;
			break;
		default:
			colorModel = color.hex;
	}
	return colorModel;
};

const App = ({colorSelect = 'green', flags = null}) => {
	let colorList = colorFilter(colorSelect, flags);

	// Find the max length for hex codes and names for padding
	const maxHexLength = Math.max(
		...colorList.map(color => chooseColorModel(color, flags).length),
	);
	const maxNameLength = Math.max(...colorList.map(color => color.name.length));
	const maxPinyinLength = Math.max(
		...colorList.map(color => color.pinyin.length),
	);

	return (
		<>
			<Text >{'\t'}</Text>
			{colorList.map(color => {
				// choose text color
				let colorText = chooseColorModel(color, flags);

				// Pad the hex code and name to have equal length
				const paddedHex = colorText.padEnd('  ' + maxHexLength, ' ');
				const paddedPinyin = color.pinyin.padEnd('  ' + maxPinyinLength, ' ');

				return (
					<React.Fragment key={color.id}>
						<Text
							key={color.id}
							backgroundColor={color.hex}
							color={color.hsl.lightness >= 0.68 ? 'black' : 'white'}
						>
							{' ' + paddedHex} {paddedPinyin}
							{'  '}
							{color.name}{' '}
						</Text>
						<Text >{color.hsl.hue + '\t' +color.hsl.saturation + '\t' + color.hsl.lightness}</Text>
					</React.Fragment>
				);
			})}
			<Text >{'\t'}</Text>
		</>
	);
};

export default App;
