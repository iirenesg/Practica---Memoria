function Game(_container) {
 
    var pairs = 10;
    var cards = [];
    var container = _container;
    var stats = {
        score: 0,
        initTime: new Date(),
        flippedCards: []
    };
 
    function init() {
        var tcards = [];
         
        for (var i=0; i < pairs*2; i++) {
            var card;
            i < 10 ? card = new Card(i, i) : card = new Card(i-10, i);
            card.element.addEventListener('click', function(){updateGame(this)});
            tcards.push(card);
        };
         
        for (var i=0; i < pairs*2; i++) {
            var n = getRandomInt(0, (pairs*2)-i);
            cards.push(tcards[n]);
            container.appendChild(tcards[n].element);
            tcards.splice(n, 1);
        }
    }
 
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
    }

    function updateGame(el) {
        if(stats.flippedCards.length < 2) {
            card = cards.filter(function(c){return Number(c.id) == Number(el.id)})[0];
            stats.flippedCards.push(card);
            card.toggleCard();

            if(stats.flippedCards.length == 2) {
                setTimeout(checkPair, 1000);
            }
        }
    }

    function checkPair() {
        var card1 = stats.flippedCards[0];
        var card2 = stats.flippedCards[1];
        if(card1.value == card2.value) {
            stats.score++;
            card1.hideCard();
            card2.hideCard();
        } else {
            card1.toggleCard();
            card2.toggleCard();
        }
        flippedCards = [];
    }
 
    return {
        init: init
    };
 
}
 
function Card(v, id) {
 
    var self = this;
    self.value = v;
    self.id = id;
 
    self.compose = function() {
        var el = document.createElement('div');
        el.classList.add('card-wrapper');
        el.setAttribute('id', self.id);
        var card = document.createElement('div');
        card.classList.add('card-3D');
        var front = document.createElement('span');
        front.setAttribute('class', 'card front card' + self.value);
        var back = document.createElement('span');
        back.setAttribute('class', 'card back');

        card.appendChild(back);
        card.appendChild(front);
        el.appendChild(card);
        return el;
    };

    self.toggleCard = function() {
        console.log(self);
        var el = self.element.getElementsByClassName('card-3D')[0];
        el.classList.toggle('flipped');
    }

    self.hideCard = function() {
        self.element.classList.add('hidden');
    }
 
    self.element = self.compose();
    self.up = false;
    self.matched = false;
}