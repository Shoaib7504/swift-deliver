import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext(null);

const DEFAULT_USERS = [
  {
    name: 'John Seller',
    email: 'merchant@zapshift.com',
    password: 'password', // seeded password
    tier: 'Pro Merchant',
    avatarInitials: 'JS'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth state
  useEffect(() => {
    // Seed default users if empty
    if (!localStorage.getItem('zs_users')) {
      localStorage.setItem('zs_users', JSON.stringify(DEFAULT_USERS));
    }

    const savedUser = localStorage.getItem('zs_currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse current user from local storage', e);
        localStorage.removeItem('zs_currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('zs_users') || '[]');
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!foundUser) {
      toast.error('No account found with this email.');
      return false;
    }

    if (foundUser.password !== password) {
      toast.error('Incorrect password. Please try again.');
      return false;
    }

    // Success
    const { password: _, ...userSession } = foundUser;
    
    // Fallback initials if not present
    if (!userSession.avatarInitials) {
      userSession.avatarInitials = userSession.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }

    localStorage.setItem('zs_currentUser', JSON.stringify(userSession));
    setUser(userSession);
    toast.success(`Welcome back, ${userSession.name}!`);
    return true;
  };

  const register = (name, email, password, tier = 'Starter') => {
    const users = JSON.parse(localStorage.getItem('zs_users') || '[]');
    const emailExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      toast.error('An account with this email already exists.');
      return false;
    }

    const avatarInitials = name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newUser = {
      name,
      email: email.toLowerCase(),
      password,
      tier,
      avatarInitials: avatarInitials || 'US'
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('zs_users', JSON.stringify(updatedUsers));

    // Log the user in immediately
    const { password: _, ...userSession } = newUser;
    localStorage.setItem('zs_currentUser', JSON.stringify(userSession));
    setUser(userSession);

    toast.success('Account created successfully!');
    return true;
  };

  const logout = () => {
    localStorage.removeItem('zs_currentUser');
    setUser(null);
    toast.info('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
