import React from 'react';

export default function Sidebar() {
  const categories = [
    {
      name: 'Computers',
      subCategories: ['Laptops', 'Keyboards', 'Monitors']
    },
    {
      name: 'Mobiles',
      subCategories: ['Smartphones', 'Accessories']
    },
  ];

  return (
    <aside style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd' }}>
      <h3>Categories</h3>
      {categories.map((cat, i) => (
        <div key={i} style={{ marginBottom: '15px' }}>
          <strong>{cat.name}</strong>
          <div>
            {cat.subCategories.map((sub, j) => (
              <div key={j}>
                <input type="checkbox" id={`${cat.name}-${sub}`} />
                <label htmlFor={`${cat.name}-${sub}`} style={{ marginLeft: '8px' }}>{sub}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}