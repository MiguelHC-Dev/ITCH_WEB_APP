"""
URL configuration for django_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import re_path, path, include
from rest_framework.routers import DefaultRouter
from rest_framework.documentation import include_docs_urls
from api import views
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'carrera', views.CarreraViewSet)
router.register(r'usuario', views.UsuarioViewSet)
router.register(r'tiposformatos', views.TiposFormatosViewSet)
router.register(r'formato', views.FormatoViewSet)
router.register(r'serviciosocial', views.ServicioSocialViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('servicio-social/usuario/<int:user_id>/', views.obtener_servicio_social_por_usuario, name='obtener_servicio_social_por_usuario'),
    path('cambiar-contrasena/<int:user_id>/', views.cambiar_contrasena, name='cambiar_contrasena'),
    re_path('login', views.login),
    re_path('register', views.register),
    re_path('profile', views.profile),
    path('api/document/', views.DocumentAPIView.as_view(), name='create_document'),
    path('formatosPorTipo/<int:tipo_formato_id>/', views.formatos_por_tipo, name='formatos-por-tipo'),
    path('descargar-formato/<int:formato_id>/', views.DescargarFormatoAPIView.as_view(), name='descargar-formato'),



    path('docs/', include_docs_urls(title="API Sistema Servicio"))
    
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)