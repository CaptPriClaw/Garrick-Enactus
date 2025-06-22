
import { useState } from 'react';

export default function Home({ setStep, setUserName }) {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim()) {
      setUserName(name);
      setStep('sorting');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Garrick's Chamber</h1>
      <input
        className="border p-2 rounded mb-4 w-64"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleStart}>
        Begin Sorting
      </button>
    </div>
  );
}
