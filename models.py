from sqlalchemy import Column, String, Enum, TIMESTAMP, JSON, ForeignKey
from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy.sql import func
from db import Base
import enum

class DeviceType(str, enum.Enum):
    access_controller = "access_controller"
    face_reader = "face_reader"
    anpr = "anpr"

class DeviceStatus(str, enum.Enum):
    inactive = "inactive"
    active = "active"

class Device(Base):
    __tablename__ = "devices"

    id = Column(CHAR(36), primary_key=True)
    name = Column(String(100), nullable=False)
    device_type = Column(Enum(DeviceType), nullable=False)
    ip_address = Column(String(45), nullable=False)
    status = Column(Enum(DeviceStatus), default=DeviceStatus.inactive)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

class Transaction(Base):
    __tablename__ = "transactions"

    transaction_id = Column(CHAR(36), primary_key=True)
    device_id = Column(CHAR(36), ForeignKey("devices.id"))
    username = Column(String(50))
    event_type = Column(String(50))
    timestamp = Column(TIMESTAMP)
    payload = Column(JSON)
    created_at = Column(TIMESTAMP, server_default=func.now())
