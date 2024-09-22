# File Uploader App

A web application for uploading and managing files. Users can sign in to upload files to their folders, view details of uploaded files, and download them. 

# Link to Project

Link: https://fileuploader-j5v5.onrender.com

# How It's Made

Tech used: Node.js, Express, EJS, Prisma ORM, PostgreSQL, Tailwind CSS, Cloudinary, Passport.js

This File Uploader App is built using Node.js for server-side logic and Express.js for routing. Prisma ORM is employed to handle database operations with PostgreSQL, and Cloudinary is used for storing and managing uploaded files. EJS is used for rendering dynamic HTML templates on the front end, and Tailwind CSS is utilized for styling the application. Passport.js handles user authentication and session management.

# Features

User Authentication: Users can sign up and log in to access their own folders and upload files.

File Upload: Users can upload files, which are then stored in Cloudinary and linked to their accounts.

File Management: Users can view details of their uploaded files, including file size and creation timestamp.

Download Files: Users can download their files directly from the application.


# Implementation Details

Backend Server: Implemented with Node.js and Express.js. Defines routes for user authentication, file uploading, and management tasks.

Authentication: Passport.js is used for handling user sign-up, log-in, and session management, integrated with Prisma ORM to store session information securely.

Database: Prisma ORM is used to interact with a PostgreSQL database, storing user information, file metadata, and access control data.

File Storage: Cloudinary is used for file storage and retrieval, providing optimized URLs for accessing the files.

Views: EJS templates are used to render dynamic content on the front end, including user dashboards, file lists, and upload forms.

Styling: Tailwind CSS is utilized for responsive and modern design, enhancing the user interface and experience.

# Lessons Learned

Building this File Uploader App provided a comprehensive experience in full-stack development. 

Key lessons include:

Prisma ORM Integration: Gained proficiency in using Prisma ORM for efficient database interactions, including schema design and complex queries.

Passport.js with Prisma ORM: Learned how to integrate Passport.js with Prisma ORM to handle user authentication and manage sessions securely.

File Management with Cloudinary: Developed skills in using Cloudinary for file storage and management, optimizing file delivery and handling.

Dynamic Front-End Development: Improved capabilities in using EJS for dynamic templating and Tailwind CSS for modern and responsive design.

Session Management and Security: Enhanced understanding of session management and user security best practices in a web application.

This project underscored the importance of seamless integration between front-end and back-end technologies, as well as the value of using a robust ORM like Prisma for database management. It also highlighted the challenges of handling file uploads and user authentication in a secure and efficient manner.

