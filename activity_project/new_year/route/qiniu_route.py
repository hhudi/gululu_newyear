# -*- coding: utf-8 -*-

from qiniu import Auth
from qiniu import Auth, put_file, etag, urlsafe_base64_encode

access_key = 'h96cCMza4WRb1l616jNsNvV-3KazDU3yoUP3xjst'
secret_key = 'Ss0Jl6b58DiVPIxmuNGR3nmtwjFtfy6q6wQ0uiVV'
bucket_name = 'activity-new-year'
domain = 'p2l96yk6l.bkt.clouddn.com'

def getToken():
    q = Auth(access_key, secret_key)
    token = q.upload_token(bucket_name)
    return token


