import * as yargs from 'yargs';
import {Nota, error} from './nota';


const nota = Nota.instanciarNotas();

/**
 * Comando para añadir una nueva nota a la lista.
 */
yargs.command({
  command: 'add',
  describe: 'Añadir una nueva nota',
  builder: {
    user: {
      describe: 'Usuario que va a añadir la nota',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Contenido de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      if (argv.color == 'red' || argv.color == 'green' || argv.color == 'blue' || argv.color == 'yellow') {
        nota.añadirNota(argv.user, argv.title, argv.body, argv.color);
      } else {
        console.log(error('El color de la nota debe ser uno de los siguientes: red, green, blue o yellow'));
      }
    }
  },
});

/**
 * Comando para eliminar una nota de la lista
 */
 yargs.command({
  command: 'remove',
  describe: 'Elimina una nota',
  builder: {
    user: {
      describe: 'Usuario que va a eliminar la nota',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Títilo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      nota.eliminarNota(argv.user, argv.title);
    }
  },
});

/**
 * Comando para modificar una nota
 */
yargs.command({
  command: 'modify',
  describe: 'Modificar una nota',

  builder: {
    user: {
      describe: 'Usuario que va a modificar la nota',
      demandOption: true,
      type: 'string',
    },

    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },

    body: {
      describe: 'Contenido de la nota',
      demandOption: true,
      type: 'string',
    },

    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.body === 'string' && typeof argv.color === 'string' && typeof argv.user === 'string' && typeof argv.title === 'string') {
      if (argv.color != 'red' && argv.color != 'green' && argv.color != 'blue' && argv.color != 'yellow') {
        console.log(error('El color de la nota debe ser uno de los siguientes: red, green, blue o yellow'));
      } else {
        nota.modificarNota(argv.user, argv.title, argv.body, argv.color);
      }
    }
  },
});


/**
 * Comando para listar los títulos de las notas de la lista de un usuario
 */
yargs.command({
  command: 'list',
  describe: 'Listar los títulos de la notas',
  builder: {
    user: {
      describe: 'Usuario que va a listar los títulos de las notas',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      nota.listarNotas(argv.user);
    }
  },
});

/**
 * Comando para leer una nota de la lista
 */
yargs.command({
  command: 'read',
  describe: 'Leer una nota específica de la lista',
  builder: {
    user: {
      describe: 'Usuario que va a leer la nota',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      nota.leerNota(argv.user, argv.title);
    }
  },
});

/**
 * Procesa los argumentos pasados ​​desde la línea de comandos a la aplicación
 */
yargs.parse();