import { userOrganizationApi } from '@/infra/interface/api';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Role } from '@/entity/user';

type AuthContextType = {
  organizationId: number | null;
  setOrganizationId: (organizationId: number) => void;
  role: Role;
  setRole: (role: Role) => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(Role.Member);
  const [organizationId, setOrganizationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const userOrganizationData =
          await userOrganizationApi.getUserOrganizationsApiUserOrganizationGet();
        const organizationId = userOrganizationData.data[0]
          .organization_id as number;
        setOrganizationId(organizationId);
        const userRole = userOrganizationData.data[0].role as unknown as Role;
        setRole(userRole);
      } catch (error) {
        console.error('Auth data fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        organizationId,
        setOrganizationId,
        role,
        setRole,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  return context;
};
