# Create README.md in project root
cat > README.md << EOF
# Attendance Management System

## Overview
A full-stack attendance management system with Docker support.

## Technologies
- Frontend: React.js
- Backend: Node.js/Express
- Database: MongoDB

## Running with Docker

### Frontend
\`\`\`bash
cd frontend
docker build -t attendance-frontend .
docker run -d --name frontend --network="host" attendance-frontend
\`\`\`

### Backend
\`\`\`bash
cd backend
docker build -t attendance-backend .
docker run -d --name backend -p 5000:5000 attendance-backend
\`\`\`

## Running Locally
1. Install dependencies: \`npm install\`
2. Start backend: \`cd backend && npm start\`
3. Start frontend: \`cd frontend && npm start\`
EOF