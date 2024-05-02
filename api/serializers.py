from rest_framework import serializers
from .models import Carrera, Usuario, TiposFormatos, Formato, ServicioSocial

class DocumentSerializer(serializers.Serializer):
    nombre = serializers.CharField(max_length=100)
    apellido = serializers.CharField(max_length=100)
    carrera = serializers.CharField(max_length=100)
    numero_control = serializers.CharField(max_length=20)
    dependencia = serializers.CharField(max_length=100)
    nombre_programa = serializers.CharField(max_length=100)
    titular = serializers.CharField(max_length=100)
    cargo = serializers.CharField(max_length=100)
    atencion_nombre = serializers.CharField(max_length=100)
    atencion_cargo = serializers.CharField(max_length=100)
    



class CarreraSerializer(serializers.ModelSerializer):
    nombre_carrera_display = serializers.SerializerMethodField()

    class Meta:
        model = Carrera
        fields = ['id', 'nombre_carrera', 'nombre_carrera_display']

    def get_nombre_carrera_display(self, obj):
        return obj.get_nombre_carrera_display()


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'password', 'tipo_usuario', 'carrera', 'servicio', 'residencia', 'ingles', 'first_name', 'last_name', 'email']
        extra_kwargs = {'password': {'write_only': True}}


class TiposFormatosSerializer(serializers.ModelSerializer):
    class Meta:
        model = TiposFormatos
        fields = '__all__'


class FormatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formato
        fields = '__all__'


class ServicioSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicioSocial
        fields = '__all__'
