from django.db import models


class ProgrammingLanguage(models.Model):
    name = models.CharField(max_length=256, verbose_name="Programming language name")

    def __str__(self):
        return self.name


class Operator(models.Model):
    name = models.CharField(max_length=256, verbose_name="Operator name")
    num_of_operands = models.PositiveIntegerField(verbose_name="Number of operands")
    syntax = models.CharField(max_length=256, verbose_name="Operator syntax")
    prog_lang = models.ForeignKey(
        ProgrammingLanguage,
        on_delete=models.SET_DEFAULT,
        null=True,
        default=None,
        related_name="operators"
    )
    

    def __str__(self):
        return self.name
