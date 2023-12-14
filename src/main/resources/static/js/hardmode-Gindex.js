import Game from './hardmode-game.js';
import View from './hardmode-view.js';
import Controller from './hardmode-controller.js';

const root = document.querySelector('#root');
const second = document.querySelector('#second');

const game = new Game ();
const view = new View(root, 480, 640, 20, 10 );
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;

const game2 = new Game ();
const view2 = new View(second, 480, 640, 20, 10 );
const controller2 = new Controller(game2, view2, true);
window.view = view2;

controller.play();