#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
		Usage
		  $ kolors <color> [options]

		Options
			--help, -h\t\tShow help for commands.
			--version, -v\t\tShow the version of app.
			--colorset, -c\t\tChoose a color set.
			--model, -m\t\tChoose a color model.
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
			colorset: {
				type: 'string',
				alias: 'c',
				choices: ['cn', 'jp'],
				default: 'cn',
			},
			model: {
				type: 'string',
				alias: 'm',
				choices: ['hex', 'rgb', 'cmyk'],
				default: 'hex',
			},
		},
	},
);

render(<App color={cli.input.at(0)} flags={cli.flags} />);
