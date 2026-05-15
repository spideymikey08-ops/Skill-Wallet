import React from 'react';
import Item from './Item';

function App() {
  const name = 'John Doe';
  const items = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to React with JSX.</p>

      <h2>My Items:</h2>
      <ul>
        {items.map((item) => (
          <Item key={item} name={item} />
        ))}
      </ul>
    </div>
  );
}

export default App;

