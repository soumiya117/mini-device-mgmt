import threading
import time
import random
from db import insert_transaction

# Keep track of device threads and stop flags
device_threads = {}      # device_id -> thread
device_stop_flags = {}   # device_id -> threading.Event

def simulate_device(device_id: str, stop_event: threading.Event):
    try:
        while not stop_event.is_set():
            insert_transaction(device_id)
            time.sleep(random.randint(2, 5))
    except Exception as e:
        print(f"Error in device {device_id} simulation: {e}")

def activate_device(device_id: str):
    if device_id in device_threads:
        return False  # Already active

    stop_event = threading.Event()
    thread = threading.Thread(target=simulate_device, args=(device_id, stop_event), daemon=True)
    thread.start()

    device_threads[device_id] = thread
    device_stop_flags[device_id] = stop_event
    return True

def inactivate_device(device_id: str):
    if device_id in device_stop_flags:
        device_stop_flags[device_id].set()   # Signal thread to stop
        del device_stop_flags[device_id]
    if device_id in device_threads:
        del device_threads[device_id]
