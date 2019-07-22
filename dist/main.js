const tempManager = new TempManager()
const render = new Renderer()

const loadPage = async function(){
  await tempManager.getDataFromDB()
  render.renderData(tempManager.cityData)
}

loadPage()

const handleSearch  = async function(){
  let cityName = $('input').val()
  cityName ? await tempManager.getCityData(cityName) : console.log('no city enter')  
  render.renderData(tempManager.cityData) 
}

$('#weather-container').on("click", '.add', async function(){
  console.log(tempManager.cityData)
  let cityName = $(this).closest(".city").find(".name").text()
  console.log(cityName)
  await tempManager.saveCity(cityName)
})

$('#weather-container').on("click", '.delete', function(){
  let cityName = $(this).closest(".city").find(".name").text()
  tempManager.removeCity(cityName)
  loadPage()
})