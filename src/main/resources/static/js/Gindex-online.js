import Game from './game.js';
import View from './view.js';
import Controller from './controller.js';

const root = document.querySelector('#root');

const game = new Game ();
const view = new View(root, 480, 640, 20, 10 );
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;

axios.get('/online-game/connect')
  .then(function (response) {
    // обработка успешного запроса
    let room = response.data;
    let topic = "/topic/" + room;
    if (room !== myId) {
        controller.play();
    }

    const ws = new SockJS("http://localhost:3000/ws/connect");
    const stompClient = Stomp.over(ws);

    stompClient.connect({}, function() {
        stompClient.subscribe(topic, function(message) {
            message = message.body;
            if (message === "connect") {
                controller.play();
            } else {

            }
        });
    })

  });