import Game from './game-online.js';
import View from './view-online.js';
import Controller from './controller-online.js';

const root = document.querySelector('#root');

const game = new Game ();
const view = new View(root, 480, 640, 20, 10 );
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;