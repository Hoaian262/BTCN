$(function () {
    var container = $('#container'), bird = $('#bird');
    var pole = $('.pole'), pole_1 = $('#pole_1'), pole_2 = $('#pole_2');
    var score = 0, level = 1, playing = false;
    var width = container.width(), height = container.height();
    var viewport = $('#game_viewport'), gameFrame = $('#game_frame');
    var frameWidth = container.outerWidth(), frameHeight = container.outerHeight();
    var birdX = parseFloat(bird.css('left')), birdY = parseFloat(bird.css('top'));
    var velocity = 0, gravity = 850, flap = -285;
    var poleX = width, center = 240, baseCenter = 240, phase = 0;
    var scored = false, timer, frame, lastTime, noticeTimer;
    var intervals = [40, 30, 25, 20];
    var gaps = [140, 120, 100, 85];
    var amplitudes = [0, 0, 45, 65];
    var periods = [1, 1, 2.5, 1.8];
    var audio, levelClip, gameOverClip;
    var dying = false;
    var ghost = $('#ghost');

    function fitGame() {
        var scale = Math.min(1, viewport.width() / frameWidth, viewport.height() / frameHeight);
        gameFrame.css({width: frameWidth * scale, height: frameHeight * scale});
        container[0].style.setProperty('--game-scale', scale);
    }

    fitGame();
    $(window).on('resize', fitGame);

    function loadClip(filename, embeddedWav) {
        // Dữ liệu đóng gói giúp giải mã WAV cả khi mở index.html trực tiếp.
        if (location.protocol === 'file:') {
            var bytes = Uint8Array.from(atob(embeddedWav), function (character) {
                return character.charCodeAt(0);
            });
            return audio.decodeAudioData(bytes.buffer);
        }
        return fetch('sounds/' + filename).then(function (response) {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.arrayBuffer();
        }).then(function (bytes) {
            return audio.decodeAudioData(bytes);
        });
    }

    function prepareClip(filename, embeddedWav) {
        return Promise.resolve().then(function () {
            return loadClip(filename, embeddedWav);
        }).catch(function (error) {
            console.warn('Could not load ' + filename + ':', error);
        });
    }

    function playClip(clipPromise, fallback) {
        if (!clipPromise) return;
        clipPromise.then(function (clip) {
            if (!clip) { if (fallback) fallback(); return; }
            var source = audio.createBufferSource();
            source.buffer = clip;
            source.connect(audio.destination);
            source.start();
        });
    }
    // Âm thanh tự tạo bằng Web Audio, không cần tải thư viện.
    function sound(up) {
        if (!audio) return;
        var notes = up ? [523, 659, 784] : [440, 660];
        notes.forEach(function (hz, i) {
            var osc = audio.createOscillator(), gain = audio.createGain();
            var t = audio.currentTime + i * (up ? 0.09 : 0.035);
            osc.type = 'triangle'; osc.frequency.value = hz;
            gain.gain.setValueAtTime(0.07, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
            osc.connect(gain); gain.connect(audio.destination);
            osc.start(t); osc.stop(t + 0.1);
        });
    }
    function gap() { return gaps[level - 1]; }
    function draw() {
        bird.css({top: birdY, transform: 'rotate(' + Math.max(-25, Math.min(65, velocity / 7)) + 'deg)'});
        pole.css({left: poleX, right: 'auto'});
        pole_1.height(center - gap() / 2);
        pole_2.height(height - center - gap() / 2);
    }
    // Va chạm theo hình chữ nhật, chừa 4px viền trong suốt của sprite.
    function collision() {
        var top = birdY + 4, bottom = birdY + bird.height() - 4;
        if (birdY < 0 || birdY + bird.height() > height) return true;
        return birdX + bird.width() - 4 > poleX && birdX + 4 < poleX + 60 &&
            (top < center - gap() / 2 || bottom > center + gap() / 2);
    }
    // Interval thật theo đề: mỗi nhịp dịch 6px. Nội suy bằng animation frame.
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(function () { targetX -= 6; }, intervals[level - 1]);
    }
    var targetX = width;
    function levelUp() {
        level++;
        $('#level').text('Level ' + level);
        $('#notice').text('LEVEL UP!');
        clearTimeout(noticeTimer);
        noticeTimer = setTimeout(function () { if (playing) $('#notice').text(''); }, 1000);
        playClip(levelClip, function () { sound(true); });
        startTimer();
    }
    function stop_the_game(win) {
        playing = false; clearInterval(timer); cancelAnimationFrame(frame); clearTimeout(noticeTimer);
        container.removeClass('running');
        $('#notice').text('');
        if (win) { showResult(true); victorySound(); return; }
        if (dying) return;
        dying = true;
        // Linh hồn xuất hiện tại vị trí va chạm; thân chim rơi xuống đáy khung.
        ghost.css({left:birdX, top:Math.max(0, birdY)}).addClass('rising');
        bird.addClass('falling');
        requestAnimationFrame(function () {
            bird.css({top:height - 61 - bird.height(), transform:'rotate(90deg)'});
        });
        setTimeout(function () {
            ghost.removeClass('rising');
            showResult(false);
        }, 1500);
    }
    function playGame(now) {
        if (!playing) return;
        var dt = Math.min((now - lastTime) / 1000, 0.035); lastTime = now;
        velocity += gravity * dt;
        birdY += velocity * dt;
        poleX = Math.max(targetX, poleX - 6 * 1000 / intervals[level - 1] * dt);
        phase += dt * 2 * Math.PI / periods[level - 1];
        center = baseCenter + Math.sin(phase) * amplitudes[level - 1];
        draw();
        if (collision()) { stop_the_game(false); return; }
        if (!scored && poleX + 60 < birdX + 4) {
            scored = true; score++; $('#score').text(score);
            if (score === 50) { stop_the_game(true); return; }
            if (score === 5 || score === 20 || score === 40) levelUp();
        }
        if (poleX + 60 < 0) {
            poleX = targetX = width; scored = false;
            baseCenter = 175 + Math.random() * 130; phase = 0;
        }
        frame = requestAnimationFrame(playGame);
    }
    function startGame() {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audio = new AudioContext();
            audio.resume().catch(function () {});
            levelClip = prepareClip('level-up.wav', window.levelUpWavBase64);
            gameOverClip = prepareClip('game-over.wav', window.gameOverWavBase64);
        }
        $('#play_btn').hide(); container.addClass('running'); playing = true; velocity = flap; sound(false);
        lastTime = performance.now(); startTimer(); frame = requestAnimationFrame(playGame);
    }
    function showResult(win) {
        $('#result_title').text(win ? 'WINNER' : 'GAME OVER');
        $('#final_score').text('SCORE: ' + score);
        $('#result').toggleClass('winner', win).addClass('show');
        if (!win) playClip(gameOverClip);
    }
    function victorySound() {
        if (!audio) return;
        [392,523,659,784,659,784,1047].forEach(function(hz,i) {
            var osc=audio.createOscillator(), gain=audio.createGain(), t=audio.currentTime+i*.13;
            osc.type='triangle'; osc.frequency.value=hz; gain.gain.setValueAtTime(.09,t);
            gain.gain.exponentialRampToValueAtTime(.001,t+.22);
            osc.connect(gain); gain.connect(audio.destination); osc.start(t); osc.stop(t+.23);
        });
    }
    function startOrFlap() {
        if ($('#play_btn').is(':visible')) { startGame(); return; }
        if (!playing) return;
        velocity = flap; sound(false);
    }

    $(document).keydown(function (e) {
        if (e.key !== 'ArrowDown') return;
        e.preventDefault();
        if (e.originalEvent.repeat) return;
        if ($('#result').hasClass('show')) { location.reload(); return; }
        startOrFlap();
    });
    container.on('click', startOrFlap);
    $('#restart_btn').click(function () { location.reload(); });
});
