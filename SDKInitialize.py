from zcrmsdk.src.com.zoho.crm.api.user_signature import UserSignature
from zcrmsdk.src.com.zoho.crm.api.dc import USDataCenter, INDataCenter
from zcrmsdk.src.com.zoho.api.authenticator.store import DBStore, FileStore
from zcrmsdk.src.com.zoho.api.logger import Logger
from zcrmsdk.src.com.zoho.crm.api.initializer import Initializer
from zcrmsdk.src.com.zoho.api.authenticator.oauth_token import OAuthToken,TokenType
from zcrmsdk.src.com.zoho.crm.api.sdk_config import SDKConfig
import os
from dotenv import load_dotenv

load_dotenv()

# Access the variables
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
redirect_url = os.getenv("REDIRECT_URL")
refresh_token = os.getenv("REFRESH_TOKEN")
user_email = os.getenv("USER_EMAIL")
print(redirect_url)
class SDKInitializer(object):

    @staticmethod
    def initialize():
        # Create an UserSignature instance that takes user Email as parameter
        user = UserSignature(email=user_email)
        environment = INDataCenter.PRODUCTION()
        # token = OAuthToken(client_id=client_id, client_secret=client_secret, grant_token='grant_token', refresh_token="refresh_token", redirect_url='redirectURL', id="id")
        try:
            token = OAuthToken(client_id=client_id, client_secret=client_secret, redirect_url="https://www.google.com",refresh_token=refresh_token)
        except TypeError:
            # Different lib version 
            token = OAuthToken(client_id=client_id, client_secret=client_secret, redirect_url="https://www.google.com",token=refresh_token,token_type=TokenType.REFRESH)
        store = FileStore(file_path='./python_sdk_tokens.txt')
        try:
            config = SDKConfig(auto_refresh_fields=True, pick_list_validation=False, connect_timeout=None, read_timeout=None)
        except TypeError:
            # Different lib version 
            config = SDKConfig(auto_refresh_fields=True, pick_list_validation=False)
        
        resource_path = r'./'
        Initializer.initialize(user=user, environment=environment, token=token, store=store, sdk_config=config, resource_path=resource_path)


# SDKInitializer.initialize()