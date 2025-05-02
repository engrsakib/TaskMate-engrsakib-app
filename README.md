# TaskMate-engrsakib-app

TaskMate-engrsakib-app is a task management application built with Next.js, designed to help users organize and manage tasks efficiently. It incorporates modern tools and libraries to provide a seamless user experience with features like authentication, interactive UI components, and a customizable interface.

## Table of Contents
- [Features](#features)
- [Tools and Packages](#tools-and-packages)
- [Project Setup](#project-setup)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication with NextAuth.js
- Interactive task management interface
- Customizable UI with DaisyUI and Tailwind CSS
- Date picker functionality with react-datepicker
- Engaging UI components like react-custom-roulette and react-wheel-of-prizes
- Helmet for SEO and metadata management
- SweetAlert2 for elegant alerts and modals

## Tools and Packages
The project leverages the following tools and packages:
- **Framework**: Next.js (v15.3.1) for server-side rendering and static site generation
- **Authentication**: NextAuth.js (v4.24.11) for secure user authentication
- **Frontend**: React (v19.0.0), React DOM (v19.0.0)
- **Styling**: Tailwind CSS (v4), DaisyUI (v5.0.30) for responsive and customizable UI
- **UI Components**:
  - react-custom-roulette (v1.4.1) and react-wheel-of-prizes (v1.1.0) for gamified elements
  - react-datepicker (v8.3.0) for date selection
  - react-icons (v5.5.0) for scalable icons
  - react-helmet (v6.1.0) for managing document head
  - sweetalert2 (v11.19.1) for enhanced alerts
- **Security**: bcrypt (v5.1.1) for password hashing
- **Development Tools**:
  - ESLint (v9) and eslint-config-next (v15.3.1) for code linting
  - TypeScript (v5) for type-safe JavaScript
  - @types/node, @types/react, @types/react-dom for TypeScript type definitions

## Project Setup
To set up and run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/TaskMate-engrsakib-app.git
   cd TaskMate-engrsakib-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   This will start the app at `http://localhost:3000` with Turbopack enabled.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Start the production server**:
   ```bash
   npm run start
   ```

6. **Lint the codebase**:
   ```bash
   npm run lint
   ```

Ensure you have Node.js (v18 or higher) installed. You may also need to configure environment variables (e.g., for NextAuth.js) in a `.env.local` file.

## Screenshots
*Note: Screenshots are optional and can be added here if available.*

- **Dashboard**: A clean interface for task management.
  ![Dashboard](screenshots/dashboard.png)
- **Task Creation**: Interactive form with date picker and alerts.
  ![Task Creation](screenshots/task-creation.png)
- **Roulette Feature**: Gamified task assignment.
  ![Roulette](screenshots/roulette.png)

*Replace the above with actual screenshot paths if available.*

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.