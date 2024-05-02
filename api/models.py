from django.contrib.auth.models import AbstractUser
from django.db import models
import os


class Carrera(models.Model):
    INGENIERIA_SISTEMAS = 'ISC'
    CONTADOR_PUBLICO = 'CP'
    INGENIERIA_GESTION = 'IGE'
    INGENIERIA_INFORMATICA = 'II'
    INGENIERIA_CIVIL = 'IC'
    
    CARRERA_CHOICES = [
        (INGENIERIA_SISTEMAS, 'Ingeniería en Sistemas Computacionales'),
        (CONTADOR_PUBLICO, 'Contador Público'),
        (INGENIERIA_GESTION, 'Ingeniería en Gestión Empresarial'),
        (INGENIERIA_INFORMATICA, 'Ingeniería Informática'),
        (INGENIERIA_CIVIL, 'Ingeniería Civil'),
        # Agrega más opciones de carreras aquí si es necesario
    ]
    
    nombre_carrera = models.CharField(
        max_length=50, 
        choices=CARRERA_CHOICES,
        default=INGENIERIA_SISTEMAS,  # Puedes establecer una opción por defecto si lo deseas
    )

    def __str__(self):
        # El método __str__ ahora puede devolver la descripción legible del choice.
        return self.get_nombre_carrera_display()

    
class Usuario(AbstractUser):
    ESTUDIANTE = 'Estudiante'
    PERSONAL = 'Personal'
    TIPO_USUARIO_CHOICES = [
        (ESTUDIANTE, 'Estudiante'),
        (PERSONAL, 'Personal'),
    ]
    tipo_usuario = models.CharField(max_length=50, choices=TIPO_USUARIO_CHOICES, null=True, blank=True)
    carrera = models.ForeignKey(Carrera, on_delete=models.SET_NULL, null=True, blank=True)
    servicio = models.BooleanField(default=False)
    residencia = models.BooleanField(default=False)
    ingles = models.BooleanField(default=False)

    # Puedes quitar el campo 'nombre' porque AbstractUser ya incluye 'first_name' y 'last_name'
    # Puedes quitar el campo 'username' porque AbstractUser también lo incluye
    # No es necesario el campo 'contraseña' porque AbstractUser incluye el campo 'password'
    # No es necesario el campo 'email' si no lo estás personalizando, ya que AbstractUser también lo incluye

    def __str__(self):
        return f"{self.username} - {self.get_full_name()}"
    
    

class TiposFormatos(models.Model):
    nombre_formato = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre_formato
    
    class Meta:
        verbose_name_plural = "Tipos de Formatos"

class Formato(models.Model):
    nombre_formato = models.CharField(max_length=255)
    archivo = models.FileField(upload_to='formatos/', null=True, blank=True)
    fecha_creacion = models.DateTimeField()
    tipo_formato = models.ForeignKey(TiposFormatos, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_formato

    def delete(self, *args, **kwargs):
        # Comprueba si el archivo existe en el sistema de archivos y elimínalo si es así
        if self.archivo and hasattr(self.archivo, 'path'):
            if os.path.isfile(self.archivo.path):
                try:
                    self.archivo.delete(save=False)
                except Exception as e:
                    # Aquí podrías loggear el error si lo deseas
                    print(f"Error al eliminar el archivo: {e}")
        # Llamar al método delete() de la superclase para eliminar el registro de la base de datos
        super().delete(*args, **kwargs)

class ServicioSocial(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, unique=True)  # Cambio aplicado aquí
    nombre_programa = models.CharField(max_length=255)
    area = models.CharField(max_length=255)
    dependencia_organizacion = models.CharField(max_length=255)
    titular_organizacion = models.CharField(max_length=255)
    cargo_titular = models.CharField(max_length=255)
    atencion_a_nombre = models.CharField(max_length=255, null=True, blank=True)
    atencion_a_cargo = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.usuario.get_full_name()} - {self.nombre_programa}"  # Asegúrate de que `nombre` sea el campo correcto en Usuario

    class Meta:
        verbose_name_plural = "Servicio Social"
