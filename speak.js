
let cachedVoices = [];

export function speak(text, voiceName = 'Google UK English Male', isMuted = false) {
  const synth = window.speechSynthesis;
  if (!synth || isMuted) return;

  if (!cachedVoices.length) {
    cachedVoices = synth.getVoices();
  }

  if (synth.speaking) {
    synth.cancel();
  }

  const msg = new SpeechSynthesisUtterance(text);
  msg.pitch = 0.8;
  msg.rate = 0.92;
  msg.volume = 1;

  const voice = cachedVoices.find(v => v.name === voiceName);
  if (voice) msg.voice = voice;

  setTimeout(() => synth.speak(msg), 800);
}
