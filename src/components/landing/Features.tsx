import { Leaf, BarChart2, Cloud } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: "Seguimiento de cultivos",
    description: "Registra y monitorea el progreso de tus cultivos en tiempo real."
  },
  {
    icon: BarChart2,
    title: "Análisis de datos",
    description: "Obtén insights valiosos con nuestras herramientas de análisis avanzado."
  },
  {
    icon: Cloud,
    title: "Almacenamiento en la nube",
    description: "Accede a tu información desde cualquier lugar y en cualquier momento."
  }
]

export default function Features() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-green-800">
          Características principales
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

