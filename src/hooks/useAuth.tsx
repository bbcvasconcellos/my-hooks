import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  username: string;
  password: string;
}

interface UserCredentials {
  sessionId: string | unknown | null;
  statusCode: number | unknown;
  token?: string | unknown | null;
  loginAccepted?: boolean
}

interface ApiRouteProps {
  route: 'string';
}

interface RouterAuthProps {
  router: (url: string) => void;
}

interface AuthProps {
  signIn: (payload: User, api: ApiRouteProps, router: RouterAuthProps) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  user: UserCredentials;
  setUser: Dispatch<SetStateAction<UserCredentials>>;
}

export const AuthContext = createContext({} as AuthProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserCredentials>({
    sessionId: null,
    statusCode: undefined,
    token: null,
    loginAccepted: false
  });
  const [isLoading, setIsLoading] = useState(true);

  const signIn = async(
    { username, password }: User, 
    { route }: ApiRouteProps,
    { router }: RouterAuthProps
  ) => {
    try {
      const { data, status } = await axios.post(route, {
        username,
        password
      })

      setUser({
        sessionId: data.sessionId,
        statusCode: status,
        token: data.token,
        loginAccepted: true
      })

      if((user.sessionId && user.statusCode === 200) || user.loginAccepted) {
        localStorage.setItem('sessionId', JSON.stringify(user));
        router('/');
      }
    } 
    catch(err) {
      setUser({sessionId: '', statusCode: 401});
      throw new Error('User not found> Review your username or password');
    } 
    finally {
      setIsLoading(false);
    }
  }

  const signOut = () => {
    setUser({} as UserCredentials);
    localStorage.removeItem('sessionId');
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoading, setUser, user}}>
      { children }
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth, AuthProvider}