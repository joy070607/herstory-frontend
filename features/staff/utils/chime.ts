let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playTone(ctx: AudioContext, frequency: number, startTime: number, duration: number) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

// 초인종 "띵동" 알림음: 높은 음(띵) 뒤에 낮은 음(동)이 이어지는 2음 차임벨
export function playDingDong() {
  if (typeof window === "undefined" || typeof AudioContext === "undefined") return;

  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    void ctx.resume();
  }

  const now = ctx.currentTime;
  playTone(ctx, 880, now, 0.5); // 띵 (A5)
  playTone(ctx, 659.25, now + 0.35, 0.6); // 동 (E5)
}
