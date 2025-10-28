import React, { useState, useEffect } from 'react';
import deleteIcon from '../assets/delete.png';
import chair from '../assets/chair.png'
import '../styles/Tables.css';

export default function Tables() {
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTableCapacity, setNewTableCapacity] = useState(4);
  const [newTableName, setNewTableName] = useState('');

  useEffect(() => {
    fetchTables();
  }, []);

  async function fetchTables() {
    try {
      const response = await fetch("https://restaurant-management-system-1-pz2f.onrender.com/api/tables");
      const data = await response.json();
      
      // Transform API data to match component structure
      const transformedData = data.map((table, index) => ({
        id: table._id,
        number: index + 1,
        capacity: table.capacity,
        isBooked: table.status !== 'Available',
        avaliableSeats:table.avaliableSeats
      }));

      //console.log(transformedData);
      
      setTables(transformedData);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  }

  useEffect(() => {
    const handleClickOutside = () => {
      if (showModal) {
        setShowModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showModal]);

  const handleAddTable = async () => {
    const nextNumber = tables.length > 0 ? Math.max(...tables.map(t => t.number)) + 1 : 1;
    
    try {
      const response = await fetch("https://restaurant-management-system-1-pz2f.onrender.com/api/tables", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableName: newTableName || `Table ${String(nextNumber).padStart(2, '0')}`,
          capacity: parseInt(newTableCapacity),
          status: 'Available',
          avaliableSeats: parseInt(newTableCapacity)
        })
      });
      
      if (response.ok) {
        await fetchTables();
        setShowModal(false);
        setNewTableName('');
        setNewTableCapacity(4);
      }
    } catch (error) {
      console.error('Error adding table:', error);
    }
  };

  const handleDeleteTable = async (id) => {
    const tableToDelete = tables.find(t => t.id === id);
    if (tableToDelete && !tableToDelete.isBooked) {
      try {
        const response = await fetch(`https://restaurant-management-system-1-pz2f.onrender.com/api/tables/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          await fetchTables();
        }
      } catch (error) {
        console.error('Error deleting table:', error);
      }
    }
  };


  return (
    <>
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
                  <button
                    className="deleteBtn"
                    onClick={() => {
                      if(table.capacity===table.avaliableSeats){
                        handleDeleteTable(table.id)
                      }
                    }}
                    disabled={table.isBooked}
                    title={table.isBooked ? 'Cannot delete booked table' : 'Delete table'}
                  >
                    <img src={deleteIcon} alt="" width="16px" height="18px" style={{opacity:(table.capacity!==table.avaliableSeats) ? 0.5 : 1, cursor:(table.capacity!==table.avaliableSeats) ? 'auto' : 'pointer'}}  />
                  </button>
                </div>

                
                <div className="tableNumber">
                  <p>Table</p>
                  <p>{String(table.number).padStart(2, '0')}</p>
                  </div>
                
                <div className="tableFooter">
                  <span className="capacityIcon">
                    <img src={chair} alt="" width="7px" height="11px" />
                  </span>
                  <span className="capacityCount">{String(table.capacity).padStart(2, '0')}</span>
                </div>
              </div>
            ))}
            
            <div className="addTableCard" onClick={(e) => {
              e.stopPropagation();
              if(tables.length<30){
                setShowModal(true);
              }
            }}>
              <div className="addIcon">+</div>
              <div className="addTableText">Add Table</div>
              
              {showModal && (
                <div className="modal active" style={{ top: 0, left: '100%', marginLeft: '10px' }} onClick={(e) => e.stopPropagation()}>
                  <div className="newTableCard">
                    <div className="formGroup">
                      <label className="formLabel">Table name (optional)</label>
                      <input
                        type="text"
                        className="formInput largeInput"
                        placeholder={`${tables.length+1}`}
                        value={newTableName}
                        onChange={e => setNewTableName(e.target.value)}
                      />
                    </div>
                    <div className="formGroup">
                      <label className="formLabel">Capacity</label>
                      <select
                        className="formInput formSelect"
                        value={newTableCapacity}
                        onChange={e => setNewTableCapacity(e.target.value)}
                      >
                        <option value="2">02</option>
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
