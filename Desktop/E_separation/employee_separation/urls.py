from django.urls import include, path 
from rest_framework.routers import DefaultRouter
from .views import BankMasterViewSet,PartyMasterViewSet,PlantMasterViewSet,LCDocumentTypeMasterViewSet, app_status


router = DefaultRouter()
router.register(r'bank-master', BankMasterViewSet)
router.register(r'party-master', PartyMasterViewSet)
router.register(r'plant-master', PlantMasterViewSet)
router.register(r'lc-document-type', LCDocumentTypeMasterViewSet)

urlpatterns = [
    path('app-status/', app_status, name='app-status'),
    path('', include(router.urls)),
]