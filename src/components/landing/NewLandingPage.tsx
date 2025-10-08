import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart3,
  Cloud,
  Leaf,
  Package,
  Shield,
  Smartphone,
  Sprout,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

export default function NewLandingPage() {
  const RedirectToVideoDemo = () => {
    window.open('https://youtu.be/UXXsp_PqsHo', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <div className="flex items-center gap-2">
            <Sprout className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold text-foreground">CropCo</span>
          </div>
          {/* <Link to="/management" target="_blank">
            <Button variant="outline">Administración</Button>
          </Link> */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 md:py-32">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 text-white bg-emerald-600 hover:bg-emerald-700">
              Tecnología Agrícola de Vanguardia
            </Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl text-foreground text-balance">
              Administra tus cultivos con CropCo
            </h1>
            <p className="mb-8 text-xl leading-relaxed md:text-2xl text-muted-foreground text-pretty">
              La solución integral para gestionar la información de tus cultivos
              agrícolas de manera eficiente y efectiva. Toma decisiones basadas
              en datos en tiempo real y optimiza tu producción.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {/* <Button
                size="lg"
                className="text-white bg-emerald-600 hover:bg-emerald-700"
              >
                Solicitar Demo Gratuita
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button> */}
              <Button
                size="lg"
                variant="outline"
                type="button"
                onClick={RedirectToVideoDemo}
              >
                Ver Video Demostrativo
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              ✓ Sin tarjeta de crédito requerida ✓ Configuración en minutos ✓
              Soporte en español
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 bg-background" id="features">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-foreground">
              Características principales
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Todo lo que necesitas para gestionar tu operación agrícola en una
              sola plataforma
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <Card className="transition-colors border-2 hover:border-emerald-600">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-emerald-100 dark:bg-emerald-900/20">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  Seguimiento de Cultivos
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Registra y monitorea el progreso de tus cultivos en tiempo
                  real con visualización instantánea del estado de cada parcela.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="transition-colors border-2 hover:border-emerald-600">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  Control de Inventario
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Gestiona eficientemente tus insumos y recursos agrícolas con
                  control de stock automático y trazabilidad completa.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="transition-colors border-2 hover:border-emerald-600">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-purple-100 rounded-lg dark:bg-purple-900/20">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  Gestión de Personal
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Administra tu equipo y asigna tareas de manera eficiente con
                  seguimiento de actividades, control de asistencia y gestión de
                  nómina integrada.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="transition-colors border-2 hover:border-emerald-600">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-orange-100 rounded-lg dark:bg-orange-900/20">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  Análisis Financiero
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Monitorea ventas, compras y gastos de tu operación agrícola
                  con reportes detallados, proyecciones y análisis de
                  rentabilidad por cultivo.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="transition-colors border-2 hover:border-emerald-600">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-teal-100 rounded-lg dark:bg-teal-900/20">
                  <BarChart3 className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  Dashboard Interactivo
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Visualiza métricas y KPIs importantes para la toma de
                  decisiones con gráficos personalizables y reportes exportables
                  en múltiples formatos.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="transition-colors border-2 hover:border-emerald-600">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sky-100 dark:bg-sky-900/20">
                  <Cloud className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  Almacenamiento en la Nube
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Accede a tu información desde cualquier lugar y en cualquier
                  momento con sincronización automática, backups seguros y
                  protección de datos.
                </p>
              </CardContent>
            </Card>

            {/* Feature 7 */}
            {/* <Card className="transition-colors border-2 hover:border-emerald-600">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-rose-100 dark:bg-rose-900/20">
                  <Clock className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  Monitoreo en Tiempo Real (Proximamente)
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Seguimiento instantáneo de todas tus operaciones agrícolas con
                  notificaciones push, alertas críticas y actualizaciones
                  automáticas.
                </p>
              </CardContent>
            </Card> */}

            {/* Feature 8 */}
            <Card className="transition-colors border-2 hover:border-emerald-600">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-100 rounded-lg dark:bg-indigo-900/20">
                  <Smartphone className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  Acceso Multiplataforma
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Accede desde cualquier dispositivo con nuestra interfaz
                  responsiva optimizada para móviles, tablets y computadoras de
                  escritorio.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-foreground">
              ¿Por qué elegir CropCo?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Ventajas competitivas que nos diferencian en el mercado
            </p>
          </div>

          <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/20">
                <Sprout className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                Diseñado por Agricultores
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                Desarrollado con y para agricultores, entendemos tus necesidades
                reales porque hemos trabajado en el campo.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full dark:bg-blue-900/20">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                Seguridad Garantizada
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                Tus datos están protegidos con encriptación y backups
                automáticos diarios.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full dark:bg-purple-900/20">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                Fácil de Usar
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                Interfaz intuitiva que no requiere capacitación técnica.
                Comienza a usarlo en minutos, no en días.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      {/* <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-foreground">
              Casos de éxito
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Descubre cómo CropCo resuelve problemas reales en diferentes
              contextos agrícolas
            </p>
          </div>

          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/20">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      Optimización del Riego
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      Reduce el consumo de agua hasta un 30% con monitoreo
                      inteligente y alertas automáticas para cultivos de alto
                      valor.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      Gestión de Personal en Cosecha
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      Coordina equipos de hasta 50 personas con asignación de
                      tareas en tiempo real y control de productividad.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg dark:bg-purple-900/20">
                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      Control de Plagas y Enfermedades
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      Detecta problemas tempranamente con registros fotográficos
                      y recomendaciones de tratamiento basadas en datos
                      históricos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg dark:bg-orange-900/20">
                    <CheckCircle2 className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      Trazabilidad para Mercados Premium
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      Documenta cada etapa del proceso productivo para acceder a
                      certificaciones y mercados de exportación.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Stats Section */}
      <section className="py-20 text-white bg-emerald-600">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 text-4xl font-bold md:text-5xl">40%</div>
              <div className="text-emerald-100">Aumento en Productividad</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold md:text-5xl">30%</div>
              <div className="text-emerald-100">Reducción de Costos</div>
            </div>
            {/* <div>
              <div className="mb-2 text-4xl font-bold md:text-5xl">500+</div>
              <div className="text-emerald-100">Agricultores Satisfechos</div>
            </div> */}
            <div>
              <div className="mb-2 text-4xl font-bold md:text-5xl">24/7</div>
              <div className="text-emerald-100">Soporte Técnico</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl text-foreground">
              Comienza a optimizar tu producción hoy
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Únete a cientos de agricultores que ya están transformando sus
              operaciones con CropCo. Prueba gratis durante 30 días, sin
              compromiso.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="text-white bg-emerald-600 hover:bg-emerald-700"
              >
                Comenzar Prueba Gratuita
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Hablar con un Experto
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              ¿Tienes preguntas? Contáctanos en{' '}
              <a
                href="mailto:info@cropco.com"
                className="text-emerald-600 hover:underline"
              >
                info@cropco.com
              </a>
            </p>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sprout className="w-6 h-6 text-emerald-600" />
                <span className="text-xl font-bold text-foreground">
                  CropCo
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                La plataforma integral para la gestión agrícola moderna.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-emerald-600">
                    Características
                  </a>
                </li>
                {/* <li>
                  <a href="#" className="hover:text-emerald-600">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    Casos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    Integraciones
                  </a>
                </li> */}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://docs.cropco.org"
                    target="_blank"
                    className="hover:text-emerald-600"
                  >
                    Documentación
                  </a>
                </li>
                {/* <li>
                  <a href="#" className="hover:text-emerald-600">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    Tutoriales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    Soporte
                  </a>
                </li> */}
              </ul>
            </div>
            {/* <div>
              <h4 className="mb-4 font-semibold text-foreground">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    Términos
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
          {/* <div className="pt-8 mt-8 text-sm text-center border-t border-border text-muted-foreground">
            <p>&copy; 2025 CropCo. Todos los derechos reservados.</p>
          </div> */}
        </div>
      </footer>
    </div>
  );
}
