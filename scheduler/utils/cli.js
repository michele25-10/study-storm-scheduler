const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	all: {
		type: `boolean`,
		alias: `l`,
		desc: `Esegue per tutti i tipi di processi`
	},
	not: {
		type: `string`,
		alias: `n`,
		desc: `eccetto elementi contenuti nell'array`
	}
};

const commands = {
	help: { desc: `Print help info` },
	list: { desc: `Lista di servizi` }
};

const helpText = meowHelp({
	name: `scheduler`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
