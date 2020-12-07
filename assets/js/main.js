window.onload=function(){

    try{
        dynamicPrint();
        nav();
        searchCity();
        loadInfo();
        infoCity()
        SignUpForm();
        icons();
        urbanArea();
        ispisInformacijaUrbanGradova();
       
       
       
            
            
  
    }
    catch(err){
        console.log(err);
    }
}
    
let loadInfo = () => {
    console.log('a');
    
    document.querySelector('#grad').innerHTML=`   <div class="row  mx-auto">
    <div class="col-lg-6 col-12 ">
        <div class="col-12 mx-auto">
            <h2 class="">City Name</h2>
        </div> 
        <div class="col-lg-12 mx-auto ">
            <div class="col-lg-6 col-11 basicInfo mr-lg-5 mr-0">
                
                <p class="mb-4 opis text-left">- Name of searched city around the globe -</p>
                <div class="textBasicInfo">
                    <p>Country : <span> </span></p>
                    <p>Division : <span>  </span></p>
                    <p>Timezone : <span> </span></p>
                    <div class="location">
                        <p>Latitude : <span> </span></p>
                        <p>Longitude : <span> </span></p>
                    </div>
                    <p>Population : <span> </span></p>   
                </div>
            </div>

            
        </div>
    </div>
    <div class="col-lg-6 col-md-10 col-12 mx-auto mx-lg-0">
        <div id="mapa"></div>
    </div>
</div>`;

var mapa = new Datamap({
    scope:'world',
    element: document.getElementById("mapa"),
    projection: 'orthographic',
    height:null,
    width:null,
    projectionConfig: {
        rotation: [0,-20]
    }, 
});


      
}

let searchCity = () => {

    try{
        document.querySelector('#search').addEventListener('keyup',function(){


            let vrednost = document.querySelector('#search').value;
            document.querySelector('.ispisGradova').style.visibility='visible';
            
            $.ajax({
                url: `https://api.teleport.org/api/cities/?search=${vrednost}`,
                method: "get",
                dataType: "json",
                success: function (data) {
                    
                    // console.log(idGrad);
                    ispisListe(data);
                    
                },
                error:function(xhr){
                    console.log(xhr);
                } 
            });
            
            let ispisListe = (arg) => {
                let brEl = arg._embedded["city:search-results"].length;
                
                let html = '';
              
                for(let i=0;i<brEl;i++){
                    
                    let vrednost = arg._embedded["city:search-results"][i].matching_full_name;
                    var idGrad = arg._embedded["city:search-results"][i]._links["city:item"].href.replace( /^\D+/g, '');
                    html+=`<p class="grad" data-id="${idGrad}">${vrednost}</p>`;   
                }
                document.querySelector('.ispisGradova').innerHTML=html;
                
                let stilPrikazGradova = () => {
                    if(brEl<1){
                        document.querySelector('.ispisGradova').style.visibility='hidden';
                    }
                    if(brEl==2){
                        document.querySelector('.ispisGradova').style.height='45px';
                    }
                    if(brEl>1 && brEl<3){
                        document.querySelector('.ispisGradova').style.height='90px';
                    }
                }
                stilPrikazGradova();
                let klikNaGrad = () => {
                    var myEl = document.getElementsByClassName('grad');
                    
                    
                    for(let i=0;i<myEl.length;i++){
                       myEl[i].addEventListener('click',function(){
                           console.log(myEl[i]);
                            document.querySelector('#search').value = myEl[i].innerHTML;
                            document.querySelector('#search').dataset.id = myEl[i].dataset.id;
                            setTimeout(()=>{
                                document.querySelector('.ispisGradova').style.visibility='hidden';
                            },100);
                        });
                    }
                }
                klikNaGrad();
            }
            
            
        });
    }
    catch(err){
        console.log(err);
    }
    try{
        document.querySelector('#search').addEventListener('blur',function(){
            document.querySelector('.ispisGradova').style.visibility='hidden';
        });
    }
    catch(err){
        console.log(err);
    }
}

let infoCity = () => {
    try{
       
        
        document.querySelector('#submit').addEventListener('click',(e) => {
            
            e.preventDefault();
            console.log(document.querySelector('#search').value);
            let vrednost = document.querySelector('#search').dataset.id;
            let imeGrada = document.querySelector('#search').value;
            console.log(vrednost);
            if(imeGrada!=""){
                window.scrollTo({
                    top:850,
                    left:0,
                    behavior: 'smooth'
                });
            }
            else{
                alert('Niste uneli grad');
            }
            $.ajax({
                url: `https://api.teleport.org/api/cities/geonameid%3A${vrednost}`,
                method: "get",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    ispisGradInfo(data);
                    ispisMape(data);
                },
                error:function(xhr){
                    console.log(xhr);
                } 
            });
            let ispisMape = (arr) => {
                function okret(){
                    let okret = 0;
                    if(arr.location.latlon.longitude<-50){
                        return okret = 80;
                    }
                    if(arr.location.latlon.longitude<0 && arr.location.latlon.longitude>-50){
                        return okret = 0;
                    }
              
                    if(arr.location.latlon.longitude>0 && arr.location.latlon.longitude<50){
                        return okret = 0;
                    }
                    if(arr.location.latlon.longitude>50){
                        return okret = -80;
                    }
                    
                
                    
                }
                console.log(arr);
                var mapa = new Datamap({
                    scope:'world',
                    element: document.getElementById("mapa"),
                    projection: 'orthographic',
                    // geographyConfig: {
                    //     popupOnHover: false,
                    //     highlightOnHover: true
                    // },
                    projectionConfig: {
                        rotation: [okret(),-20]
                    },
                    
                    fills: {
                        defaultFill: '#ABDDA4',
                        USA: '#333',
                    }
                });
                
                mapa.bubbles([
                {
                    name: '',
                    radius: 7,
                    country: 'USA',
                    yeild: 0,
                    fillKey: 'USA',
                    date: '1954-03-01',
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
                
                document.querySelector('#grad').innerHTML=html;
            }
        });
    }
    catch(err){
        console.log(err);
    }
}

let SignUpForm = () => {
    let openSignForm = () => {

        try{
            document.querySelector('#openSignUpForm').addEventListener('click',function(e){
                e.preventDefault();
                if(true){
                    console.log('kliknuto');
                    document.querySelector('#createAccForm').style.display='block';
                }
                
             
            });
        }
        catch(err){
            console.log(err.message);
        }
       
    }
    openSignForm();
    let escapeSignForm = () => {
        try{
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
        catch(err){
            console.log(err.message);
        }
    }
    escapeSignForm();
}
let icons = () => {
    try{

    }
    catch(err){
        console.log(err);
    }
}

let dynamicPrint = () => {
    let urbanIco = () => {
        try{
            let html = `<div class="row text-center container mx-auto">`;
            let arr = [["airplane-outline","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi alias dolorum recusandae facilis nisi saepe?"],["calculator-outline","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi alias dolorum recusandae facilis nisi saepe?"],["calendar-outline","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi alias dolorum recusandae facilis nisi saepe?"]];
            arr.forEach(i => {
                html+=`
                <div class="col-lg-4 col-11 cardIco p-5 ">
                    <ion-icon name="${i[0]}" class="ico mx-auto pb-5"></ion-icon>
                    <p>${i[1]}</p>
                </div>
            `
            });
            html+=`</div>`;
            document.querySelector('#icons').innerHTML=html;
        }
        catch(err){
           console.log(err);
        }
    }
    urbanIco();
    let social = () => {
        try{
            let html=``;
            let arr = [["#","logo-linkedin"],["#","logo-github"],["#","logo-instagram"]];
            arr.forEach(i => {
                html+=`<a href="${i[0]}"><ion-icon name="${i[1]}"></ion-icon></a>`;
            });
    
            document.querySelector('.icons').innerHTML=html;
        }
        catch(err){
            console.log(err);
        }
    }
    social();
    let nav = () => {
        try{
            let html =`<div class="container">
            <ion-icon name="close-outline" class="escapeNav fs-1 float-right"></ion-icon>`
            let arr = [["index.html","Home"],["#","Author"],["#","Documentation"]];
            arr.forEach(i => {
                html+=`<a class="nav-link outNav" aria-current="page" href="${i[0]}">${i[1]}</a>`
            });
            html+=`</div>`;
            document.querySelector('.openMenu').innerHTML=html;
        }
        catch(err){
            console.log(err);
        }
    }
    nav();
}
let nav = () => {
    try{
        
        document.querySelector('.menuIco').addEventListener('click',function(e){
            e.preventDefault();
            console.log('kliknuto');
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
    catch(err){
        console.log(err);
    }

}
let urbanArea = () => {
    try{
        document.querySelector('#searchUrbanCity').addEventListener('keyup',function(){
            let vrednost = document.querySelector('#searchUrbanCity').value;
            document.querySelector('.ispisUrbanGradova').style.visibility='visible';

            $.ajax({
               url: `https://api.teleport.org/api/urban_areas/`,
               method: "get",
               dataType: "json",
               success: function (data) {
                      
                   ispisUrbanGradova(data);

               },
               error:function(xhr){
                   console.log(xhr);
               } 
           });
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
               document.querySelector('.ispisUrbanGradova').innerHTML=ispis;
           
               let stilPrikazGradova = () => {
                   
                   if(brEl<1 || document.querySelector('#searchUrbanCity').value==""){
                       document.querySelector('.ispisUrbanGradova').style.visibility='hidden';
                   }
                   if(brEl<2){
                       document.querySelector('.ispisUrbanGradova').style.height='45px';
                       console.log(brEl);
                   }
                   if(brEl>1 && brEl<3){
                       document.querySelector('.ispisUrbanGradova').style.height='90px';
                   }
               }
               stilPrikazGradova();
               let klikNaGrad = () => {
                   var myEl = document.getElementsByClassName('urbanGrad');
                   
                   
                   for(let i=0;i<myEl.length;i++){
                      myEl[i].addEventListener('click',function(){
                          console.log(myEl[i]);
                           document.querySelector('#searchUrbanCity').value = myEl[i].innerHTML;
                           document.querySelector('#searchUrbanCity').dataset.id = myEl[i].dataset.id;
                           setTimeout(()=>{
                               document.querySelector('.ispisUrbanGradova').style.visibility='hidden';
                           },100);
                       });
                   }
               }
               klikNaGrad();
            }
        });
      
        
    }
    catch(err){
        console.log(err);
    }
    try{
        document.querySelector('#searchUrbanCity').addEventListener('blur',function(){
            document.querySelector('.ispisUrbanGradova').style.visibility='hidden';
        });
    }
    catch(err){
        console.log(err);
    }
}
let ispisInformacijaUrbanGradova = () => {
    document.querySelector('#submitUrban').addEventListener('click',function(e){

        e.preventDefault();
        // console.log(document.querySelector('#searchUrbanCity').value);
        let vrednost = document.querySelector('#searchUrbanCity').dataset.id;
        console.log(vrednost);

        ispisSlika = () =>{
            $.ajax({
                url: `https://api.teleport.org/api/urban_areas/slug%3A${vrednost}/images/`,
                method: "get",
                dataType: "json",
                success: function (data) {
                    console.log(data.photos[0].image.mobile);
                    // console.log(data.)
                    ispis(data);
                    
                },
                error:function(xhr){
                    console.log(xhr);
                } 
            });
            let ispis = (arr) =>{
        
                let html=``;
                // console.log(arr);
       
                    html=`<img src=${arr.photos[0].image.mobile} alt="${vrednost}" class="img-fluid float-right"/>`;
                    document.querySelector('.slika').innerHTML=html;
                
          
               
                
            }
           
        }
        ispisBasicUrbanInfo = () => {
            $.ajax({
                url: `https://api.teleport.org/api/urban_areas/slug%3A${vrednost}/`,
                method: "get",
                dataType: "json",
                success: function (data) {
                 
                    console.log(data.full_name);
                    ispis(data);
              
                    
                },
                error:function(xhr){
                    console.log(xhr);
                } 
            });
            
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
                 
                    $.ajax({
                        url: `https://api.teleport.org/api/urban_areas/slug%3A${vrednost}/details`,
                        method: "get",
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            console.log(data.categories);
                            console.log(data.categories[0].id);
                            // console.log(data.categories[11].data[2].string_value);
                            ispisBasic(data);
                            ispisDetail(data);
                        },
                        error:function(xhr){
                            console.log(xhr);
                        } 
                    });
                    // <p>Native Language : <span> ${arr.categories[11].data[2].string_value} </span></p>`
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
                        <p>GDP growth : <span> ${arr.categories[5].data[2].percent_value} %</span></p>
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
                            ["alert-outline", skrati[15].id + ' (0-10)',
                                [
                                    [
                                        "Air Pollution",
                                        skrati[15].data[0].float_value
                                    ],
                                    [
                                        "Cleanliness",
                                        skrati[15].data[1].float_value
                                    ],
                                    [
                                        "Drinking Watter Quality",
                                        skrati[15].data[2].float_value
                                    ],
                                    [
                                        "Greenery",
                                        skrati[15].data[3].float_value
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
                                    ],
                                    [
                                        "Unemployment Rate",
                                        skrati[9].data[3].percent_value + "%"
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
                                    <div class="opis px-5">`
                                    
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
                $.ajax({
                    url: `https://api.teleport.org/api/urban_areas/slug%3A${vrednost}/scores/`,
                    method: "get",
                    dataType: "json",
                    success: function (data) {
                     
                       console.log(data.categories);
                        ispis(data.categories);
                    },
                    error:function(xhr){
                        console.log(xhr);
                    } 
                });
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

                    // let a = () => {
                    //     let arr = [1,2,3];
                    //     let ispis=``;
                    //     for(let i=0;i<arr.length;i++){
                    //         console.log(i);
                    //         ispis+=`<div class="a"> </div>`
                    //         console.log(ispis);
                            
                    //     }
                    //     document.querySelector('#appearance').innerHTML = ispis;
                        
                    // }
                    // a();
                   
                }
            }
        }

        
        ispisSlika();
        ispisBasicUrbanInfo();
        ispisScores();
    });
    

}