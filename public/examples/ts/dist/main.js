// @ts-nocheck
var ClienteContratoForm = /** @class */ (function () {
    function ClienteContratoForm(parameters, functions, form) {
        this.parameters = parameters;
        this.functions = functions;
        this.form = form;
        this.buttons = {
            aguardando_assinatura: AguardandoAssinatura,
            bloqueio_manual: Bloquear,
            finalizar_importacao: FinalizarImportacao,
            libera_internet: LiberarManualmente,
            ativar_outro: AtivarOutro,
            desistiu: Desistiu,
            desativar: Desativar,
            gvf: GerarFinanceiro,
            gfa: GerarFinanceiroAdicional,
            gera_finan_cond_pagamento: GeraFinanCondPagamento,
            btn_fat_vinculado: GerarFinanceiroAvulso,
            btn_cancelar_gera_remanescentes: DesativarGerarFinanceiroRemanescente,
            cancelar_contrato_financeiro_sv: DesativarCancelarFinanceiroNaoVencido,
            desativar_fn: DesativarCancelarFinanceiro,
            desbloq_confianca: DesbloqueioConfianca,
            liberacao_de_suspensao_parcial: LiberacaoSuspensaoParcial,
            suspender_temporariamente: SuspenderTemporariamente,
            vincular_contrato_vindi: VincularContratoVindi,
            aviso_atraso: AvisoAtraso,
        };
    }
    ClienteContratoForm.prototype.onInit = function () {
        var _this = this;
        this.functions().botao('novo').hide();
        this.functions().aba('aba_alteracoes_contrato').click(function () {
            alert(IXC.tradutor.translate('A altera��o wizard n�o pode mais ser realizada neste formul�rio. '
                + 'A partir de agora, para realizar altera��es, acesse o menu ?Contratos? > bot�o ?Altera��o wizard?.'));
        });
        if (IXCparametros.ativar_contrato === 'N') {
            this.functions().campo('data_assinatura').mostra();
        }
        else {
            this.functions().campo('data_assinatura').esconde();
        }
        if (typeof IXC_SUBPROJETO !== 'undefined' && IXC_SUBPROJETO === '6') {
            this.parameters().campo_grid_p.motivo_adicional = function () { return JSON.stringify([
                {
                    TB: 'fn_areceber_mot_cancelamento_adicional.ativo',
                    OP: '=',
                    P: 'S',
                },
                {
                    TB: 'fn_areceber_mot_cancelamento_adicional.id_fn_areceber_mot_cancelamento',
                    OP: '=',
                    P: _this.functions().campo('motivo_cancelamento').val(),
                },
            ]); };
            this.form.getElementById('fieldset_dica_motivo_adicional_cliente_contrato').style.display = 'none';
            this.functions().campo('motivo_cancelamento').change(function () {
                _this.functions().campo('motivo_adicional').val('');
                _this.functions().campo('concorrente_mot_adicional').val('');
                if (_this.functions().campo('motivo_cancelamento').val() === '') {
                    _this.functions().campo('motivo_adicional').esconde();
                    _this.functions().campo('concorrente_mot_adicional').esconde();
                    _this.form.getElementById('fieldset_dica_motivo_adicional_cliente_contrato').style.display = 'none';
                }
                if (_this.functions().campo('motivo_cancelamento').val() !== '') {
                    _this.functions().campo('motivo_adicional').mostra();
                    _this.functions().campo('concorrente_mot_adicional').mostra();
                    _this.form.getElementById('fieldset_dica_motivo_adicional_cliente_contrato').style.display = 'block';
                }
            });
        }
        this.parameters().campo_grid_p.motivo_cancelamento = function () { return JSON.stringify([
            { TB: 'fn_areceber_mot_cancelamento.libera_periodo', OP: '=', P: 'N' },
            { TB: 'fn_areceber_mot_cancelamento.ativo', OP: '=', P: 'S' },
            { TB: 'fn_areceber_mot_cancelamento.finalidade', OP: '!=', P: 'F' },
        ]); };
        if (IXCparametros.geracao_por_fatura === 'S') {
            if (this.functions().botao('gvf').context && this.functions().botao('gvf').context.textContent) {
                this.functions().botao('gvf').context.textContent = 'Gerar fatura';
            }
            this.functions().botao('gfa').hide();
            this.functions().botao('gera_finan_cond_pagamento').hide();
            this.functions().botao('gerar_financeiro_por_fatura').hide();
            this.functions().botao('desativar_fn').hide();
            this.functions().botao('cancelar_contrato_financeiro_sv').hide();
            this.functions().aba('vendas').hide();
            this.functions().aba('financeiro').hide();
            this.functions().campo('cc_previsao').esconde();
            this.functions().campo('base_geracao_tipo_doc').esconde();
            var getNav = this.form.querySelectorAll('nav#print_form');
            getNav.forEach(function (nav) {
                var span = nav.querySelector('div.button_print span');
                if (span.textContent === IXC.tradutor.translate('Financeiro')) {
                    span.textContent = IXC.tradutor.translate('Faturamento');
                }
            });
        }
        else {
            this.functions().botao('gerar_financeiro_por_fatura').hide();
            this.functions().botao('gerar_fatura_e_financeiro').hide();
            this.functions().aba('faturas').hide();
        }
        this.functions().campo('id_vd_contrato').change(function () {
            var idVdContrato = _this.functions().campo('id_vd_contrato').val();
            if (idVdContrato > 0) {
                var request = $.ajax({
                    url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_31973',
                    type: 'POST',
                    async: false,
                    data: { idVdContrato: idVdContrato },
                });
                request.done(function (currency) {
                    if (currency.type === 'success') {
                        _this.functions().campo('moeda').val(currency.currency).trigger('blur');
                    }
                    else {
                        alerta('error', currency.message);
                    }
                });
            }
        });
        if (this.functions().campo('btn_nf_ativacao').length) {
            var htmlInput = '<dt class="ixc-containers" variant="label" size="md"></dt>'
                + '<dd class="ixc-containers" variant="input" size="md">'
                + '<button type="button" name="btn_nf_ativacao" id="btn_nf_ativacao" '
                + 'value=" Faturar ativa��o/instala��o" style="cursor: auto;border-radius: 4px;" class="ixc-buttons" '
                + 'variant="input"> Faturar ativa��o/instala��o</button>'
                + '</dd>';
            $('[for=btn_nf_ativacao]').closest('dl').html(htmlInput);
        }
        this.parameters().campo_grid_p.id_tipo_contrato = function () { return JSON.stringify([
            {
                TB: 'cliente_contrato_tipo.ativo', OP: '=', P: 'S', C: 'AND', G: '1',
            },
            {
                TB: 'cliente_contrato_tipo.id',
                OP: '=',
                P: _this.functions().campo('id_tipo_contrato').val(),
                C: 'OR',
                G: '1',
            },
        ]); };
        this.functions().campo('motivo_restricao_auto_desbloq').esconde();
        this.functions().botao('ativar').click(function () {
            IXC.form('cliente_contrato').this.functions().botao('salvar').attr('disabled', 'true');
        });
        if (!isMobile()) {
            var clienteContratoClienteContratoComodato = IXC.autostart(false).grid('cliente_contrato_cliente_contrato_comodato');
            if (clienteContratoClienteContratoComodato.length > 0) {
                clienteContratoClienteContratoComodato.funcoes().botao('adicionar_qr_code').hide();
                clienteContratoClienteContratoComodato.funcoes().botao('remover_p_qr_code').hide();
            }
            IXC.autostart(true);
        }
        if (typeof IXC_SUBPROJETO !== 'undefined' && IXC_SUBPROJETO !== '3') {
            $.get('aplicativo/tv_usuarios/action/action.php?action=botaoAjax_27233')
                .done(function (data) {
                if (data.data.toString() === 'false') {
                    IXC.grid('cliente_contrato_tv_usuarios').funcoes().botao('ativar_desativar_login_watch').hide();
                }
            });
        }
        if (IXCparametros.contrato_ass_digital === 'N') {
            this.functions().campo('gerar_finan_assin_digital_contrato').esconde();
        }
        this.functions().campo('base_geracao_tipo_doc').change(function () {
            var oReq = new XMLHttpRequest();
            oReq.onload = function () {
                var response = JSON.parse(oReq.response);
                var oldSelectedOption = response.base_geracao_tipo_doc;
                var selectedOption = _this.functions().campo('base_geracao_tipo_doc').marcado().val();
                if (selectedOption.toString() !== oldSelectedOption.toString()
                    // eslint-disable-next-line no-restricted-globals,no-alert
                    && confirm('Antes de mudar este par�metro, certifique-se que n�o h� nenhuma nota fiscal gerada com a op��o anterior.'
                        + '\nVoc� tem certeza que deseja mud�-lo?')) {
                    _this.functions().campo('base_geracao_tipo_doc').marcar(selectedOption);
                }
                else {
                    _this.functions().campo('base_geracao_tipo_doc').marcar(oldSelectedOption);
                }
                if ((IXCparametros.gera_por_tipo_doc_produtos === 'S' && _this.functions().campo('base_geracao_tipo_doc').marcado().val() === 'P')
                    || (_this.functions().campo('base_geracao_tipo_doc').marcado().val() === 'PROD')) {
                    _this.hideOptionalDocumentTypeFields();
                }
                else {
                    _this.showOptionalDocumentTypeFields();
                }
            };
            oReq.open('post', 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_30317', true);
            oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            oReq.send(new URLSearchParams({ id_contrato: _this.functions().campo('id').val() }).toString());
        });
        this.functions().campo('assinatura_digital').change(function () {
            if (_this.functions().campo('assinatura_digital').marcado().val() === 'S') {
                _this.functions().campo('gerar_finan_assin_digital_contrato').mostra();
            }
            else {
                _this.functions().campo('gerar_finan_assin_digital_contrato').esconde();
            }
        });
        if (this.functions().campo('status').val() === 'A') {
            $('form[name=cliente_contrato] #ativar').hide();
        }
        this.functions().campo('cep').closest('dd').append($('<button>').attr('type', 'button')
            .attr('variant', 'input')
            .attr('class', 'ixc-buttons group_button')
            .html(IXC.tradutor.translate('Validar'))
            .click(function () {
            if (_this.functions().campo('cep').val() === '') {
                alerta('error', 'Preencha o CEP!');
            }
            else {
                $('input, button, body').css({ cursor: 'progress' });
                $.ajax({
                    type: 'GET',
                    url: 'aplicativo/cliente_contrato/action/action.php',
                    data: ({
                        action: 'botaoAjax_22267',
                        cep: _this.functions().campo('cep').val()
                    }),
                    dataType: 'json',
                    success: function (j) {
                        $('body').css({ cursor: 'default' });
                        $('input, button, body').css({ cursor: 'auto' });
                        if (j.end != null) {
                            $('form[name=cliente_contrato]').formInsere_val_campo('endereco', j.end, 'i');
                        }
                        if (j.cidade != null) {
                            $('form[name=cliente_contrato]').formInsere_val_campo('cidade', j.cidade, 'i');
                        }
                        if (j.bairro != null) {
                            $('form[name=cliente_contrato]').formInsere_val_campo('bairro', j.bairro, 'i');
                        }
                    },
                    error: function (xhr) {
                        if (xhr.status.toString() === '200') {
                            alerta('error', xhr.responseText);
                        }
                        else if (xhr.status.toString() === '400') {
                            alerta('error', 'P�gina n�o existe!');
                        }
                        else if (xhr.status.toString() === '500') {
                            alerta('error', 'Erro do servidor, tente novamente!');
                        }
                        else {
                            alerta('error', 'Erro desconhecido, tente novamente!');
                        }
                        $('body').css({ cursor: 'default' });
                        $('input, button, body').css({ cursor: 'auto' });
                    },
                });
            }
        }));
        this.functions().campo('ativacao_numero_parcelas').change(function () {
            var descVencimentos = _this.montaParcAtivacao();
            _this.functions().campo('ativacao_vencimentos').val(descVencimentos);
            _this.calcValParcAtivacao();
        });
        this.functions().campo('taxa_instalacao').change(function () {
            _this.calcValParcAtivacao();
        });
        $('form[name=cliente_contrato] #btn_nf_ativacao').click(function () {
            var idContrato = _this.functions().campo('id').val();
            var idCliente = _this.functions().campo('id_cliente').val();
            var idFilial = _this.functions().campo('id_filial').val();
            var idTipoDoc = _this.functions().campo('id_tipo_doc_ativ').val();
            var idProduto = _this.functions().campo('id_produto_ativ').val();
            var idCondPag = _this.functions().campo('id_cond_pag_ativ').val();
            var idVendedor = _this.functions().campo('id_vendedor_ativ').val();
            var valorProduto = _this.functions().campo('taxa_instalacao').val();
            valorProduto = parseFloat(valorProduto.replace('R$', '').replace('.', '').replace(',', '.'));
            var previsao = _this.functions().campo('cc_previsao').val();
            switch (previsao) {
                case 'S':
                    previsao = 'S';
                    break;
                case 'N':
                    previsao = 'N';
                    break;
                case 'P':
                    previsao = IXCparametros.previsao_contas_areceber;
                    break;
                default:
                    previsao = IXCparametros.previsao_contas_areceber;
            }
            var dataAtual = new Date();
            var dia = dataAtual.getDate();
            var mes = dataAtual.getMonth();
            var ano = dataAtual.getFullYear();
            var dataFormatada = moment().year(ano).month(mes).date(dia)
                .format('DD/MM/YYYY');
            var msg = IXC.tradutor.translate('N�o foi poss�vel prosseguir. Para utilizar o bot�o '
                + "'Faturar ativa��o/instala��o' preencha todos os campos da se��o 'Taxas de ativa��o'.");
            if ((idContrato === '') || (idContrato === '0')) {
                alerta(IXC.tradutor.translate('Preencha o ID do Contrato!'));
            }
            else if ((idCliente === '') || (idCliente === '0')) {
                alerta('error', msg);
            }
            else if ((idTipoDoc === '') || (idTipoDoc === '0')) {
                alerta('error', msg);
            }
            else if ((idProduto === '') || (idProduto === '0')) {
                alerta(IXC.tradutor.translate('Preencha o ID do Produto!'));
            }
            else if ((idCondPag === '') || (idCondPag === '0')) {
                alerta(IXC.tradutor.translate('Preencha o ID da Condi��o de pagamento!'));
            }
            else if ((idVendedor === '') || (idVendedor === '0')) {
                alerta('error', msg);
            }
            else {
                _this.functions().salvar();
                var formulario = newFormModal(6);
                var taxaAtivacao = true;
                $(formulario).flexform('vd_saida', { taxaAtivacao: taxaAtivacao }).formNovo()
                    .formInsere_val_campo('id_tipo_documento', idTipoDoc, 'i')
                    .formInsere_val_campo('status', 'A', 's')
                    .formInsere_val_campo('previsao', previsao, 'r')
                    .formInsere_val_campo('id_cliente', idCliente, 'i')
                    .formInsere_val_campo('filial_id', idFilial, 'i')
                    .formInsere_val_campo('id_produto_ativacao', idProduto, 'i')
                    .formInsere_val_campo('id_condicao_pagamento', idCondPag, 'i')
                    .formInsere_val_campo('id_contrato_avulso', idContrato, 'i')
                    .formInsere_val_campo('id_comissionado', idVendedor, 'i')
                    .formInsere_val_campo('valor_produto_ativacao', valorProduto, 's')
                    .formInsere_val_campo('data_emissao', dataFormatada, 'i')
                    .formInsere_val_campo('data_saida', dataFormatada, 'i');
            }
        });
        this.naoAlteraDataBase = false;
        this.functions().campo('id').change(function () {
            var idContratoDataBase = _this.functions().campo('id').val();
            $.post('aplicativo/cliente_contrato/action/action.php?action=botaoAjax_27687', { id_contrato: idContratoDataBase }, function (response) {
                _this.responseAjax27687 = response;
            });
        });
        if (IXCparametros.permite_alteracao_data_base === 'S') {
            this.functions().campo('data').change(function () {
                _this.verificarDataBase();
            });
        }
        var idClienteProspeccao = this.functions().campo('id_cliente').val();
        if (idClienteProspeccao != null && IXCparametros.cliente_exibir_prospeccao === 'N') {
            var request = $.ajax({
                url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_27744',
                type: 'POST',
                async: false,
                data: { idClienteProspeccao: idClienteProspeccao },
            });
            request.done(function (response) {
                if (response.crm === 'S') {
                    _this.parameters().campo_grid_p.id_cliente = function () { return JSON.stringify([
                        {
                            TB: 'cliente.crm', OP: 'IN', P: "'N','S'", G: '1', C: 'OR',
                        },
                    ]); };
                }
            });
        }
        var tipAddress = document.querySelector('#endereco_padrao_alert');
        tipAddress.setAttribute('style', 'display = none');
        this.functions().campo('endereco_padrao_cliente').change(function () {
            _this.alterarEnderecoPadrao();
            _this.trocaCamposEndereco();
            _this.showTipAddress(tipAddress);
        });
        this.functions().campo('tipo_localidade').change(function () {
            if (_this.functions().campo('endereco_padrao_cliente').prop('checked')) {
                _this.functions().campo('tipo_localidade').marcar(_this.functions().campo('tipo_localidade').val());
                alerta('alerts', IXC.tradutor.translate('N�o � poss�vel alterar a localidade quando est� considerando o endere�o '
                    + 'padr�o do cliente. Caso necess�rio, realize a altera��o diretamente no cadastro do cliente.'));
            }
        });
        this.functions().campo('id_cliente').change(function () {
            if (_this.functions().campo('endereco_padrao_cliente').marcado().val() === 'S') {
                _this.alterarEnderecoPadrao();
            }
        });
        this.functions().campo('bloqueio_automatico').change(function () {
            _this.mudarvisibilidadecampo('bloqueio_automatico', 'nao_bloquear_ate');
        });
        this.functions().campo('aviso_atraso').change(function () {
            _this.mudarvisibilidadecampo('aviso_atraso', 'nao_avisar_ate');
        });
        var formatString = function (campo) {
            _this.functions().campo(campo).blur(function () {
                _this.functions().campo(campo).val(_this.functions().campo(campo).val().replace(/\s+/g, ' ')
                    .trim());
            });
        };
        formatString('endereco');
        formatString('bairro');
        formatString('complemento');
        formatString('referencia');
        formatString('numero');
        if (!isMobile()) {
            this.functions().campo('obs_contrato').width(IXC.form('cliente_contrato').width() - 250).height(200);
            this.functions().campo('alerta_contrato').width(IXC.form('cliente_contrato').width() - 250).height(200);
        }
        this.functions().campo('isentar_contrato').change(function () {
            var free = _this.functions().campo('isentar_contrato').prop('checked');
            if (free) {
                _this.functions().campo('renovacao_automatica').marcar('N');
                _this.functions().campo('bloqueio_automatico').marcar('N');
                _this.functions().campo('aviso_atraso').marcar('N');
                alerta('alerts', IXC.tradutor.translate("Devido � altera��o no campo 'Isentar contrato', os campos 'Bloqueio autom�tico', "
                    + "'Aviso autom�tico' e 'Gera financeiro autom�tico' foram alterados para 'N�o'."));
            }
            else {
                _this.functions().campo('renovacao_automatica').marcar('S');
                _this.functions().campo('bloqueio_automatico').marcar('S');
                _this.functions().campo('aviso_atraso').marcar('S');
                alerta('alerts', IXC.tradutor.translate("Devido � altera��o no campo 'Isentar contrato', os campos 'Bloqueio autom�tico', "
                    + "'Aviso autom�tico' e 'Gera financeiro autom�tico' foram alterados para 'Sim'."));
            }
        });
        this.functions().campo('renovacao_automatica').change(function () {
            _this.setFieldState();
        });
        this.functions().campo('bloqueio_automatico').change(function () {
            _this.setFieldState();
        });
        this.functions().campo('aviso_atraso').change(function () {
            _this.setFieldState();
        });
    };
    ClienteContratoForm.prototype.onCancel = function () {
    };
    ClienteContratoForm.prototype.onDelete = function () {
    };
    ClienteContratoForm.prototype.onEdit = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        var esconderCampoSeVazio = function (campo) {
            var valorCampo = _this.functions().campo(campo).val();
            if (valorCampo === '' || valorCampo === null) {
                _this.functions().campo(campo).esconde();
            }
        };
        esconderCampoSeVazio('id_responsavel_cancelamento');
        esconderCampoSeVazio('id_responsavel_negativacao');
        esconderCampoSeVazio('id_responsavel_desistencia');
        if (typeof IXC_SUBPROJETO !== 'undefined' && IXC_SUBPROJETO === '6') {
            this.form.getElementById('fieldset_dica_motivo_adicional_cliente_contrato').style.display = 'none';
            if (!this.functions().campo('motivo_cancelamento').val()) {
                this.functions().campo('motivo_adicional').esconde();
                this.functions().campo('concorrente_mot_adicional').esconde();
            }
            if (this.functions().campo('motivo_cancelamento').val() !== '') {
                this.functions().campo('motivo_adicional').mostra();
                this.functions().campo('concorrente_mot_adicional').mostra();
            }
            this.functions().campo('motivo_cancelamento').change(function () {
                _this.functions().campo('motivo_adicional').val('');
                _this.functions().campo('concorrente_mot_adicional').val('');
                if (!_this.functions().campo('motivo_cancelamento').val()) {
                    _this.functions().campo('motivo_adicional').esconde();
                    _this.functions().campo('concorrente_mot_adicional').esconde();
                    _this.form.getElementById('fieldset_dica_motivo_adicional_cliente_contrato').style.display = 'none';
                }
                if (_this.functions().campo('motivo_cancelamento').val()) {
                    _this.functions().campo('motivo_adicional').mostra();
                    _this.functions().campo('concorrente_mot_adicional').mostra();
                    _this.form.getElementById('fieldset_dica_motivo_adicional_cliente_contrato').style.display = 'block';
                }
            });
        }
        var flag = false;
        var idVdContract = this.functions().campo('id_vd_contrato').val();
        this.functions().campo('id_vd_contrato').change(function () {
            var verifyPlan = $.ajax({
                url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_32947',
                type: 'POST',
                async: false,
                data: { idVdContract: idVdContract },
            });
            verifyPlan.done(function (response) {
                if (response.quantity > 1 && flag === false) {
                    alerta('alerts', IXC.tradutor.translate('O plano de venda possui mais de uma velocidade, portanto, '
                        + '� necess�rio alterar manualmente a nova velocidade no login.'));
                    flag = true;
                }
            });
        });
        this.functions().campo('data_assinatura').esconde();
        if (IXCparametros.ativar_contrato === 'N') {
            this.functions().campo('data_assinatura').mostra();
        }
        this.functions().campo('id_vd_contrato').change(function () {
            var idVdContrato = _this.functions().campo('id_vd_contrato').val();
            if (idVdContrato > 0 || _this.functions().campo('id').val() > 0) {
                var request = $.ajax({
                    url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_32130',
                    type: 'POST',
                    async: false,
                    data: { id_vd_contrato: idVdContrato },
                });
                request.done(function (response) {
                    if (response.type_plan !== _this.functions().campo('tipo').marcado().val()) {
                        if (confirm(IXC.tradutor.translate('Ao alterar o plano de venda, o tipo do contrato ser� alterado para o tipo do '
                            + 'plano de venda. '
                            + '\n'
                            + 'Ex.: O contrato � do tipo "internet", e o plano de venda � do tipo "telefonia", '
                            + 'portanto, o tipo do contrato ser� alterado para "telefonia".'))) {
                            _this.functions().campo('tipo').marcar(response.type_plan);
                        }
                    }
                });
            }
        });
        var permissionFnAreceber = IXC_perm.cliente_contrato_rel_areceber;
        if (permissionFnAreceber === undefined || permissionFnAreceber.bloquear_acesso_form === 'L') {
            var span = document.createElement('span');
            span.style.lineHeight = '24px';
            span.style.padding = '5px';
            span.style.background = 'none';
            span.style.boxShadow = 'none';
            var input_1 = document.createElement('input');
            input_1.type = 'checkbox';
            input_1.value = 'S';
            var gridFnAreceber_1 = IXC.grid('cliente_contrato_cliente_contrato_rel_areceber');
            $(input_1).click(function () {
                if ($(input_1).is(':checked')) {
                    gridFnAreceber_1.flexOptions({ parametros: 'false' }).flexReload();
                }
                else {
                    gridFnAreceber_1.flexOptions({ parametros: '[{"TB":"fn_areceber.status","OP":"!=","P":"C"}]' }).flexReload();
                }
            });
            span.appendChild(input_1);
            span.appendChild(document.createTextNode('Mostrar cancelados'));
            $(span).insertBefore(this.functions().painel('financeiro').find('.pPageButtons'));
            gridFnAreceber_1.flexOptions({ parametros: '[{"TB":"fn_areceber.status","OP":"!=","P":"C"}]' });
        }
        var permissionVdSaida = IXC_perm.vd_saida;
        if (permissionVdSaida === undefined || permissionVdSaida.bloquear_acesso_form === 'L') {
            var spanVenda = document.createElement('span');
            spanVenda.style.lineHeight = '24px';
            spanVenda.style.padding = '5px';
            spanVenda.style.background = 'none';
            spanVenda.style.boxShadow = 'none';
            var inputVenda_1 = document.createElement('input');
            inputVenda_1.type = 'checkbox';
            inputVenda_1.value = 'S';
            var gridVenda_1 = IXC.grid('cliente_contrato_vd_saida');
            $(inputVenda_1).click(function () {
                if ($(inputVenda_1).is(':checked')) {
                    gridVenda_1.flexOptions({ parametros: 'false' }).flexReload();
                }
                else {
                    gridVenda_1.flexOptions({ parametros: '[{"TB":"vd_saida.status","OP":"!=","P":"C"}]' }).flexReload();
                }
            });
            spanVenda.appendChild(inputVenda_1);
            spanVenda.appendChild(document.createTextNode('Mostrar cancelados'));
            $(spanVenda).insertBefore(this.functions().painel('vendas').find('.pPageButtons'));
            gridVenda_1.flexOptions({ parametros: '[{"TB":"vd_saida.status","OP":"!=","P":"C"}]' });
        }
        var spanComodato = document.createElement('span');
        spanComodato.style.lineHeight = '24px';
        spanComodato.style.padding = '5px';
        spanComodato.style.background = 'none';
        spanComodato.style.boxShadow = 'none';
        var inputComodato = document.createElement('input');
        inputComodato.type = 'checkbox';
        inputComodato.value = 'S';
        var gridComodato = IXC.grid('cliente_contrato_vd_saida');
        $(inputComodato).click(function () {
            if ($(inputComodato).is(':checked')) {
                gridComodato.flexOptions({ parametros: 'false' }).flexReload();
            }
            else {
                gridComodato.flexOptions({ parametros: '[{"TB":"movimento_produtos.status_comodato","OP":"=","P":"E"}]' }).flexReload();
            }
        });
        spanComodato.appendChild(inputComodato);
        spanComodato.appendChild(document.createTextNode(IXC.tradutor.translate('Visualizar baixas')));
        $(spanComodato).insertBefore(this.functions().painel('comodato').find('.pPageButtons'));
        gridComodato.flexOptions({ parametros: '[{"TB":"movimento_produtos.status_comodato","OP":"=","P":"E"}]' });
        if (IXCparametros.suspensao_temporaria === 'S') {
            if (this.functions().campo('contrato_suspenso').val() === 'N') {
                this.functions().botao('remover_suspensao').hide();
                this.functions().botao('suspender_temporariamente').show();
            }
            else {
                this.functions().botao('remover_suspensao').show();
                this.functions().botao('suspender_temporariamente').hide();
            }
        }
        else if (this.functions().campo('contrato_suspenso').val() === 'S') {
            this.functions().botao('remover_suspensao').show();
            this.functions().botao('suspender_temporariamente').hide();
        }
        else {
            this.functions().botao('remover_suspensao').hide();
            this.functions().botao('suspender_temporariamente').hide();
        }
        if ((this.functions().campo('data_inicial_suspensao').val() === ''
            || this.functions().campo('data_inicial_suspensao').val())
            && this.functions().campo('contrato_suspenso').val() === 'N' && IXCparametros.suspensao_temporaria === 'S') {
            this.functions().campo('data_inicial_suspensao').val(moment().format('DD/MM/YYYY'));
        }
        var restricaoBloqueio = this.functions().campo('restricao_auto_desbloqueio').val();
        this.esconderCamposBloqReducaoMsg(restricaoBloqueio, 'motivo_restricao_auto_desbloq');
        this.functions().campo('restricao_auto_desbloqueio').change(function () {
            _this.esconderCamposBloqReducaoMsg(_this.functions().campo('restricao_auto_desbloqueio').val(), 'motivo_restricao_auto_desbloq');
        });
        var restricaoReducao = this.functions().campo('restricao_auto_libera_susp_parcial').val();
        this.esconderCamposBloqReducaoMsg(restricaoReducao, 'motivo_restri_auto_libera_parc');
        this.functions().campo('restricao_auto_libera_susp_parcial').change(function () {
            _this.esconderCamposBloqReducaoMsg(_this.functions().campo('restricao_auto_libera_susp_parcial').val(), 'motivo_restri_auto_libera_parc');
        });
        $.getJSON('aplicativo/cliente_contrato/action/action.php', {
            action: 'botaoAjax_28428',
            data_renovacao: this.functions().campo('data_renovacao').val(),
            status: this.functions().campo('status').val(),
            data_expiracao: this.functions().campo('data_expiracao').val(),
        }, function (resposta) {
            if (resposta !== false) {
                $('body').IXCnotificacao({
                    tipo: resposta.tipo,
                    timeout: 27000,
                    titulo: resposta.titulo,
                    mensagem: resposta.mensagem,
                });
            }
        });
        localStorage.setItem('edit', 'true');
        this.functions().campo('id').trigger('change');
        this.parameters().campo_grid_p.id_vd_contrato = function () { return JSON.stringify([
            {
                TB: 'vd_contratos.Ativo', OP: '=', P: 'S', C: 'AND', G: '1',
            },
            {
                TB: 'vd_contratos.id',
                OP: '=',
                P: _this.functions().campo('id_vd_contrato').val(),
                C: 'OR',
                G: '1',
            },
        ]); };
        if (IXCparametros.filtrar_plano_venda_filial_contrato === 'S') {
            var idFilialContrato_1 = this.functions().campo('id_filial').val();
            if (idFilialContrato_1) {
                this.parameters().campo_grid_p.id_vd_contrato = function () { return JSON.stringify([
                    {
                        TB: 'vd_contratos.id_filial',
                        OP: '=',
                        P: idFilialContrato_1,
                        C: 'AND',
                        G: '1',
                    },
                    {
                        TB: 'vd_contratos.id_filial', OP: '=', P: '', C: 'OR', G: '1',
                    },
                    {
                        TB: 'vd_contratos.ativo', OP: '=', P: 'S', C: 'AND', G: '2',
                    },
                ]); };
            }
        }
        if (this.functions().campo('assinatura_digital').marcado().val() === 'S') {
            this.functions().campo('gerar_finan_assin_digital_contrato').mostra();
        }
        this.functions().campo('data_cancelamento').prop('disabled', true);
        this.functions().campo('data_cancelamento').prop('readonly', true);
        if (IXCparametros.contrato_permite_alterar_data_canc === 'S'
            && (typeof ((_c = (_b = (_a = IXC_perm === null || IXC_perm === void 0 ? void 0 : IXC_perm.cliente_contrato) === null || _a === void 0 ? void 0 : _a.campos) === null || _b === void 0 ? void 0 : _b.data_cancelamento) === null || _c === void 0 ? void 0 : _c.tipo_e) === 'undefined'
                || ((_f = (_e = (_d = IXC_perm === null || IXC_perm === void 0 ? void 0 : IXC_perm.cliente_contrato) === null || _d === void 0 ? void 0 : _d.campos) === null || _e === void 0 ? void 0 : _e.data_cancelamento) === null || _f === void 0 ? void 0 : _f.tipo_e) === 'H')) {
            this.functions().campo('data_cancelamento').prop('disabled', false);
            this.functions().campo('data_cancelamento').prop('readonly', false);
        }
        this.functions().campo('data_renovacao').change(function () {
            alerta('alerts', 'Atualizar a data manualmente n�o ir� alterar a data de expira��o desse contrato.');
        });
        this.functions().campo('data_ativacao').change(function () {
            alerta('alerts', 'Atualizar a data manualmente n�o ir� alterar a data de expira��o desse contrato.');
        });
        this.functions().campo('fidelidade').change(function () {
            alerta('alerts', 'Alterar o valor deste campo n�o ira afetar a data de expirac�o dos contratos.');
        });
        if (this.functions().campo('status').val() === 'A'
            && this.functions().campo('status_internet').val() !== 'AA') {
            this.functions().botao('ativar_outro').hide();
        }
        this.parameters().campo_grid_p.id_vendedor = function () { return JSON.stringify([
            {
                TB: 'vendedor.status', OP: '=', P: 'A', C: 'AND', G: '1',
            },
            {
                TB: ' vendedor.id',
                OP: '=',
                P: _this.functions().campo('id_vendedor').val(),
                C: 'OR',
                G: '1',
            },
        ]); };
        this.alterarEnderecoPadrao();
        this.functions().campo('endereco_padrao_cliente').change(function () {
            _this.alterarEnderecoPadrao();
        });
        this.functions().campo('id_cliente').change(function () {
            if (_this.functions().campo('endereco_padrao_cliente').marcado().val() === 'S') {
                _this.alterarEnderecoPadrao();
            }
        });
        this.trocaCamposEndereco();
        this.functions().campo('bloqueio_automatico').change(function () {
            _this.mudarvisibilidadecampo('bloqueio_automatico', 'nao_bloquear_ate');
        });
        this.functions().campo('aviso_atraso').change(function () {
            _this.mudarvisibilidadecampo('aviso_atraso', 'nao_avisar_ate');
        });
        this.mudarvisibilidadecampo('bloqueio_automatico', 'nao_bloquear_ate');
        this.mudarvisibilidadecampo('aviso_atraso', 'nao_avisar_ate');
        if (this.functions().campo('alerta_contrato').val() !== '') {
            $('body').IXCnotificacao({
                tipo: 'alerta',
                timeout: 30000,
                titulo: IXC.tradutor.translate('Alerta do contrato'),
                mensagem: this.functions().campo('alerta_contrato').val(),
            });
        }
        if ((IXCparametros.gera_por_tipo_doc_produtos === 'S'
            && this.functions().campo('base_geracao_tipo_doc').marcado().val() === 'P')
            || (this.functions().campo('base_geracao_tipo_doc').marcado().val() === 'PROD')) {
            this.hideOptionalDocumentTypeFields();
        }
    };
    ClienteContratoForm.prototype.onNovo = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        this.functions().campo('id_vd_contrato').change(function () {
            var idPlan = _this.functions().campo('id_vd_contrato').val();
            $.ajax({
                url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_32988',
                type: 'POST',
                async: false,
                data: { id: idPlan },
            }).done(function (response) {
                _this.functions().campo('base_geracao_tipo_doc').marcar(response.base_geracao_por_tipo_doc);
            });
        });
        var esconderCampoSeVazio = function (campo) {
            var valorCampo = _this.functions().campo(campo).val();
            if (valorCampo === '' || valorCampo === null) {
                _this.functions().campo(campo).esconde();
            }
        };
        esconderCampoSeVazio('id_responsavel_cancelamento');
        esconderCampoSeVazio('id_responsavel_negativacao');
        esconderCampoSeVazio('id_responsavel_desistencia');
        if (typeof IXC_SUBPROJETO !== 'undefined' && IXC_SUBPROJETO === '6') {
            this.form.getElementById('fieldset_dica_motivo_adicional_cliente_contrato').style.display = 'none';
            if (!this.functions().campo('motivo_cancelamento').val()) {
                this.functions().campo('motivo_adicional').esconde();
                this.functions().campo('concorrente_mot_adicional').esconde();
            }
            if (this.functions().campo('motivo_cancelamento').val() !== '') {
                this.functions().campo('motivo_adicional').mostra();
                this.functions().campo('concorrente_mot_adicional').mostra();
            }
        }
        if (typeof IXC_SUBPROJETO !== 'undefined' && IXC_SUBPROJETO === '3') {
            this.functions().campo('tipo').marcar('S');
        }
        this.functions().campo('id_vd_contrato').change(function () {
            var idVdContrato = _this.functions().campo('id_vd_contrato').val();
            var contractid = _this.functions().campo('id').val();
            if (idVdContrato > 0 || contractid > 0) {
                var request = $.ajax({
                    url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_32130',
                    type: 'POST',
                    async: false,
                    data: { id_vd_contrato: idVdContrato },
                });
                request.done(function (response) {
                    if (response.type_plan !== _this.functions().campo('tipo').marcado().val()) {
                        if (confirm(IXC.tradutor.translate('Ao alterar o plano de venda, o tipo do contrato ser� '
                            + 'alterado para o tipo do plano de venda. '
                            + '\n'
                            + 'Ex.: O contrato � do tipo "internet", e o plano de venda � do tipo "telefonia", '
                            + 'portanto, o tipo do contrato ser� alterado para "telefonia".'))) {
                            _this.functions().campo('tipo').marcar(response.type_plan);
                        }
                    }
                });
            }
        });
        localStorage.removeItem('edit');
        this.parameters().campo_grid_p.id_vd_contrato = function () { return JSON.stringify([
            { TB: 'vd_contratos.Ativo', OP: '=', P: 'S' },
        ]); };
        if (IXCparametros.filtrar_plano_venda_filial_contrato === 'S') {
            var idFilialContrato_2 = this.functions().campo('id_filial').val();
            if (idFilialContrato_2) {
                this.parameters().campo_grid_p.id_vd_contrato = function () { return JSON.stringify([
                    {
                        TB: 'vd_contratos.id_filial',
                        OP: '=',
                        P: idFilialContrato_2,
                        C: 'AND',
                        G: '1',
                    },
                    {
                        TB: 'vd_contratos.id_filial', OP: '=', P: '', C: 'OR', G: '1',
                    },
                    {
                        TB: 'vd_contratos.ativo', OP: '=', P: 'S', C: 'AND', G: '2',
                    },
                ]); };
            }
        }
        if (this.functions().campo('status').val() === 'P' && this.functions().campo('id').val()) {
            this.functions().botao('ativar_outro').hide();
        }
        IXC.form('cliente_contrato').campo('data').val(moment().format('DD/MM/YYYY'));
        this.parameters().campo_grid_p.id_vendedor = function () { return JSON.stringify([
            { TB: 'vendedor.status', OP: '=', P: 'A' },
        ]); };
        this.functions().campo('id_cliente').change(function () {
            if (_this.functions().campo('endereco_padrao_cliente').marcado().val() === 'S') {
                _this.alterarEnderecoPadrao();
                _this.trocaCamposEndereco();
            }
        });
        this.functions().campo('endereco_padrao_cliente').change(function () {
            _this.alterarEnderecoPadrao();
            _this.trocaCamposEndereco();
        });
        this.trocaCamposEndereco();
        if (IXCparametros.motivo_inclusao_obrigatorio === 'S') {
            this.functions().campo('motivo_inclusao').val('');
        }
        if ((IXCparametros.gera_por_tipo_doc_produtos === 'S' && this.functions().campo('base_geracao_tipo_doc').marcado().val() === 'P')
            || (this.functions().campo('base_geracao_tipo_doc').marcado().val() === 'PROD')) {
            this.hideOptionalDocumentTypeFields();
        }
        this.functions().campo('data_cancelamento').prop('disabled', true);
        this.functions().campo('data_cancelamento').prop('readonly', true);
        if (IXCparametros.contrato_permite_alterar_data_canc === 'S'
            && (typeof ((_c = (_b = (_a = IXC_perm === null || IXC_perm === void 0 ? void 0 : IXC_perm.cliente_contrato) === null || _a === void 0 ? void 0 : _a.campos) === null || _b === void 0 ? void 0 : _b.data_cancelamento) === null || _c === void 0 ? void 0 : _c.tipo_e) === 'undefined'
                || ((_f = (_e = (_d = IXC_perm === null || IXC_perm === void 0 ? void 0 : IXC_perm.cliente_contrato) === null || _d === void 0 ? void 0 : _d.campos) === null || _e === void 0 ? void 0 : _e.data_cancelamento) === null || _f === void 0 ? void 0 : _f.tipo_e) === 'H')) {
            this.functions().campo('data_cancelamento').prop('disabled', false);
            this.functions().campo('data_cancelamento').prop('readonly', false);
        }
    };
    ClienteContratoForm.prototype.onClose = function () {
        localStorage.removeItem('edit');
    };
    ClienteContratoForm.prototype.onResize = function () {
    };
    ClienteContratoForm.prototype.onSubmitsucess = function (j) {
        var _this = this;
        var idPlanoAtual = this.functions().campo('id_vd_contrato').val();
        var contrato = this.functions().campo('id').val();
        $.getJSON('aplicativo/cliente_contrato/action/action.php?action=botaoAjax_27724', "id=".concat(contrato, "&id_vd_contrato=").concat(idPlanoAtual, "&id_vd_contrato_antigo=").concat(j.old_id_vd_contrato), function (response) {
            var responseAjax27724 = response;
            var dataValidadeString = '';
            responseAjax27724.forEach(function (valor) {
                if (Number(valor.cliente_contrato_id_vd_contrato) !== Number(j.old_id_vd_contrato)) {
                    if (valor.cliente_contrato_descontos_id > 0) {
                        dataValidadeString = IxcCommons.helpers.sprintf(IXC.tradutor.Translate(' com vencimento em '), valor.data_validade_desconto);
                        if (valor.data_validade_desconto === '00/00/0000') {
                            dataValidadeString = IXC.tradutor.Translate(' sem vencimento');
                        }
                        $('body').IXCnotificacao({
                            tipo: 'alerta',
                            timeout: 27000,
                            titulo: IXC.tradutor.translate('Desconto deletado'),
                            mensagem: IxcCommons.helpers.sprintf(IXC.tradutor.Translate('Existe um desconto vinculado a esse contrato no valor de %s %s que ser� deletado'), valor.cliente_contrato_descontos_valor, dataValidadeString),
                        });
                    }
                    else {
                        dataValidadeString = IxcCommons.helpers.sprintf(IXC.tradutor.Translate(' com vencimento em '), valor.data_validade_acrescimo);
                        if (valor.data_validade_acrescimo === '00/00/0000') {
                            dataValidadeString = IXC.tradutor.Translate(' sem vencimento');
                        }
                        $('body').IXCnotificacao({
                            tipo: 'alerta',
                            timeout: 27000,
                            titulo: IXC.tradutor.translate('Acr�scimo deletado'),
                            mensagem: IxcCommons.helpers.sprintf(IXC.tradutor.Translate('Existe um acr�scimo vinculado a esse contrato no valor de %s %s que ser� deletado'), valor.cliente_contrato_acrescimos_valor, dataValidadeString),
                        });
                    }
                    idPlanoAtual = false;
                }
            });
        });
        if (this.functions().campo('id').val() === 'P' && this.functions().campo('status').val()) {
            this.functions().botao('ativar_outro').show();
        }
        if (Object.prototype.hasOwnProperty.call(j, 'altera_plano_venda') && j.altera_plano_venda.toString() === 'S') {
            $('body').IXCnotificacao({
                tipo: 'alerta',
                timeout: 27000,
                titulo: IXC.tradutor.translate('Autentica��o Cancelada'),
                mensagem: IXC.tradutor.translate('A autentica��o radius relacionada a este contrato foi removida, '
                    + 'edite os logins e relacione o contrato novamente!'),
            });
        }
        if (Array.isArray(j.WarningCoa)) {
            j.WarningCoa.forEach(function (row) { return alerta('alerts', row); });
        }
        if (Object.prototype.hasOwnProperty.call(j, 'param_cancela_plano_valor_igual')
            && j.param_cancela_plano_valor_igual.toString() === 'S') {
            $('body').IXCnotificacao({
                tipo: 'alerta',
                timeout: 30000,
                titulo: IXC.tradutor.translate('Financeiro Cancelado'),
                mensagem: IXC.tradutor.translate('O par�metro de cancelamento de parcelas para planos com valor igual '
                    + 'est� ativa, todo o financeiro referente a este contrato foi cancelado!'),
            });
        }
        if (Object.prototype.hasOwnProperty.call(j, 'altera_plano_venda_valor')
            && j.altera_plano_venda_valor.toString() === 'S') {
            $('body').IXCnotificacao({
                tipo: 'alerta',
                timeout: 30000,
                titulo: IXC.tradutor.translate('Financeiro Cancelado'),
                mensagem: IXC.tradutor.translate('O plano de venda selecionado tem o valor diferente do plano de venda '
                    + 'anterior, todo o financeiro referente a este contrato foi cancelado!'),
            });
        }
        if (j.dadosCancelamento) {
            var data = j.dadosCancelamento;
            if (IXCparametros.cancelar_venda_ao_cancelar_titulo === 'S') {
                var msg = data.ehVendaFiscal ? IXC.tradutor.translate("Boleto cancelado com sucesso \n             por\uFFFDm n\uFFFDo foi possivel cancelar a venda ".concat(data.idVenda, " pois h\uFFFD vinculo com nota modelo ").concat(data.modeloNf))
                    : IXC.tradutor.translate("Boleto cancelado com sucesso com cancelamento da venda ".concat(data.idVenda));
                $('body').IXCnotificacao({
                    tipo: 'alerta',
                    timeout: 30000,
                    titulo: IXC.tradutor.translate('Financeiro Cancelado'),
                    mensagem: msg,
                });
            }
        }
        var fidelidadeContrato = this.functions().campo('fidelidade').val();
        if (fidelidadeContrato === '' || fidelidadeContrato === undefined || fidelidadeContrato === 0) {
            var idContrato = this.functions().campo('id').val();
            var request = $.ajax({
                url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_28340',
                data: { id_contrato: idContrato },
            });
            request.done(function (response) {
                var fidelidade = Number(response);
                _this.functions().campo('fidelidade').val(fidelidade);
            });
        }
        localStorage.setItem('edit', 'true');
    };
    ClienteContratoForm.prototype.onSubmit = function () {
        var _this = this;
        var idPlanoAtual = this.functions().campo('id_vd_contrato').val();
        var idContrato = this.functions().campo('id').val();
        if (localStorage.getItem('edit') === 'true') {
            var request = $.ajax({
                url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_28174',
                type: 'POST',
                async: false,
                data: { id_plano_atual: idPlanoAtual, id_contrato: idContrato },
            });
            request.done(function (response) {
                if (IXCparametros.cancel_finan_valor_igual === 'S' && response.cancela_sempre) {
                    if (!confirm(IXC.tradutor.translate('Ao possuir o par�metro de cancelamento de financeiro de '
                        + 'planos de mesmo valor ativo em Par�metros fnanceiros, todo o financeiro poder� ser '
                        + 'cancelado. Deseja continuar?'))) {
                        _this.functions().campo('id_vd_contrato').val(response.id_original);
                        _this.functions().setErro('Mudan�a de plano cancelada. Os dados n�o ser�o modificados.');
                    }
                }
                else if (response.valores_diferentes) {
                    if (!confirm(IXC.tradutor.translate('Ao alterar o plano de contrato para outro com valor diferente '
                        + 'do atual, todo o financeiro poder� ser cancelado. Deseja continuar?'))) {
                        _this.functions().campo('contrato').val(response.descricao_original);
                        _this.functions().campo('id_vd_contrato').val(response.id_original);
                        _this.functions().setErro('Mudan�a de plano cancelada. Os dados n�o ser�o modificados.');
                    }
                }
            });
        }
        if (this.naoAlteraDataBase === true) {
            this.naoAlteraDataBase = false;
            if (!confirm(IXC.tradutor.translate('Alterar o campo de data base financeiro de maneira incorreta para '
                + 'contratos que j� possuem financeiro pode ocasionar diversos problemas, sendo eles financeiros ou de '
                + 'bloqueio indevido de clientes. Voc� realmente deseja fazer essa altera��o?'))) {
                this.functions().campo('data').val(this.responseAjax27687.data_base_contrato);
                this.functions().setErro("Aten\uFFFD\uFFFDo: o campo data base financeiro voltou para seu valor original: ".concat(this.responseAjax27687.data_base_contrato));
            }
        }
    };
    ClienteContratoForm.prototype.onSubmiterror = function (_j, _p) {
    };
    ClienteContratoForm.prototype.hideOptionalDocumentTypeFields = function () {
        this.functions().campo('fieldset_fiscal').esconde();
        this.functions().campo('tipo_doc_opc').esconde();
        this.functions().campo('tipo_doc_opc2').esconde();
        this.functions().campo('tipo_doc_opc3').esconde();
        this.functions().campo('tipo_doc_opc4').esconde();
    };
    ClienteContratoForm.prototype.showOptionalDocumentTypeFields = function () {
        this.functions().campo('fieldset_fiscal').mostra();
        this.functions().campo('tipo_doc_opc').mostra();
        this.functions().campo('tipo_doc_opc2').mostra();
        this.functions().campo('tipo_doc_opc3').mostra();
        this.functions().campo('tipo_doc_opc4').mostra();
    };
    ClienteContratoForm.prototype.montaParcAtivacao = function () {
        var dias;
        var vencimentos = '';
        var vencPers = this.functions().campo('venc_personalizado').val();
        var comEntrada = this.functions().campo('com_entrada').val();
        var diaFixo = parseInt(this.functions().campo('dia_fixo_vencimento').val(), 10);
        var numParc = parseInt(this.functions().campo('ativacao_numero_parcelas').val(), 10);
        var tipoCondPag = this.functions().campo('tipo_condicao_pag').val();
        if (vencPers && (tipoCondPag === 'P')) {
            this.functions().campo('ativacao_numero_parcelas').esconde();
            var maturities = vencPers.split(',');
            maturities.forEach(function (maturity) {
                var days = parseInt(maturity, 10);
                var dataVenc = moment().add(days, 'day').format('DD/MM/YYYY');
                if (comEntrada === 'N') {
                    var dataVencMoment = moment(dataVenc, 'DD/MM/YYYY');
                    dataVencMoment.add(1, 'month');
                    dataVenc = dataVencMoment.format('DD/MM/YYYY');
                }
                vencimentos = vencimentos.concat(dataVenc, ' | ');
            });
        }
        else {
            for (var i = 0; i <= (numParc - 1); i += 1) {
                if (comEntrada.toString() === 'S') {
                    dias = parseInt(String((i - 1) * 30), 10);
                }
                else {
                    dias = parseInt(String(i * 30), 10);
                }
                var dataVenc = new Date();
                var diaVenc = 0;
                if (diaFixo !== 0) {
                    diaVenc = diaFixo;
                }
                else {
                    diaVenc = dataVenc.getDate();
                }
                dataVenc.setDate(dataVenc.getDate() + dias);
                if (tipoCondPag === 'T') {
                    diaVenc = dataVenc.getDate();
                }
                var mesVenc = (dataVenc.getMonth() + 1);
                var anoVenc = dataVenc.getFullYear();
                vencimentos = "".concat(vencimentos + moment().year(anoVenc).month(mesVenc).date(diaVenc)
                    .format('DD/MM/YYYY'), " | ");
            }
        }
        return vencimentos;
    };
    ClienteContratoForm.prototype.calcValParcAtivacao = function () {
        var numParc = parseInt(this.functions().campo('ativacao_numero_parcelas').val(), 10);
        var taxaInst = parseFloat(this.functions().campo('taxa_instalacao').val().replace('.', '')
            .replace(',', '.'));
        if ((numParc > 0) && (taxaInst > 0)) {
            var valParcela = taxaInst / numParc;
            this.functions().campo('ativacao_valor_parcela').val(roundMoeda(valParcela.toString()));
        }
    };
    ClienteContratoForm.prototype.trocaCamposEndereco = function () {
        var _this = this;
        var camposAntigos = [
            'id_condominio', 'bloco', 'apartamento', 'cep',
            'endereco', 'numero', 'bairro', 'cidade',
            'referencia', 'complemento', 'latitude', 'longitude',
        ];
        var camposNovos = [
            'condominio_novo', 'bloco_novo', 'apartamento_novo', 'cep_novo',
            'endereco_novo', 'numero_novo', 'bairro_novo', 'cidade_novo',
            'referencia_novo', 'complemento_novo', 'latitude_novo', 'longitude_novo', 'fieldset_endereco_cliente',
        ];
        if (this.functions().campo('endereco_padrao_cliente').marcado().val() === 'S') {
            camposAntigos.forEach(function (item) {
                _this.functions().campo(item).esconde();
            });
            camposNovos.forEach(function (item) {
                _this.functions().campo((item)).mostra();
                _this.functions().somenteLeitura(item, true);
            });
        }
        else {
            camposNovos.forEach(function (item) {
                _this.functions().campo(item).esconde();
                _this.functions().somenteLeitura(item, false);
            });
            camposAntigos.forEach(function (item) {
                _this.functions().campo(item).mostra();
            });
            var camposAdicionarAsterisco = ['cep', 'endereco', 'numero', 'bairro', 'cidade'];
            camposAdicionarAsterisco.forEach(function (item) {
                if ($("label[for=".concat((item), "]"))[0].innerHTML.indexOf('<font color="#FF0000">&nbsp;*</font>') === -1) {
                    $("label[for=".concat((item), "]"))[0].innerHTML += "<font color='#FF0000'>&nbsp;*</font>";
                }
            });
        }
    };
    ClienteContratoForm.prototype.setFieldState = function () {
        var renovation = this.functions().campo('renovacao_automatica').marcado().val();
        var blocking = this.functions().campo('bloqueio_automatico').marcado().val();
        var delayNotice = this.functions().campo('aviso_atraso').marcado().val();
        if (renovation === 'N' && blocking === 'N' && delayNotice === 'N') {
            var free = this.functions().campo('isentar_contrato').prop('checked');
            if (!free) {
                this.functions().campo('isentar_contrato').prop('checked', true);
                alerta('alerts', IXC.tradutor.translate("Devido � altera��o nos campos 'Bloqueio autom�tico', 'Aviso autom�tico' e "
                    + "'Gera financeiro autom�tico',  a op��o 'Isentar contrato' foi marcada."));
            }
        }
        else {
            var free = this.functions().campo('isentar_contrato').prop('checked');
            if (free) {
                this.functions().campo('isentar_contrato').prop('checked', false);
                alerta('alerts', IXC.tradutor.translate("Devido � altera��o nos campos 'Bloqueio autom�tico', 'Aviso autom�tico' e "
                    + "'Gera financeiro autom�tico',  a op��o 'Isentar contrato' foi desmarcada."));
            }
        }
    };
    ClienteContratoForm.prototype.mudarvisibilidadecampo = function (parametro, campo) {
        var valor = this.functions().campo(parametro).marcado().val();
        if (valor === 'N') {
            this.functions().somenteLeitura(campo, true);
        }
        else {
            this.functions().somenteLeitura(campo, false);
        }
    };
    ClienteContratoForm.prototype.esconderCamposBloqReducaoMsg = function (restricao, campoOcultar) {
        if (restricao.toString() === 'S') {
            this.functions().campo(campoOcultar).mostra();
        }
        else {
            this.functions().campo(campoOcultar).esconde();
        }
    };
    ClienteContratoForm.prototype.verificarDataBase = function () {
        var dataBaseFinanceiro = this.functions().campo('data').val();
        if ((this.responseAjax27687.quantidade_titulos > 0)
            && (this.responseAjax27687.data_base_contrato.toString() !== dataBaseFinanceiro.toString())
            && (this.responseAjax27687.param_alt_data_base_grupo.toString() === 'S')) {
            this.naoAlteraDataBase = true;
        }
    };
    ClienteContratoForm.prototype.showTipAddress = function (tipAddress) {
        if (!this.functions().campo('endereco_padrao_cliente').prop('checked')) {
            tipAddress.setAttribute('style', 'display = block');
        }
        else {
            tipAddress.setAttribute('style', 'display = none');
        }
    };
    ClienteContratoForm.prototype.alterarEnderecoPadrao = function () {
        var _this = this;
        var enderecoPadraoCheckbox = this.functions().campo('endereco_padrao_cliente');
        if (enderecoPadraoCheckbox.marcado().val() === 'S') {
            var request = $.ajax({
                url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_29011',
                type: 'POST',
                data: { id_cliente: this.functions().campo('id_cliente').val() },
                dataType: 'JSON',
                async: false,
            });
            request.done(function (response) {
                if (response != null) {
                    var defineValorCampos = [
                        'condominio_novo', 'bloco_novo', 'apartamento_novo', 'cep_novo', 'endereco_novo',
                        'numero_novo', 'bairro_novo', 'cidade_novo', 'referencia_novo', 'complemento_novo',
                        'latitude_novo', 'longitude_novo',
                    ];
                    defineValorCampos.forEach(function (item) {
                        var campoAtual = _this.functions().campo(item);
                        campoAtual.attr('readonly', true);
                        campoAtual.addClass('campo-desabilitado');
                        _this.functions().campo(item).val(response[item]);
                    });
                    _this.functions().campo('condominio_novo').blur();
                    _this.functions().campo('cidade_novo').trigger('blur');
                }
            });
        }
    };
    return ClienteContratoForm;
}());
var OtherFile = /** @class */ (function () {
    function OtherFile() {
    }
    OtherFile.prototype.addTwoNumbers = function (a, b) {
        return a + b;
    };
    OtherFile.prototype.generateIntNumber = function () {
        return Math.floor(Math.random() * 100);
    };
    return OtherFile;
}());
var myClass = /** @class */ (function () {
    function myClass() {
    }
    myClass.prototype.myMethod = function (num) {
        return "".concat(num);
    };
    return myClass;
}());
function tsExample(num, num2) {
    if (num === void 0) { num = 0; }
    if (num2 === void 0) { num2 = 0; }
    var otherFile = new OtherFile();
    var number = (new myClass()).myMethod(num);
    return otherFile.addTwoNumbers(number, num2);
}
//# sourceMappingURL=main.js.map