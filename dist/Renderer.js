class Renderer {
    renderWeather(allCityData) {
        $("#weather").empty();
        const source = $('#weather-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ allCityData });
        $("#weather").append(newHTML)
    }
}