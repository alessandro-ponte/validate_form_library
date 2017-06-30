# validate_form_library
Biblioteca para validação de formulário

Biblioteca para validação de formulário onde é necessário passar um objeto e chamar a função validateForm, passando como parametro o evento e o objeto, seguir exemplo abaixo.

Campos que essa biblioteca valida:

Nome;
CPF;
CNPJ;
Telefone;
E-mail;
Campo vazio;

Exemplo de utilização:

$('.button-submit').on('click', function(e){
	var formTO = {
		"classeForm" : ".form",
		"classeErro" : "gfield_error",
		"nome" : [".campo-nome input"],
		"cpf" : [".campo-cpf input"],
		"fone" : [".campo-telefone input"],
		"email" : [".campo-email input"],		
		"cnpj" : [".campo-cnpj input"],
		"naoVazio" : [".campo-razao input", ".campo-cidade select", ".campo-endereco input"]
	}	
	validateForm(e,formTO);
});
