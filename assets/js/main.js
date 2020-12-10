window.onload=function(){
    try{
        
        animacija();
        loadMap('mapa');
        dynamicPrint();
        searchCity();
        infoCity()
        SignUpForm();
        urbanArea();
        ispisInformacijaUrbanGradova();
        submitLogin();
        submitSignUp();

        
    }
    catch(err){
        console.log(err);
    }
}

// JQUERY LOADER PLUGIN
let animacija = () => {
    $('#myLoader').Loading({
        height: 16, // height
        width: 4, // width
        barColor: '#fcfcfc', // color
        barShadow: '0px 0px 0px #000', // shadow x, y, spread, color
        radius: 0, // radius
        spacing: 2, // space
        backgroundColor: '#000', // background color
        backgroundOpacity: .8, // opacity
        population: 22, // number of bars
        fadeLow: 0.05,
        fadeHigh: 1,
        newHeight: 20, // required height when using zoom, bubbleZoom, wave
        newWidth: 20,   // required width when using zoom
        loader_type: 'wave', // type of animation being used
        duration: 300, // duration for animation a single bar
        delay: 72
      });
      setTimeout( () => {
        $('.loader').css('display','none');
      },2200);
}
// END OF JQUERY PLUGIN
let styleProveraPodatakaForma = (div) => {
    let provera = document.getElementsByClassName(div);
            
    for(let j=0;j<provera.length;j++){
        provera[j].addEventListener('click',function(e){
            e.preventDefault();
            provera[j].style.visibility='hidden';

        });
    }
}
let submitSignUp = () => {
   
    document.querySelector('#inputSignUp').addEventListener('click',function(e){
        e.preventDefault();

        let name = document.querySelector('#inputFirstName').value;
        let lastName = document.querySelector('#inputLastName').value;
        let email = document.querySelector('#inputEmailSign').value;
        let password = document.querySelector('#inputPassSign').value;
        let error = document.getElementsByClassName('sign');
        
        let regName= /^[A-Z][a-z]{2,15}(\s[A-Z][a-z]{2,15})*$/;
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let regPassword = /^.{5,60}$/;
        let errors = [];

        if(!name.trim().match(regName)){
            if(name == ""){
                error[0].innerHTML = 'First Name field is mandatory';
                error[0].classList.add('provera');
            }
            else{
                error[0].innerHTML = 'First letter must be uppercase';
                error[0].classList.add('provera');
            }
            errors.push(1);
        }
        if(!lastName.trim().match(regName)){
            if(lastName == ""){
                error[1].innerHTML = 'Last Name field is mandatory';
                error[1].classList.add('provera');
            }
            else{
                error[1].innerHTML = 'First letter must be uppercase';
                error[1].classList.add('provera');
            }
            errors.push(2);
        }
        if(!email.match(regEmail)){
            if(email == ""){
                error[2].innerHTML = 'Email field is mandatory';
                error[2].classList.add('provera');
            }
            else{
                error[2].innerHTML = 'Email format : abc@gmail.com etc...';
                error[2].classList.add('provera');
            }
            errors.push(3);
        }
        if(!password.match(regPassword)){
            if(password == ""){
                error[3].innerHTML = 'Password field is mandatory';
                error[3].classList.add('provera');
            }
            else{
                error[3].innerHTML = 'Password must contain min 5 characters'
                error[3].classList.add('provera');
            }
            errors.push(4);
        }
        
        if(errors.length>0){
            
            styleProveraPodatakaForma('provera');
        }
        else{
            alert('sign up successful');
            document.querySelector('#inputFirstName').value = "";
            document.querySelector('#inputLastName').value = "";
            document.querySelector('#inputEmailSign').value = "";
            document.querySelector('#inputPassSign').value = "";
          
        }

    });
}
let submitLogin = () => {
    document.querySelector('#inputLogin').addEventListener('click',function(e){

        e.preventDefault();
 
        let email = document.querySelector('#inputEmail').value;
        let password = document.querySelector('#inputPass').value;
        let error = document.getElementsByClassName('log');
        console.log(email,password);
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let regPassword = /^.{5,60}$/;
        let errors = [];
        if(!email.match(regEmail)){
            if(email == ""){
                error[0].innerHTML = 'Email field is mandatory';
                error[0].classList.add('provera');
            }
            else{
                error[0].innerHTML = 'Wrong email address';
                error[0].classList.add('provera');
            }
            errors.push(1);
        }
        if(!password.match(regPassword)){
            if(password == ""){
                error[1].innerHTML = 'Password field is mandatory';
                error[1].classList.add('provera');
            }
            else{
                error[1].innerHTML = 'Wrong password';
                error[1].classList.add('provera');
            }
            errors.push(2);
        }
        
        if(errors.length>0){
            styleProveraPodatakaForma('provera');
        }
        else{
            alert('login successful');
            document.querySelector('#inputEmail').value = "";
            document.querySelector('#inputPass').value = "";
          
        }

    });
}


let stilPrikazGradovaLista = (sum,klasa) => {
    if(sum<1){
        $(klasa).css('visibility','hidden');
    }
    if(sum == 1){
        $(klasa).css('height','45px');
    }
    if(sum==2){
        $(klasa).css('height','90px');
    }
    if(sum > 2){
        $(klasa).css('height','130px');
    }
}
let klikNaGradLista = (klasa,elementVr,elementStil) => {

    let myEl = $(klasa);
                  
    for(let i=0;i<myEl.length;i++){
        console.log(myEl[i]);
        $(myEl[i]).click(function(){
            console.log(myEl[i]);
            $(elementVr).val($(this).html());
            console.log($(this).data("id"))
            $(elementVr).data("id", $(this).data("id"));
            setTimeout(()=>{
                $(elementStil).css('visibility','hidden');
            },100);
        });

    }

}
let klikIzvanGrad = (divEvent,divStyle) => {
    $(divEvent).blur(function(){
        $(divStyle).css('visibility','hidden');
    });
}
let print = (div,inner) => {
    return $(div).html(inner);
}
let ajax = (success,address) => {
    $.ajax({
        url:address,
        method:'get',
        dataType: 'json',
        success:success,
        error: xhr => {
            console.log(xhr);
        }
    });
}

let loadMap = (div) => {
    
    try{
    
        let mapa = new Datamap({
            scope:'world',
            element: document.getElementById(div),
            projection: 'orthographic',
            height:null,
            width:null,
            projectionConfig: {
                rotation: [0,-20]
            }, 
        });
    
    }
    catch(err){
        console.log(err);
    }

}


let dynamicPrint = () => {

    let html = ``;

    
    
    let urbanIco = () => {
        
        html = `<div class="row text-center container mx-auto mt-5">`;
        let arr = [["airplane-outline","You are going on  a business trip. Find out more about where will you spend some time"],["calculator-outline","You are interested in how pricy are other places so you can prepare well"],["calendar-outline","You are planning a tourist trip and you want to prepare and inform yourself as much as possible"]];

        let printUrbanIco = (a,b) => {
            return html +=` 
            <div class="col-lg-4 col-11 cardIco p-5 ">
                <ion-icon name="${a}" class="ico mx-auto pb-5"></ion-icon>
                <p>${b}</p>
            </div>`
        }
        
        arr.forEach(i => {
            printUrbanIco(i[0],i[1]);
            
        });

        html+=`</div>`;
    
        print('#icons',html);

    }
    let social = () => {
      
        html=``;
        let arr = [["#","logo-linkedin"],["#","logo-github"],["#","logo-instagram"]];

        let printSocial = (a,b) => {
            return  html+=`<a href="${a}"><ion-icon name="${b}"></ion-icon></a>`;
        }
        arr.forEach(i => {
            printSocial(i[0],i[1]);
        });

        print('.icons',html);
    
    }
    let nav = () => {
       
        html =`<div class="container">
        <ion-icon name="close-outline" class="escapeNav fs-1 float-right"></ion-icon>`
        let arr = [["index.html","Home"],["author.html","Author"],["dokumentacija.pdf","Documentation"]];

        let printNav = (a,b) => {
            return  html+=`<a class="nav-link outNav" aria-current="page" href="${a}">${b}</a>`
        }
        arr.forEach(i => {
           printNav(i[0],i[1]);
        });
        html+=`</div>`;
      
        print('.openMenu',html);

        let navOpenLogic = () => {
    
            $('.menuIco').click(function(e){
                e.preventDefault();
                $('.openMenu').css('display','block');
            }) 
        
            $('.escapeNav').click(function(e){
                e.preventDefault();
                $('.openMenu').addClass('closeMenu');
                setTimeout(() => {
                    $('.openMenu').css('display','none');
                    $('.openMenu').removeClass('closeMenu');
                },300);
            });
            
        }

        navOpenLogic();
    }
    try{
        urbanIco();
        social();
        nav();
    }
    catch(err){
        console.log(err);
    }  
   
}

let searchCity = () => {

    let arrKlase = ['#search','.ispisGradova','.grad'];
    try{
      

        $(arrKlase[0]).keyup(function(){
          
            let vrednost = $(arrKlase[0]).val();
            $(arrKlase[1]).css('visibility','visible');
            
            ajax(
                data => {   
                    ispisListe(data);    
                },
                `https://api.teleport.org/api/cities/?search=${vrednost}`
            )

            let ispisListe = (arg) => {

                let brEl = arg._embedded["city:search-results"].length;
                let html = '';
              
                for(let i=0;i<brEl;i++){

                    let vrednost = arg._embedded["city:search-results"][i].matching_full_name;
                    var idGrad = arg._embedded["city:search-results"][i]._links["city:item"].href.replace( /^\D+/g, '');
                    html+=`<p class="grad" data-id="${idGrad}">${vrednost}</p>`;   
                }

                print(arrKlase[1],html);
                
                stilPrikazGradovaLista(brEl,arrKlase[1]);

                klikNaGradLista('.grad',arrKlase[0],arrKlase[1]);
            }
            
            
        });
    }
    catch(err){
        console.log(err);
    }

    try{
        klikIzvanGrad(arrKlase[0],arrKlase[1]);
    }
    catch(err){
        console.log(err);
    }
}

let infoCity = () => {

    try{
           
        $('#submit').click( (e) => {

            e.preventDefault();
            
            let vrednost = $('#search').data("id");
            let imeGrada = $('#search').val();
     
            if(imeGrada!=""){

                window.scrollTo({
                    top:850,
                    left:0,
                    behavior: 'smooth'
                });

            }
            else{
                alert('You didnt enter city name');
            }
            
            ajax(
                data => {
                    console.log(data);
                    ispisGradInfo(data);
                    ispisMape(data);
                }, 
                `https://api.teleport.org/api/cities/geonameid%3A${vrednost}`
            )

            let ispisMape = (arr) => {

                function okret(){

                    let okret = 0;
                    let cityLongitude = arr.location.latlon.longitude;

                    if(cityLongitude<-50){
                         okret = 80;
                    }
                    if(cityLongitude<0 && cityLongitude>-50){
                         okret = 0;
                    }
              
                    if(cityLongitude>0 && cityLongitude<50){
                         okret = 0;
                    }
                    if(cityLongitude>50){
                         okret = -80;
                    }
                    return okret;

                }
                let mapa = new Datamap({
                    scope:'world',
                    element: document.getElementById("mapa"),
                    projection: 'orthographic',
                    projectionConfig: {
                        rotation: [okret(),-20]
                    },
                    
                    fills: {
                        defaultFill: '#ABDDA4',
                        grad: '#333',
                    }
                });
                
                mapa.bubbles([
                    {
                        name: '',
                        radius: 7,
                        country: 'grad',
                        yeild: 0,
                        fillKey: 'grad',
                        latitude: arr.location.latlon.latitude,
                        longitude: arr.location.latlon.longitude
                    },
                ]);
            }

            let ispisGradInfo = (x) => {
                let html = `
                <div class="row">
                <div class="col-lg-6>
                    <div class="col-10 mx-auto">
                        <h2 class=""> ${x.full_name} </h2>
                    </div> 
                    <div class="justify-content-center col-lg-6 mx-auto">
                        <div class="col-lg-12 col-11 basicInfo mr-lg-5 mr-0">
                      
                            <p class="mb-4 opis text-left">- Basic info of searched city around the globe -</p>
                            <div class="textBasicInfo">
                            
                                <p>Country : <span>  ${x._links["city:country"].name}</span></p>
                                <p>Division : <span> ${x._links["city:admin1_division"].name} </span></p>
                                <p>Timezone : <span> ${x._links["city:timezone"].name}</span></p>
                                <div class="location">
                                    <p>Latitude : <span>${x.location.latlon.latitude} </span></p>
                                    <p>Longitude : <span>${x.location.latlon.longitude} </span></p>
                                </div>
                                <p>Population : <span> ${x.population}</span></p>   
                            </div>
                        </div>

                        
                    </div>
                    <div class="col-lg-6 col-md-10 col-12 mx-auto mx-lg-0">
                        <div id="mapa"></div>
                    </div>
                </div>`;

                print('#grad',html);
            }
        });
    }
    catch(err){
        console.log(err);
    }
}

let SignUpForm = () => {

    let openSignForm = () => {

        $('#openSignUpForm').click(function(e){
            e.preventDefault();
            if(true){
                console.log('kliknuto');
                $('#createAccForm').css('display','block');
            }
            
            
        });
       
    }
   
    let escapeSignForm = () => {
    
        $('.escape').click(function(e){
            e.preventDefault();
            if(true){
                console.log('kliknuto');
                $('#createAccForm').addClass('closeForm');
                setTimeout(() => {
                    $('#createAccForm').css('display','none');
                    $('#createAccForm').removeClass('closeForm');
                },300);
                
            }
        });
    }
    try{
        openSignForm();
        escapeSignForm();
    }
    catch(err){
        console.log(err);
    }
}

let urbanArea = () => {

    try{

        $('#searchUrbanCity').keyup(function(){

            let vrednost = $('#searchUrbanCity').val();
            $('.ispisUrbanGradova').css('visibility','visible');

            ajax(
                function (data) {
                    ispisUrbanGradova(data);
                },
                `https://api.teleport.org/api/urban_areas/`
            );
        
            let ispisUrbanGradova = (x) => {

                let linkovi = x._links["ua:item"];
                let imenaGradova=``;

                linkovi.forEach(i => {
                    imenaGradova +=i.name.toLowerCase() + " ";
                });
                
                arr = imenaGradova.split(" ");
                
                let searchValue = $('#searchUrbanCity').val().toLowerCase();
                
                let searchFilter = arr.filter(x=>x.indexOf(searchValue)!=-1);
                let ispis=``;

                searchFilter.forEach(i=>{
                
                    ispis += `<p class="urbanGrad" data-id="${i}">${i}</p>`;
                
                });

                brEl = searchFilter.length;
    
                print('.ispisUrbanGradova',ispis);
            
                stilPrikazGradovaLista(brEl,'.ispisUrbanGradova');

                klikNaGradLista('.urbanGrad','#searchUrbanCity','.ispisUrbanGradova');
            }
        });
    }

    catch(err){
        console.log(err);
    }

    try{
        klikIzvanGrad('#searchUrbanCity','.ispisUrbanGradova')
    }

    catch(err){
        console.log(err);
    }

}

let ispisInformacijaUrbanGradova = () => {

    $('#submitUrban').click(function(e){

        e.preventDefault();
        let vrednost = $('#searchUrbanCity').data('id');

        let ispisSlika = () =>{
            ajax(
                function (data) {
                    ispis(data);
                },
                `https://api.teleport.org/api/urban_areas/slug%3A${vrednost}/images/`
            );
            
            let ispis = (arr) =>{
                let html=``;
                html=`<img src=${arr.photos[0].image.mobile} alt="${vrednost}" class="img-fluid float-right"/>`;
                $('.slika').html(html);  
            }
           
        }
        ispisBasicUrbanInfo = () => {
            
            ajax(
                function (data) {
                    ispis(data);
                },
                `https://api.teleport.org/api/urban_areas/slug%3A${vrednost}/`
            )
            let html=``;
            
            ispis = (arr) => {
                
                html+=`
                <h3 class="">${arr.full_name}</h3>
                <div class="lista">
                    <p>Continent : <span>  ${arr.continent}</span></p>
                    
                    
                </div>`
                // <p>Mayor : <span> ${arr.mayor} </span></p>
                $('.text').html(html);
                ispisDetails = () =>{
                    ajax(
                        function (data) {
                            ispisBasic(data);
                            ispisDetail(data);
                        },
                        `https://api.teleport.org/api/urban_areas/slug%3A${vrednost}/details`
                    )
                    
                    ispisBasic = (arr) => {

                        let ispisHtml =``;
                        console.log(arr.categories[6].data.length -1);
                        
                        let language;
                        let educationUniversity = arr.categories[6].data.length - 2;
                        let educationUniversityRank = arr.categories[6].data.length -1;
                        console.log(arr.categories[6].data[educationUniversity].string_value);
                        if(arr.categories[11].data.length==1){
                            language = arr.categories[11].data[0].string_value;
                        }
                        else{
                            language = arr.categories[11].data[2].string_value;
                        }
                        ispisHtml+=`
                        <p>Native Language : <span> ${language} </span></p>
                        <p>Currency : <span> ${arr.categories[5].data[0].string_value} </span></p>
                        <p>Population : <span> ${arr.categories[1].data[0].float_value} milion</span></p>
                        <p>GDP growth : <span> ${arr.categories[5].data[2].percent_value.toFixed(2)} %</span></p>
                        <p>Best Univeristy : <span> ${arr.categories[6].data[educationUniversity].string_value} (rank: ${arr.categories[6].data[educationUniversityRank].int_value})</span></p>
                        <p>Weather Type : <span> ${arr.categories[2].data[arr.categories[2].data.length-1].string_value}</span></p>
                        `;
                        document.querySelector('.lista').innerHTML+=ispisHtml;
                    }

                    ispisDetail = (arr) => {
                        console.log('proba');
                        let ispisHTML =``;
                        let skrati = arr.categories;
                        
                        let icons = [
                            ["cash-outline", skrati[0].id + ' (0-100)',
                                [
                                    [
                                        "Business Freedom",
                                        skrati[0].data[0].float_value
                                    ],
                                    [
                                        "Corruption Freedom",
                                        skrati[0].data[2].float_value
                                    ],
                                    [
                                        "Labor Freedom",
                                        skrati[0].data[4].float_value
                                    ],
                                    [
                                        "TTO Business",
                                        skrati[0].data[6].float_value
                                    ]
                                ]
                            ],
                            ["rainy-outline", skrati[2].id,
                                [
                                    [
                                        "Weather Avg High",
                                        skrati[2].data[skrati[2].data.length -4].string_value + "C"
                                    ],
                                    [
                                        "Weather Avg Low",
                                        skrati[2].data[skrati[2].data.length -3].string_value + "C"
                                    ]
                                
                                ]
                            ],
                            ["alert-outline", skrati[15].id + ' (0-1)',
                                [
                                    [
                                        "Air Pollution",
                                        skrati[15].data[0].float_value.toFixed(2)
                                    ],
                                    [
                                        "Cleanliness",
                                        skrati[15].data[1].float_value.toFixed(2)
                                    ],
                                    [
                                        "Drinking Watter Quality",
                                        skrati[15].data[2].float_value.toFixed(2)
                                    ],
                                    [
                                        "Greenery",
                                        skrati[15].data[3].float_value.toFixed(2)
                                    ]
                                ]
                            ],
                            ["accessibility-outline", skrati[9].id,
                                [
                                
                                    [
                                        "Life Expectancy",
                                        skrati[9].data[1].float_value
                                    ],
                                    [
                                        "Median Age",
                                        skrati[9].data[2].float_value
                                    ]
                                ]
                            ]
                        ];
                        
                        icons.forEach(i => {
                            console.log(i[2]);
                            let proba = i[2];
                            proba.forEach(j => {
                                console.log(j[0]);
                            })
                            
                            ispisHTML += ` 
                            <div class="info col-xl-3 col-md-6">
                                <ion-icon name="${i[0]}" class="col-12 mx-auto"></ion-icon>
                                <div class="infoText">
                                    <h4 class="text-center my-4">${i[1]}</h4>
                                    <div class="opis mx-auto text-center">`
                                    
                                    i[2].forEach( j => {
                                        ispisHTML += `<div class="d-flex aa"><ion-icon name="ellipse-outline" class="fs-6 mt-1 mr-3"></ion-icon><p class="">${j[0]}: <span> ${j[1]}</span<</p></div>`;
                                    });
                                    
                                    ispisHTML+=`
                                    </div>
                                </div>
                            </div>
                            `
                        });
                        $('.specificInfo').html(ispisHTML);
                        
                    }
                 
                    
                }

                ispisDetails();
                
            }
            ispisScores = () =>{

                ajax(
                    function (data) {
                     
                        console.log(data.categories);
                         ispis(data.categories);
                     },
                     `https://api.teleport.org/api/urban_areas/slug%3A${vrednost}/scores/`
                )
    
                let ispis = (arr) => {
                    const max = '10';
                    let html = `<div class="row">`;
                    console.log(arr);
                   
                    arr.forEach(i => {
                        html += `<div class="score col-xl-2 col-lg-3 col-md-4 col-6 mx-auto mx-lg-0 text-center">
                        <p class="mr-5">${i.name}</p>
                        <progress class="progres mb-4" value="${i.score_out_of_10}" max='${max}'>${i.score_out_of_10}</progress>
                       
                        
                     </div>`
                     
                    console.log(i);
                    
                    });
                    html+=`</div>`
                    $('#scores').html(html);
                   
                }
            }
        }

        try{
            ispisSlika();
            ispisBasicUrbanInfo();
            ispisScores();
        }
        catch(err){
            console.log(err);
        }
    });
    

}