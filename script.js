document.addEventListener('DOMContentLoaded', init);

function init() {

  var divsell = document.getElementById("selectProduct");
  var divedit = document.getElementById("editProduct");
  var divadd = document.getElementById("addProduct");
  let lineas = document.getElementById("lineas");

  let code = 0;
  let productos = [];
  let add = document.getElementById("idButtonAdd");
  let sell = document.getElementById("idButtonSell");
  let edit = document.getElementById("idButtonEditProduct");

  add.addEventListener("click", function() {
    divadd.innerHTML = "";

    let h1 = document.createElement("h1");
    let txth1 = document.createTextNode("Añadir producto");
    let div = document.createElement("div");

    h1.appendChild(txth1);
    div.appendChild(h1);

    let form = document.createElement("form");
    let tdref = document.createElement("input");
    let tdprecio = document.createElement("input");
    let tdcantidad = document.createElement("input");
    let tdcalidad = document.createElement("input");

    let txtref = document.createTextNode("Nombre: ");
    let txtprecio = document.createTextNode("Precio: ");
    let txtcantidad = document.createTextNode("Cantidad: ");
    let txtcalidad = document.createTextNode("Calidad: ");

    let btn = document.createElement("button");
    let txtbtn = document.createTextNode("Añadir");
    btn.appendChild(txtbtn);

    form.appendChild(txtref);
    form.appendChild(tdref);
    form.appendChild(document.createElement("br"));
    form.appendChild(txtprecio);
    form.appendChild(tdprecio);
    form.appendChild(document.createElement("br"));
    form.appendChild(txtcantidad);
    form.appendChild(tdcantidad);
    form.appendChild(document.createElement("br"));
    form.appendChild(txtcalidad);
    form.appendChild(tdcalidad);
    div.appendChild(form);
    div.appendChild(btn);

    btn.addEventListener("click", function() {

      if (tdref.value != "" && tdprecio.value != "" &&
        tdcantidad.value != "" && tdcalidad.value != "") {
        let ptemp = {};
        code = code + 1;
        ptemp.code = code;
        ptemp.ref = tdref.value;
        ptemp.price = tdprecio.value;
        ptemp.quantity = tdcantidad.value;
        ptemp.calidad = tdcalidad.value;

        productos.push(ptemp);
        divadd.innerHTML = "";
      }
      console.log(productos);

    }) //fin btn

    divadd.appendChild(div);

  }) // fin add


  // editar btn

  edit.addEventListener("click", function() {
    divedit.innerHTML = "";
    let h1 = document.createElement("h1");
    let txth1 = document.createTextNode("Editar producto");
    let div = document.createElement("div");

    h1.appendChild(txth1);
    div.appendChild(h1);

    let select = document.createElement("select");
    for (let i = 0; i < productos.length; i++) {
      let option = document.createElement("option");
      option.innerHTML = productos[i].ref;
      select.appendChild(option);
    }

    divedit.appendChild(div);
    divedit.appendChild(select);
    select.selectedIndex = -1;
    select.addEventListener("change", function() {
      let sel = select.selectedIndex;
      while (divedit.children.length > 2) {
        divedit.removeChild(divedit.children[2]);
      }
      let d = document.createElement("div");

      let form = document.createElement("form");
      let inputp = document.createElement("input");
      let inputc = document.createElement("input");
      let inputq = document.createElement("input");

      let txtp = document.createTextNode("Precio: ");
      let txtc = document.createTextNode("Calidad: ");
      let txtq = document.createTextNode("Cantidad: ");

      form.appendChild(txtp);
      form.appendChild(inputp);
      form.appendChild(document.createElement("br"));
      form.appendChild(txtq);
      form.appendChild(inputq);
      form.appendChild(document.createElement("br"));
      form.appendChild(txtc);
      form.appendChild(inputc);

      let btn = document.createElement("button");
      let btntxt = document.createTextNode("Editar");
      btn.appendChild(btntxt);

      d.appendChild(form);
      d.appendChild(btn);
      btn.addEventListener("click", function() {
        if (inputp.value != "" && inputq.value != "" && inputc.value != "") {
          productos[sel].price = inputp.value;
          productos[sel].quantity = inputq.value;
          productos[sel].calidad = inputc.value;
          console.log(productos);
          d.innerHTML = "";
        }

      }) // btn edit

      divedit.appendChild(d);
    }) // select

  }) // fin edit


  //sell btn

  sell.addEventListener("click", function() {

    divsell.innerHTML = "";
    let h1 = document.createElement("h1");
    let txth1 = document.createTextNode("Vender producto");
    let div = document.createElement("div");

    h1.appendChild(txth1);
    div.appendChild(h1);

    let select = document.createElement("select");
    for (let i = 0; i < productos.length; i++) {
      let option = document.createElement("option");
      option.innerHTML = productos[i].ref;
      select.appendChild(option);
    }

    divsell.appendChild(div);
    divsell.appendChild(select);
    select.selectedIndex = -1;

    select.addEventListener("change", function() {
      let sel = select.selectedIndex;

      let tr = document.createElement("tr");
      let tdcode = document.createElement("td");
      let tdref = document.createElement("td");
      let tdprice = document.createElement("td");
      let tdquantity = document.createElement("td");
      let tdtotal = document.createElement("td");
      tdtotal.className = "tlineas";

      let txtcode = document.createTextNode(productos[sel].code);
      let txtref = document.createTextNode(productos[sel].ref);
      let txtprice = document.createTextNode(productos[sel].price);
      let inputquantity = document.createElement("input");
      let cantidad = parseInt(prompt("Introduce cantidad: "));
      inputquantity.value = cantidad;

      let t = cantidad * parseInt(productos[sel].price);
      let txttotal = document.createTextNode(t);

      let con = document.getElementById("totalVAT");

      let sin = document.getElementById("totalNoVAT");

      tdcode.appendChild(txtcode);
      tdref.appendChild(txtref);
      tdprice.appendChild(txtprice);
      tdquantity.appendChild(inputquantity);
      tdtotal.appendChild(txttotal);

      tr.appendChild(tdcode);
      tr.appendChild(tdref);
      tr.appendChild(tdprice);
      tr.appendChild(tdquantity);
      tr.appendChild(tdtotal);

      lineas.appendChild(tr);

      let tclase = document.getElementsByClassName("tlineas");
      let tt = 0;

      for (let x = 0; x < tclase.length; x++) {
        tt += parseInt(tclase[x].innerHTML);

      } // calculo totales "for"


      con.innerHTML = tt + tt * 0.21;
      sin.innerHTML = tt;

      //evento input
      inputquantity.addEventListener("change", function(e) {

        let valor = e.target;
        if (valor.value == 0) {
          valor.parentNode.parentNode.parentNode.removeChild(valor.parentNode.parentNode);

        } else {

          let t = valor.value * parseInt(valor.parentNode.parentNode.children[2].innerHTML);
          valor.parentNode.parentNode.children[4].innerHTML = t;
          let con = document.getElementById("totalVAT");
          let sin = document.getElementById("totalNoVAT");

        }

        let tclase = document.getElementsByClassName("tlineas");
        let tt = 0;

        for (let x = 0; x < tclase.length; x++) {
          tt += parseInt(tclase[x].innerHTML);

        } // calculo totales "for"


        con.innerHTML = tt + tt * 0.21;
        sin.innerHTML = tt;

      }) //fin input

    }) // fin select

  }) // sell fin


  // Finish
  let finish = document.getElementById("idFinishInvoice");
  let factura = document.getElementById("factura");

  finish.addEventListener("click", function() {
    factura.style = "display:block";
  })

  /*
    //modal
    let pagar = document.getElementById("idPayInvoice");
    let id01 = document.getElementById("id01");
    pagar.addEventListener("click", function() {
      id01.style = "display:block";
    })
  */

  let save = document.getElementById("idSaveTable");
  let restore = document.getElementById("idRestoreTable");

  //save
  let tabla = [];
  save.addEventListener("click", function() {
    tabla = [];
    for (let z = 2; z < lineas.children.length; z++) {
      let temp = {};
      temp.code = lineas.children[z].children[0].innerHTML;
      temp.ref = lineas.children[z].children[1].innerHTML;
      temp.price = lineas.children[z].children[2].innerHTML;
      temp.quantity = lineas.children[z].children[3].children[0].value;

      tabla.push(temp);

    }
    console.log(tabla);
    localStorage.setItem("tabla", JSON.stringify(tabla));

  }) // fin save

  //restore
  restore.addEventListener("click", function() {

    let trecu = JSON.parse(localStorage.getItem("tabla"));
    for (let x = 0; x < trecu.length; x++) {


      let tr = document.createElement("tr");
      let tdcode = document.createElement("td");
      let tdref = document.createElement("td");
      let tdprice = document.createElement("td");
      let tdquantity = document.createElement("td");
      let tdtotal = document.createElement("td");
      tdtotal.className = "tlineas";

      let txtcode = document.createTextNode(trecu[x].code);
      let txtref = document.createTextNode(trecu[x].ref);
      let txtprice = document.createTextNode(trecu[x].price);
      let inputquantity = document.createElement("input");
      inputquantity.value = trecu[x].quantity;

      let t = parseInt(trecu[x].quantity) * parseInt(trecu[x].price);
      let txttotal = document.createTextNode(t);

      let con = document.getElementById("totalVAT");

      let sin = document.getElementById("totalNoVAT");


      tdcode.appendChild(txtcode);
      tdref.appendChild(txtref);
      tdprice.appendChild(txtprice);
      tdquantity.appendChild(inputquantity);
      tdtotal.appendChild(txttotal);

      tr.appendChild(tdcode);
      tr.appendChild(tdref);
      tr.appendChild(tdprice);
      tr.appendChild(tdquantity);
      tr.appendChild(tdtotal);

      lineas.appendChild(tr);

      let tclase = document.getElementsByClassName("tlineas");
      let tt = 0;

      for (let x = 0; x < tclase.length; x++) {
        tt += parseInt(tclase[x].innerHTML);

      } // calculo totales "for"


      con.innerHTML = tt + tt * 0.21;
      sin.innerHTML = tt;

      //evento input
      inputquantity.addEventListener("change", function(e) {

        let valor = e.target;
        if (valor.value == 0) {
          valor.parentNode.parentNode.parentNode.removeChild(valor.parentNode.parentNode);

        } else {

          let t = valor.value * parseInt(valor.parentNode.parentNode.children[2].innerHTML);
          valor.parentNode.parentNode.children[4].innerHTML = t;


        }
        let con = document.getElementById("totalVAT");
        let sin = document.getElementById("totalNoVAT");

        let tclase = document.getElementsByClassName("tlineas");
        let tt = 0;

        for (let x = 0; x < tclase.length; x++) {
          tt += parseInt(tclase[x].innerHTML);

        } // calculo totales "for"

        con.innerHTML = tt + tt * 0.21;
        sin.innerHTML = tt;

      }) //fin input
    }

  }) // fin restore


  /////////////////fecha nuevo ////////////
  let flabel = document.createElement("label");
  let txtlabel = document.createTextNode("Rango fechas: ");
  flabel.for = "rangoFechas";
  flabel.appendChild(txtlabel);

  let finput = document.createElement("input");
  finput.id = "rangoFechas";
  finput.value = "";
  finput.placeholder = "dd/mm/yyyy"
  finput.disabled = false;


  let fo = document.getElementById("miform");
  let bpay = document.getElementById("idPayInvoice");

  let btnvalida = document.createElement("button");
  let txtvalida = document.createTextNode("Comprueba rango");
  btnvalida.appendChild(txtvalida);
  let sp = document.createElement("span");

  fo.insertBefore(document.createElement("br"), bpay);
  fo.insertBefore(flabel, bpay);
  fo.insertBefore(finput, bpay);
  fo.insertBefore(sp, bpay);
  fo.insertBefore(document.createElement("br"), bpay);

  fo.insertBefore(btnvalida, bpay);
  fo.insertBefore(document.createElement("br"), bpay);


  //evento btnvalida
  btnvalida.addEventListener("click", function() {
    if(fmal(finput)){
    sp.innerHTML = "Nada en esta fecha";

    let dateFrom = "01/08/2020";
    let dateTo = "31/08/2020";
    let dateCheck = finput.value;

    var d1 = dateFrom.split("/");
    var d2 = dateTo.split("/");
    var c = dateCheck.split("/");

    var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
    var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);


    if (check >= from && check <= to) {
      sp.innerHTML = "";
      sp.innerHTML = "Promoción pantallas";
    }
    // 01/08/2020 al 31/08/2020
    dateFrom = "01/08/2020";
    dateTo = "31/08/2020";
    dateCheck = finput.value;

    d1 = dateFrom.split("/");
    d2 = dateTo.split("/");
    c = dateCheck.split("/");

    from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
    to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    check = new Date(c[2], parseInt(c[1]) - 1, c[0]);


    if (check >= from && check <= to) {
      sp.innerHTML = "";
      sp.innerHTML = "Promoción pantallas";
    }

    // 30/01/2020
    dateFrom = "29/01/2020";
    dateTo = "31/01/2020";
    dateCheck = finput.value;

    d1 = dateFrom.split("/");
    d2 = dateTo.split("/");
    c = dateCheck.split("/");

    from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
    to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    check = new Date(c[2], parseInt(c[1]) - 1, c[0]);


    if (check > from && check < to) {
      sp.innerHTML = "";
      sp.innerHTML = "Pagar proveedores";
    }
    //01/09/2020 al 31/12/2020
    dateFrom = "01/09/2020";
    dateTo = "31/12/2020";
    dateCheck = finput.value;

    d1 = dateFrom.split("/");
    d2 = dateTo.split("/");
    c = dateCheck.split("/");

    from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
    to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    check = new Date(c[2], parseInt(c[1]) - 1, c[0]);


    if (check >= from && check <= to) {
      sp.innerHTML = "";
      sp.innerHTML = "Realizar pedido de discos duros";
    }
  }else
    sp.innerHTML = "Fecha incorrecta";

  }) // fin btnvalida fecha

  /// fin fecha


  //  descarga json tabla
  var jsondescargable = document.getElementById("idDownloadJSON");
  jsondescargable.addEventListener("click", download);

  /// descarga desde boton
  function download() {
    var tabla = [];
    for (var i = 2; i < lineas.children.length; i++) {
      var tablatemp = {};
      tablatemp.code = lineas.children[i].children[0].innerHTML;
      tablatemp.ref = lineas.children[i].children[1].innerHTML;
      tablatemp.price = lineas.children[i].children[2].innerHTML;
      tablatemp.quantity = lineas.children[i].children[3].children[0].value;

      tabla.push(tablatemp);
    }

    //Genera un objeto Blob con los datos en un archivo TXT
    function generarTexto(datos) {


      var texto = [];
      texto.push('Factura:\n');
      for (let y = 0; y < datos.length; y++) {  //recorro el array e inserto en texto tooo junto

        texto.push('Code: ');
        texto.push(datos[y].code);
        texto.push(' ');
        texto.push('Ref: ');
        texto.push(datos[y].ref);
        texto.push(' ');
        texto.push('Precio: ');
        texto.push(datos[y].price);
        texto.push(' ');
        texto.push('Cantidad: ');
        texto.push(datos[y].quantity);
        texto.push('\n');
      }

      return new Blob(texto, {
        type: 'text/plain'
      });
    };


    function descargarArchivo(contenidoEnBlob, nombreArchivo) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      };
      reader.readAsDataURL(contenidoEnBlob);
    };
    var txt = generarTexto(tabla);
    descargarArchivo(txt, 'factura.txt');

  } // fin download


  ///VALIDACIONES ///


  //validacion dni
  var dni = document.getElementById("dni");
  dni.addEventListener("change", dnivalue);

  function dnivalue() {

    var e = document.getElementById("dni");
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    if (!(/^\d{8}[A-Za-z]$/.test(e.value)) || (e.value.charAt(8).toUpperCase() !== letras[(e.value.substr(0, 8)) % 23])) {
      e.style.color = "red";
      return false;
    } else {
      e.removeAttribute("style");
      return true;
    }
  }

  //validacion email
  var email = document.getElementById("email");
  email.addEventListener("change", emailvalue);

  function emailvalue() {

    var e = document.getElementById("email");

    if (e.value != "" && (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(e.value)) {
      e.style.color = "black";
      e.removeAttribute("style");
      return true;

    } else {
      e.style.color = "red";
      return false;
    }
  }

  //validacion fecha


  var fecha = document.getElementById("fecha");
  fecha.addEventListener("change", fechavalue);
  finput.addEventListener("change",fechavalue);

  function fechavalue(e) {

    let f = e.target;
    //var e = document.getElementById("fecha");

    if (f.value != "" && (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/).test(f.value)) {
      f.style.color = "black";
      f.removeAttribute("style");
      return true;
    } else {
      f.style.color = "red";
      return false;
    }
  };


  function fmal(f) {

    if (f.value != "" && (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/).test(f.value)) {
      f.style.color = "black";
      f.removeAttribute("style");
      return true;
    } else {
      f.style.color = "red";
      return false;
    }
  };


} //FIN JS
