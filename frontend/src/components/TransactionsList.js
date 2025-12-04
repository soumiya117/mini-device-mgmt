import React, { useState } from "react";
import { addDevice } from "../api";

export default function DeviceForm({ onAdd }) {
  const [name, setName] = useState("");
  const [deviceType, setDeviceType] = useState("access_controller");
  const [ip, setIp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDevice({ name, device_type: deviceType, ip_address: ip });
    setName(""); setIp(""); setDeviceType("access_controller");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <select value={deviceType} onChange={e => setDeviceType(e.target.value)}>
        <option value="access_controller">Access Controller</option>
        <option value="face_reader">Face Reader</option>
        <option value="anpr">ANPR</option>
      </select>
      <input placeholder="IP Address" value={ip} onChange={e => setIp(e.target.value)} required />
      <button type="submit">Add Device</button>
    </form>
  );
}
