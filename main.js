const startBtn = document.getElementById('startBtn');

startBtn.onclick = async () => {
    startBtn.disabled = true;
    startBtn.textContent = 'جاري تشغيل الصوت...';

    try {
        // 1. نشغل الصوت ثلاثي الأبعاد
        const audioContext = new AudioContext();
        const resonanceAudio = new ResonanceAudio(audioContext);
        resonanceAudio.output.connect(audioContext.destination);

        // 2. نعمل صوت تجريبي لصاحبك
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.value = 440; // نغمة
        
        const source = resonanceAudio.createSource();
        source.setPosition(3, 0, 0); // صاحبك على يمينك بمسافة 3 متر
        oscillator.connect(source.input);
        oscillator.start();

        // 3. تحريك صاحبك عشان تسمع الصوت 3D
        let angle = 0;
        setInterval(() => {
            angle += 0.02;
            const x = Math.cos(angle) * 3; // يلف حولك
            const z = Math.sin(angle) * 3;
            source.setPosition(x, 0, z);
        }, 50);

        startBtn.textContent = 'شغال! حط سماعات واسمع الصوت بيلف حولك';
    } catch (error) {
        startBtn.textContent = 'خطأ: دوس مرة ثانية';
        startBtn.disabled = false;
    }
};
