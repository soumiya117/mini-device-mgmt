from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from db import create_device, list_devices, get_device, update_device, delete_device, update_device_status, list_transactions
from device_sim import activate_device, inactivate_device

app = FastAPI(title="Mini Device Management Backend (TinyDB)")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allows all origins, or use ["http://localhost:3000"] for specific
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE
    allow_headers=["*"],
)

# Pydantic schema
class DeviceCreate(BaseModel):
    name: str
    device_type: str
    ip_address: str

class DeviceUpdate(BaseModel):
    name: str = None
    device_type: str = None
    ip_address: str = None

@app.post("/devices")
def api_create_device(device: DeviceCreate):
    new_device = create_device(device.name, device.device_type, device.ip_address)
    return {"message": "Device created", "device": new_device}

@app.get("/devices")
def api_list_devices():
    
    return list_devices()

@app.get("/devices/{device_id}")
def api_get_device(device_id: str):
    device = get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device

@app.put("/devices/{device_id}")
def api_update_device(device_id: str, device: DeviceUpdate):
    existing = get_device(device_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Device not found")
    updated = update_device(device_id, device.name, device.device_type, device.ip_address)
    return {"message": "Device updated", "device": updated}

@app.delete("/devices/{device_id}")
def api_delete_device(device_id: str):
    existing = get_device(device_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Device not found")
    inactivate_device(device_id)  # Stop any running threads
    delete_device(device_id)
    return {"message": "Device deleted"}

@app.post("/devices/{device_id}/activate")
def api_activate_device(device_id: str):
    device = get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    update_device_status(device_id, "active")
    activate_device(device_id)
    return {"message": f"Device {device_id} activated"}

@app.post("/devices/{device_id}/inactivate")
def api_inactivate_device(device_id: str):
    device = get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    update_device_status(device_id, "inactive")
    inactivate_device(device_id)
    return {"message": f"Device {device_id} inactivated"}

@app.get("/transactions")
def api_list_transactions():
    return list_transactions()
