# Generated by Django 2.1.3 on 2018-12-21 00:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collection_address', '0003_auto_20181206_1903'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collectionaddress',
            name='line2',
            field=models.CharField(blank=True, max_length=35, null=True),
        ),
    ]