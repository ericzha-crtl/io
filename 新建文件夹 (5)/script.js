let isBurning = false;
let burnProgress = 0;
let originalTitleTop, originalMessageBottom;

function init() {
    const candle = document.querySelector('.candle');
    const title = document.querySelector('h1');
    const message = document.getElementById('message');
    
    // 记录初始位置
    originalTitleTop = parseFloat(getComputedStyle(title).top);
    originalMessageBottom = parseFloat(getComputedStyle(message).bottom);

    // 事件绑定
    candle.addEventListener('click', handleCandleClick);
    candle.addEventListener('touchstart', handleCandleClick);
}

function handleCandleClick(e) {
    e.preventDefault();
    if (!isBurning) {
        lightCandle(this);
    }
}

function lightCandle(candle) {
    isBurning = true;
    const message = document.getElementById('message');
    message.style.opacity = '1';

    const burnInterval = setInterval(() => {
        burnProgress += 0.5;
        
        // 更新蜡烛高度
        candle.style.height = `${200 - burnProgress}px`;
        
        // 动态补偿文字位置
        const heightLoss = burnProgress * 0.6;
        document.querySelector('h1').style.top = `${originalTitleTop - heightLoss}px`;
        message.style.bottom = `${originalMessageBottom - heightLoss}px`;

        // 生成蜡滴
        if (Math.random() < 0.3) {
            createWaxDrip(candle);
        }

        // 结束判断
        if (burnProgress >= 150) {
            clearInterval(burnInterval);
            message.textContent = "祭祀完成，愿逝者安息";
            isBurning = false;
        }
    }, 100);
}

function createWaxDrip(candle) {
    const drip = document.createElement('div');
    drip.className = 'wax-drip';
    drip.style.width = `${Math.random() * 8 + 4}px`;
    drip.style.height = `${Math.random() * 15 + 5}px`;
    drip.style.left = `${Math.random() * 30 + 15}px`;
    drip.style.bottom = `${burnProgress}px`;
    candle.appendChild(drip);
}

// 初始化
init();
