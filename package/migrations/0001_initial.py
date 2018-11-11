# Generated by Django 2.1.3 on 2018-11-11 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Package',
            fields=[
                ('package_id', models.AutoField(primary_key=True, serialize=False)),
                ('weight', models.DecimalField(decimal_places=12, max_digits=20, null=True)),
                ('description', models.CharField(max_length=35, null=True)),
            ],
        ),
    ]
