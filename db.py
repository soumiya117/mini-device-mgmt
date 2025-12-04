from tinydb import TinyDB, Query
import uuid
from datetime import datetime

db = TinyDB("database.json")
devices_table = db.table("devices")
transactions_table = db.table("transactions")

# Devices
def create_device(name: str, device_type: str, ip_address: str):
    device_id = str(uuid.uuid4())
    device = {
        "id": device_id,
        "name": name,
        "device_type": device_type,
        "ip_address": ip_address,
        "status": "inactive",
        "created_at": str(datetime.utcnow()),
        "updated_at": str(datetime.utcnow())
    }
    devices_table.insert(device)
    return device

def list_devices():
    return devices_table.all()

def get_device(device_id: str):
    Device = Query()
    return devices_table.get(Device.id == device_id)

def update_device(device_id: str, name=None, device_type=None, ip_address=None):
    Device = Query()
    updates = {}
    if name: updates["name"] = name
    if device_type: updates["device_type"] = device_type
    if ip_address: updates["ip_address"] = ip_address
    if updates:
        updates["updated_at"] = str(datetime.utcnow())
        devices_table.update(updates, Device.id == device_id)
    return devices_table.get(Device.id == device_id)

def delete_device(device_id: str):
    Device = Query()
    devices_table.remove(Device.id == device_id)
    # Optional: remove associated transactions
    transactions_table.remove(Query().device_id == device_id)
    return True

def update_device_status(device_id: str, status: str):
    Device = Query()
    devices_table.update({"status": status, "updated_at": str(datetime.utcnow())}, Device.id == device_id)
    return devices_table.get(Device.id == device_id)

# Transactions
USERNAMES = ["Alice", "Bob", "Charlie", "David"]
EVENT_TYPES = ["access_granted", "face_match", "plate_read"]

def insert_transaction(device_id: str):
    transaction_id = str(uuid.uuid4())
    import random
    transaction = {
        "transaction_id": transaction_id,
        "device_id": device_id,
        "username": random.choice(USERNAMES),
        "event_type": random.choice(EVENT_TYPES),
        "timestamp": str(datetime.utcnow()),
        "payload": {"details": "simulated transaction"},
        "created_at": str(datetime.utcnow())
    }
    transactions_table.insert(transaction)
    return transaction

def list_transactions():
    return transactions_table.all()
