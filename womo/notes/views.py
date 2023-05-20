from django.shortcuts import render



def notes_view(request):
    return render(request, 'note_page.html')