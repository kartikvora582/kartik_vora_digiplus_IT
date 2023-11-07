import React, { useState } from 'react';
import './style.css';
import DataTable from 'react-data-table-component';
import { Edit3, Trash2, Plus } from 'react-feather'; // Import the Plus icon for adding new rows

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

export default function App() {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'John Doe',
      location: 'New York',
      cgpa: 3.7,
    },
    {
      id: 2,
      name: 'Jane Smith',
      location: 'Los Angeles',
      cgpa: 3.5,
    },
  ]);

  const [editRow, setEditRow] = useState(null);
  const [newRow, setNewRow] = useState({ name: '', location: '', cgpa: 0.0 });
  const [addingNew, setAddingNew] = useState(false); // Track if "Add New" is clicked

  const handleEdit = (row) => {
    setEditRow(row);
  };

  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
      item.id === editRow.id ? { ...item, ...editRow } : item
    );
    setData(updatedData);
    setEditRow(null);
  };

  const handleDelete = (row) => {
    const newData = data.filter((item) => item.id !== row.id);
    setData(newData);
  };

  const handleAddNew = () => {
    setAddingNew(true);
  };

  const handleSaveNew = () => {
    setData([...data, { id: data.length + 1, ...newRow }]);
    setNewRow({ name: '', location: '', cgpa: 0.0 });
    setAddingNew(false); // Hide input fields after adding
  };

  const columns = [
    {
      name: 'Sr. No',
      selector: (row, index) => index + 1,
      sortable: true,
      maxWidth: '80px',
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      cell: (row) =>
        editRow && editRow.id === row.id ? (
          <input
            type="text"
            value={editRow.name}
            onChange={(e) => setEditRow({ ...editRow, name: e.target.value })}
          />
        ) : (
          row.name
        ),
    },
    {
      name: 'Location',
      selector: 'location',
      sortable: true,
      cell: (row) =>
        editRow && editRow.id === row.id ? (
          <input
            type="text"
            value={editRow.location}
            onChange={(e) =>
              setEditRow({ ...editRow, location: e.target.value })
            }
          />
        ) : (
          row.location
        ),
    },
    {
      name: 'CGPA',
      selector: 'cgpa',
      sortable: true,
      cell: (row) =>
        editRow && editRow.id === row.id ? (
          <input
            type="number"
            value={editRow.cgpa}
            onChange={(e) =>
              setEditRow({ ...editRow, cgpa: parseFloat(e.target.value) })
            }
          />
        ) : (
          row.cgpa
        ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          {editRow && editRow.id === row.id ? (
            <button onClick={handleSaveEdit} className="btn btn-success">
              Save Edit
            </button>
          ) : (
            <>
              <Edit3
                onClick={() => handleEdit(row)}
                style={{ cursor: 'pointer', marginRight: '10px' }}
              />
              <Trash2
                onClick={() => handleDelete(row)}
                style={{ cursor: 'pointer' }}
              />
            </>
          )}
        </div>
      ),
      maxWidth: '100px',
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={data} />
      {addingNew ? (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newRow.name}
            onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={newRow.location}
            onChange={(e) => setNewRow({ ...newRow, location: e.target.value })}
          />
          <input
            type="number"
            placeholder="CGPA"
            value={newRow.cgpa}
            onChange={(e) =>
              setNewRow({ ...newRow, cgpa: parseFloat(e.target.value) })
            }
          />
          <button onClick={handleSaveNew} className="btn btn-primary">
            Save New
          </button>
        </div>
      ) : (
        <button onClick={handleAddNew} className="btn btn-primary">
          <Plus size="12" style={{ marginRight: '5px' }} />
          Add New
        </button>
      )}
    </div>
  );
}
