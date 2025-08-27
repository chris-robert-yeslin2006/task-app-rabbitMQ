# 🚀 Task-App – Microservices Task Management

<p align="center">
  <em>Modular, scalable task management with Node.js microservices, MongoDB, RabbitMQ messaging, and Docker containerization.</em>
</p>

---

## 🔥 Project Overview

Task-App is a backend-focused task management system built as three distinct microservices:

- **User-Service**: Handles user authentication and management  
- **Task-Service**: Manages task creation, updates, and task queues  
- **Notification-Service**: Listens to task events via RabbitMQ to notify users

This architecture emphasizes **scalability**, **decoupling**, and **resilience** using asynchronous messaging.

---

## ✨ Features

- ✅ User management backed by MongoDB  
- ✅ Task CRUD operations with persistent storage  
- ⚡ Event-driven communication using RabbitMQ  
- 🐳 Containerized services with Docker Compose  
- 🔄 Reliable RabbitMQ connection with automatic retries  
- 🔧 Easy local development and deployment setup  

---

## 🧱 Tech Stack

| Layer              | Technology                          | Icon                                         |
|--------------------|-----------------------------------|----------------------------------------------|
| Backend Services    | Node.js, Express                  | ⚙️                                           |
| Database           | MongoDB                           | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) |
| Messaging Queue    | RabbitMQ                         | ![RabbitMQ](https://img.shields.io/badge/-RabbitMQ-FF6600?logo=rabbitmq&logoColor=white) |
| Containerization   | Docker, Docker Compose            | ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white) |
| API Communication  | AMQP protocol                    | 🔗                                            |

---

## 📦 Getting Started

### Prerequisites

- Docker & Docker Compose installed on your system  
- Git installed  

### Clone the repository

git clone https://github.com/yeslinparker/task-app.git
cd task-app

text

### Build and run services

docker-compose build
docker-compose up

text

This will start MongoDB, RabbitMQ, and the three Node.js microservices.

---

## 🔍 How It Works

- User-service manages user data in MongoDB  
- Task-service creates tasks and publishes `"task_created"` events to RabbitMQ  
- Notification-service consumes the `"task_created"` queue and logs notifications  
- RabbitMQ decouples task creation from notification processing for resilience  

---

## 🛠️ Development Tips

- Use service names (`mongo`, `rabbitmq`) for inter-service connection strings  
- RabbitMQ connection includes retry logic to handle startup race conditions  
- View RabbitMQ management dashboard at `http://localhost:15672`  
- Use MongoDB at `mongodb://localhost:27017` by default  

---

## 🔗 Useful Links

- [RabbitMQ Docs](https://www.rabbitmq.com/documentation.html)  
- [MongoDB Docs](https://docs.mongodb.com/)  
- [Docker Docs](https://docs.docker.com/)  

---

## 🙋 Author

**Chris Robert Yeslin**  
- 📧 robertchemist2006@gmail.com  
- [LinkedIn](https://linkedin.com/in/yeslinparker)  
- [GitHub](https://github.com/yeslinparker)  

---

<p align="center">
  <sub>Made with ❤️ using Docker & RabbitMQ – Level up your backend game!</sub>
</p>
