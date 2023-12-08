#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.jsx';

const defaultColorset = process.env.KOLORS_DEFAULT_COLORSET || 'cn';
const defaultColorModel = process.env.KOLORS_DEFAULT_COLORSET || 'hex';

const cli = meow(
	`
		Usage
		  $ kolors <color> [options]

		Options
		  -c <colorset>\t\tChoose a color set.
		  -m <color-model>\t\tChoose a color model.
		  --help, -h\t\t\tShow help for commands.
		  --version, -v\t\tShow the version of app.
		
		Examples
		  $ kolors red
		  $ kolors red -c jp
		  $ kolors red -m rgb
		  $ kolors red -c jp -m cmyk
		  $ kolors 红 -c jp -m hsl
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
				choices: ['cn', 'jp'],
				default: defaultColorset,
			},
			m: {
				type: 'string',
				// alias: 'm',
				choices: ['hex', 'rgb', 'cmyk', 'hsl'],
				default: defaultColorModel,
			},
		},
	},
);

render(<App colorSelect={cli.input.at(0)} flags={cli.flags} />);
