import React, { useState, useEffect } from 'react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .tableContainer {
    padding: 30px 15px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .pageTitle {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin-bottom: 30px;
  }

  .tablesSection {
    margin-bottom: 30px;
  }

  .tablesSectionTitle {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
  }

  .tablesGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 15px;
    background: white;
    padding: 25px;
    border-radius: 8px;
  }

  .tableCard {
  background-color: #f3f7f6;
  border-radius: 8px;
  padding: 12px;
  width: 120px;
  height: 100px;
  text-align: center;
  position: relative;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

 
.tableCardHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tableLabel {
  font-size: 16px;
  font-weight: 600;
}

  .tableCardTitle {
    font-size: 22.8px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

 .deleteBtn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

  .deleteBtn:hover:not(:disabled) {
    color: #d32f2f;
  }

  .deleteBtn:disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  .tableNumber {
  font-size: 28px;
  font-weight: 700;
  margin-top: 6px;
}


.tableFooter {
  position: absolute;
  bottom: 6px;
  right: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.chairIcon {
  font-size: 14px;
}

.chairCount {
  font-size: 13px;
}

  .tableSeatInfo {
    font-size: 11px;
    color: #999;
    margin-bottom: 10px;
  }

  .bookingBtn {
    width: 100%;
    padding: 6px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #f0f0f0;
    color: #333;
    cursor: pointer;
    font-size: 11px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .bookingBtn.booked {
    background: #4caf50;
    color: white;
    border-color: #45a049;
  }

  .bookingBtn:hover {
    opacity: 0.8;
  }

  .addTableCard {
    border: 2px dashed #ddd;
    border-radius: 6px;
    padding: 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #fafafa;
    position: relative;
  }

  .addTableCard:hover {
    border-color: #666;
    background: #f5f5f5;
  }

  .addIcon {
    font-size: 28px;
    margin-bottom: 8px;
  }

  .addTableText {
    font-size: 13px;
    color: #666;
    font-weight: 500;
  }

  .modal {
    display: none;
    position: absolute;
    z-index: 1000;
  }

  .modal.active {
    display: block;
  }

  .modalWrapper {
    display: flex;
    gap: 15px;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .existingTableCard {
    background: white;
    border-radius: 8px;
    padding: 25px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-width: 140px;
  }

  .existingTableTitle {
    font-size: 12px;
    color: #999;
    margin-bottom: 15px;
    font-weight: 500;
  }

  .existingTableNumber {
    font-size: 32px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
  }

  .existingTablePrice {
    font-size: 12px;
    color: #999;
  }

  .deleteIconSmall {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 16px;
  }

  .plusIcon {
    font-size: 32px;
    color: #999;
    margin-bottom: 10px;
  }

  .arrowDots {
    font-size: 24px;
    color: #ddd;
  }

  .newTableCard {
    background: white;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-width: 280px;
  }



  .formLabel {
    display: block;
    font-size: 12px;
    color: #666;
    font-weight: 600;
    margin-bottom: 8px;
    text-align: left;
  }

  .formGroup {
    margin-bottom: 18px;
  }

  .formInput {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }

    .formInput.largeInput {
  font-size: 72px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  border: none;
  border-bottom: 2px dotted #ccc;
  border-radius: 0;
}

  .formSelect {
  font-size: 32px;
  font-weight: 500;
  padding: 12px;
}

.formSelect option {
  font-size: 18px;
}
  .createBtn {
  width: 100%;
  background-color: #5a5a5a;
  color: white;
  font-size: 18px;
  font-weight: 500;
  padding: 16px;
  border: none;
  border-radius: 12px;
  margin-top: 20px;
  cursor: pointer;
}

  

  .closeModal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }`;

export default function Tables() {
  const [tables, setTables] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      seats: 4,
      isBooked: false,
      name: `Table ${String(i + 1).padStart(2, '0')}`,
      chairs:3
    }))
  );
  
  const [showModal, setShowModal] = useState(false);
  const [newTableSeats, setNewTableSeats] = useState(4);
  const [newTableName, setNewTableName] = useState('');

  useEffect(() => {
    const handleClickOutside = () => {
      console.log('Document clicked',showModal);
      if (showModal) {
        console.log("inside")
        setShowModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }},[]);
 

  const handleAddTable = () => {
    const nextNumber = tables.length > 0 ? Math.max(...tables.map(t => t.number)) + 1 : 1;
    const newTable = {
      id: Date.now(),
      number: nextNumber,
      seats: parseInt(newTableSeats),
      isBooked: false,
      name: newTableName || `Table ${String(nextNumber).padStart(2, '0')}`
    };
    setTables([...tables, newTable]);
    setShowModal(false);
    setNewTableName('');
    setNewTableSeats(4);
  };

  const handleDeleteTable = (id) => {
    const tableToDelete = tables.find(t => t.id === id);
    if (tableToDelete && !tableToDelete.isBooked) {
      const updatedTables = tables.filter(t => t.id !== id);
      const renumberedTables = updatedTables.map((table, index) => ({
        ...table,
        number: index + 1,
        name: table.name.includes('Table') ? `Table ${String(index + 1).padStart(2, '0')}` : table.name
      }));
      setTables(renumberedTables);
    }
  };

  const toggleTableBooking = (id) => {
    setTables(tables.map(table =>
      table.id === id ? { ...table, isBooked: !table.isBooked } : table
    ));
  };

  const lastTable = tables[tables.length - 1];

  return (
    <>
      <style>{styles}</style>
      <div className="tableContainer">
        <h1 className="pageTitle">Tables</h1>

        <div className="tablesSection">
          <div className="tablesGrid">
            {tables.map(table => (
              <div
  key={table.id}
  className="tableCard"
  style={{ opacity: table.isBooked ? 0.6 : 1 }}
>
  <div className="tableCardHeader">
    <span className="tableLabel">{table.name.split(' ')[0]}</span>
    <button
      className="deleteBtn"
      onClick={() => handleDeleteTable(table.id)}
      disabled={table.isBooked}
      title={table.isBooked ? 'Cannot delete booked table' : 'Delete table'}
    >
      🗑️
    </button>
  </div>

  <div className="tableNumber">{String(table.number).padStart(2, '0')}</div>

  <div className="tableFooter">
    <span className="chairIcon">🪑</span>
    <span className="chairCount">{String(table.chairs).padStart(2, '0')}</span>
  </div>
</div>

            ))}
            <div className="addTableCard" onClick={() => setShowModal(true)}>
              <div className="addIcon">+</div>
              <div className="addTableText">Add Table</div>
              
              {showModal && (
                <div className="modal active" style={{ top: 0, left: '100%', marginLeft: '10px' }}>
  <div className="newTableCard">
    <div className="formGroup">
      <label className="formLabel">Table name (optional)</label>
      <input
        type="text"
        className="formInput largeInput"
        placeholder="31"
        value={newTableName}
        onChange={e => setNewTableName(e.target.value)}
      />
    </div>
    <div className="formGroup">
      <label className="formLabel">Chair</label>
      <select
        className="formSelect"
        value={newTableSeats}
        onChange={e => setNewTableSeats(e.target.value)}
      >
        <option value="2">02</option>
        <option value="3">03</option>
        <option value="4">04</option>
        <option value="6">06</option>
        <option value="8">08</option>
      </select>
    </div>
    <button className="createBtn" onClick={handleAddTable}>
      Create
    </button>
  </div>
</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}