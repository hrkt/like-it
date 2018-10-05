const socket = io();

function startHeartAnimation(id, dy) {
    const animePromise = anime({
        duration: 2000,
        easing: 'easeInOutQuart',
        targets: '#heart' + id,
        translateX: 250,
        translateY: {
            value: dy,
            duration: 0
        },
        scale: {
            value: 2,
            duration: 3000
        },
        rotate: {
            value: '1turn',
            duration: 1800,
            easing: 'easeInOutSine'
        },
        });
    const removeHeart = function(id) {
        $("#heart" + id).remove();
    }
    const removeHeartOfId = () => removeHeart(id)
    animePromise.finished.then(() => {
        removeHeartOfId();
    });
}

function addHeart(id) {
    $('#hearts').append(`<svg id="heart` + id + `" class="heart" viewBox="0 0 32 29.6">
    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
    </svg>`);
}

let heartId = 0;
function moveHeart() {    
    heartId++;
    addHeart(heartId);
    startHeartAnimation(heartId, (heartId % 10 - 5) * 10);
}

function demo() {
    setTimeout(moveHeart(), 0);
    setTimeout(moveHeart(), 100);
    setTimeout(moveHeart(), 300);
    setTimeout(moveHeart(), 500);
    setTimeout(moveHeart(), 700);
    setTimeout(moveHeart(), 900);
}

$(function() {
    $('#likeButton').on('click', function(){
        socket.emit('like message', "ID");
        console.log('button pushed');
        return false;
    });
    socket.on('sum message', function(sum){
        $('#sumLabel').text(sum);
        moveHeart();
    });
})

