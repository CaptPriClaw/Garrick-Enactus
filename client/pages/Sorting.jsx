
import { useState, useEffect } from 'react';
import questions from '../data/questions';
import { speak } from '../utils/speak';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) recognition.continuous = false;

export default function Sorting({ userName, setAnswers, setStep, setResult, voiceOn }) {
  const [current, setCurrent] = useState(0);
  const [responses, setResponses] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    speak(questions[current], 'Google UK English Male', !voiceOn);
  }, [current, voiceOn]);

  const handleVoiceInput = () => {
    if (!recognition) return alert("Voice recognition not supported");
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + ' ' + transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
  };

  const handleNext = async () => {
    if (!input.trim()) return;
    const updated = [...responses, input];
    setResponses(updated);
    setInput('');

    if (current + 1 === questions.length) {
      const res = await fetch('http://localhost:5000/api/sort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses: updated, userName })
      });
      const result = await res.json();
      setAnswers(updated);
      setResult(result);
      setStep('result');
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12">
      <h2 className="text-xl mb-4">{questions[current]}</h2>
      <textarea className="w-full p-2 border rounded h-32" value={input} onChange={(e) => setInput(e.target.value)} />
      <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded" onClick={handleNext}>Next</button>
      <button className={`bg-gray-700 text-white px-4 py-2 mt-2 rounded ${isListening ? 'animate-pulse' : ''}`} onClick={handleVoiceInput}>🎤 Speak</button>
    </div>
  );
}
