from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _

from .models import User,Guest


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {'fields': ('email', 'password', 'used_promo')}),
        (_('Personal info'), {'fields': ('name', 'country',
                                         'city', 'post_code', 'phone', 'passport',
                                         'address', 'comment', 'is_allow_email')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'phone'),
        }),
    )
    list_display = ('email', 'name', 'phone')

    ordering = ('email',)
    search_fields = ('email', 'name', 'phone')

class GuestAdmin(admin.ModelAdmin):
    list_display = ['email']
    #list_display = [field.name for field in Item._meta.fields]

    search_fields = ('name_lower', 'article')

    exclude = ['family','otchestvo'] #не отображать на сранице редактирования
    class Meta:
        model = Guest


admin.site.register(Guest,GuestAdmin)