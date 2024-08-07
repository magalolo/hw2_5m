import React, { useState, useEffect } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [entries, setEntries] = useState([]);

  // Load entries from localStorage when the component mounts
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    setEntries(savedEntries);
  }, []);

  // Save entries to localStorage whenever the entries array changes
  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue.trim()) {
      const newEntry = {
        name: inputValue,
        date: new Date().toLocaleDateString(), // Date is saved but not displayed
      };
      setEntries((prevEntries) => [...prevEntries, newEntry]);
      setInputValue('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <div className="App">
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        onKeyDown={handleKeyDown} 
        placeholder="Enter a name"
      />
      <button onClick={handleButtonClick}>Add name</button>
      <div>
        {entries.map((entry, index) => (
          <p key={index}>{entry.name}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
