window.onload=function(){

    nav();
    searchCity();
    loadInfo();
    infoCity()
    SignUpForm();
    
    
}
let loadInfo = () => {
    document.querySelector('#grad').innerHTML=`  <div class="row">
    <div class="col-12">
        <h2 class="mb-5">Ime Grada</h2>
    </div> 
    
    <div class="col-lg-12 basicInfo p-5 mb-5">
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

    <div class="col-lg-12 p-5 nameTranslate">
        <h4 class="mb-2 fs-1">Translated city name</h4>
        <div class="textTranslatedName">
        <p class="mb-4 opis">- Name of searched city around the globe -</p>
            <div class="prevod">
                <ul class="d-flex justify-content-space-around" id="ispisPrevoda">
                  
                </ul>
            </div>
        </div>
    </div>
    </div>`;
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
                brEl = arg._embedded["city:search-results"].length;
                
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
                    top:900,
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
                <div class="col-12">
                     <h2 class="mb-5"> ${x.full_name} </h2>
                </div> 
                
                <div class="col-lg-12 basicInfo p-5 mb-5">
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

                <div class="col-lg-12 p-5 nameTranslate">
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

