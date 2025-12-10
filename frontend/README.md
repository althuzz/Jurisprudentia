# Law Quiz App

A full-stack web application for testing legal knowledge through interactive quizzes. Built with React for the frontend and Express.js for the backend.

## Features

- 📝 Interactive quiz with multiple-choice questions
- 🏆 Leaderboard to track top scorers
- 💾 Persistent score tracking
- 📱 Responsive design for mobile and desktop
- ⚡ Real-time feedback on answers
- 🎨 Modern UI with gradient design

## Tech Stack

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-Origin Resource Sharing

## Project Structure

```
law-quiz-app/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Quiz.jsx
│   │   │   ├── Question.jsx
│   │   │   └── Leaderboard.jsx
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── backend/
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Enter your name to start the quiz
3. Answer each question by clicking on an option
4. Get immediate feedback on your answer
5. Click "Next Question" to continue
6. After completing all questions, view your score
7. Check the leaderboard to see top performers

## API Endpoints

### Get Quizzes
- **GET** `/api/quizzes` - Get all available quizzes
- **GET** `/api/quizzes/:id` - Get a specific quiz

### Submit Quiz
- **POST** `/api/submit-quiz` - Submit quiz results
  - Body: `{ name, quizId, score }`

### Get Leaderboard
- **GET** `/api/leaderboard` - Get leaderboard rankings

## Example Quiz Data

The app includes a sample Constitutional Law Basics quiz with 3 questions:
1. What year was the U.S. Constitution ratified?
2. How many amendments are in the Bill of Rights?
3. Which branch has the power to interpret laws?

## Customization

### Adding New Quizzes

Edit `backend/server.js` and add new quiz objects to the `quizzes` array:

```javascript
{
  id: 2,
  title: 'Your Quiz Title',
  questions: [
    {
      id: 1,
      question: 'Your question?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0 // Index of correct answer
    }
  ]
}
```

### Styling

Modify `frontend/src/App.css` to customize colors, fonts, and animations.

## Development Mode

For development with auto-reload:

**Backend:**
```bash
cd backend
npm install nodemon --save-dev
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build/` folder.

## Troubleshooting

### Backend Connection Issues
- Ensure backend is running on port 5000
- Check that CORS is properly configured
- Verify the API URL in frontend components matches your backend URL

### Quiz Not Loading
- Check browser console for errors
- Ensure backend server is running
- Verify the quiz ID exists in the backend

## Future Enhancements

- User authentication and registration
- Multiple quiz categories
- Timed quizzes
- Detailed score analytics
- Quiz creation interface for admins
- Database integration (MongoDB, PostgreSQL)
- User profiles
- Social sharing features

## License

MIT License - feel free to use this project for personal and educational purposes.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

## Support

For issues or questions, please create an issue in the repository.

---

**Created:** December 6, 2025
**Version:** 1.0.0
