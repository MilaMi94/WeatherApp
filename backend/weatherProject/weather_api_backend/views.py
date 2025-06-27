from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import urllib.request
import json
from django.conf import settings

@api_view(["POST"])
def get_weather(request):
    city = request.data.get("city")
    if not city:
        return Response({"error": "City is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        api_key = "932fd46af8c61c49610a47c9438e66d0"  # Move to settings later
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
        source = urllib.request.urlopen(url).read()
        list_of_data = json.loads(source)

        data = {
            "country_code": list_of_data['sys']['country'],
            "coordinate": f"{list_of_data['coord']['lon']}, {list_of_data['coord']['lat']}",
            "temp": f"{list_of_data['main']['temp']} °C",
            "pressure": list_of_data['main']['pressure'],
            "humidity": list_of_data['main']['humidity'],
            "main": list_of_data['weather'][0]['main'],
            "description": list_of_data['weather'][0]['description'],
            "icon": list_of_data['weather'][0]['icon'],
        }

        return Response(data)
    
    except Exception as e:
        print("Weather API error:", e)
        return Response({"error": "Weather fetch failed."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)