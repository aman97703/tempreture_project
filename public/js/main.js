const submit_btn = document.getElementById('submit_btn');
const cityname = document.getElementById('cityname');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp_real_val');
const datahide = document.querySelector('.middle_layer');

const getInfo = async (event)=>{
    event.preventDefault();
    let cityval = cityname.value;

    if (cityval === "") {
        city_name.innerText = "Please write the name before search";
        datahide.classList.add('data_hide');

    }else{
        try {
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=27b889bebd4a32aac0bd6445f13e70e1`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            // //////////////////////////
            temp.innerHTML = arrData[0].main.temp;
            // temp_status.innerHTML = arrData[0].weather[0].main;
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            ///////////////////////////////
            // condition for check sunny or cloudy
            const tempmood = arrData[0].weather[0].main;

            if (tempmood == 'Clear') {
                temp_status.innerHTML = `<i class="fa fa-sun" style="color: #eccc68" aria-hidden="true"></i>`
            } else if (tempmood == 'Clouds') {
                temp_status.innerHTML = `<i class="fa fa-cloud" style="color: #f1f2f6" aria-hidden="true"></i>`
            } else if (tempmood == 'Rain') {
                temp_status.innerHTML = `<i class="fa fa-cloud-rain" style="color: #a4b04e" aria-hidden="true"></i>`;
            } else{
                temp_status.innerHTML = `<i class="fa fa-cloud" style="color: #f1f2f6" aria-hidden="true"></i>`;
                
            }

            datahide.classList.remove('data_hide');
        } catch (error) {
            city_name.innerText = "Please enter the city name Properly";
            datahide.classList.add('data_hide');
        }

    }
}

submit_btn.addEventListener('click',getInfo);


