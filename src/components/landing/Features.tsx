import {
  BarChart2,
  Clock,
  Cloud,
  Leaf,
  LineChart,
  Package,
  Smartphone,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Seguimiento de cultivos',
    description:
      'Registra y monitorea el progreso de tus cultivos en tiempo real.',
  },
  {
    icon: Package,
    title: 'Control de Inventario',
    description: 'Gestiona eficientemente tus insumos y recursos agrícolas.',
  },
  {
    icon: Users,
    title: 'Gestión de Personal',
    description: 'Administra tu equipo y asigna tareas de manera eficiente.',
  },
  {
    icon: LineChart,
    title: 'Análisis Financiero',
    description: 'Monitorea ventas, compras y gastos de tu operación agrícola.',
  },
  {
    icon: BarChart2,
    title: 'Dashboard Interactivo',
    description:
      'Visualiza métricas y KPIs importantes para la toma de decisiones.',
  },
  {
    icon: Cloud,
    title: 'Almacenamiento en la nube',
    description:
      'Accede a tu información desde cualquier lugar y en cualquier momento.',
  },
  {
    icon: Clock,
    title: 'Monitoreo en Tiempo Real',
    description: 'Seguimiento instantáneo de todas tus operaciones agrícolas.',
  },
  {
    icon: Smartphone,
    title: 'Acceso Multiplataforma',
    description:
      'Accede desde cualquier dispositivo con nuestra interfaz responsive.',
  },
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-black-800">
          Características principales
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 text-center transition-shadow duration-300 bg-white rounded-lg shadow-sm hover:shadow-md"
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary dark:text-slate-900" />
              <h3 className="mb-2 text-xl font-semibold dark:text-slate-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
