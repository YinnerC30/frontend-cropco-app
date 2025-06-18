import { PATH_ADMIN_LOGIN, PATH_LOGIN } from '@/config';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Header({ className }: { className?: string }) {
  return (
    <header className={cn('shadow-sm', className)}>
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <Link to="/" className="text-2xl font-bold text-foreground">
          CropCo
        </Link>
        <nav className='flex gap-2'>
          <Link
            className="px-4 py-2 font-bold bg-gray-200 border rounded-md text-foreground hover:bg-gray-400 dark:text-slate-900"
            to={PATH_ADMIN_LOGIN}
          >
            Administración
          </Link>
          <Link
            className="px-4 py-2 font-bold bg-gray-200 border rounded-md text-foreground hover:bg-gray-400 dark:text-slate-900"
            to={PATH_LOGIN}
          >
            Ingresar
          </Link>
        </nav>
      </div>
    </header>
  );
}
