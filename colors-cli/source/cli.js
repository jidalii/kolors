#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const defaultColorset = process.env.KOLORS_DEFAULT_COLORSET || 'c';
const defaultColorModel = process.env.KOLORS_DEFAULT_COLORSET || 'hex';

const cli = meow(
	`
		Usage
		  $ kolors <color> [options]

		Options
		  -c <colorset>\t\tChoose a color set.
		  -m <color-model>\t\tChoose a color model.
		  -n <number>\t\t\tChoose the number of colors shown.
		  --help, -h\t\t\tShow help for commands.
		  --version, -v\t\tShow the version of app.

		Examples
		  $ kolors red
		  $ kolors red -c j
		  $ kolors red -m rgb
		  $ kolors red -c j -m cmyk
		  $ kolors 红 -c j -m hsl
	`,
	{
		importMeta: import.meta,
		flags: {
			help: {
				type: 'boolean',
				alias: 'h',
			},
			version: {
				type: 'boolean',
				alias: 'v',
			},
			c: {
				type: 'string',
				// alias: 'c',
			choices: ['c', 'j'],
				default: defaultColorset,
			},
			m: {
				type: 'string',
				// alias: 'm',
				choices: ['hex', 'rgb', 'cmyk', 'hsl'],
				default: defaultColorModel,
			},
			n: {
				type: 'number',
				default: 10,
			},
		},
	},
);

render(<App colorSelect={cli.input.at(0)} flags={cli.flags} />);
