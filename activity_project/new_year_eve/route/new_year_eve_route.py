# -*- coding: utf-8 -*-
from django.shortcuts import render
from uuid import uuid1
from .qiniu_route import getToken

def eve(request):
	# template = get_template('activity/index.html')
	qn_tk = getToken()
	return render(request,'new_year_eve.html',{'qn_tk':str(qn_tk)})

def save_img(request):
	return render(request,'save_img.html')

