import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [item, setItem] = useState('');
  const [groceryList, setGroceryList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load from localStorage on initial render
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('groceryList')) || [];
    const savedMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setGroceryList(savedList);
    setDarkMode(savedMode);
  }, []);

  // Save to localStorage whenever list or mode changes
  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [groceryList, darkMode]);

  const addItem = () => {
    if (item.trim() !== '') {
      setGroceryList([...groceryList, { name: item, bought: false }]);
      setItem('');
    }
  };

  const toggleBought = (index) => {
    const newList = [...groceryList];
    newList[index].bought = !newList[index].bought;
    setGroceryList(newList);
  };

  const deleteItem = (index) => {
    const newList = groceryList.filter((_, i) => i !== index);
    setGroceryList(newList);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addItem();
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <h1>🛒 Grocery List</h1>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add grocery item..."
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={addItem}>Add</button>
      </div>

      <ul>
        {groceryList.map((g, index) => (
          <li
            key={index}
            className={`fade-in ${g.bought ? 'bought' : ''}`}
          >
            <span onClick={() => toggleBought(index)}>{g.name}</span>
            <button onClick={() => deleteItem(index)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
