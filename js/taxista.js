const urlMain = "http://dev.desarrolloweb.com";
const ajaxUrl = urlMain+"/json";
const token = localStorage.getItem("token");
if (token) {
    //get data
    $.ajax({
        type: "post",
        dataType: "json",
        url: ajaxUrl+'/dataTaxista.json?v1',
        data: {
            token            
        },
        success: function(response) {
            //update view
            $("#name").html(response.name);
            $("#place").html('Placa: '+response.placa);
            $("#cantidadviajes").html('Cantidad de viajes: '+response.cantidad);
            const templateAuto = `<p>${response.marca} - ${response.modelo}</p><p>Color: ${response.color}</p>`;
            $("#auto").html(templateAuto);
            const templateSaldo = `<div>
                <h3>Usted tiene por cobrar</h3>
                <h4>${response.moneda}${response.saldo}</h4>
            </div>`;
            $("#saldo").html(templateSaldo);
            const templateLast = `<div class="cntentLast">
                <div class="cntentLastFlex">
                    <div class="origin">${response.last.origen}</div>
                    <div class="destino">${response.last.destino}</div>
                </div>
                <div class="info">
                    <h3>${response.last.pasajero}</h3>
                    <p>${response.moneda}${response.last.saldo}</p>
                </div>
            </div>`;
            $('#last').html(templateLast);
        },
        error: function(error) {
            alert("TOKEN ERRAO");
        }
    });  
    function functionsCliente() {
        $(".cliente").on("click", function(){
            const $this = $(this);
            const name = $this.attr("data-name");
            alert("Conectnado con " + name);
        });
    }
    //get Disponible
    $('#disponible').on("click", function(){
        $.ajax({
            type: "post",
            dataType: "json",
            url: ajaxUrl+'/dataClients.json',
            data: {
                token            
            },
            success: function(response) {
                const clientes = response.clientes;
                $("#drives").html();
                clientes.forEach(cliente => {
                    const templateclientes = `
                        <div class="cliente" data-name="${cliente.name}">                            
                            <div class="cliente__left">
                                <h4>${cliente.name}</h4>
                                <p>Se encuentra a ${cliente.distancia}${cliente.variable}</p>
                            </div>
                            <div class="cliente__right">
                                <h4>S/. ${cliente.saldo}</h4>
                                <p>${cliente.destino}</p>
                            </div>
                        </div>
                    `;
                    $("#drives").append(templateclientes);
                });                      
                functionsCliente();           
            }
        });
        $('#disponible').hide();
    });  
} else {
    window.location.href = urlMain;
}