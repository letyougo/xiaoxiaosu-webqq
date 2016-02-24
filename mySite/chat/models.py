from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
# Create your models here.

from django.contrib.auth.models import User


class Member(models.Model):
    user = models.OneToOneField(User)
    logo = models.ImageField(upload_to='upload_img',null=True,blank=True,default='upload_img/logo1.jpg')
    intro = models.CharField(max_length=64,null=True,blank=True)
    friend = models.ManyToManyField("self",blank=True,null=True)

    def __unicode__(self):
        return self.user.username

    def to_obj(self):
        return dict(
            name = self.user.username,
            logo = self.logo.url,
            id = self.id
        )

class Group(models.Model):
    name = models.CharField(max_length=64)
    creator = models.ForeignKey(Member,related_name="group_creator")
    admin = models.ManyToManyField(Member,related_name="group_admin")
    members = models.ManyToManyField(Member,related_name='group_members')

    def __unicode__(self):
        return self.name

    def to_obj(self):
        return dict(
            name = self.name,
            id = self.id,
        )

