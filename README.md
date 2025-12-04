# 💻 Mini Device Management System (Lite)

A lightweight device management prototype that allows users to **create, activate, and manage devices**. The system uses a backend API and a frontend interface to interact with devices.

---

## ✨ Features

* **Create** new devices
* **Activate** devices (simulates per-device activation processes)
* **View** device details
* Simple frontend interface for user interaction

---

## 🛠️ Prerequisites

Make sure you have the following installed on your system:

* **Python 3.10+**
* **`pip`** for Python package management

---

## 💻 Setup and Installation

Follow these steps to set up and run the system locally:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/soumiya117/mini-device-mgmt.git](https://github.com/soumiya117/mini-device-mgmt.git)
    cd mini-device-mgmt
    ```

2.  **Install dependencies**
    Install all required Python packages, including FastAPI and Uvicorn.
    ```bash
    pip install -r requirements.txt
    ```

3.  **Start the FastAPI Backend**
    Start the API server using Uvicorn with the `--reload` flag for development.
    ```bash
    python -m uvicorn main:app --reload
    ```
    The server will be running at: **http://127.0.0.1:8000**

4.  **Access the API Documentation**
    FastAPI automatically provides interactive documentation (Swagger UI) where you can test the endpoints:
    ```
    http://127.0.0.1:8000/docs
    ```

5.  **Access the Frontend**
    While the backend is running, open the `frontend` folder and double-click `index.html` in your browser.

---

## 📂 Project Structure

This project uses a single-process Python backend and a static HTML frontend.

```bash
mini-device-mgmt/
├─ frontend/          
 ├─ public/
 │   ├─ index.html         
 │   ├─ style.css          
 │   └─ transactions.js
├─ crud.py             # Functions to manage device data
├─ db.py               # Database setup and connection logic
├─ device_sim.py       # Device simulation logic
├─ main.py             # Main application script (API server entry point)
├─ models.py           # Data models (e.g., Device class)
├─ requirements.txt    # List of required Python packages
└─ database.json       # Storage for device data (flat-file database)
 ```
### 📺 Watch the Demo

### 📺 Watch the Demo
### 📺 Watch the Mini Device Manager Demo

[![Mini Device Management System Demo](https://cdn.loom.com/sessions/thumbnails/63b4d0a7ef1c49fcb496946009da14f6-4c047254f7add0a8-full-play.gif#t=0.1)](https://www.loom.com/embed/63b4d0a7ef1c49fcb496946009da14f6)
