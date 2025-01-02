import React, { useState } from 'react';
import { User } from '../types';
import { getUsers, saveUser, setCurrentUser } from '../utils/localStorage';
import { KeyRound, UserRound } from 'lucide-react';

interface AuthFormProps {
  onSuccess: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setCurrentUser(user);
        onSuccess();
      } else {
        setError('Invalid credentials');
      }
    } else {
      const users = getUsers();
      if (users.some(u => u.email === email)) {
        setError('Email already exists');
        return;
      }
      
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        password
      };
      saveUser(newUser);
      setCurrentUser(newUser);
      onSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Create account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md pl-10"
                required
              />
              <UserRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md pl-10"
                required
              />
              <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Create account'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? 'Create account' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};