# -*- coding: utf-8 -*-
from django.shortcuts import render
from uuid import uuid1
from .qiniu_route import getToken

def activity(request):
	# template = get_template('activity/index.html')
	qn_tk = getToken()
	return render(request,'index.html',{'qn_tk':str(qn_tk)})

