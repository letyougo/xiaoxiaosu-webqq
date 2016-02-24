"""mySite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from settings import MEDIA_ROOT, MEDIA_URL


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^home/','chat.views.home'),
    url(r'^send_message/','chat.views.send_message'),
    url(r'^get_message/$','chat.views.get_message'),
    url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'login.html'}),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'template_name': 'logout.html'}),

    url(r'^get_member','chat.views.get_member'),
    url(r'^get_group','chat.views.get_group'),
    url(r'^send_add','chat.views.send_add')
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(MEDIA_URL,document_root=MEDIA_ROOT)