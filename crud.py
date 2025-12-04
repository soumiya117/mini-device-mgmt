from sqlalchemy.orm import Session
from models import Device, Transaction, DeviceStatus
import uuid
from datetime import datetime
import random

# Sample usernames & events
USERNAMES = ["Alice", "Bob", "Charlie", "David"]
EVENT_TYPES = ["access_granted", "face_match", "plate_read"]

# Devices
def create_device(db: Session, name: str, device_type: str, ip_address: str):
    device = Device(
        id=str(uuid.uuid4()),
        name=name,
        device_type=device_type,
        ip_address=ip_address
    )
    db.add(device)
    db.commit()
    db.refresh(device)
    return device

def list_devices(db: Session):
    return db.query(Device).all()

def update_device_status(db: Session, device_id: str, status: DeviceStatus):
    device = db.query(Device).filter(Device.id == device_id).first()
    if device:
        device.status = status
        db.commit()
        db.refresh(device)
    return device

# Transactions
def insert_transaction(db: Session, device_id: str):
    transaction = Transaction(
        transaction_id=str(uuid.uuid4()),
        device_id=device_id,
        username=random.choice(USERNAMES),
        event_type=random.choice(EVENT_TYPES),
        timestamp=datetime.utcnow(),
        payload={"details": "simulated transaction"}
    )
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction

def list_transactions(db: Session):
    return db.query(Transaction).all()
