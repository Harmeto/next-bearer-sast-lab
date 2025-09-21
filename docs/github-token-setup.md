# Configuración del Token de GitHub

Para que el scanner funcione en GitHub Pages, necesitas configurar un token de GitHub con los permisos necesarios.

## 1. Crear un Personal Access Token

1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Haz clic en "Generate new token (classic)"
3. Configura los siguientes permisos:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
4. Copia el token generado

## 2. Configurar el Token en el Repositorio

1. Ve a tu repositorio en GitHub
2. Ve a Settings → Secrets and variables → Actions
3. Haz clic en "New repository secret"
4. Nombre: `GITHUB_TOKEN`
5. Valor: pega el token que copiaste
6. Haz clic en "Add secret"

## 3. Verificar la Configuración

Una vez configurado el token, el scanner en GitHub Pages podrá:
- Ejecutar escaneos reales via GitHub Actions
- Generar reportes de seguridad
- Guardar los resultados en el repositorio

## 4. Uso del Scanner

1. Ve a la página del scanner en GitHub Pages
2. Ingresa la URL del repositorio a escanear
3. Haz clic en "Iniciar Escaneo en la Nube"
4. El escaneo se ejecutará en GitHub Actions
5. Puedes seguir el progreso en la pestaña "Actions"
6. El reporte estará disponible una vez completado

## Notas Importantes

- El token debe tener permisos de repositorio para funcionar
- Los escaneos pueden tomar 2-5 minutos en completarse
- Los reportes se guardan en el repositorio para descarga
- Solo funciona con repositorios públicos de GitHub
