
import { useEffect } from 'react';
import { speak } from '../utils/speak';

export default function Result({ result, userName, voiceOn }) {
  useEffect(() => {
    const message = `Garrick has spoken. You belong to Project ${result.project}. Your strengths lie in ${result.departments.join(" and ")}.`;
    speak(message, 'Google UK English Male', !voiceOn);
  }, []);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">{userName}, Garrick has spoken!</h1>
      <p className="text-xl mb-2">Project: <strong>{result.project}</strong></p>
      <p className="text-xl mb-2">Departments: <strong>{result.departments.join(' & ')}</strong></p>
      <p className="italic mt-4">{result.reason}</p>
    </div>
  );
}
