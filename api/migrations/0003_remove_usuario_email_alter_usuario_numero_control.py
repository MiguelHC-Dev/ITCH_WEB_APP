# Generated by Django 5.0.3 on 2024-03-28 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_serviciosocial_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='email',
        ),
        migrations.AlterField(
            model_name='usuario',
            name='numero_control',
            field=models.CharField(help_text='Número de control para estudiantes o nombre de usuario para personal.', max_length=50, unique=True),
        ),
    ]