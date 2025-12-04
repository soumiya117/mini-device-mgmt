import React, { useEffect, useState } from "react";
import { getDevices, activateDevice, inactivateDevice, deleteDevice } from "../api";

export default function DeviceList() {
  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    const res = await getDevices();
    setDevices(res.data);
  };

  useEffect(() => { fetchDevices(); }, []);

  const handleActivate = async (id) => {
    await activateDevice(id);
    fetchDevices();
  };

  const handleInactivate = async (id) => {
    await inactivateDevice(id);
    fetchDevices();
  };

  const handleDelete = async (id) => {
    await deleteDevice(id);
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
