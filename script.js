const API_LINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0d6116e95246dc97d468c2a1b5b45ce5&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=0d6116e95246dc97d468c2a1b5b45ce5&query=";
const GET_DESC = "https://api.themoviedb.org/3/movie/";
const request_DESC = "?api_key=0d6116e95246dc97d468c2a1b5b45ce5&append_to_response=watch/providers,credits";

const main = document.getElementById("section");
const form = document.getElementById("search-form");
const query = document.getElementById("query");
const loadResults = document.getElementById("load-results");

//loadScreen();
returnMovies(API_LINK);

// On clicking `Search Movies` the page should sort by popularity again

const Logo = document.getElementById("movies-site");
Logo.addEventListener('click', function(event){
    loadScreen(); // Remove the previous results in the section
    returnMovies(API_LINK);
});

const currentPage = 0;
/**
 * Gets the movies objects from the url and creates a card for each of 
 * the films and displays
 * @param {*} url - api link to get the movies list
 */
function returnMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data){
         console.log(data.results);
         data.results.forEach(element => {
             // Create HTML elements and set their attributes 
             if(element!==null){
                const div_card = document.createElement('div');
                div_card.setAttribute('class','card');
                div_card.setAttribute('movie-id',element.id);
                
                const div_row = document.createElement('div');
                div_row.setAttribute('class','row');
                
                const div_column = document.createElement('div');
                div_column.setAttribute('class','column');
                
                const image = document.createElement('img');
                image.setAttribute('id','image');
                image.setAttribute('class','thumbnail');
                image.setAttribute('movie-id',element.id);
                
                const title = document.createElement('h3');
                title.setAttribute('class','title');
                title.setAttribute('movie-id',element.id);
                const center = document.createElement('center');
                
                // Setting the movie title and poster and creating the required html structure for them
                title.innerHTML = `${element.title}`;
                image.src = IMG_PATH + element.poster_path;
                //image.setAttribute('src',IMG_PATH+element.poster_path);
                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);
                
                main.appendChild(div_row); // Appends the newly created movie_card to the section element in HTML.
             }
            });
        });
        
    }
    
    // Event Listener for form. So we can call returnMovies function whenever the search form is submitted
    form.addEventListener("submit", (e)=> {
        e.preventDefault();
        main.innerHTML = ''; // Remove the previous results in the section
        console.log("Search Submitted");

        const searchItem = query.value;

        if(searchItem){ // searchItem is not null
            console.log(`URL used is ${SEARCHAPI+searchItem}`);
            returnMovies(SEARCHAPI+searchItem);
            query.value="";
        }
    });

// Additional Features
// 1. Dialog box when we click a card and display related things.

const card = document.getElementsByClassName("card");
const dialog_screen = document.getElementById("dialog-screen");

main.addEventListener("click", function(event){
    console.log(event.target);
    if (event.target && (event.target.classList.contains("card") || event.target.classList.contains("thumbnail") || event.target.classList.contains("title"))) {
        // Show the dialog box
        console.log("Card is clicked");
        //dialog.style.display = 'block';
        
        const movie_id = event.target.getAttribute("movie-id");
        console.log(movie_id);
        const description = GET_DESC+movie_id+request_DESC; // Get the description of the movie from the api. 
        console.log(description);
        console.log(`Requested URL for movie description is ${description}`);
        if(movie_id){
            displayPopOver(description);
        }
    }
});


/**
 * This method created a dialog Box that shows the movie poster 
 * and details of the movie
 * Add a clickAway feature so the dialog box closes when the user
 * clicks outside the dialog box or a close button
 * @param {*} url - api link to the description of the movie
 */
function displayPopOver(url){
    console.log(dialog_screen);
    dialog_screen.innerHTML = '';
    fetch(url).then(res => res.json())
    .then(function(data){
        console.log(data);

        // Create popover screen dynamically
    
        const dialog_box = document.createElement("dialog");
        dialog_box.setAttribute('class','dialog-box');
        dialog_box.setAttribute('id','dialog-box');
        
        const image = document.createElement("img");
        image.setAttribute('class','dialog-img');

        const description = document.createElement("div");
        description.setAttribute('class','Description');


        dialog_box.appendChild(image);
        dialog_box.appendChild(description);
        
        dialog_screen.appendChild(dialog_box);

        console.log(data.title);
        image.src = IMG_PATH + data.poster_path;
        image.alt = `${data.title}`;
        createDescription(description,data);
        //description.innerHTML = `${data.overview}`;

        dialog_screen.style.display = 'block';

        dialog_box.showModal();
    });
}

/**
 * 
 * @param {*} element - HTML element to which data has to be 
 * appended to - DESCRIPTION element created in @function displayPopOver
 * @param {*} data - json file that has details related to the movie
 */
function createDescription(element, data){
    const overview = document.createElement('div');
    overview.setAttribute('class','description-data');
    overview.innerHTML = `Overview: <br> ${data.overview}`;
    
    const releaseDate = document.createElement('div');
    releaseDate.setAttribute('class','description-data');
    releaseDate.innerHTML = `Release Date: ${data.release_date}`;
    
    const rating = document.createElement('div');
    rating.setAttribute('class','description-data');
    rating.innerHTML = `Rating: ${Math.floor((data.vote_average)*100)/100}`;

    const runtime = document.createElement('div');
    runtime.setAttribute('class','description-data');
    runtime.innerHTML = `Runtime: ${Math.floor(data.runtime/60)} hr ${data.runtime%60} min`;

    element.appendChild(overview);
    element.appendChild(releaseDate);
    element.appendChild(rating);
    element.appendChild(runtime);
}

// ClickAway feature for the dialog Box

document.addEventListener('click', function(event){
    console.log(event.target);
    if((event.target).classList.contains("dialog-box")){
        console.log(true);
        document.getElementById('dialog-box').close();
        console.log(`box closed`);
    }
    else{
        console.log(false);
    }
});

// Loading More Results
loadResults.addEventListener('click',function(event){
    // Load More Results
    // Use returnMovies if its on homepage or search 
});

// Add a loading screen with blank posters but with cards. 

function loadScreen(){
    for (let index = 0; index < 20; index++) {
        
        const div_card = document.createElement('div');
        div_card.setAttribute('class','card');
        
        const div_row = document.createElement('div');
        div_row.setAttribute('class','row');
        
        const div_column = document.createElement('div');
        div_column.setAttribute('class','column');
        
        const image = document.createElement('img');
        image.setAttribute('id','image');
        image.setAttribute('class','thumbnail');
        
        const title = document.createElement('h3');
        title.setAttribute('class','title');
        const center = document.createElement('center');
        
        // Setting the movie title and poster and creating the required html structure for them
        title.innerHTML = `Title`;
        image.src = "";
        //image.setAttribute('src',IMG_PATH+element.poster_path);
        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);
        
        main.appendChild(div_row); // Appends the newly created movie_card to the section element in HTML.

    }
}