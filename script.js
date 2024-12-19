document.addEventListener('DOMContentLoaded', () => {
    const note = document.getElementById('note');
    const sendButton = document.getElementById('sendButton');
    const textarea = document.querySelector('textarea');
    const danmakuContainer = document.getElementById('danmakuContainer');

    // 根据时间获取问候语数组
    function getGreetings() {
        const hour = new Date().getHours();
        const isNight = hour >= 19 || hour < 6; // 晚上7点到早上6点认为是夜晚

        const commonGreetings = [
            "你还好吗？", "How are you?",
            "一切都会好起来的", "Everything will be fine",
            "加油！", "Cheer up!",
            "我懂你的感受", "I understand how you feel",
            "别担心", "Don't worry",
            "保重自己", "Take care",
            "明天会更好", "Tomorrow will be better",
            "你并不孤单", "You're not alone",
            "我在听着呢", "I'm here for you",
            "放轻松些", "Take it easy",
            "相信自己", "Believe in yourself",
            "阳光总在风雨后", "After the rain comes the rainbow",
            "微笑吧", "Smile",
            "生活依然美好", "Life is still beautiful",
            "时间会治愈一切", "Time heals all wounds",
            "保持希望", "Keep hope alive",
            "这只是暂时的", "This too shall pass",
            "你很勇敢", "You are brave",
            "继续前进", "Keep going",
            "我们都在成长", "We're all growing",
            "珍惜当下", "Cherish the moment",
            "活在当下", "Live in the present",
            "保持微笑", "Keep smiling",
            "你做得很好", "You're doing great"
        ];

        const nightGreetings = [
            "晚安", "Good night",
            "祝你好梦", "Sweet dreams",
            "夜深了，早点休息", "It's late, get some rest",
            "明天又是新的一天", "Tomorrow is a new day",
            "睡个好觉", "Sleep well",
            "做个好梦", "Have beautiful dreams",
            "愿你梦里都是温暖", "May your dreams be warm",
            "夜深了，放下烦恼", "Night time, let go of your worries",
            "愿你睡个安稳觉", "Wish you a peaceful sleep",
            "带着希望入睡", "Sleep with hope",
            "星星会守护你", "Stars will watch over you",
            "愿你梦见最美的事", "May you dream of beautiful things",
            "夜晚有我陪着你", "The night accompanies you",
            "月亮会照亮你的梦", "The moon will light up your dreams"
        ];

        return isNight ? [...commonGreetings, ...nightGreetings] : commonGreetings;
    }

    // 修改创建弹幕的函数
    function createDanmaku(text) {
        const danmaku = document.createElement('div');
        danmaku.className = 'danmaku';
        danmaku.textContent = text;
        
        // 随机垂直位置，更均匀分布
        const top = Math.random() * 90 + 5;
        danmaku.style.top = `${top}%`;
        
        // 随机颜色，夜晚时更柔和的颜色
        const hour = new Date().getHours();
        const isNight = hour >= 19 || hour < 6;
        const hue = Math.random() * 360;
        const saturation = isNight ? 70 : 90; // 夜晚降低饱和度
        const lightness = isNight ? 80 : 70;  // 夜晚提高亮度
        danmaku.style.color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.9)`;
        
        // 随机字体大小
        const fontSize = Math.random() * 10 + 15;
        danmaku.style.fontSize = `${fontSize}px`;
        
        // 随机动画持续时间
        const duration = Math.random() * 4 + 8;
        danmaku.style.animation = `danmakuMove ${duration}s linear`;

        danmakuContainer.appendChild(danmaku);

        danmaku.addEventListener('animationend', () => {
            danmaku.remove();
        });
    }

    // 修改发送弹幕流函数
    function sendDanmakuStream() {
        const currentGreetings = getGreetings();
        let count = 0;
        
        // 初始发送一批弹幕
        for(let i = 0; i < 20; i++) {
            setTimeout(() => {
                const randomGreeting = currentGreetings[Math.floor(Math.random() * currentGreetings.length)];
                createDanmaku(randomGreeting);
            }, i * 100);
        }

        // 持续发送弹幕
        const interval = setInterval(() => {
            const randomGreeting = currentGreetings[Math.floor(Math.random() * currentGreetings.length)];
            createDanmaku(randomGreeting);
            count++;
            if (count >= 80) {
                clearInterval(interval);
            }
        }, 100);
    }

    sendButton.addEventListener('click', () => {
        if (textarea.value.trim() !== '') {
            // 添加淡出动画
            note.classList.add('fade-away');
            
            // 播放伤感的音效
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-sad-reveal-01-183.mp3');
            audio.play();

            // 触发弹幕效果
            sendDanmakuStream();

            // 2秒后重置便签
            setTimeout(() => {
                note.classList.remove('fade-away');
                textarea.value = '';
                
                // 显示温馨提示
                alert('你的心事已经随风飘走...');
            }, 2000);
        }
    });

    // 添加打字机效果的占位符
    const placeholders = [
        '写下此刻的心情...',
        '说说今天发生的事...',
        '留下一些想说的话...'
    ];
    
    let currentPlaceholder = 0;
    
    setInterval(() => {
        textarea.placeholder = placeholders[currentPlaceholder];
        currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
    }, 3000);
}); 