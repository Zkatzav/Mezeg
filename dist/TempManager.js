class TempManager {
  
  constructor() {
    this.cityData = []
  }

  async getDataFromDB() {
    let data = await $.get('/cities')
    this.cityData = data
  }
  
  ////////////////////////////////////////////////////////
  
  async getCityData(cityName) {
    let data = await $.get(`city/${cityName}`)
    this.cityData.push(data) 
    console.log(this.cityData)
  }

  ////////////////////////////////////////////////////////

  saveCity = async function(cityName) {
    let newCity = this.cityData.find(c => c.name === cityName)
    console.log(newCity)
    await $.post(`/city`, newCity)
  } 

  ////////////////////////////////////////////////////////

  removeCity = async function(cityName) {
    $.ajax({
      url: `/city/${cityName}`,
      type: 'DELETE',
      success: () => console.log(`delete ${cityName}`)
  })
  }
}
