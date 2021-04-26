import * as fs from 'fs';
import * as chalk from 'chalk';

/**
 * Estructura `type` que representa los colores aceptados por el sistema
 */
export type colorType = 'red' | 'green' |'blue' | 'yellow';

/**
 * Constante que define el rojo como color de muestra de errores con `chalk`
 */
export const error = chalk.red;

/**
 * Constante que define el verde como color de muestra de mensajes informativos con `chalk`
 */
export const msg_informativo = chalk.green;

/**
 * Clase que permite añadir, eliminar, modificar, listar y leer notas de un usuario específico
 */
export class Nota {
  /**
   * Atributo privado que representa la única instancia de la clase.
   */
  private static nota: Nota;
  private constructor() {}

  /**
   * Método que crea la única instancia de la clase
   * @returns La única instancia de la clase
   */
  public static instanciarNotas(): Nota {
    if (!fs.existsSync(`Notas`)) {
      fs.mkdirSync(`Notas`, {recursive: true});
    }
    if (!Nota.nota) {
      Nota.nota = new Nota();
    }
    return Nota.nota;
  };

  /**
   * Método que permite añadir una nota a una lista
   * @param usuario Nombre del usuario que añade la nota
   * @param titulo Titulo de la nota a añadir
   * @param cuerpo Contenido de la nota a añadir
   * @param color Color de la nota a añadir
   * @returns Un mensaje que indica si la nota se ha creado correctamente o si ya existe otra con el mismo título
   */
  añadirNota(usuario: string, titulo: string, cuerpo: string, color: colorType): string {
    if (fs.existsSync(`Notas/${usuario}/${titulo}.json`)) {
      console.log(error('¡Este título ya existe!'));
      return '¡Este título ya existe!';
    }
  
    const jsonText = `{"titulo": "${titulo}", "cuerpo": "${cuerpo}", "color": "${color}"}`;
    if (fs.existsSync(`Notas/${usuario}`)) {
      fs.appendFileSync(`Notas/${usuario}/${titulo}.json`, jsonText);
    } else {
      fs.mkdirSync(`Notas/${usuario}`, {recursive: true});
      fs.appendFileSync(`Notas/${usuario}/${titulo}.json`, jsonText);
    }
    console.log(msg_informativo('¡Nota creada y añadida!'));
    return 'Nueva nota añadida a la lista';
  }

  /**
   * Método que permite eliminar una nota de una lista
   * @param usuario Nombre del usuario que elimina la nota
   * @param titulo Título de la nota a eliminar
   * @returns Un mensaje que indica si la nota no se encontró o si se eliminó correctamente
   */
  eliminarNota(usuario: string, titulo: string): string {
    if (!fs.existsSync(`Notas/${usuario}/${titulo}.json`)) {
      console.log(error('¡La nota a eliminar no existe!'));
      return '¡La nota a eliminar no existe!';
    }
    fs.rmSync(`Notas/${usuario}/${titulo}.json`);
    console.log(msg_informativo('¡Nota eliminada!'));
    return '¡Nota eliminada!';
  }

  /**
   * Método que permite modificar una nota
   * @param usuario Nombre del usuario que modifica la nota
   * @param titulo Título de la nota a modificar
   * @param cuerpo Contenido de la nota
   * @param color Color de la nota
   * @returns Un mensaje que indica si la nota se ha modificado correctamente o si la nota no existe
   */
  modificarNota(usuario: string, titulo: string, cuerpo: string, color: colorType): string {
    if (!fs.existsSync(`Notas/${usuario}/${titulo}.json`)) {
      console.log(error('¡La nota a modificar no existe!'));
      return '¡La nota a modificar no existe!';
    }
    const jsonText = `{"titulo": "${titulo}", "cuerpo": "${cuerpo}", "color": "${color}"}`;
    fs.writeFileSync(`Notas/${usuario}/${titulo}.json`, jsonText);
    console.log(msg_informativo('¡Nota modificada con exito!'));
    return '¡Nota modificada con exito!';
  }

  /**
   * Método que lista los títulos de todas las notas de un usuario
   * @param usuario Nombre de usuario que listará las notas
   * @returns Un mensaje con los títulos de las notas o un error si el usuario no tiene notas guardadas
   */
  listarNotas(usuario: string): string {
    if (!fs.existsSync(`Notas/${usuario}`)) {
      console.log(error('¡No tienes ninguna nota guardada!'));
      return '¡No tienes ninguna nota guardada!';
    }
    let titulosNotas: string = '';
    const ficherosDir: string[] = fs.readdirSync(`Notas/${usuario}`);
    console.log('Tus notas son:');
    ficherosDir.forEach((file) => {
      const contenidoFicheros: string = fs.readFileSync(`Notas/${usuario}/${file}`, {encoding: 'utf-8'});
      const contenidoJson = JSON.parse(contenidoFicheros);
      console.log(chalk.keyword(contenidoJson.color)(contenidoJson.titulo));
      titulosNotas += contenidoJson.titulo + ' ';
    });
    return titulosNotas;
  }

  /**
   * Método que permite leer una nota específica
   * @param usuario Nombre de usuario que leerá la nota
   * @param titulo Título de la nota a leer 
   * @returns Un mensaje que indica que no se encontró la nota o los títulos y el contenido de cada nota
   */
  leerNota(usuario: string, titulo: string): string {
    if (!fs.existsSync(`Notas/${usuario}/${titulo}.json`)) {
      console.log(error('¡La nota buscada no existe!'));
      return '¡La nota buscada no existe!';
    }
    const contenidoFicheros: string = fs.readFileSync(`Notas/${usuario}/${titulo}.json`, {encoding: 'utf-8'});
    const contenidoJson = JSON.parse(contenidoFicheros);
    console.log(chalk.keyword(contenidoJson.color)(contenidoJson.titulo + '\n' + contenidoJson.cuerpo));
    return contenidoJson.titulo + '\n' + contenidoJson.cuerpo;
  }
}