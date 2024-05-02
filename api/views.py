from rest_framework import viewsets
from .models import Carrera, Usuario, TiposFormatos, Formato, ServicioSocial
from .serializers import CarreraSerializer, UsuarioSerializer, TiposFormatosSerializer, FormatoSerializer, ServicioSocialSerializer, DocumentSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.db import DatabaseError
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from docx import Document
import io
import os
from django.http import HttpResponse
from rest_framework.views import APIView
from docx import Document
from django.conf import settings
from python_docx_replace import docx_replace  
from django.http import FileResponse



class DescargarFormatoAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, formato_id):
        try:
            formato = Formato.objects.get(pk=formato_id)
            # Construir la ruta completa al archivo
            file_path = os.path.join(settings.MEDIA_ROOT, formato.archivo.name)
            
            # Verificar si el archivo existe
            if os.path.exists(file_path):
                # Usar FileResponse para servir el archivo directamente desde el sistema de archivos
                return FileResponse(open(file_path, 'rb'), content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document', as_attachment=True, filename=formato.archivo.name)
            else:
                return Response({"error": "File not found."}, status=404)
        except Formato.DoesNotExist:
            return Response({'error': 'Formato not found.'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def formatos_por_tipo(request, tipo_formato_id):

    try:
        formatos = Formato.objects.filter(tipo_formato_id=tipo_formato_id)
        serializer = FormatoSerializer(formatos, many=True)
        return Response(serializer.data)
    except Formato.DoesNotExist:
        return Response({'error': 'No se encontraron formatos para el tipo de formato especificado.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class DocumentAPIView(APIView):
    def post(self, request):
        serializer = DocumentSerializer(data=request.data)
        if serializer.is_valid():
            try:
                doc_path = os.path.join(settings.MEDIA_ROOT, 'formatos', 'formato.docx')
                doc = Document(doc_path)
                
                # Imprimir información sobre el documento para depuración
                print(f"Document loaded with {len(doc.paragraphs)} paragraphs.")

                replacements = {
                    'nombre': serializer.validated_data['nombre'],
                    'apellido': serializer.validated_data['apellido'],
                    'numero_control': serializer.validated_data['numero_control'],
                    'carrera': serializer.validated_data['carrera'],
                    'dependencia': serializer.validated_data['dependencia'],
                    'nombre_programa': serializer.validated_data['nombre_programa'],
                    'titular': serializer.validated_data['titular'],
                    'cargo': serializer.validated_data['cargo'],
                    'atencion_nombre': serializer.validated_data['atencion_nombre'],
                    'atencion_cargo': serializer.validated_data['atencion_cargo'],
                }

                # Imprimir las claves y valores para verificar
                print("Replacements:")
                for key, value in replacements.items():
                    print(f"  {key}: {value}")

                # Llamar a docx_replace con el documento y las sustituciones
                docx_replace(doc, **replacements)

                buffer = io.BytesIO()
                doc.save(buffer)  # Guardar el documento modificado en el buffer
                buffer.seek(0)

                response = HttpResponse(buffer.getvalue(), content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
                response['Content-Disposition'] = f'attachment; filename="documento_personalizado_{serializer.validated_data["numero_control"]}.docx"'

                return response
            except Exception as e:
                print("Error al procesar el documento:", str(e))
                return Response({'error': 'Error al procesar el documento.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def cambiar_contrasena(request, user_id):
    # Asegúrate de que el usuario que hace la solicitud sea el mismo que el usuario cuya contraseña se va a cambiar o que sea un superusuario
    if request.user.id != user_id and not request.user.is_superuser:
        return Response({'error': 'No tienes permiso para realizar esta acción.'}, status=status.HTTP_403_FORBIDDEN)

    contrasena_anterior = request.data.get('contrasena_anterior')
    nueva_contrasena = request.data.get('nueva_contrasena')

    if not contrasena_anterior:
        return Response({'error': 'Falta el campo requerido: contraseña anterior.'}, status=status.HTTP_400_BAD_REQUEST)

    if not nueva_contrasena:
        return Response({'error': 'Falta el campo requerido: nueva contraseña.'}, status=status.HTTP_400_BAD_REQUEST)

    # Encuentra el usuario basándote en el ID proporcionado
    try:
        usuario = Usuario.objects.get(id=user_id)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    # Comprueba que la contraseña anterior sea correcta
    if not usuario.check_password(contrasena_anterior):
        return Response({'error': 'La contraseña anterior no es correcta.'}, status=status.HTTP_400_BAD_REQUEST)

    # Establece y guarda la nueva contraseña
    try:
        usuario.set_password(nueva_contrasena)
        usuario.save()
    except Exception as e:
        return Response({'error': 'Error al cambiar la contraseña.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({'message': 'La contraseña ha sido cambiada exitosamente.'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])  # Esto requiere que la solicitud incluya un token de autenticación válido
@permission_classes([IsAuthenticated])  # Esto requiere que la solicitud incluya un header de autorización válido
def obtener_servicio_social_por_usuario(request, user_id):
    """
    Vista para obtener el servicio social de un usuario específico por su ID.
    """
    try:
        servicio_social = ServicioSocial.objects.get(usuario__id=user_id)
    except ServicioSocial.DoesNotExist:
        return Response({'error': 'No se encontró el servicio social para el usuario especificado.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ServicioSocialSerializer(servicio_social)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def login(request):
    # Obtén el tipo de usuario y el nombre de usuario de la solicitud
    tipo_usuario = request.data.get('tipo_usuario')
    username = request.data.get('username')

    if not tipo_usuario or not username:
        return Response({'error': 'Faltan campos requeridos.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Busca un usuario con el nombre de usuario y el tipo de usuario dados
        usuario = Usuario.objects.get(username=username, tipo_usuario=tipo_usuario)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
    except DjangoValidationError:
        return Response({'error': 'Datos de entrada inválidos.'}, status=status.HTTP_400_BAD_REQUEST)
    except DatabaseError:
        return Response({'error': 'Problema al acceder a la base de datos.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Verifica la contraseña
    if not usuario.check_password(request.data.get('password')):
        return Response({'error': 'Contraseña inválida.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Crea o obtiene un token para el usuario
        token, created = Token.objects.get_or_create(user=usuario)
    except DatabaseError:
        return Response({'error': 'Problema al crear o recuperar el token del usuario.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Serializa los datos del usuario
    try:
        serializer = UsuarioSerializer(instance=usuario)
    except ValidationError as e:
        return Response({'error': 'Error al serializar los datos del usuario.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Devuelve el token y los datos del usuario serializados
    return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data['password'])
        user.save()

        token, created = Token.objects.get_or_create(user=user)
        # Es importante no devolver la contraseña, incluso si está hasheada.
        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def profile(request):
    return Response({})


class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class TiposFormatosViewSet(viewsets.ModelViewSet):
    queryset = TiposFormatos.objects.all()
    serializer_class = TiposFormatosSerializer

class FormatoViewSet(viewsets.ModelViewSet):
    queryset = Formato.objects.all()
    serializer_class = FormatoSerializer

class ServicioSocialViewSet(viewsets.ModelViewSet):
    queryset = ServicioSocial.objects.all()
    serializer_class = ServicioSocialSerializer
