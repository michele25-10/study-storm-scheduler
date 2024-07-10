const fs = require('fs');
const chalk = require('chalk');
const cron = require('node-cron');

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const { clearTableUserVerificationCron } = require('./cron/cron');


const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);

	if (input.includes('list')) {
		console.log(chalk.blue('Scheduled tasks:'));
		if (scheduledTasks.size === 0) {
			console.log(chalk.yellow('No tasks scheduled.'));
		} else {
			//const list = (scheduledTasks.entries());
			//console.log(list);
			/*for (const [taskName, { job, schedule, active }] of scheduledTasks.entries()) {
				console.log(`- Task: ${taskName}`);
				console.log(`  Schedule: ${schedule}`);
				console.log(`  Status: ${active ? chalk.green('Active') : chalk.red('Inactive')}`);
			}*/
			for (const [taskName, { running }] of scheduledTasks.entries()) {
				console.log(running);
				console.log(`- Cron "${taskName}": ${running ? 'In esecuzione' : 'Fermato'}`);
			}
		}

		/*try {
			const data = fs.readFileSync('./service.json', 'utf8');
			const jsonData = JSON.parse(data);
			console.info(jsonData);
		} catch (err) {
			console.error('Error reading file:', err);
		}*/
	}

	if (input.includes('start')) {
		if (flags.all) {//avvio tutte se c'è flag -l
			await clearTableUserVerificationCron.start();
			return;
		} else if (flags.not) {//"1,2,3,4"
			console.log(flags.not);
		}
	}

	if (input.includes('stop')) {
		if (flags.all) {//avvio tutte se c'è flag -l
			await clearTableUserVerificationCron.stop();
		} else if (flags.not) {//"1,2,3,4"
			console.log(flags.not);
		}
	}
})();
