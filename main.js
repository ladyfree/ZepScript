// load sprite
let coin = App.loadSpritesheet('coin.png', 48, 48, [0], 16);
let playSoundFileNm = "wishRich.mp3"

// 위아래로 움직이는 빨간 삼각표
// let robot = App.loadSpritesheet('robot.png', 32, 32, [0], 16);
// let red_r = App.loadSpritesheet('moving_triangle.png', 61, 85, [0, 1, 2, 3, 4, 5 ], 6); // 1분에 6번 바뀌는 애니메이션
// 회전 움직이는 빨간 삼각표
// let rotate_triangle = App.loadSpritesheet('rotate_red.png', 80, 75, [0, 1, 2, 3, 4, 5, 6, 7 ], 4); // 1분에 4번 바뀌는 애니메이션

const COIN_X = 52;
const COIN_Y = 17;
// const red_r_X = 13;
// const red_r_Y = 11;
// const rotate_triangle_X1 = 15;
// const rotate_triangle_Y1 = 15;

// const rotate_triangle_X2 = 20;
// const rotate_triangle_Y2 = 18;
const _COIN_DROP_DURATION = 30; //10초 코인이 떨어지는 시간?

let _coins = [];
let _coin_yes = false;
let _start = false;

let _stateTimer = 0;
let _genTime = 0;
let _dropTime = 0;
let _coin_drop_startTimer = 0;

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
            // Map.putObject(rotate_triangle_X1, rotate_triangle_Y1, rotate_triangle, { overlap: true });            
            // Map.putObject(red_r_X, red_r_Y, red_r, { overlap: true });
            // Map.putObject(COIN_X, COIN_Y, robot, { overlap: true });
            // Map.putObject(rotate_triangle_X2, rotate_triangle_Y2, rotate_triangle, { overlap: true });            
            _start = true; // 시작
            break;
        case STATE_PLAYING:
            // Map.playObjectAnimation(rotate_triangle_X1, rotate_triangle_Y1, '#' + rotate_triangle.id, 10);
            // Map.playObjectAnimation(rotate_triangle_X2, rotate_triangle_Y2, '#' + rotate_triangle.id, 10);
            // Map.playObjectAnimation(red_r_X, red_r_Y, '#' + red_r.id, 10);
            break;
        case STATE_JUDGE:
            break;
        case STATE_END:
            break;
    }

}

// 플레이어가 오브젝트를 공격(Z키)했을 때 호출 되는 이벤트
App.onObjectAttacked.Add(function(sender, x, y){
    if( x == COIN_X && y == COIN_Y)
    {
        _coin_yes = true;
        App.showCenterLabel(`💰💰💰💰   ${sender.name}님. 부자되세요~~~.  💰💰💰💰`);
        App.playSound(playSoundFileNm, true);
        sender.sendUpdated();
    }
});

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
            if(_stateTimer >= 1)
                startState(STATE_PLAYING);
            break;
        case STATE_PLAYING:

            //App.sayToAll('STATE_PLAYING in onUpdate');
            if(_coin_yes)
            {
                //App.sayToAll('coin drop start');
                // COIN 떨어지기
                _coin_drop_startTimer += dt;

                _genTime -= dt; // 나타나는 시간을 랜덤하게 조정
                if(_genTime <= 0) {
                    //_genTime = Math.random() * (0.5 - (1 * 0.05));
                    _genTime = Math.random()* 0.05;
                    
                    //let b = [Math.floor(Map.width * Math.random()),-1];
                    let b = [Math.floor(Map.width * Math.random()),Math.floor(Map.height * Math.random())];
        
                    _coins.push(b);
                    if(b[1] >= 0)
                        Map.putObject(b[0], b[1], coin, {
                            overlap: true,
                        });
                }
        
                _dropTime -= dt; // 떨어지는 시간을 랜덤하게 조정
                if(_dropTime <= 0) {
                    //_dropTime = Math.random() * (0.5 - (1 * 0.08));
                    _dropTime = Math.random() * 0.5;
                    
                    for(let i in _coins) {
                        let b = _coins[i];
                        Map.putObject(b[0], b[1], null);
                
                        b[1]++;
                        if(b[1] < Map.height) {
                            Map.putObject(b[0], b[1], coin, {
                                overlap: true,
                            });
                        }
                    }
        
                    // 코인이 바닥에 닿으면 없어지기
                    for(let k = _coins.length - 1;k >= 0;--k) {
                        let b = _coins[k];
                        if(b[1] >= Map.height)
                            _coins.splice(k, 1);
                    }
                }

                // 일정 시간이 지나면
                if(_coin_drop_startTimer >= _COIN_DROP_DURATION)
                {
                    //App.sayToAll('coin drop stop');
                    _coin_yes = false;
                    _coin_drop_startTimer = 0;
                    App.stopSound();
                    // 코인을 모두 지우기
                    // for(let k = _coins.length - 1;k >= 0;--k) {
                    //         _coins.splice(k, 1);
                    // }
                    for(let i in _coins) {
                        let b = _coins[i];
                        Map.putObject(b[0], b[1], null);
                    }
                }
            }
            //startState(STATE_JUDGE);
            break;
        case STATE_JUDGE:
            startState(STATE_END);
            break;
        case STATE_END:
            break;
    }    
       
});

