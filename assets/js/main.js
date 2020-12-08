window.onload=function(){

    try{
        loadMap('mapa');
        dynamicPrint();
        searchCity();
        infoCity()
        SignUpForm();
        urbanArea();
        ispisInformacijaUrbanGradova();
    }
    catch(err){
        console.log(err);
    }
}
let stilPrikazGradovaLista = (sum,klasa) => {
    if(sum<1){
        document.querySelector(klasa).style.visibility='hidden';
    }
    if(sum == 1){
        document.querySelector(klasa).style.height='45px';
    }
    if(sum==2){
        document.querySelector(klasa).style.height='90px';
    }
    if(sum > 2){
        document.querySelector(klasa).style.height='130px';
    }
}
let klikNaGradLista = (klasa,elementVr,elementStil) => {

    let myEl = document.getElementsByClassName(klasa);
                  
    for(let i=0;i<myEl.length;i++){
        console.log(myEl[i]);
        myEl[i].addEventListener('click',function(){
            console.log(myEl[i]);
            document.querySelector(elementVr).value = myEl[i].innerHTML;
            document.querySelector(elementVr).dataset.id = myEl[i].dataset.id;
            setTimeout(()=>{
                document.querySelector(elementStil).style.visibility='hidden';
            },100);
        });

    }

}
let klikIzvanGrad = (divEvent,divStyle) => {
    document.querySelector(divEvent).addEventListener('blur',function(){
        document.querySelector(divStyle).style.visibility='hidden';
    });
}
let print = (div,inner) => {
    return document.querySelector(div).innerHTML=inner;
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
        let arr = [["airplane-outline","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi alias dolorum recusandae facilis nisi saepe?"],["calculator-outline","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi alias dolorum recusandae facilis nisi saepe?"],["calendar-outline","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi alias dolorum recusandae facilis nisi saepe?"]];

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
        let arr = [["index.html","Home"],["#","Author"],["#","Documentation"]];

        let printNav = (a,b) => {
            return  html+=`<a class="nav-link outNav" aria-current="page" href="${a}">${b}</a>`
        }
        arr.forEach(i => {
           printNav(i[0],i[1]);
        });
        html+=`</div>`;
      
        print('.openMenu',html);

        let navOpenLogic = () => {
    
            document.querySelector('.menuIco').addEventListener('click',function(e){
                e.preventDefault();
                document.querySelector('.openMenu').style.display='block';
            }) 
        
            document.querySelector('.escapeNav').addEventListener('click',function(e){
                e.preventDefault();
                document.querySelector('.openMenu').classList.add('closeMenu');
                setTimeout(() => {
                    document.querySelector('.openMenu').style.display='none';
                    document.querySelector('.openMenu').classList.remove('closeMenu');
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
      

        document.querySelector(arrKlase[0]).addEventListener('keyup',function(){
          
            let vrednost = document.querySelector(arrKlase[0]).value;
            document.querySelector(arrKlase[1]).style.visibility='visible';
            
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

                klikNaGradLista('grad',arrKlase[0],arrKlase[1]);
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
           
        document.querySelector('#submit').addEventListener('click', (e) => {

            e.preventDefault();
            
            let vrednost = document.querySelector('#search').dataset.id;
            let imeGrada = document.querySelector('#search').value;
     
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

        document.querySelector('#openSignUpForm').addEventListener('click',function(e){
            e.preventDefault();
            if(true){
                console.log('kliknuto');
                document.querySelector('#createAccForm').style.display='block';
            }
            
            
        });
       
    }
   
    let escapeSignForm = () => {
    
        document.querySelector('.escape').addEventListener('click',function(e){
            e.preventDefault();
            if(true){
                console.log('kliknuto');
                document.querySelector('#createAccForm').classList.add('closeForm');
                setTimeout(() => {
                    document.querySelector('#createAccForm').style.display='none';
                    document.querySelector('#createAccForm').classList.remove('closeForm');
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

        document.querySelector('#searchUrbanCity').addEventListener('keyup',function(){

            let vrednost = document.querySelector('#searchUrbanCity').value;
            document.querySelector('.ispisUrbanGradova').style.visibility='visible';

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
                
                let searchValue = document.querySelector('#searchUrbanCity').value.toLowerCase();
                
                let searchFilter = arr.filter(x=>x.indexOf(searchValue)!=-1);
                let ispis=``;

                searchFilter.forEach(i=>{
                
                    ispis += `<p class="urbanGrad" data-id="${i}">${i}</p>`;
                
                });

                brEl = searchFilter.length;
    
                print('.ispisUrbanGradova',ispis);
            
                stilPrikazGradovaLista(brEl,'.ispisUrbanGradova');

                klikNaGradLista('urbanGrad','#searchUrbanCity','.ispisUrbanGradova');
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

    document.querySelector('#submitUrban').addEventListener('click',function(e){

        e.preventDefault();
        let vrednost = document.querySelector('#searchUrbanCity').dataset.id;

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
                document.querySelector('.slika').innerHTML=html;  
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
                document.querySelector('.text').innerHTML=html;
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
                        document.querySelector('.specificInfo').innerHTML = ispisHTML;
                        
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
                    document.querySelector('#scores').innerHTML=html;
                   
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