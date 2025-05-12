# Attendance Application - Kubernetes Configuration

## Configuration Files Created
- `deployment.yaml`: Deployments for frontend, backend, and MongoDB
- `service.yaml`: Services for frontend, backend, and MongoDB
- `nginx-configmap.yaml`: Custom Nginx configuration for API proxying
- `localhost-service.yaml`: DNS redirection for localhost calls

## Important Note for Future Deployment
When deploying the application, the frontend uses hardcoded references to `http://localhost:5000/api/` endpoints. To make this work in Kubernetes, we will need to:

1. Apply all configuration files
2. Update the frontend to use the custom Nginx configuration
3. Set up port-forwarding with: `kubectl port-forward deployment/backend 5000:5000`

These steps will be performed in a future phase. The current phase only involves creating the configuration files.