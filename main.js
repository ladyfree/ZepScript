// main.js
_dice = 1 + Math.floor(Math.random() * 6)
switch(_dice)
{
    case 1:
        _dice_result = '< 🎲(주사위) 1️⃣ 나왔습니다.>';
        break;
    case 2:
        _dice_result = '< 🎲(주사위) 2️⃣ 나왔습니다.>';
        break;
    case 3:
        _dice_result = '< 🎲(주사위) 3️⃣ 나왔습니다.>';
        break;
    case 4:
        _dice_result = '< 🎲(주사위) 4️⃣ 나왔습니다.>';
        break;
    case 5:
        _dice_result = '< 🎲(주사위) 5️⃣ 나왔습니다.>';
        break;
    case 6:
        _dice_result = '< 🎲(주사위) 6️⃣ 나왔습니다.>';
        break;
}
App.showCenterLabel(_dice_result);
//App.showCenterLabel("안녕 피타~~~ 만나서 반가워!!!");