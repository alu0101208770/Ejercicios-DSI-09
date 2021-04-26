import * as fs from 'fs';
import * as chalk from 'chalk';
import {spawn} from 'child_process';
export const error = chalk.bold.red;

const filename = process.argv[2];
if (!filename) {
  console.log(error('[Error]: Debe especificarse un fichero'));
} else {
    fs.stat(filename, function(err) {
      if(err == null) {
        console.log('El fichero existe');
        fs.watch(filename, (eventType) => {
          switch (eventType) {
            case 'change': {
              const ls = spawn('ls', ['-l', '-h', filename]);
              let output = '';
              ls.stdout.on('data', (chunk) => (output += chunk));
      
              ls.on('close', () => {
                console.log(output);
                const parts = output.split(/​​\s​​+/);
                console.log([parts[0], parts[4], parts[8]]);
              });
              break;
            }
            case 'rename': {
              console.log(error('[Error]: El fichero observado ha sido borrado, movido o renombrado'));
              process.exit(1)
            }
          } 
        });
      } else if(err.code === 'ENOENT') {
        console.log(error('[Error]: El fichero no existe'));
      } else {
        console.log(error('Ocurrió otro error: ', err.code));
    }
  }); 
}
