# Authentication Setup Guide

## Overview
This project now includes a complete authentication system built with Supabase, featuring:
- User registration and login
- Password reset functionality
- Protected routes
- User profile management
- Modern UI with shadcn components

## Setup Instructions

### 1. Supabase Configuration

1. **Create a Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the project to be ready

2. **Enable Authentication:**
   - In your Supabase dashboard, go to Authentication > Settings
   - Enable "Enable email confirmations" if you want email verification
   - Configure any additional auth providers (Google, GitHub) if desired

3. **Get Your Credentials:**
   - Go to Settings > API
   - Copy your Project URL and anon/public key

4. **Create Environment File:**
   Create a `.env` file in your project root with:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

### 2. Database Setup (Optional)

If you want to store additional user profile data, create a `profiles` table in Supabase:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 3. Features

#### Authentication Forms
- **Login Form:** Email/password authentication with validation
- **Signup Form:** User registration with full name and email
- **Forgot Password:** Password reset via email

#### Protected Routes
- `/map` - Requires authentication
- `/auth` - Authentication page (login/signup)
- `/` - Public landing page

#### User Management
- **User Profile:** Dropdown menu with user info and logout
- **Session Management:** Automatic session persistence
- **Route Guards:** Automatic redirects for unauthenticated users

### 4. Customization

#### Adding Social Login
To add Google or GitHub authentication:

1. Configure the provider in Supabase dashboard
2. Update the auth functions in `src/integrations/supabase/client.ts`
3. Add social login buttons to the auth forms

#### User Profile Data
To store additional user data:

1. Create the database table (see SQL above)
2. Update the types in `src/integrations/supabase/types.ts`
3. Add profile management components

#### Styling
The authentication system uses Tailwind CSS and shadcn/ui components. You can customize:
- Colors in `tailwind.config.ts`
- Component styles in the individual auth components
- Layout and spacing in `AuthPage.tsx`

### 5. Testing

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test the authentication flow:**
   - Visit `/` (should show login/signup buttons)
   - Click "Get Started" or "Sign In" (redirects to `/auth`)
   - Test registration with a new email
   - Test login with existing credentials
   - Test password reset functionality
   - Verify protected routes require authentication

### 6. Troubleshooting

#### Common Issues

1. **Environment Variables Not Loading:**
   - Ensure `.env` file is in project root
   - Restart the development server
   - Check variable names start with `VITE_`

2. **Supabase Connection Errors:**
   - Verify URL and key are correct
   - Check Supabase project status
   - Ensure authentication is enabled

3. **Protected Routes Not Working:**
   - Check `AuthProvider` is wrapping your app
   - Verify `ProtectedRoute` component usage
   - Check authentication state in browser dev tools

#### Getting Help

- Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Review React Router documentation for routing issues
- Check browser console for JavaScript errors

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for all sensitive configuration
- Supabase handles password hashing and JWT tokens automatically
- Row Level Security (RLS) is recommended for user data
- Consider implementing rate limiting for auth endpoints

## Next Steps

After setting up authentication, consider adding:
- Email verification workflows
- Social login providers
- User role management
- Advanced profile features
- Audit logging
- Multi-factor authentication
