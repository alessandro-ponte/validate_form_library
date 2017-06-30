function validateForm(e, formTO){
    // inibe o comportamento padrao do formulario
    e.preventDefault();

    // Variaveis globais
    var $form               = "";
    var $formTAG            = "";
    contador                = 0;

    // controller que valida o formulario
    $.each(formTO, function(index, value) {
        if(index == "classeForm"){
            $form = varFind(value); 
            $formTAG = $form[0];    
        }

        if(index == "classeErro"){        
            $classeErro = value;
            $form.find("input").removeClass($classeErro);
            $form.find("select").removeClass($classeErro);
        }

        if(index == "nome"){ 
            $valueTemp = value;            
            if ($valueTemp != "") {               
                $.each($valueTemp,function(index, value){       
                    $inputNome  = varFind(value);
                    var $input  = $inputNome[0];
                    $nome       = $input.value;                      
                    validateName($nome, $inputNome, $classeErro);
                });
            }
        }

        if(index == "cpf"){
            $valueTemp = value;    
            if ($valueTemp != "") {
                $.each($valueTemp,function(index, value){
                    $inputCPF = varFind(value);                    
                    var $input  = $inputCPF[0];
                    $cpf       = $input.value;
                    validateCpfCnpj($cpf,1, $inputCPF, $classeErro)
                });
            }
        }

        if(index == "fone"){
            $valueTemp = value;            
            if ($valueTemp != "") {               
                $.each($valueTemp,function(index, value){    
                    $inputFone = varFind(value);
                    var $input  = $inputFone[0];
                    $fone       = $input.value;
                    validateFone($fone, $inputFone, $classeErro);
                });
            }            
        }

        if(index == "email"){
            $valueTemp = value;            
            if ($valueTemp != "") {               
                $.each($valueTemp,function(index, value){     
                    $inputEmail = varFind(value);
                    var $input  = $inputEmail[0];
                    $email       = $input.value;
                    validateEmail($email, $inputEmail, $classeErro);
                });
            }
        }

        if(index == "naoVazio" ){            
            $valueTemp = value;            
            if ($valueTemp != "") {               
                $.each($valueTemp,function(index, value){                     
                    var $inputTexto     = varFind(value);
                    var $input          = $inputTexto[0];
                    var $texto          = $input.value;
                    validateNotEmpty($texto, $inputTexto, $classeErro);                
                });  
            }
        }

        if(index == "cnpj"){
            $valueTemp = value;            
            if ($valueTemp != "") {               
                $.each($valueTemp,function(index, value){      
                    $inputCNPJ = varFind(value);
                    var $input  = $inputCNPJ[0];
                    $cnpj       = $input.value;            
                    validateCpfCnpj($cnpj,2, $inputCNPJ, $classeErro);
                });
            }
        }
    });
    
    // Verifica a quantidade de erros do formulario
    if (contador == 0) {$formTAG.submit();}else{ return false;}
}
function varFind(value){   
    var $var = $( value );    
    return $var;
}
function validateName(nome, inputNome, classeErro) {
    var pattern = /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ\-\ \s]+$/;
    var is_valid_name = pattern.test(nome);    

    if(is_valid_name){return true;}else{inputNome.addClass(classeErro);contador++;return false;}
}

function validateEmail(email, inputEmail, classeErro){
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    var is_valid_email = pattern.test(email);
    if(is_valid_email){return true;} else {inputEmail.addClass(classeErro);contador++;return false;}
}

function validateCpfCnpj(campo,pType, input, classeErro) {
    var campo_filtrado = "", valor_1 = " ", valor_2 = " ", ch = "";
    var valido = false;


    for (i = 0; i < campo.length; i++){
        ch = campo.substring(i, i + 1);
        if (ch >= "0" && ch <= "9"){
            campo_filtrado = campo_filtrado.toString() + ch.toString()
            valor_1 = valor_2;
            valor_2 = ch;
        }
        if ((valor_1 != " ") && (!valido)) valido = !(valor_1 == valor_2);
    }
    if (!valido) campo_filtrado = "12345678912";
    if (campo_filtrado.length < 11){
        for (i = 1; i <= (11 - campo_filtrado.length); i++){campo_filtrado = "0" + campo_filtrado;}
    }
if(pType <= 1){    
    if ( ( campo_filtrado.substring(9,11) == valida_CPF( campo_filtrado.substring(0,9) ) ) && ( campo_filtrado.substring(11,12)=="") ){return true;}else{input.addClass(classeErro);contador++;}
}
if((pType == 2) || (pType == 0)){    
    if (campo_filtrado.length >= 14){       
        if ( campo_filtrado.substring(12,14) == valida_CNPJ( campo_filtrado.substring(0,12) ) ){ return true;}
    }else{input.addClass(classeErro);contador++;}
}

return false;
}

function valida_CNPJ(vCNPJ){
    var mControle = "";
    var aTabCNPJ = new Array(5,4,3,2,9,8,7,6,5,4,3,2);
    for (i = 1 ; i <= 2 ; i++){
        mSoma = 0;
        for (j = 0 ; j < vCNPJ.length ; j++)
            mSoma = mSoma + (vCNPJ.substring(j,j+1) * aTabCNPJ[j]);
        if (i == 2 ) mSoma = mSoma + ( 2 * mDigito );
        mDigito = ( mSoma * 10 ) % 11;
        if (mDigito == 10 ) mDigito = 0;
        mControle1 = mControle ;
        mControle = mDigito;
        aTabCNPJ = new Array(6,5,4,3,2,9,8,7,6,5,4,3);
    }
    return( (mControle1 * 10) + mControle );
}

function valida_CPF(vCPF){
    var mControle = ""
    var mContIni = 2, mContFim = 10, mDigito = 0;
    for (j = 1 ; j <= 2 ; j++){
        mSoma = 0;
        for (i = mContIni ; i <= mContFim ; i++)
            mSoma = mSoma + (vCPF.substring((i-j-1),(i-j)) * (mContFim + 1 + j - i));
        if (j == 2 ) mSoma = mSoma + ( 2 * mDigito );
        mDigito = ( mSoma * 10 ) % 11;
        if (mDigito == 10) mDigito = 0;
        mControle1 = mControle;
        mControle = mDigito;
        mContIni = 3;
        mContFim = 11;
    }
    return( (mControle1 * 10) + mControle );
}
function validateFone(fone, inputFone, classeErro){
    var pattern = /^[0-9]+$/;
    var is_valid_fone = pattern.test(name);
    if (fone.length >= 10) {return true;}else{inputFone.addClass(classeErro);contador++;return false;}
}

function validateNotEmpty(text, inputTexto, classeErro){
    if(text.length > 0) {return true;}else{inputTexto.addClass(classeErro);contador++;return false;}
}
// function validateSelect(select){
// if (select "option:eq(0)" == 0){alert("0");}else{alert("true");}
//     // $('#selectBox option:eq(3)').prop('selected', true);
// }
