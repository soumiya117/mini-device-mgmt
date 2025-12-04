import React, { useEffect, useState } from "react";
import { getDevices, activateDevice, inactivateDevice, deleteDevice, updateDevice } from "../api";

export default function DeviceList() {
  const [devices, setDevices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", device_type: "", ip_address: "" });

  const fetchDevices = async () => {
    const data = await getDevices();
    setDevices(data);
  };

  useEffect(() => { fetchDevices(); }, []);

  const handleActivate = async (id) => { await activateDevice(id); fetchDevices(); };
  const handleInactivate = async (id) => { await inactivateDevice(id); fetchDevices(); };
  const handleDelete = async (id) => { await deleteDevice(id); fetchDevices(); };

  const startEdit = (device) => {
    setEditingId(device.id);
    setEditData({ name: device.name, device_type: device.device_type, ip_address: device.ip_address });
  };

  const cancelEdit = () => { setEditingId(null); setEditData({ name: "", device_type: "", ip_address: "" }); };

  const saveEdit = async (id) => {
    await updateDevice(id, editData);
    cancelEdit();
    fetchDevices();
  };

  return (
    <div>
      <h2>Devices</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>IP Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(d => (
            <tr key={d.id}>
              {editingId === d.id ? (
                <>
                  <td><input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} /></td>
                  <td>
                    <select value={editData.device_type} onChange={e => setEditData({...editData, device_type: e.target.value})}>
                      <option value="access_controller">Access Controller</option>
                      <option value="face_reader">Face Reader</option>
                      <option value="anpr">ANPR</option>
                    </select>
                  </td>
                  <td><input value={editData.ip_address} onChange={e => setEditData({...editData, ip_address: e.target.value})} /></td>
                  <td>{d.status}</td>
                  <td>
                    <button onClick={() => saveEdit(d.id)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{d.name}</td>
                  <td>{d.device_type}</td>
                  <td>{d.ip_address}</td>
                  <td>{d.status}</td>
                  <td>
                    {d.status === "inactive" ? 
                      <button onClick={() => handleActivate(d.id)}>Activate</button> :
                      <button onClick={() => handleInactivate(d.id)}>Inactivate</button>
                    }
                    <button onClick={() => handleDelete(d.id)}>Delete</button>
                    <button onClick={() => startEdit(d)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
