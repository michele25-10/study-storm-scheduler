const fs = require('fs');

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');


const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);

	if (input.includes('list')) {
		try {
			const data = fs.readFileSync('./service.json', 'utf8');
			const jsonData = JSON.parse(data);
			console.info(jsonData);
		} catch (err) {
			console.error('Error reading file:', err);
		}
	}

	if (input.includes('start')) {
		console.log(flags);
		//avvio tutte se c'è flag -l
		if(flags.l){
			console.log("Ho avviato tutte le task"); 
		}

	}
})();
