const API_BASE = "http://127.0.0.1:8000";

export const getDevices = async () => {
  const res = await fetch(`${API_BASE}/devices`);
  return res.json();
};

export const addDevice = async (device) => {
  const res = await fetch(`${API_BASE}/devices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(device),
  });
  return res.json();
};

export const updateDevice = async (id, device) => {
  const res = await fetch(`${API_BASE}/devices/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(device),
  });
  return res.json();
};

export const deleteDevice = async (id) => {
  const res = await fetch(`${API_BASE}/devices/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const activateDevice = async (id) => {
  const res = await fetch(`${API_BASE}/devices/${id}/activate`, {
    method: "POST",
  });
  return res.json();
};

export const inactivateDevice = async (id) => {
  const res = await fetch(`${API_BASE}/devices/${id}/inactivate`, {
    method: "POST",
  });
  return res.json();
};

export const getTransactions = async () => {
  const res = await fetch(`${API_BASE}/transactions`);
  return res.json();
};
