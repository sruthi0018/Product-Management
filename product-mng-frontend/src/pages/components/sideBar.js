import React from 'react';


export default function Sidebar({ categories,subCategories }) {

  return (
    <aside style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd' }}>
      <h3>All Categories</h3>
      {categories.map((cat) => (
        <div key={cat?._id} style={{ marginBottom: '15px' }}>
          <strong>{cat?.name}</strong>
          <div style={{ marginTop: '8px' }}>
            {subCategories
              .filter((sub) => sub.categoryId?._id === cat?._id)
              .map((sub) => (
                <div key={sub?._id} style={{ marginLeft: '10px', marginTop: '4px' }}>
                  <input type="checkbox" id={`${cat.name}-${sub.name}`} />
                  <label htmlFor={`${cat.name}-${sub.name}`} style={{ marginLeft: '8px' }}>
                    {sub.name}
                  </label>
                </div>
              ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
