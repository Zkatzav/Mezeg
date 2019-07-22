class Renderer {
  
  renderData(allCityData){
    $("#weather-container").empty()

    const source = $("#weather-template").html() 
    const template = Handlebars.compile(source)
    const citiesData = template({allCityData})
    $("#weather-container").append(citiesData)
  }
} 