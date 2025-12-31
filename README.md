# Next.js Authentication App

A complete authentication application built with Next.js 13+ that uses MongoDB for data storage and NextAuth.js for session management.

## Features

- ✅ **User Registration & Login** with credentials (email & password)
- ✅ **Server-side Authentication** with NextAuth.js
- ✅ **Protected Pages** that require authentication
- ✅ **Password Change** functionality for logged-in users
- ✅ **Responsive Design** with Tailwind CSS
- ✅ **MongoDB Integration** with connection pooling
- ✅ **Password Encryption** with bcryptjs

## Tech Stack

- **Frontend:** Next.js 16.1.1, React 19, TypeScript
- **Styling:** CSS Modules, Tailwind CSS
- **Authentication:** NextAuth.js v4
- **Database:** MongoDB
- **Password Hashing:** bcryptjs

## Project Structure

```
authentication/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (App Router)
│   │   ├── auth/
│   │   │   └── singup.js         # User registration API
│   │   └── user/
│   │       └── change-passowrd.js # Password change API
│   ├── auth/                     # Authentication page
│   ├── profile/                  # Protected profile page
│   ├── providers.tsx             # Session provider wrapper
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── auth/
│   │   ├── auth-form.tsx         # Login/Register form
│   │   └── auth-form.module.css  # Auth form styles
│   ├── layout/
│   │   ├── main-navigation.tsx   # Navigation component
│   │   └── main-navigation.module.css
│   └── profile/
│       ├── user-profile.tsx      # User profile display
│       ├── profile-form.tsx      # Password change form
│       ├── user-profile.module.css
│       └── profile-form.module.css
├── lib/                          # Utility libraries
│   ├── auth.js                   # Password hashing utilities
│   └── db.js                     # Database connection
├── pages/                        # Next.js Pages Router (for NextAuth)
│   └── api/
│       └── auth/
│           └── [...nextauth].js  # NextAuth API route
├── public/                       # Static assets
├── .env.local                    # Environment variables
└── .env.local.example            # Environment template
```

**Code Statistics:**
- Total Source Files: 20+ files
- Lines of Code: ~950 lines
- React Components: 6 components
- API Routes: 3 endpoints
- Utility Functions: 5 functions
- Configuration Files: 8 files

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (running on localhost:27017 or remote server)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd authentication
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your actual values:
   ```env
   # MongoDB Connection String
   MONGODB_URI=mongodb://localhost:27017/authentication

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secure-random-secret-here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Routes

### Authentication APIs (NextAuth)

- `POST /api/auth/signin/credentials` - Sign in with credentials
- `POST /api/auth/signout` - Sign out user
- `GET /api/auth/session` - Get current session info
- `POST /api/auth/callback/credentials` - Sign in callback

### Custom APIs

- `POST /api/auth/singup` - Register new user
- `PATCH /api/user/change-password` - Change password (requires authentication)

### API Response Structure

```javascript
// Success response
{
  "message": "Operation successful",
  "userId": "user_id_here" // for signup
}

// Error response
{
  "message": "Error description"
}
```

## Components

### Pages

| Route | Description | Access |
|-------|-------------|---------|
| `/` | Home page | Public |
| `/auth` | Login/Register | Public |
| `/profile` | User profile | Private (requires login) |

### Key Components

| Component | File | Description |
|-----------|------|-------------|
| `AuthForm` | `components/auth/auth-form.tsx` | Login/Register form |
| `UserProfile` | `components/profile/user-profile.tsx` | User profile display |
| `ProfileForm` | `components/profile/profile-form.tsx` | Password change form |
| `MainNavigation` | `components/layout/main-navigation.tsx` | Navigation bar |
| `Providers` | `app/providers.tsx` | SessionProvider wrapper |

### State Management

- **Client State:** React hooks (`useState`, `useEffect`)
- **Server State:** NextAuth session management
- **Global State:** React Context (SessionProvider)

## Environment Configuration

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/authentication` |
| `NEXTAUTH_URL` | Full application URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | 32-byte security key | Generated with crypto |

### Generating NEXTAUTH_SECRET

```bash
# Method 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Method 2: OpenSSL
openssl rand -base64 32

# Method 3: Online generators
# Visit: https://generate-secret.vercel.app/32
```

### Example .env.local file

```env
# Database
MONGODB_URI=mongodb://localhost:27017/authentication

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=7c8ccb63f65ae530e0f160b348240a7125a463c3d64d532f1bf67b67e31e3f66
```

## Usage

1. **Register:** Go to `/auth` and click "Create new account"
2. **Login:** Enter your credentials and sign in
3. **Profile:** Access `/profile` (you'll be redirected if not logged in)
4. **Change Password:** Change your password in the profile page
5. **Logout:** Use the Logout option in the navigation bar

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Security

- Passwords are hashed using bcryptjs
- Sessions are managed by NextAuth.js
- Server-side API routes validate authentication
- Use HTTPS in production
- Keep NEXTAUTH_SECRET secure

## Development

### Adding New Features

#### 1. New Component
```bash
# Create component in components/
mkdir components/new-feature
touch components/new-feature/new-component.tsx
touch components/new-feature/new-component.module.css
```

#### 2. New API Route
```bash
# App Router API
touch app/api/new-feature/route.ts

# Or Pages Router API
touch pages/api/new-feature.js
```

#### 3. Utility Function
```bash
# Add to lib/
touch lib/new-utility.js
```

### Testing the Application

```bash
# Build the project
npm run build

# Check linting
npm run lint

# Run tests (if added)
npm test
```

### Best Practices

#### 1. Authentication
- Always use `useSession()` to check user status
- Protect server-side API routes with session validation

#### 2. Database
- Always call `client.close()` after database operations
- Use connection pooling from `lib/db.js`

#### 3. Security
- Always hash passwords
- Use HTTPS in production
- Keep NEXTAUTH_SECRET secure

#### 4. Performance
- Mark client-side components with `"use client"`
- Use optimized React hooks
- Optimize images

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: MongoServerError: connect ECONNREFUSED
```

**Solution:**
- Ensure MongoDB is running: `net start MongoDB`
- Check `MONGODB_URI` in `.env.local`
- Verify connection string if using MongoDB Atlas

#### 2. NextAuth CLIENT_FETCH_ERROR
```
[next-auth][error][CLIENT_FETCH_ERROR] Unexpected token '<'
```

**Solution:**
- Set `NEXTAUTH_URL` in `.env.local`
- Ensure the port is correct (usually 3000)
- Restart the server

#### 3. Session Context Error
```
React Context is unavailable in Server Components
```

**Solution:**
- Ensure client-side components have `"use client"` directive
- SessionProvider should be in a client component

#### 4. Build Error
```
Module not found: Can't resolve 'next-auth'
```

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Application Logs

```bash
# Development logs
npm run dev

# Build logs
npm run build

# Production logs (check Vercel/Netlify dashboard)
```

### Connection Status Checks

```bash
# Test MongoDB connection
node -e "require('./lib/db').connectToDatabase().then(() => console.log('Connected!')).catch(console.error)"

# Test NextAuth configuration
curl http://localhost:3000/api/auth/session
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set Environment Variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your_secure_secret
   ```
4. Deploy

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Set environment variables

### Railway / Render

1. Connect repository
2. Build command: `npm run build`
3. Start command: `npm start`
4. Set environment variables

## Contributing

### Code Style
- Use TypeScript for new files
- Follow ESLint rules
- Write descriptive commit messages

### Pull Request Process
1. Fork the project
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## License

This project is licensed under the MIT License. You can freely use, modify, and distribute it.

## Support

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 📖 Docs: [Next.js Docs](https://nextjs.org/docs)

---

**Built with ❤️ and Next.js**
