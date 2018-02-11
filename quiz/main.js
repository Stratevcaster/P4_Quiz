
console.log("CORE Quiz");
const readline = require('readline');
const rl = readline.createInterface({
	input:process.stdin,
	output: process.stdout,
	prompt: 'OHAI>'
	});

rl.prompt();

rl.on('line',(line) => {
 switch (line.trim()){
	case 'hello':
	console.log('world!');
	break;
	default:
	console.log('Say what?');
	break;
}
rl.prompt();
}).on('close',() => {
console.log('Hasta luego');
process.exit(0);
});
