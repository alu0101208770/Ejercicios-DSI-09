import 'mocha';
import * as fs from 'fs';
import {expect} from 'chai';
import {Nota} from '../src/nota';


describe('ejemplos para la clase Nota', () => {
  const nota = Nota.instanciarNotas();

  // Añadir nota
  it('Se puede instanciar un objeto de la clase Nota', () => {
    expect(nota).not.to.be.equal(null);
  });

  it('Nota.instanciarNotas() retorna el objeto Nota', () => {
    expect(Nota.instanciarNotas()).to.be.equal(nota);
  });

  it('nota.añadirNota(ejemplo, Nota ejemplo, Nota de ejemplo, yellow) retorna Nueva nota añadida a la lista', () => {
    expect(nota.añadirNota('ejemplo', 'Nota ejemplo', 'Nota de ejemplo', 'yellow')).to.be.equal('Nueva nota añadida a la lista');
    expect(nota.añadirNota('ejemplo', 'Nota ejemplo2', 'Nota de ejemplo 2', 'red')).to.be.equal('Nueva nota añadida a la lista');
  });

  it('nota.añadirNota(ejemplo, Nota ejemplo, Nota de ejemplo, yellow) retorna ¡Este título ya existe!', () => {
    expect(nota.añadirNota('ejemplo', 'Nota ejemplo', 'Nota de ejemplo', 'yellow')).to.be.equal('¡Este título ya existe!');
  });

  it('Nota creada correctamente', () => {
    expect(fs.existsSync(`Notas/ejemplo/Nota ejemplo.json`)).to.be.equal(true);
  });

  // Modificar nota
  it('nota.modificarNota(ejemplo, Nota ejemplo, Nota de ejemplo modificada, green)) retorna ¡Nota modificada con exito!', () => {
    expect(nota.modificarNota('ejemplo', 'Nota ejemplo', 'Nota de ejemplo modificada', 'green')).to.be.equal('¡Nota modificada con exito!');
  });

  it('nota.modificarNota(ejemplo, Nota ejemplo3, Nota de ejemplo modificada, green)) retorna ¡La nota a modificar no existe!', () => {
    expect(nota.modificarNota('ejemplo', 'Nota ejemplo3', 'Nota de ejemplo modificada', 'green')).to.be.equal('¡La nota a modificar no existe!');
  });

  it('Nota modificada correctamente', () => {
    expect(fs.readFileSync(`Notas/ejemplo/Nota ejemplo.json`, {encoding: 'utf-8'})).to.be.equal('{"titulo": "Nota ejemplo", "cuerpo": "Nota de ejemplo modificada", "color": "green"}');
  });

  // Listar notas 
  it('nota.listarNotas(ejemplo) retorna Nota ejemplo', () => {
    expect(nota.listarNotas('ejemplo')).to.be.equal('Nota ejemplo Nota ejemplo2 ');
  });

  it('nota.listarNotas(pepe) retorna ¡No tienes ninguna nota guardada!', () => {
    expect(nota.listarNotas('pepe')).to.be.equal('¡No tienes ninguna nota guardada!');
  });

  // Leer notas
  it('nota.leerNota(ejemplo, Nota ejemplo) retorna Nota ejemplo\nNota de ejemplo modificada', () => {
    expect(nota.leerNota('ejemplo', 'Nota ejemplo')).to.be.equal('Nota ejemplo\nNota de ejemplo modificada');
  });

  it('nota.leerNota(ejemplo, Nota no creada) retorna ¡La nota buscada no existe!', () => {
    expect(nota.leerNota('ejemplo', 'Nota no creada')).to.be.equal('¡La nota buscada no existe!');
  });

  // Eliminar notas 
  it('nota.eliminarNota(ejemplo, Nota ejemplo) retorna ¡Nota eliminada!', () => {
    expect(nota.eliminarNota('ejemplo', 'Nota ejemplo')).to.be.equal('¡Nota eliminada!');
  });

  it('Nota eliminada correctamente', () => {
    expect(nota.eliminarNota('ejemplo', 'Nota ejemplo')).to.be.equal('¡La nota a eliminar no existe!');
    fs.rmdirSync('./Notas', {recursive: true});
  });
});