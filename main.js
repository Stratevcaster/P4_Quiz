const cmds = require('./cmds');
const model = require('./model');
const {log, biglog, errorlog, colorize} = require("./out");
const net = require("net");
net.createServer(socket => {
	console.log("Se ha conectado un nuevo cliente desde " + socket.remoteAddress);
 //MENSAJE INICIAL	
 biglog(socket, 'CORE quiz ', 'green');
 const readline = require('readline');
 const rl = readline.createInterface({
 	input: socket,
	output: socket,
	prompt: colorize("quiz> ", 'blue'),
        completer: (line) => {
  const completions = 'help add delete edit list test p play credits quit q'.split(' ');
  const hits = completions.filter((c) => c.startsWith(line));
  return [hits.length ? hits : completions, line];
       }
	});
 socket
 .on("end", () => { rl.close();})
 .on("error", () => { rl.close();})
rl.prompt();

rl
.on('line',(line) => {
let args = line.split(" ");
let cmd = args[0].toLowerCase().trim();
console.log (cmd)
 switch (cmd) {
	case '':
	rl.prompt();
	break;

	case 'h':
	case 'help':	
	cmds.helpCmd(socket,rl); 
	break;
	case 'quit':
	case 'q':
	cmds.quitCmd(socket,rl);
	break;
	case 'add':
	cmds.addCmd(socket,rl);
	break;
	case 'list':
	
	cmds.listCmd(socket,rl);
	break;
	case 'show':
	cmds.showCmd(socket,rl, args[1]);
	break;
	case 'test':
	cmds.testCmd(socket,rl, args[1]);
	break; 
	case 'play':
	case 'p':
	cmds.playCmd(socket,rl);	
	break;
	case 'delete':
	cmds.deleteCmd(socket,rl, args[1]);
	break;
	case 'edit':
	cmds.editCmd(socket,rl, args[1]);	
	break;
	case 'credits':
	cmds.creditsCmd(socket,rl);
	break;	
	default:
	 log(socket,` Comando desconocido: '${colorize(cmd,'red')}'`);
	log(socket, 'Usa help para ver todos los comandos disponibles');
	rl.prompt();
	break;
}
})
.on('close',() => {
log(socket, 'Adios!');
//process.exit(0);
});

})
.listen(3030);




