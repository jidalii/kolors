'use strict';
import React from 'react';
import {Text} from 'ink';
import colorsCN from './data/colors_chinese.js';
import colorsJP from './data/colors_japanese.js';

const colorList = {
	red: '红',
	orange: '橙',
	yellow: '黄',
	green: '绿',
	cyan: '青',
	blue: '蓝',
	purple: '紫',
	grey: '灰',
};

const chineseColorList = {
    红:"red",
    橙:"orange",
    黄:"yellow",
    绿:"green",
    青:"cyan",
    蓝:"blue",
    紫:"purple",
    灰:"grey",
    棕:"brown",
    白:"white",
    粉:"pink",
	黑: "black"
}

const shuffleArray = function (array) {
	for (let i = array.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [array[i], array[j]] = [array[j], array[i]];
	}
  }

const colorFilter = function (color, colorset) {
	//  select colorset
	let colorFile = null;
	if (colorset === 'cn') {
		colorFile = colorsCN;
	} else {
		colorFile = colorsJP;
	}
	if (color in chineseColorList) {
		color = chineseColorList[color]
	}

	let filteredColor = colorFile.filter(c => c.tag.includes(color));
	shuffleArray(filteredColor);

	return filteredColor;
};


const chooseColorModel = function(color, flags) {
	// choose color model
	let colorModel;
	switch(flags.model) {
		case "rgb":
			colorModel = `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`;
			break;
		case "hex":
			colorModel = color.hex;
			break;
		case "cmyk":
			colorModel = `cmyk(${color.cmyk.c},${color.cmyk.m},${color.cmyk.y},${color.cmyk.k})`;;
			break;
		default:
			colorModel = color.hex;	
	}
	return colorModel;
}

const App = ({color = 'yellow', flags = null}) => {
	let colorList = colorFilter(color, flags?.colorset);

	// Find the max length for hex codes and names for padding
	const maxHexLength = Math.max(...colorList.map(color => chooseColorModel(color, flags).length));
	const maxNameLength = Math.max(...colorList.map(color => color.name.length));
	const maxPinyinLength = Math.max(...colorList.map(color => color.pinyin.length));
	
	return (
		<>
			<Text>{"  "}</Text>
			{colorList.map(color => {
				// choose text color
				let colorText = chooseColorModel(color, flags);

				// Pad the hex code and name to have equal length
				const paddedHex = colorText.padEnd('  ' + maxHexLength, ' ');
				const paddedName = color.name.padEnd('  ' + maxNameLength, ' ');
				const paddedPinyin = color.pinyin.padEnd('  ' + maxPinyinLength, ' ');
				// const paddedPinyin = color.pinyin;

				return (
					<Text key={color.hex} backgroundColor={color.hex} color={color.lightness > 0.5 ? "black" : "white"}>
						{' ' + paddedHex} {paddedPinyin}{'  '}{color.name}{' '}
					</Text>
				);
			})}
			<Text>{"  "}</Text>
		</>
	);
};

export default App;
