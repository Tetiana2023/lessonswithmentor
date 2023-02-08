const form = document.querySelector("form");
const ulEl = document.querySelector(".js-list")
let city = '';

form.addEventListener("submit", getWeather);

function getWeather(e) {
  e.preventDefault();
  const input = e.currentTarget.elements.city.value;
  console.log(input);
  const select = e.currentTarget.elements.days.value;
  console.log(select);

  getFetch(input, select).then((value)=> {
    console.log('getFetch--> value', value);
    render(value.forecast.forecastday)
  })
}
function getFetch(city, days) {
  return fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=48cb2a8d61c54182a7c120347230702&q=${city}&days=${days}`
  ).then((res) => { 
    if (!res.ok){
        throw new Error(res.statusText);
    }
    return res.json()});
}
function render(array){
  const markup = array.map(({date, day:{avgtemp_c, condition: {icon}}}) => {
       return `
       <li>         
           <p>${date}</p>
           <p>${avgtemp_c}</p>
           <img src="${icon}" alt=""></img>
       </li>`
    }).join('');
    ulEl.innerHTML = markup;

}