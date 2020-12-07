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
    document.querySelector('#grad').innerHTML=`  <div class="row">
    <div class="col-10 mx-auto">
        <h2 class="mb-5">Ime Grada</h2>
    </div> 
    <div class="d-flex justify-content-center col-lg-10 mx-auto">
        <div class="col-lg-6 basicInfo mr-5">
            <h3 class="mb-2 fs-1">Basic Info</h3>
            <p class="mb-4 opis">- Name of searched city around the globe -</p>
            <div class="textBasicInfo">
                <p>Full Name : <span>  </span></p>
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

        <div class="col-lg-6  nameTranslate ">
            <h4 class="mb-2 fs-1">Translated city name</h4>
            <div class="textTranslatedName">
            <p class="mb-4 opis">- Name of searched city around the globe -</p>
                <div class="prevod">
                    <ul class="d-flex justify-content-space-around" id="ispisPrevoda">
                    
                    </ul>
                </div>
            </div>
        </div>
        </div>
    </div>`;
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
                        document.querySelector('.ispisGradova').style.display='none';
                    }
                    if(brEl<2){
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
                },
                error:function(xhr){
                    console.log(xhr);
                } 
            });

            let ispisGradInfo = (x) => {
                let html = `
                <div class="row">
                <div class="col-10 mx-auto">
                     <h2 class="mb-5"> ${x.full_name} </h2>
                </div> 
                <div class="d-flex justify-content-center col-lg-10 mx-auto">
                    <div class="col-lg-6 basicInfo mr-5">
                        <h3 class="mb-2 fs-1">Basic Info</h3>
                        <p class="mb-4 opis">- Name of searched city around the globe -</p>
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

                    <div class="col-lg-6 nameTranslate">
                        <h4 class="mb-2 fs-1">Translated city name</h4>
                        <div class="textTranslatedName">
                        <p class="mb-4 opis">- Name of searched city around the globe -</p>
                            <div class="prevod">
                                <ul class="" id="ispisPrevoda">
                                    `
                                    $.ajax({
                                        url: `https://api.teleport.org/api/cities/geonameid%3A${vrednost}/alternate_names`,
                                        method: "get",
                                        dataType: "json",
                                        success: function (data) {
                                            console.log(data);
                                            let podaci = data.alternate_names;
                                            console.log(podaci.length);
                                            let ispis = ``
                                            if(podaci.length<10){
                                                for(let i=0;i<podaci.length;i++){
                                    
                                                    ispis+=`<li>${podaci[i].name}</li>`;
                                                    
                                                }
                                            }
                                            else{
                                                for(let i=0;i<10;i++){
                                    
                                                    ispis+=`<li>${podaci[i].name}</li>`;
                                                    
                                                }
                                            }
                                        

                                            document.querySelector('#ispisPrevoda').innerHTML=ispis;
                                        },
                                        error:function(xhr){
                                            console.log(xhr);
                                        } 
                                    });
                                    html+=`
                                </ul>
                            </div>
                        </div>
                    </div>
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
            let html = `<div class="row text-center">`;
            let arr = [["airplane-outline","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi alias dolorum recusandae facilis nisi saepe?"],["calculator-outline","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi alias dolorum recusandae facilis nisi saepe?"],["calendar-outline","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi alias dolorum recusandae facilis nisi saepe?"]];
            arr.forEach(i => {
                html+=`
                <div class="col-lg-4 cardIco p-5 ">
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
                    <p>Mayor : <span> ${arr.mayor} </span></p>
                    
                </div>`
                document.querySelector('.text').innerHTML=html;
                ispisDetails = (x) =>{
                 
                    $.ajax({
                        url: `https://api.teleport.org/api/urban_areas/slug%3A${vrednost}/details`,
                        method: "get",
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            console.log(data.categories);
                            // console.log(data.categories[11].data[2].string_value);
                            ispis(data);
                        },
                        error:function(xhr){
                            console.log(xhr);
                        } 
                    });
                    // <p>Native Language : <span> ${arr.categories[11].data[2].string_value} </span></p>`
                    ispis = (arr) => {

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
                        `;
                        document.querySelector('.lista').innerHTML+=ispisHtml;
                    }
                 
                    
                }
                ispisDetails(arr);
                
               
            }
            
        }

        ispisSlika();
        ispisBasicUrbanInfo();
        
    });
    

}