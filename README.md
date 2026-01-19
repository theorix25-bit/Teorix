# Theorix - Plataforma de Educación Online

## 📋 Descripción General

Theorix es una plataforma de educación online moderna construida con **Next.js 15** y **React 19**. Ofrece un sistema completo de gestión de cursos, clases, usuarios y pagos integrado con Stripe y Vimeo. La plataforma incluye características avanzadas como autenticación, panel de administración, chat con inteligencia artificial y pagos recurrentes.

---

## 🎯 Características Principales

- ✅ **Autenticación y Autorización**: Sistema de login, registro y recuperación de contraseña con Supabase
- ✅ **Panel de Administración**: Gestión de usuarios, contenido, videos y cursos
- ✅ **Integración Vimeo**: Carga y reproducción de videos de alta calidad
- ✅ **Sistema de Pagos**: Integración con Stripe para pagos únicos y recurrentes
- ✅ **Chat Asistente IA**: Chatbot integrado para ayuda a usuarios
- ✅ **Gestión de Clases**: Organización de contenido educativo con multiples secciones
- ✅ **Blog**: Sistema de publicación de artículos y contenido
- ✅ **SEO Optimizado**: Generación automática de sitemaps
- ✅ **Temas Personalizables**: Soporte para modo claro/oscuro
- ✅ **Formularios y Validación**: Componentes reutilizables de UI
- ✅ **Analytics**: Tracking e integración con herramientas de análisis

---

## 🏗️ Estructura del Proyecto

```
Theorix/
├── app/                          # Directorio de rutas de Next.js App Router
│   ├── api/                      # Rutas API
│   │   ├── asistente/           # Endpoints del chat IA
│   │   ├── buckets/             # Gestión de buckets (almacenamiento)
│   │   ├── checkout/            # Procesamiento de pagos
│   │   ├── create-user/         # Creación de usuarios
│   │   ├── vimeo/               # Integración Vimeo
│   │   └── webhook/             # Webhooks de terceros (Stripe, Vimeo)
│   ├── auth/                     # Páginas de autenticación
│   │   ├── login/               # Página de inicio de sesión
│   │   ├── sign-up/             # Registro de usuarios
│   │   ├── forgot-password/     # Recuperación de contraseña
│   │   └── confirm/             # Confirmación de email
│   ├── admin/                    # Panel administrativo
│   │   ├── usuarios/            # Gestión de usuarios
│   │   ├── blog/                # Gestión de artículos
│   │   ├── videos/              # Gestión de videos
│   │   ├── documentos/          # Gestión de documentos
│   │   └── contenido/           # Gestión de contenido
│   ├── clases/                   # Páginas de clases
│   │   ├── contenido/           # Contenido de clases
│   │   ├── video/               # Reproductor de videos
│   │   ├── documentos/          # Acceso a documentos
│   │   └── test_dgt/            # Tests de conducción
│   ├── blog/                     # Sistema de blog
│   ├── plan/                     # Gestión de planes
│   ├── pagos/                    # Páginas de pago
│   ├── auth/                     # Autenticación
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página de inicio
├── components/                   # Componentes React reutilizables
│   ├── admin/                   # Componentes para panel admin
│   ├── ui/                      # Componentes UI (Radix UI)
│   ├── skeleton/                # Componentes skeleton/loading
│   ├── Header.tsx              # Encabezado
│   ├── Footer.tsx              # Pie de página
│   ├── HeroSection.tsx         # Sección hero principal
│   ├── ChatAssistant.tsx       # Componente chat IA
│   ├── VimeoPlayer.tsx         # Reproductor Vimeo
│   ├── PricingSection.tsx      # Sección de precios
│   ├── ButtonCheckout.tsx      # Botón de compra
│   ├── login-form.tsx          # Formulario de login
│   ├── sign-up-form.tsx        # Formulario de registro
│   └── [más componentes...]
├── lib/                          # Librerías y utilidades
│   ├── supabase/                # Configuración Supabase
│   ├── stripe/                  # Integración Stripe
│   ├── Vimeo/                   # Integración Vimeo
│   ├── correos/                 # Plantillas de email
│   ├── domain/                  # Lógica de dominio
│   └── utils.ts                 # Funciones utilitarias
├── hooks/                        # Hooks personalizados
│   ├── useUserAuth.ts           # Hook de autenticación
│   ├── useCarnetB.ts            # Hook de carnet B
│   ├── useCookieConsent.ts      # Hook de cookies
│   └── useQuizSounds.ts         # Hook de sonidos quiz
├── types/                        # Tipos TypeScript
│   ├── supaBase/                # Tipos de Supabase
│   ├── stripe/                  # Tipos de Stripe
│   ├── vimeo/                   # Tipos de Vimeo
│   └── index.ts                 # Tipos globales
├── providers/                    # Proveedores React Context
│   ├── UserProvider.tsx         # Contexto de usuario
│   └── ToasterProvider.tsx      # Proveedor de notificaciones
├── assets/                       # Recursos estáticos
├── public/                       # Archivos públicos
├── styles/                       # Estilos CSS globales
├── package.json                # Dependencias del proyecto
├── tsconfig.json               # Configuración TypeScript
├── next.config.ts              # Configuración Next.js
├── tailwind.config.ts          # Configuración Tailwind CSS
└── README.md                   # Este archivo
```

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript 5
- **UI**: React 19
- **Estilos**: Tailwind CSS 3.4
- **Componentes UI**: Radix UI
- **Iconos**: Lucide React

### Backend
- **API**: Next.js API Routes
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Almacenamiento**: Supabase Storage
- **Webhooks**: Stripe, Vimeo

### Integraciones Externas
- **Pagos**: Stripe
- **Videos**: Vimeo
- **Email**: [Sistema de correos configurado]
- **Analytics**: Clarity, Analytics

### Desarrollo
- **Linting**: ESLint 9
- **Build Tool**: Turbopack (Next.js)
- **Control de Versiones**: Git

---

## 📦 Dependencias Principales

```json
{
  "nextjs": "15.x - Framework de React",
  "react": "19.x - Librería UI",
  "typescript": "5.x - Tipado estático",
  "tailwindcss": "3.4.x - Utilidades CSS",
  "@radix-ui/*": "Componentes accesibles sin estilo",
  "@supabase/supabase-js": "Cliente Supabase",
  "stripe": "API de Stripe",
  "@vimeo/player": "Reproductor Vimeo",
  "@tiptap/react": "Editor de texto enriquecido",
  "zustand": "Gestión de estado ligera",
  "react-hot-toast": "Notificaciones toast",
  "next-themes": "Gestión de temas",
  "embla-carousel-react": "Carruseles responsive"
}
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Cuenta en Supabase
- Cuenta en Stripe
- Cuenta en Vimeo

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd Theorix
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear archivo `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pub_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Vimeo
VIMEO_ACCESS_TOKEN=your_vimeo_token
VIMEO_CLIENT_ID=your_vimeo_client_id
VIMEO_CLIENT_SECRET=your_vimeo_client_secret

# URLs
NEXT_URL_ASISTENTE=your_assistant_url
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Ejecutar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 📖 Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo con Turbopack
npm run build        # Compila el proyecto para producción
npm run start        # Inicia servidor de producción
npm run lint         # Ejecuta linter de código
npm run postbuild    # Genera sitemap después de build
```

---

## 🔐 Autenticación

El sistema de autenticación se basa en **Supabase Auth**:

### Flujos de Autenticación
- **Registro**: Crear cuenta con email/contraseña
- **Login**: Inicio de sesión con credenciales
- **OAuth**: [Si está configurado]
- **Recuperación**: Envío de enlace para recuperar contraseña
- **Confirmación**: Validación de email

### Rutas de Autenticación
- `/auth/login` - Página de inicio de sesión
- `/auth/sign-up` - Página de registro
- `/auth/forgot-password` - Recuperación de contraseña
- `/auth/confirm` - Confirmación de email
- `/auth/error` - Página de errores

---

## 💳 Sistema de Pagos (Stripe)

### Funcionalidades
- Pagos únicos
- Suscripciones recurrentes
- Recuperación de pagos fallidos
- Webhooks para actualizaciones de estado
- Devoluciones de dinero

### Rutas API
- `POST /api/checkout` - Crear sesión de pago
- `POST /api/webhook` - Procesar webhooks de Stripe

---

## 🎥 Integración Vimeo

### Funcionalidades
- Carga de videos
- Reproducción adaptativa
- Gestión de biblioteca de videos
- Estadísticas de visualización

### Rutas API
- `POST /api/vimeo/upload` - Cargar video
- `GET /api/vimeo/videos` - Obtener lista de videos

---

## 👥 Panel de Administración

Acceso: `/admin` (requiere autenticación de administrador)

### Módulos
- **Usuarios** - Gestión de cuentas y permisos
- **Blog** - Crear y editar artículos
- **Videos** - Gestionar videos de Vimeo
- **Documentos** - Subir y organizar archivos
- **Contenido** - Gestionar cursos y clases

---

## 📚 Gestión de Clases

Acceso: `/clases`

### Características
- Visualización de cursos disponibles
- Contenido organizado por módulos
- Reproductor de videos integrado
- Acceso a documentos
- Tests y cuestionarios (e.g., Test DGT)

---

## 📄 Blog

Acceso: `/blog`

### Características
- Artículos optimizados para SEO
- Categorización de contenido
- Sistema de comentarios [Si está implementado]
- Generación automática de sitemaps

---

## 🧩 Componentes Principales

### Componentes de Página
- **HeroSection** - Sección principal con llamada a la acción
- **PricingSection** - Tabla de precios y planes
- **TestimonialsSection** - Testimonios de usuarios
- **CommunitySection** - Sección de comunidad
- **MethodSection** - Presentación de metodología

### Componentes de Usuario
- **Header** - Barra de navegación
- **Footer** - Pie de página
- **MobileMenu** - Menú para dispositivos móviles
- **DesktopMenu** - Menú para escritorio

### Componentes de Formularios
- **login-form** - Formulario de inicio de sesión
- **sign-up-form** - Formulario de registro
- **forgot-password-form** - Formulario de recuperación
- **update-password-form** - Formulario de cambio de contraseña

### Componentes Funcionales
- **ChatAssistant** - Chatbot con IA
- **VimeoPlayer** - Reproductor de videos
- **VimeoPanel** - Panel de gestión de videos
- **ButtonCheckout** - Botón de compra integrado
- **CookieBanner** - Banner de consentimiento de cookies

---

## 🎨 Temas y Estilos

- **Tailwind CSS**: Utilidades de CSS para estilos responsive
- **Radix UI**: Componentes accesibles sin estilo predefinido
- **next-themes**: Soporte para tema claro/oscuro
- **tailwindcss-animate**: Animaciones personalizadas

### Personalización
Los estilos globales se encuentran en `styles/styles.css`

---

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/*` - Rutas de Supabase Auth

### Pagos
- `POST /api/checkout` - Crear sesión de pago
- `POST /api/webhook/stripe` - Procesar webhooks

### Vimeo
- `POST /api/vimeo/upload` - Cargar video
- `GET /api/vimeo/videos` - Obtener videos

### Asistente IA
- `POST /api/asistente` - Chat con inteligencia artificial

### Usuarios
- `POST /api/create-user` - Crear nuevo usuario
- `GET /api/user` - Obtener datos del usuario

### Otros
- `GET /api/buckets` - Gestión de almacenamiento

---

## 📊 Base de Datos (Supabase)

### Tablas Principales (Estructura Esperada)
- `users` - Usuarios registrados
- `courses` - Cursos disponibles
- `lessons` - Lecciones/clases
- `videos` - Metadatos de videos
- `payments` - Histórico de pagos
- `subscriptions` - Suscripciones activas
- `blog_posts` - Artículos del blog

### Autenticación
- Supabase maneja la autenticación de usuarios
- Integración con `@supabase/ssr` para SSR seguro

---

## 🔒 Variables de Entorno

### Requeridas
```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
VIMEO_ACCESS_TOKEN
NEXT_URL_ASISTENTE
```

### Opcionales
```env
NEXT_PUBLIC_APP_URL
ANALYTICS_ID
```

---

## 🧪 Testing

[Actualmente sin configuración de tests. Puede agregarse Jest o Vitest]

---

## 🔧 Solución de Problemas

### Error: "Cannot find module"
- Ejecutar `npm install` nuevamente
- Limpiar cache: `npm cache clean --force`

### Error de conexión a Supabase
- Verificar variables de entorno
- Confirmar que el proyecto Supabase está activo
- Revisar permisos de Row Level Security (RLS)

### Problemas con Vimeo
- Verificar token de acceso válido
- Confirmar límite de almacenamiento
- Revisar permisos de API

### Error en pagos Stripe
- Verificar credenciales de API
- Confirmar webhook correctamente configurado
- Revisar modo test vs. producción

---

## 📱 Responsividad

El proyecto está optimizado para todos los dispositivos:
- **Desktop**: Navegación completa
- **Tablet**: Interfaz adaptativa
- **Mobile**: Menú colapsado y componentes optimizados

---

## ♿ Accesibilidad

- Componentes Radix UI incluyen accesibilidad WCAG
- Semántica HTML correcta
- Contraste de colores adecuado
- Navegación por teclado completamente funcional

---

## 🚀 Despliegue

### Opciones de Hosting
- **Vercel**: Recomendado para Next.js (deploy automático desde Git)
- **Netlify**: Alternativa con buen soporte Next.js
- **AWS Amplify**: Para soluciones empresariales
- **Self-hosted**: Con Docker o Node.js en servidor

### Pasos para Vercel
1. Conectar repositorio en Vercel
2. Configurar variables de entorno en panel de Vercel
3. Deploy automático en cada push a rama main

---

## 📝 Convenciones de Código

- **Archivos de componentes**: Usar PascalCase (e.g., `Header.tsx`)
- **Archivos de utilidades**: Usar camelCase (e.g., `utils.ts`)
- **Variables**: Usar camelCase
- **Constantes**: Usar UPPER_SNAKE_CASE
- **Carpetas**: Usar lowercase

---

## 🤝 Contribución

[Instrucciones para colaboradores]

1. Crear rama de feature: `git checkout -b feature/nombre-feature`
2. Hacer commits descriptivos
3. Enviar pull request
4. Esperar revisión

---

## 📄 Licencia

[Especificar licencia del proyecto]

---

## 📞 Contacto y Soporte

[Información de contacto del equipo]

---

## 🗂️ Recursos Adicionales

- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación React](https://react.dev)
- [Documentación Supabase](https://supabase.com/docs)
- [Documentación Stripe](https://stripe.com/docs)
- [Documentación Vimeo API](https://developer.vimeo.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

---

**Última actualización**: 16 de enero de 2026
