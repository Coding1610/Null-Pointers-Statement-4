import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type AuthMode = 'login' | 'signup' | 'forgot-password'

export const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const navigate = useNavigate()

  const switchToLogin = () => setAuthMode('login')
  const switchToSignup = () => setAuthMode('signup')
  const switchToForgotPassword = () => setAuthMode('forgot-password')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 relative">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="absolute top-4 md:top-6 left-4 md:left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm md:text-base"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4" />
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Back to Home</span>
        <span className="sm:hidden">Home</span>
      </Button>

      <div className="w-full max-w-sm md:max-w-md mt-12 md:mt-0">
        {authMode === 'login' && (
          <LoginForm
            onSwitchToSignup={switchToSignup}
            onForgotPassword={switchToForgotPassword}
          />
        )}
        
        {authMode === 'signup' && (
          <SignupForm onSwitchToLogin={switchToLogin} />
        )}
        
        {authMode === 'forgot-password' && (
          <ForgotPasswordForm onBackToLogin={switchToLogin} />
        )}
      </div>
    </div>
  )
}
