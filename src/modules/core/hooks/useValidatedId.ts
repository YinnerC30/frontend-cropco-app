import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface UseValidatedIdReturn {
  id: string | null;
}

export const useValidatedId = (redirectPath: string): UseValidatedIdReturn => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate(redirectPath, { replace: true });
    }
  }, [id, navigate, redirectPath]);

  return { id: id || null };
};