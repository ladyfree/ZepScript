//afly_ani

// load sprite

let red_r = App.loadSpritesheet('moving_triangle.png', 61, 85, [0, 1, 2, 3, 4, 5 ], 6); // 위아래로 움직이는 빨간 삼각표
const red_r_X = 13;
const red_r_Y = 11;

let _start = false;
let _stateTimer = 0;
const STATE_INIT = 3000;
const STATE_READY = 3001;
const STATE_PLAYING = 3002;
const STATE_JUDGE = 3004;
const STATE_END = 3005;
let _state = STATE_INIT;

// 상태 
function startState(state)
{
    _state = state;
    _stateTimer = 0;

    switch(_state)
    {
        case STATE_INIT:
            Map.putObject(red_r_X, red_r_Y, red_r, { overlap: true });
            _start = true; // 시작
            break;
        case STATE_PLAYING:
            Map.playObjectAnimation(red_r_X, red_r_Y, '#' + red_r.id, 10);
            break;
        case STATE_JUDGE:
            break;
        case STATE_END:
            break;
    }

}


App.onJoinPlayer.Add(function(p) {
    startState(STATE_INIT);
});

// called every 10ms
// 10ms 마다 호출되는 업데이트
// param1 : deltatime ( elapsedTime )
App.onUpdate.Add(function(dt) {

    if(!_start)
        return;
    
    // 시작한 후 
    _stateTimer += dt;

    switch(_state)
    {
        case STATE_INIT:
            if(_stateTimer >= 3)
                startState(STATE_PLAYING);
            break;
        case STATE_PLAYING:
            startState(STATE_JUDGE);
            break;
        case STATE_JUDGE:
            startState(STATE_END);
            break;
        case STATE_END:
            break;
    }    
       
});

