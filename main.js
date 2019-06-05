window.addEventListener("load", () => {
    let long;
    let lat;
    let tempDescript = document.querySelector(".temp-desscription");
    let tempdegree = document.querySelector(".temp-degree");
    let timezone = document.querySelector(".loacation-timezone");
    let tempSection = document.querySelector(".temp");
    const tempSpan = document.querySelector(".temp span");


    if ( navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
          
          const proxy = 'https://cors-anywhere.herokuapp.com/';
          const api = `${proxy}https://api.darksky.net/forecast/297378cb67b78cfc517c9c4601f8f2d7/${lat},${long}`;

          fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
              const { temperature, summary, icon } = data.currently;
              //Set DOM Elements from the API
              tempdegree.textContent = temperature;
              tempDescript.textContent = summary;
              timezone.textContent = data.timezone; 
              //Formula for celsius
              let celsius = (temperature -32) * (5/9); 
              //Set Icon
              setIcons(icon, document.querySelector(".icon")); 
              //Change temrature unit
              tempSection.addEventListener("click", () => {
                  if(tempSpan.textContent === "F") {
                      tempSpan.textContent = "C";
                      tempdegree.textContent = Math.floor(celsius);
                  }else{
                      tempSpan.textContent = "F";
                      tempdegree.textContent = Math.floor(temperature);

                  }
              })  

            });
        });
    }

   function setIcons(icon, iconID){
       const skycons = new Skycons({color: "white"});
       const currentIcon = icon.replace(/-/g, "_").toUpperCase();
       skycons.play();
       return skycons.set(iconID, Skycons[currentIcon]);
   } 
})