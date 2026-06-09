# StreamShield: Real-Time Fraud Detection System

StreamShield is an enterprise-grade, event-driven microservices platform designed to ingest, process, and visualize financial transactions in real-time. Built to simulate a production data engineering pipeline, it utilizes Apache Kafka for high-throughput event streaming and applies advanced mathematical modeling (Z-Score anomalies and Geo-Velocity checks) to detect fraudulent activity as it happens.

The system is fully containerized and features a dark-themed, interactive React dashboard for live security monitoring and threat investigation.

## ✨ Key Features

* **Real-Time Event Streaming:** A Spring Boot Producer continuously generates and publishes transaction payloads to Apache Kafka.
* **Advanced Fraud Heuristics:** The Spring Boot Engine consumes Kafka events and evaluates them against PostgreSQL historical data to flag:
    * **Z-Score Anomalies:** Detects statistical outliers ( > 3 standard deviations from a user's historical spending mean).
    * **Geo-Velocity Alerts (Impossible Travel):** Flags users whose geographic location changes faster than physically possible.
* **Interactive Threat Map:** A live, pulsing Leaflet map of India that dynamically scales threat markers based on regional alert volume.
* **Live Event Feed & Export:** A real-time terminal-style log of all Kafka events with one-click CSV export for downstream data analysis.
* **Deep-Dive Investigation:** Clickable user profiles that open an investigation modal, detailing a specific user's lifetime stats, preferred regions, and complete transaction timeline.

## 🏗️ Architecture

1. **Data Ingestion (Producer Service):** A Spring Boot application simulating high-volume financial traffic across 50 distinct users and 11 cities.
2. **Message Broker (Apache Kafka & Zookeeper):** Buffers and streams the raw transaction data.
3. **Stream Processing (Fraud Engine):** A Spring Boot consumer that pulls from Kafka, calculates Z-scores and geographic timestamps against historical baselines, and persists the results.
4. **Persistence (PostgreSQL):** Stores all evaluated `FraudRecords` for historical baseline calculations and dashboard querying.
5. **Visualization (React/Vite Frontend):** A containerized Nginx web server hosting a React application that polls the backend API to render real-time Recharts and Leaflet maps.

## 🛠️ Tech Stack
    Backend:
        Java 21

        Spring Boot 3.x (Web, Data JPA, Kafka)

        Lombok

    Frontend:

        React 18 (Vite)

        TailwindCSS (Styling)

        Recharts (Data Visualization)

        React-Leaflet (Interactive Maps)

        Lucide-React (Iconography)

    Infrastructure:

        Docker & Docker Compose (Multi-stage builds)

        Nginx (Frontend serving)

        Apache Kafka & Zookeeper

        PostgreSQL

## 🚀 Getting Started

The entire platform is configured to run via a single Docker Compose network. You do not need to install Java, Node, or PostgreSQL on your local machine.

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop)
* Docker Compose

### Installation

1. Clone the repository:
```bash
git clone [https://github.com/yourusername/StreamShield.git](https://github.com/yourusername/StreamShield.git)
cd StreamShield

2. Start the entire infrastructure (Kafka, Postgres, Spring Boot services, and React UI):
docker-compose up --build -d
```bash

3. Access the platforms:

Live Dashboard: http://localhost:3000

Backend API Base: http://localhost:8082

Note: It may take 15-30 seconds on the first boot for Kafka and Zookeeper to establish their network before the Spring Boot apps begin streaming data.

4. Shutting Down
To safely stop the cluster and wipe the database volume for a clean restart:

Bash
docker-compose down -v
