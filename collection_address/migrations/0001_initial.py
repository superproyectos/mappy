# Generated by Django 2.1.3 on 2018-11-15 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CollectionAddress',
            fields=[
                ('delivery_address_id', models.AutoField(primary_key=True, serialize=False)),
                ('line1', models.CharField(max_length=35, null=True)),
                ('line2', models.CharField(max_length=35, null=True)),
                ('zipCode', models.CharField(max_length=35, null=True)),
                ('city', models.CharField(max_length=35, null=True)),
                ('country', models.CharField(max_length=35, null=True)),
            ],
        ),
    ]
