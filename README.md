# Blogging Website  

This is a **full-stack blogging platform** built with **Node.js, Express, MongoDB, and EJS**. It supports **user authentication, role-based access control (RBAC), blog creation, and commenting features**.  

## Features  

### 1. User Authentication & Authorization  
- Users can **sign up** and **sign in**.  
- Passwords are securely handled using hashing.  
- **Session management** is implemented via **cookies**.  
- Authentication middleware ensures secure access.  

### 2. Blog Management  
- Users can **create, read, and comment** on blogs.  
- Each blog contains:  
  - A **title**  
  - **Content**  
  - A **cover image** (uploaded using Multer)  
  - The **author's name**  

### 3. Comment System  
- Users can **add comments** on blog posts.  
- Comments are associated with both the **blog** and the **user who created them**.  

### 4. Admin Privileges (RBAC planned)  
- **Admins** can manage users and blogs (to be implemented).  
- **General users** can create and manage their own blogs.  

---

## Tech Stack  

### Backend  
- **Node.js** – Runtime environment  
- **Express.js** – Web framework  
- **MongoDB & Mongoose** – Database and ODM  

### Frontend  
- **EJS (Embedded JavaScript)** – Templating engine  
- **CSS & JavaScript** – Frontend design  

### Middleware & Other Dependencies  
- **Multer** – File uploads (for blog cover images)  
- **Cookie-parser** – For handling user authentication  
- **Mongoose** – ORM for MongoDB  

---

## Project Structure  

