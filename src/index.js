import './css/styles.css';

import Notiflix from 'notiflix';
import { fetchCountries } from "../src/fetchCountries"


const debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;


const enter = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list');
countryList.style.listStyle = "none"
const countryInfo = document.querySelector('.country-info');


enter.addEventListener('input', debounce((e) => {
    const value = e.target.value.trim();
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";

        
        fetchCountries(value).then(array => {
            if (array.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
            else if (array.length > 1 && array.length <= 10) {
                console.log(array)
                const template = array.map(arr => `<li> <img src="${arr.flags.svg}" class="country-flag"/> 
                <span class="country-name">${arr.name}</span> </li>`).join('')
                               
                countryList.innerHTML = template; 
                const countryFlags = document.querySelectorAll('.country-flag');
                const countryNames = document.querySelectorAll('.country-name');

                

            
            for (const flag of countryFlags) {
  
                flag.style.width = "40px";
                flag.style.height = "40px";
                
                }  
                
                for (const countryName of countryNames) {
  
                countryName.style.fontSize = "40px";
                countryName.style.color = "green"; 
                };          
}                
    else {
                const data = array[0].languages;                 
                const lang = data.map((el) => el.name).join(', ')             
                
                const template = `<p> <img src="${array[0].flags.svg}" class="country-flag"/> 
                <span class="country-name">${array[0].name}</span> </p> 
                <p> <span style=font-weight:bold>Capital:</span> ${array[0].capital} </p>
                <p> <span style=font-weight:bold>Population:</span> ${array[0].population} </p>
                <p> <span style=font-weight:bold>Languages:</span> ${lang} </p>`       
                
                countryInfo.innerHTML = template;
                const countryFlag = document.querySelector('.country-flag');
                const countryName = document.querySelector('.country-name');
                countryName.style.fontSize = "40px";
                countryName.style.color = "green"; 
                countryFlag.style.width = "40px"
                countryFlag.style.height = "40px"
    }          

        }
    )
    
}, DEBOUNCE_DELAY));
