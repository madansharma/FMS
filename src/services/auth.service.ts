import { supabase } from '../lib/supabase';

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'executor';
  name: string;
}

let currentUser: AuthUser | null = null;

export const authService = {
  async signIn(email: string, password: string): Promise<{ user: AuthUser }> {
    const { data, error } = await supabase.rpc('verify_user_password', {
      user_email: email,
      user_password: password
    });

    if (error) {
      throw new Error('Invalid email or password');
    }

    if (!data || data.length === 0) {
      throw new Error('Invalid email or password');
    }

    const user = data[0];
    currentUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    return { user: currentUser };
  },

  async signOut() {
    currentUser = null;
    localStorage.removeItem('currentUser');
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    if (currentUser) {
      return currentUser;
    }

    const stored = localStorage.getItem('currentUser');
    if (stored) {
      currentUser = JSON.parse(stored);
      return currentUser;
    }

    return null;
  },

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }
};
