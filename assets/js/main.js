window.onload=function(){

    nav();
    searchCity();
    SignUpForm();
    
    
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
    // let prom="Donji Milanovac"
    // $.ajax({
    //     url: `https://api.teleport.org/api/`,
    //     method: "get",
    //     dataType: "json",
    //     success: function (data) {
    //         console.log(data._links);
    //     },
    //     error:function(xhr){
    //         console.log(xhr);
    //     } 
    // });
    document.querySelector('#search').addEventListener('keyup',function(){
        let vrednost = document.querySelector('#search').value;
        document.querySelector('.ispisGradova').style.display='block';

        $.ajax({
            url: `https://api.teleport.org/api/cities/?search=${vrednost}`,
            method: "get",
            dataType: "json",
            success: function (data) {
                
                // console.log(data);
                console.log(data._embedded["city:search-results"][0].matching_full_name);
            },
            error:function(xhr){
                console.log(xhr);
            } 
        });

    });
    document.querySelector('#search').addEventListener('blur',function(){
        document.querySelector('.ispisGradova').style.display='none';
    })
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

