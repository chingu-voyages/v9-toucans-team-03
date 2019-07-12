
function alert_soon(){
    const alert_styles = `
    <div class='container_alert'>
    <div class='alert'>
        <header>
            <div class="picture"><img src="images/icons/robot.svg" alt=""></div>
    
        </header>
        <div class="message">
         <span> BEEP,BOOP!! Thank you so much for using our platform, we currently working on this feature it will be ready asap</span>
         </div>
        <div class='button_agr'>
            <button style='cursor:pointer' id='close_alert'>OK</button>
        </div>
    </div>
    </div>
    `;

    $('body').prepend(alert_styles)
    const alert_close = document.querySelector('#close_alert');
    const alert = document.querySelector('.container_alert');
    alert_close.onclick = ()=>{
        console.log('works')
        $(alert).fadeOut('slow' , ()=>{
            $(alert).hide();
    
        });
    }
}