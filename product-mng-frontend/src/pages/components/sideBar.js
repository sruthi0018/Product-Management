import React, { useState } from "react";

export default function Sidebar({ categories, subCategories,onFilterChange }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedSubs, setSelectedSubs] = useState([]);

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

   const handleCheckboxChange = (e, subId) => {
    let updatedSubs;
    if (e.target.checked) {
      updatedSubs = [...selectedSubs, subId];
    } else {
      updatedSubs = selectedSubs.filter((id) => id !== subId);
    }
    setSelectedSubs(updatedSubs);
    onFilterChange(updatedSubs);
  };

  return (
    <aside style={{ width: "250px", padding: "20px", borderRight: "1px solid #ddd" }}>
      <h3>All Categories</h3>
      {categories.map((cat) => {
        const isOpen = openCategory === cat._id;
        const filteredSubs = subCategories.filter((sub) => sub.categoryId?._id === cat._id);

        return (
          <div key={cat._id} style={{ marginBottom: "15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                background: "#f3f4f6",
                padding: "10px",
                borderRadius: "6px",
              }}
              onClick={() => toggleCategory(cat._id)}
            >
              <strong>{cat.name}</strong>
              <span>{isOpen ? "▾" : "▸"}</span>
            </div>

            {isOpen && (
              <div style={{ marginTop: "8px", paddingLeft: "15px" }}>
                {filteredSubs.length > 0 ? (
                  filteredSubs.map((sub) => (
                    <div key={sub._id} style={{ marginTop: "6px" }}>
                      <input type="checkbox" id={`${cat.name}-${sub.name}`}  checked={selectedSubs.includes(sub._id)}
                      onChange={(e) => handleCheckboxChange(e, sub._id)}/>
                      <label htmlFor={`${cat.name}-${sub.name}`} style={{ marginLeft: "8px" }}>
                        {sub.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: "14px", color: "#666", marginTop: "6px" }}>
                    No subcategories
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
