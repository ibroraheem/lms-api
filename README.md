# Learning Management System (LMS) API

Welcome to the Learning Management System (LMS) API! This API is designed to facilitate the management of courses, payments, user enrollments, and more for your online learning platform.

## Table of Contents
- [Learning Management System (LMS) API](#learning-management-system-lms-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contribute](#contribute)

## Features
- Create, update, and delete courses
- Handle course content, enrollments, and payments
- User authentication and role-based access control
- Progress tracking, feedback submission, and certificate generation

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js and npm installed
- MongoDB installed and running
- Monnify API credentials (for payment processing)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ibroraheem/lms-api.git
   cd lms-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables and update them with your values:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     MONNIFY_API_URL=your_monnify_api_url
     MONNIFY_API_KEY=your_monnify_api_key
     ```
4. Run the application:
   ```bash
   npm start
   ```

## Usage
- The API documentation can be accessed at `/api-docs` once the server is running.

## Contributing
Contributions are welcome! Here's how you can get involved:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contribute
If you want to contribute to the project, please follow the [Contribution Guidelines](CONTRIBUTING.md).