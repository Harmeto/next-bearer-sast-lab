# 🔍 Bearer CLI Lab

Un laboratorio interactivo para aprender análisis de seguridad estático (SAST) con Bearer CLI. Diseñado para desarrolladores que quieren escribir código más seguro.

## 🚀 Características

- **Tutorial Interactivo**: Aprende paso a paso cómo usar Bearer CLI
- **Scanner de Repositorios**: Escanea repositorios de GitHub en tiempo real
- **Comparación con SonarQube**: Análisis detallado de herramientas de seguridad
- **Integración CI/CD**: Configuraciones para GitHub Actions, GitLab CI, Azure DevOps y Jenkins
- **Troubleshooting**: Soluciones a problemas comunes de instalación y uso

## 🛠️ Tecnologías

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Bearer CLI** para análisis de seguridad
- **WSL** para compatibilidad con Windows

## 📋 Requisitos

- Node.js 18+ 
- Git
- Bearer CLI (instalado via WSL en Windows)
- WSL Ubuntu (para Windows)

## 🚀 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Harmeto/next-bearer-sast-lab.git
   cd next-bearer-sast-lab
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Instala Bearer CLI (en WSL):**
   ```bash
   wsl bash -c "curl -fsSL https://bearer.com/install.sh | sh"
   ```

4. **Ejecuta el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abre [http://localhost:3000](http://localhost:3000) en tu navegador**

## 🔧 Uso

### Scanner Local
- Ve a la sección "Scanner" en la aplicación
- Ingresa la URL de un repositorio de GitHub
- Selecciona la rama a escanear
- Haz clic en "Iniciar Escaneo"
- Descarga o visualiza el reporte HTML generado

### Tutorial Interactivo
- Navega a la sección "Tutorial"
- Sigue los pasos guiados para aprender Bearer CLI
- Incluye instalación, configuración, ejecución e interpretación de resultados

### Comparación con SonarQube
- Explora la sección "Comparación" para entender las diferencias
- Encuentra recomendaciones específicas para tu organización
- Decide si usar Bearer CLI, SonarQube, o ambos

## 🌐 Despliegue

### GitHub Pages
El proyecto está configurado para desplegarse automáticamente en GitHub Pages:

1. **Habilita GitHub Pages** en la configuración del repositorio:
   - Ve a Settings → Pages
   - En "Source" selecciona "GitHub Actions"
   - Guarda los cambios

2. **El despliegue es automático** con cada push a la rama `main`

3. **URL del sitio**: https://harmeto.github.io/next-bearer-sast-lab/

**Nota**: En GitHub Pages, el scanner funciona en modo simulación ya que Bearer CLI no está disponible en el entorno de GitHub Pages. Para escaneo real, ejecuta el proyecto localmente.

### Vercel
```bash
npm run build
npx vercel --prod
```

### Netlify
```bash
npm run build
npm run export
# Sube la carpeta 'out' a Netlify
```

## 📁 Estructura del Proyecto

```
next-bearer-sast-lab/
├── app/
│   ├── api/scan/          # API endpoint para escaneo
│   ├── components/        # Componentes React reutilizables
│   ├── comparison/        # Página de comparación con SonarQube
│   ├── docs/             # Documentación
│   ├── scanner/          # Página del scanner
│   ├── tutorial/         # Tutorial interactivo
│   └── troubleshooting/  # Soluciones a problemas
├── docs/                 # Documentación en Markdown
├── scripts/              # Scripts de Node.js para Bearer CLI
└── public/               # Archivos estáticos
```

## 🔒 Seguridad

Este proyecto está diseñado para:
- **Escanear repositorios públicos** de GitHub
- **No almacenar código** de terceros
- **Generar reportes temporales** que se eliminan después del escaneo
- **Usar Bearer CLI** de forma segura via WSL

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📚 Recursos Adicionales

- [Documentación Oficial de Bearer CLI](https://docs.bearer.com/)
- [Repositorio de Bearer CLI](https://github.com/bearer/bearer)
- [Comunidad Discord](https://discord.gg/eaHZBJUXRF)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [Bearer](https://bearer.com/) por la herramienta CLI
- [Next.js](https://nextjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por los estilos
- La comunidad de desarrolladores por el feedback y contribuciones

---

**Desarrollado con ❤️ para la comunidad de seguridad**