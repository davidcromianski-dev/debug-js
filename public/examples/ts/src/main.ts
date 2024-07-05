// @ts-nocheck
class ClienteContratoForm implements FormBaseInterface, FormSubmitInterface, FormDisplayInterface {
    protected buttons: any;

    protected naoAlteraDataBase: boolean;

    protected responseAjax27687: any;

    protected constructor(
        protected readonly parameters: any,
        protected readonly functions: any,
        protected readonly form: HTMLFormElement,
    ) {
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

    onInit(): void {
        this.functions().botao('novo').hide();
        this.functions().aba('aba_alteracoes_contrato').click(() => {
            alert(IXC.tradutor.translate(
                'A alteração wizard não pode mais ser realizada neste formulário. '
                + 'A partir de agora, para realizar alterações, acesse o menu ?Contratos? > botão ?Alteração wizard?.'
            ));
        });
        if (IXCparametros.ativar_contrato === 'N') {
            this.functions().campo('data_assinatura').mostra();
        } else {
            this.functions().campo('data_assinatura').esconde();
        }

        if (typeof IXC_SUBPROJETO !== 'undefined' && IXC_SUBPROJETO === '6') {
            this.parameters().campo_grid_p.motivo_adicional = () => JSON.stringify([
                {
                    TB: 'fn_areceber_mot_cancelamento_adicional.ativo',
                    OP: '=',
                    P: 'S',
                },
                {
                    TB: 'fn_areceber_mot_cancelamento_adicional.id_fn_areceber_mot_cancelamento',
                    OP: '=',
                    P: this.functions().campo('motivo_cancelamento').val(),
                },
            ]);
            this.form.getElementById('fieldset_dica_motivo_adicional_cliente_contrato').style.display = 'none';

            this.functions().campo('motivo_cancelamento').change(() => {
                this.functions().campo('motivo_adicional').val('');
                this.functions().campo('concorrente_mot_adicional').val('');
                if (this.functions().campo('motivo_cancelamento').val() === '') {
                    this.functions().campo('motivo_adicional').esconde();
                    this.functions().campo('concorrente_mot_adicional').esconde();
                    this.form.getElementById('fieldset_dica_motivo_adicional_cliente_contrato').style.display = 'none';
                }
                if (this.functions().campo('motivo_cancelamento').val() !== '') {
                    this.functions().campo('motivo_adicional').mostra();
                    this.functions().campo('concorrente_mot_adicional').mostra();
                    this.form.getElementById('fieldset_dica_motivo_adicional_cliente_contrato').style.display = 'block';
                }
            });
        }
        this.parameters().campo_grid_p.motivo_cancelamento = () => JSON.stringify([
            {TB: 'fn_areceber_mot_cancelamento.libera_periodo', OP: '=', P: 'N'},
            {TB: 'fn_areceber_mot_cancelamento.ativo', OP: '=', P: 'S'},
            {TB: 'fn_areceber_mot_cancelamento.finalidade', OP: '!=', P: 'F'},
        ]);

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

            const getNav = this.form.querySelectorAll('nav#print_form');
            getNav.forEach((nav) => {
                const span = nav.querySelector('div.button_print span');

                if (span.textContent === IXC.tradutor.translate('Financeiro')) {
                    span.textContent = IXC.tradutor.translate('Faturamento');
                }
            });
        } else {
            this.functions().botao('gerar_financeiro_por_fatura').hide();
            this.functions().botao('gerar_fatura_e_financeiro').hide();
            this.functions().aba('faturas').hide();
        }

        this.functions().campo('id_vd_contrato').change(() => {
            const idVdContrato = this.functions().campo('id_vd_contrato').val();
            if (idVdContrato > 0) {
                const request = $.ajax({
                    url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_31973',
                    type: 'POST',
                    async: false,
                    data: {idVdContrato},
                });
                request.done((currency: any) => {
                    if (currency.type === 'success') {
                        this.functions().campo('moeda').val(currency.currency).trigger('blur');
                    } else {
                        alerta('error', currency.message);
                    }
                });
            }
        });
        if (this.functions().campo('btn_nf_ativacao').length) {
            const htmlInput = '<dt class="ixc-containers" variant="label" size="md"></dt>'
                + '<dd class="ixc-containers" variant="input" size="md">'
                + '<button type="button" name="btn_nf_ativacao" id="btn_nf_ativacao" '
                + 'value=" Faturar ativação/instalação" style="cursor: auto;border-radius: 4px;" class="ixc-buttons" '
                + 'variant="input"> Faturar ativação/instalação</button>'
                + '</dd>';
            $('[for=btn_nf_ativacao]').closest('dl').html(htmlInput);
        }

        this.parameters().campo_grid_p.id_tipo_contrato = () => JSON.stringify([
            {
                TB: 'cliente_contrato_tipo.ativo', OP: '=', P: 'S', C: 'AND', G: '1',
            },
            {
                TB: 'cliente_contrato_tipo.id',
                OP: '=',
                P: this.functions().campo('id_tipo_contrato').val(),
                C: 'OR',
                G: '1',
            },
        ]);

        this.functions().campo('motivo_restricao_auto_desbloq').esconde();
        this.functions().botao('ativar').click(() => {
            IXC.form('cliente_contrato').this.functions().botao('salvar').attr('disabled', 'true');
        });

        if (!isMobile()) {
            const clienteContratoClienteContratoComodato = IXC.autostart(false).grid('cliente_contrato_cliente_contrato_comodato');
            if (clienteContratoClienteContratoComodato.length > 0) {
                clienteContratoClienteContratoComodato.funcoes().botao('adicionar_qr_code').hide();
                clienteContratoClienteContratoComodato.funcoes().botao('remover_p_qr_code').hide();
            }
            IXC.autostart(true);
        }

        if (typeof IXC_SUBPROJETO !== 'undefined' && IXC_SUBPROJETO !== '3') {
            $.get('aplicativo/tv_usuarios/action/action.php?action=botaoAjax_27233')
                .done((data: any) => {
                    if (data.data.toString() === 'false') {
                        IXC.grid('cliente_contrato_tv_usuarios').funcoes().botao('ativar_desativar_login_watch').hide();
                    }
                });
        }

        if (IXCparametros.contrato_ass_digital === 'N') {
            this.functions().campo('gerar_finan_assin_digital_contrato').esconde();
        }

        this.functions().campo('base_geracao_tipo_doc').change(() => {
            const oReq = new XMLHttpRequest();
            oReq.onload = () => {
                const response = JSON.parse(oReq.response);
                const oldSelectedOption = response.base_geracao_tipo_doc;

                const selectedOption = this.functions().campo('base_geracao_tipo_doc').marcado().val();
                if (selectedOption.toString() !== oldSelectedOption.toString()
                    // eslint-disable-next-line no-restricted-globals,no-alert
                    && confirm('Antes de mudar este parâmetro, certifique-se que não há nenhuma nota fiscal gerada com a opção anterior.'
                        + '\nVocê tem certeza que deseja mudá-lo?')
                ) {
                    this.functions().campo('base_geracao_tipo_doc').marcar(selectedOption);
                } else {
                    this.functions().campo('base_geracao_tipo_doc').marcar(oldSelectedOption);
                }
                if ((IXCparametros.gera_por_tipo_doc_produtos === 'S' && this.functions().campo('base_geracao_tipo_doc').marcado().val() === 'P')
                    || (this.functions().campo('base_geracao_tipo_doc').marcado().val() === 'PROD')
                ) {
                    this.hideOptionalDocumentTypeFields();
                } else {
                    this.showOptionalDocumentTypeFields();
                }
            };
            oReq.open('post', 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_30317', true);
            oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            oReq.send(new URLSearchParams({id_contrato: this.functions().campo('id').val()}).toString());
        });

        this.functions().campo('assinatura_digital').change(() => {
            if (this.functions().campo('assinatura_digital').marcado().val() === 'S') {
                this.functions().campo('gerar_finan_assin_digital_contrato').mostra();
            } else {
                this.functions().campo('gerar_finan_assin_digital_contrato').esconde();
            }
        });
        if (this.functions().campo('status').val() === 'A') {
            $('form[name=cliente_contrato] #ativar').hide();
        }

        this.functions().campo('cep').closest('dd').append(
            $('<button>').attr('type', 'button')
                .attr('variant', 'input')
                .attr('class', 'ixc-buttons group_button')
                .html(IXC.tradutor.translate('Validar'))
                .click(() => {
                    if (this.functions().campo('cep').val() === '') {
                        alerta('error', 'Preencha o CEP!');
                    } else {
                        $('input, button, body').css({cursor: 'progress'});
                        $.ajax({
                            type: 'GET',
                            url: 'aplicativo/cliente_contrato/action/action.php',
                            data: ({
                                action: 'botaoAjax_22267',
                                cep: this.functions().campo('cep').val()
                            }),
                            dataType: 'json',
                            success(j: any) {
                                $('body').css({cursor: 'default'});
                                $('input, button, body').css({cursor: 'auto'});
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
                            error(xhr: any) {
                                if (xhr.status.toString() === '200') {
                                    alerta('error', xhr.responseText);
                                } else if (xhr.status.toString() === '400') {
                                    alerta('error', 'Página não existe!');
                                } else if (xhr.status.toString() === '500') {
                                    alerta('error', 'Erro do servidor, tente novamente!');
                                } else {
                                    alerta('error', 'Erro desconhecido, tente novamente!');
                                }
                                $('body').css({cursor: 'default'});
                                $('input, button, body').css({cursor: 'auto'});
                            },
                        });
                    }
                }),
        );
        this.functions().campo('ativacao_numero_parcelas').change(() => {
            const descVencimentos = this.montaParcAtivacao();
            this.functions().campo('ativacao_vencimentos').val(descVencimentos);
            this.calcValParcAtivacao();
        });
        this.functions().campo('taxa_instalacao').change(() => {
            this.calcValParcAtivacao();
        });

        $('form[name=cliente_contrato] #btn_nf_ativacao').click(() => {
            const idContrato = this.functions().campo('id').val();
            const idCliente = this.functions().campo('id_cliente').val();
            const idFilial = this.functions().campo('id_filial').val();
            const idTipoDoc = this.functions().campo('id_tipo_doc_ativ').val();
            const idProduto = this.functions().campo('id_produto_ativ').val();
            const idCondPag = this.functions().campo('id_cond_pag_ativ').val();
            const idVendedor = this.functions().campo('id_vendedor_ativ').val();
            let valorProduto = this.functions().campo('taxa_instalacao').val();
            valorProduto = parseFloat(valorProduto.replace('R$', '').replace('.', '').replace(',', '.'));
            let previsao = this.functions().campo('cc_previsao').val();

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

            const dataAtual = new Date();
            const dia = dataAtual.getDate();
            const mes = dataAtual.getMonth();
            const ano = dataAtual.getFullYear();

            const dataFormatada = moment().year(ano).month(mes).date(dia)
                .format('DD/MM/YYYY');
            const msg = IXC.tradutor.translate('Não foi possível prosseguir. Para utilizar o botão '
                + "'Faturar ativação/instalação' preencha todos os campos da seção 'Taxas de ativação'.");
            if ((idContrato === '') || (idContrato === '0')) {
                alerta(IXC.tradutor.translate('Preencha o ID do Contrato!'));
            } else if ((idCliente === '') || (idCliente === '0')) {
                alerta('error', msg);
            } else if ((idTipoDoc === '') || (idTipoDoc === '0')) {
                alerta('error', msg);
            } else if ((idProduto === '') || (idProduto === '0')) {
                alerta(IXC.tradutor.translate('Preencha o ID do Produto!'));
            } else if ((idCondPag === '') || (idCondPag === '0')) {
                alerta(IXC.tradutor.translate('Preencha o ID da Condição de pagamento!'));
            } else if ((idVendedor === '') || (idVendedor === '0')) {
                alerta('error', msg);
            } else {
                this.functions().salvar();
                const formulario = newFormModal(6);
                const taxaAtivacao = true;
                $(formulario).flexform('vd_saida', {taxaAtivacao}).formNovo()
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
        this.functions().campo('id').change(() => {
            const idContratoDataBase = this.functions().campo('id').val();
            $.post(
                'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_27687',
                {id_contrato: idContratoDataBase},
                (response: any) => {
                    this.responseAjax27687 = response;
                },
            );
        });
        if (IXCparametros.permite_alteracao_data_base === 'S') {
            this.functions().campo('data').change(() => {
                this.verificarDataBase();
            });
        }
        const idClienteProspeccao = this.functions().campo('id_cliente').val();
        if (idClienteProspeccao != null && IXCparametros.cliente_exibir_prospeccao === 'N') {
            const request = $.ajax({
                url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_27744',
                type: 'POST',
                async: false,
                data: {idClienteProspeccao},
            });
            request.done((response: any) => {
                if (response.crm === 'S') {
                    this.parameters().campo_grid_p.id_cliente = () => JSON.stringify([
                        {
                            TB: 'cliente.crm', OP: 'IN', P: "'N','S'", G: '1', C: 'OR',
                        },
                    ]);
                }
            });
        }

        const tipAddress = document.querySelector('#endereco_padrao_alert');
        tipAddress.setAttribute('style', 'display = none');

        this.functions().campo('endereco_padrao_cliente').change(() => {
            this.alterarEnderecoPadrao();
            this.trocaCamposEndereco();
            this.showTipAddress(tipAddress);
        });

        this.functions().campo('tipo_localidade').change(() => {
            if (this.functions().campo('endereco_padrao_cliente').prop('checked')) {
                this.functions().campo('tipo_localidade').marcar(this.functions().campo('tipo_localidade').val());
                alerta(
                    'alerts',
                    IXC.tradutor.translate('Não é possível alterar a localidade quando está considerando o endereço '
                        + 'padrão do cliente. Caso necessário, realize a alteração diretamente no cadastro do cliente.'),
                );
            }
        });
        this.functions().campo('id_cliente').change(() => {
            if (this.functions().campo('endereco_padrao_cliente').marcado().val() === 'S') {
                this.alterarEnderecoPadrao();
            }
        });

        this.functions().campo('bloqueio_automatico').change(() => {
            this.mudarvisibilidadecampo('bloqueio_automatico', 'nao_bloquear_ate');
        });
        this.functions().campo('aviso_atraso').change(() => {
            this.mudarvisibilidadecampo('aviso_atraso', 'nao_avisar_ate');
        });

        const formatString = (campo: string) => {
            this.functions().campo(campo).blur(() => {
                this.functions().campo(campo).val(this.functions().campo(campo).val().replace(/\s+/g, ' ')
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
        this.functions().campo('isentar_contrato').change(() => {
            const free = this.functions().campo('isentar_contrato').prop('checked');
            if (free) {
                this.functions().campo('renovacao_automatica').marcar('N');
                this.functions().campo('bloqueio_automatico').marcar('N');
                this.functions().campo('aviso_atraso').marcar('N');
                alerta('alerts', IXC.tradutor.translate(
                    "Devido é alteração no campo 'Isentar contrato', os campos 'Bloqueio automático', "
                    + "'Aviso automático' e 'Gera financeiro automático' foram alterados para 'Não'.",
                ));
            } else {
                this.functions().campo('renovacao_automatica').marcar('S');
                this.functions().campo('bloqueio_automatico').marcar('S');
                this.functions().campo('aviso_atraso').marcar('S');
                alerta('alerts', IXC.tradutor.translate(
                    "Devido á alteração no campo 'Isentar contrato', os campos 'Bloqueio automático', "
                    + "'Aviso automático' e 'Gera financeiro automático' foram alterados para 'Sim'.",
                ));
            }
        });
        this.functions().campo('renovacao_automatica').change(() => {
            this.setFieldState();
        });

        this.functions().campo('bloqueio_automatico').change(() => {
            this.setFieldState();
        });

        this.functions().campo('aviso_atraso').change(() => {
            this.setFieldState();
        });
    }

    onCancel(): void {
    }

    onDelete(): void {
    }

    onEdit(): void {
        const esconderCampoSeVazio = (campo: string): void => {
            const valorCampo = this.functions().campo(campo).val();
            if (valorCampo === '' || valorCampo === null) {
                this.functions().campo(campo).esconde();
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

            this.functions().campo('motivo_cancelamento').change(() => {
                this.functions().campo('motivo_adicional').val('');
                this.functions().campo('concorrente_mot_adicional').val('');
                if (!this.functions().campo('motivo_cancelamento').val()) {
                    this.functions().campo('motivo_adicional').esconde();
                    this.functions().campo('concorrente_mot_adicional').esconde();
                    this.form.getElementById('fieldset_dica_motivo_adicional_cliente_contrato').style.display = 'none';
                }
                if (this.functions().campo('motivo_cancelamento').val()) {
                    this.functions().campo('motivo_adicional').mostra();
                    this.functions().campo('concorrente_mot_adicional').mostra();
                    this.form.getElementById('fieldset_dica_motivo_adicional_cliente_contrato').style.display = 'block';
                }
            });
        }

        let flag = false;
        const idVdContract = this.functions().campo('id_vd_contrato').val();
        this.functions().campo('id_vd_contrato').change(() => {
            const verifyPlan = $.ajax({
                url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_32947',
                type: 'POST',
                async: false,
                data: {idVdContract},
            });
            verifyPlan.done((response: any) => {
                if (response.quantity > 1 && flag === false) {
                    alerta('alerts', IXC.tradutor.translate('O plano de venda possui mais de uma velocidade, portanto, '
                        + 'é necessário alterar manualmente a nova velocidade no login.'));
                    flag = true;
                }
            });
        });

        this.functions().campo('data_assinatura').esconde();
        if (IXCparametros.ativar_contrato === 'N') {
            this.functions().campo('data_assinatura').mostra();
        }

        this.functions().campo('id_vd_contrato').change((): void => {
            const idVdContrato = this.functions().campo('id_vd_contrato').val();
            if (idVdContrato > 0 || this.functions().campo('id').val() > 0) {
                const request = $.ajax({
                    url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_32130',
                    type: 'POST',
                    async: false,
                    data: {id_vd_contrato: idVdContrato},
                });
                request.done((response: any): void => {
                    if (response.type_plan !== this.functions().campo('tipo').marcado().val()) {
                        if (confirm(
                            IXC.tradutor.translate(
                                'Ao alterar o plano de venda, o tipo do contrato será alterado para o tipo do '
                                + 'plano de venda. '
                                + '\n'
                                + 'Ex.: O contrato é do tipo "internet", e o plano de venda é do tipo "telefonia", '
                                + 'portanto, o tipo do contrato será alterado para "telefonia".',
                            ),
                        )) {
                            this.functions().campo('tipo').marcar(response.type_plan);
                        }
                    }
                });
            }
        });
        const permissionFnAreceber = IXC_perm.cliente_contrato_rel_areceber;
        if (permissionFnAreceber === undefined || permissionFnAreceber.bloquear_acesso_form === 'L') {
            const span = document.createElement('span');
            span.style.lineHeight = '24px';
            span.style.padding = '5px';
            span.style.background = 'none';
            span.style.boxShadow = 'none';

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = 'S';
            const gridFnAreceber = IXC.grid('cliente_contrato_cliente_contrato_rel_areceber');
            $(input).click((): void => {
                if ($(input).is(':checked')) {
                    gridFnAreceber.flexOptions({parametros: 'false'}).flexReload();
                } else {
                    gridFnAreceber.flexOptions({parametros: '[{"TB":"fn_areceber.status","OP":"!=","P":"C"}]'}).flexReload();
                }
            });
            span.appendChild(input);
            span.appendChild(document.createTextNode('Mostrar cancelados'));
            $(span).insertBefore(this.functions().painel('financeiro').find('.pPageButtons'));
            gridFnAreceber.flexOptions({parametros: '[{"TB":"fn_areceber.status","OP":"!=","P":"C"}]'});
        }
        const permissionVdSaida = IXC_perm.vd_saida;
        if (permissionVdSaida === undefined || permissionVdSaida.bloquear_acesso_form === 'L') {
            const spanVenda = document.createElement('span');
            spanVenda.style.lineHeight = '24px';
            spanVenda.style.padding = '5px';
            spanVenda.style.background = 'none';
            spanVenda.style.boxShadow = 'none';

            const inputVenda = document.createElement('input');
            inputVenda.type = 'checkbox';
            inputVenda.value = 'S';
            const gridVenda = IXC.grid('cliente_contrato_vd_saida');
            $(inputVenda).click((): void => {
                if ($(inputVenda).is(':checked')) {
                    gridVenda.flexOptions({parametros: 'false'}).flexReload();
                } else {
                    gridVenda.flexOptions({parametros: '[{"TB":"vd_saida.status","OP":"!=","P":"C"}]'}).flexReload();
                }
            });
            spanVenda.appendChild(inputVenda);
            spanVenda.appendChild(document.createTextNode('Mostrar cancelados'));
            $(spanVenda).insertBefore(this.functions().painel('vendas').find('.pPageButtons'));
            gridVenda.flexOptions({parametros: '[{"TB":"vd_saida.status","OP":"!=","P":"C"}]'});
        }
        const spanComodato = document.createElement('span');
        spanComodato.style.lineHeight = '24px';
        spanComodato.style.padding = '5px';
        spanComodato.style.background = 'none';
        spanComodato.style.boxShadow = 'none';

        const inputComodato = document.createElement('input');
        inputComodato.type = 'checkbox';
        inputComodato.value = 'S';
        const gridComodato = IXC.grid('cliente_contrato_vd_saida');
        $(inputComodato).click((): void => {
            if ($(inputComodato).is(':checked')) {
                gridComodato.flexOptions({parametros: 'false'}).flexReload();
            } else {
                gridComodato.flexOptions({parametros: '[{"TB":"movimento_produtos.status_comodato","OP":"=","P":"E"}]'}).flexReload();
            }
        });
        spanComodato.appendChild(inputComodato);
        spanComodato.appendChild(document.createTextNode(IXC.tradutor.translate('Visualizar baixas')));
        $(spanComodato).insertBefore(this.functions().painel('comodato').find('.pPageButtons'));
        gridComodato.flexOptions({parametros: '[{"TB":"movimento_produtos.status_comodato","OP":"=","P":"E"}]'});

        if (IXCparametros.suspensao_temporaria === 'S') {
            if (this.functions().campo('contrato_suspenso').val() === 'N') {
                this.functions().botao('remover_suspensao').hide();
                this.functions().botao('suspender_temporariamente').show();
            } else {
                this.functions().botao('remover_suspensao').show();
                this.functions().botao('suspender_temporariamente').hide();
            }
        } else if (this.functions().campo('contrato_suspenso').val() === 'S') {
            this.functions().botao('remover_suspensao').show();
            this.functions().botao('suspender_temporariamente').hide();
        } else {
            this.functions().botao('remover_suspensao').hide();
            this.functions().botao('suspender_temporariamente').hide();
        }

        if ((this.functions().campo('data_inicial_suspensao').val() === ''
                || this.functions().campo('data_inicial_suspensao').val())
            && this.functions().campo('contrato_suspenso').val() === 'N' && IXCparametros.suspensao_temporaria === 'S') {
            this.functions().campo('data_inicial_suspensao').val(moment().format('DD/MM/YYYY'));
        }

        const restricaoBloqueio = this.functions().campo('restricao_auto_desbloqueio').val();
        this.esconderCamposBloqReducaoMsg(restricaoBloqueio, 'motivo_restricao_auto_desbloq');

        this.functions().campo('restricao_auto_desbloqueio').change((): void => {
            this.esconderCamposBloqReducaoMsg(
                this.functions().campo('restricao_auto_desbloqueio').val(),
                'motivo_restricao_auto_desbloq',
            );
        });

        const restricaoReducao = this.functions().campo('restricao_auto_libera_susp_parcial').val();
        this.esconderCamposBloqReducaoMsg(restricaoReducao, 'motivo_restri_auto_libera_parc');

        this.functions().campo('restricao_auto_libera_susp_parcial').change((): void => {
            this.esconderCamposBloqReducaoMsg(
                this.functions().campo('restricao_auto_libera_susp_parcial').val(),
                'motivo_restri_auto_libera_parc',
            );
        });
        $.getJSON(
            'aplicativo/cliente_contrato/action/action.php',
            {
                action: 'botaoAjax_28428',
                data_renovacao: this.functions().campo('data_renovacao').val(),
                status: this.functions().campo('status').val(),
                data_expiracao: this.functions().campo('data_expiracao').val(),
            },
            (resposta: any): void => {
                if (resposta !== false) {
                    $('body').IXCnotificacao({
                        tipo: resposta.tipo,
                        timeout: 27000,
                        titulo: resposta.titulo,
                        mensagem: resposta.mensagem,
                    });
                }
            },
        );
        localStorage.setItem('edit', 'true');
        this.functions().campo('id').trigger('change');
        this.parameters().campo_grid_p.id_vd_contrato = () => JSON.stringify([
            {
                TB: 'vd_contratos.Ativo', OP: '=', P: 'S', C: 'AND', G: '1',
            },
            {
                TB: 'vd_contratos.id',
                OP: '=',
                P: this.functions().campo('id_vd_contrato').val(),
                C: 'OR',
                G: '1',
            },
        ]);

        if (IXCparametros.filtrar_plano_venda_filial_contrato === 'S') {
            const idFilialContrato = this.functions().campo('id_filial').val();
            if (idFilialContrato) {
                this.parameters().campo_grid_p.id_vd_contrato = () => JSON.stringify([
                    {
                        TB: 'vd_contratos.id_filial',
                        OP: '=',
                        P: idFilialContrato,
                        C: 'AND',
                        G: '1',
                    },
                    {
                        TB: 'vd_contratos.id_filial', OP: '=', P: '', C: 'OR', G: '1',
                    },
                    {
                        TB: 'vd_contratos.ativo', OP: '=', P: 'S', C: 'AND', G: '2',
                    },
                ]);
            }
        }

        if (this.functions().campo('assinatura_digital').marcado().val() === 'S') {
            this.functions().campo('gerar_finan_assin_digital_contrato').mostra();
        }

        this.functions().campo('data_cancelamento').prop('disabled', true);
        this.functions().campo('data_cancelamento').prop('readonly', true);

        if (IXCparametros.contrato_permite_alterar_data_canc === 'S'
            && (typeof IXC_perm?.cliente_contrato?.campos?.data_cancelamento?.tipo_e === 'undefined'
                || IXC_perm?.cliente_contrato?.campos?.data_cancelamento?.tipo_e === 'H')) {
            this.functions().campo('data_cancelamento').prop('disabled', false);
            this.functions().campo('data_cancelamento').prop('readonly', false);
        }

        this.functions().campo('data_renovacao').change((): void => {
            alerta('alerts', 'Atualizar a data manualmente não irá alterar a data de expiração desse contrato.');
        });

        this.functions().campo('data_ativacao').change((): void => {
            alerta('alerts', 'Atualizar a data manualmente não irá alterar a data de expiração desse contrato.');
        });

        this.functions().campo('fidelidade').change((): void => {
            alerta('alerts', 'Alterar o valor deste campo não ira afetar a data de expiracão dos contratos.');
        });
        if (this.functions().campo('status').val() === 'A'
            && this.functions().campo('status_internet').val() !== 'AA') {
            this.functions().botao('ativar_outro').hide();
        }

        this.parameters().campo_grid_p.id_vendedor = () => JSON.stringify([
            {
                TB: 'vendedor.status', OP: '=', P: 'A', C: 'AND', G: '1',
            },
            {
                TB: ' vendedor.id',
                OP: '=',
                P: this.functions().campo('id_vendedor').val(),
                C: 'OR',
                G: '1',
            },
        ]);
        this.alterarEnderecoPadrao();
        this.functions().campo('endereco_padrao_cliente').change((): void => {
            this.alterarEnderecoPadrao();
        });
        this.functions().campo('id_cliente').change((): void => {
            if (this.functions().campo('endereco_padrao_cliente').marcado().val() === 'S') {
                this.alterarEnderecoPadrao();
            }
        });
        this.trocaCamposEndereco();
        this.functions().campo('bloqueio_automatico').change((): void => {
            this.mudarvisibilidadecampo('bloqueio_automatico', 'nao_bloquear_ate');
        });
        this.functions().campo('aviso_atraso').change((): void => {
            this.mudarvisibilidadecampo('aviso_atraso', 'nao_avisar_ate');
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
            || (this.functions().campo('base_geracao_tipo_doc').marcado().val() === 'PROD')
        ) {
            this.hideOptionalDocumentTypeFields();
        }
    }

    onNovo(): void {
        this.functions().campo('id_vd_contrato').change(() => {
            const idPlan = this.functions().campo('id_vd_contrato').val();
            $.ajax({
                url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_32988',
                type: 'POST',
                async: false,
                data: {id: idPlan},
            }).done((response: any) => {
                this.functions().campo('base_geracao_tipo_doc').marcar(response.base_geracao_por_tipo_doc);
            });
        });

        const esconderCampoSeVazio = (campo: string): void => {
            const valorCampo = this.functions().campo(campo).val();
            if (valorCampo === '' || valorCampo === null) {
                this.functions().campo(campo).esconde();
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

        this.functions().campo('id_vd_contrato').change(() => {
            const idVdContrato = this.functions().campo('id_vd_contrato').val();
            const contractid = this.functions().campo('id').val();
            if (idVdContrato > 0 || contractid > 0) {
                const request = $.ajax({
                    url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_32130',
                    type: 'POST',
                    async: false,
                    data: {id_vd_contrato: idVdContrato},
                });

                request.done((response: any): void => {
                    if (response.type_plan !== this.functions().campo('tipo').marcado().val()) {
                        if (confirm(
                            IXC.tradutor.translate('Ao alterar o plano de venda, o tipo do contrato será '
                                + 'alterado para o tipo do plano de venda. '
                                + '\n'
                                + 'Ex.: O contrato é do tipo "internet", e o plano de venda é do tipo "telefonia", '
                                + 'portanto, o tipo do contrato será alterado para "telefonia".'),
                        )) {
                            this.functions().campo('tipo').marcar(response.type_plan);
                        }
                    }
                });
            }
        });
        localStorage.removeItem('edit');
        this.parameters().campo_grid_p.id_vd_contrato = () => JSON.stringify([
            {TB: 'vd_contratos.Ativo', OP: '=', P: 'S'},
        ]);
        if (IXCparametros.filtrar_plano_venda_filial_contrato === 'S') {
            const idFilialContrato = this.functions().campo('id_filial').val();
            if (idFilialContrato) {
                this.parameters().campo_grid_p.id_vd_contrato = () => JSON.stringify([
                    {
                        TB: 'vd_contratos.id_filial',
                        OP: '=',
                        P: idFilialContrato,
                        C: 'AND',
                        G: '1',
                    },
                    {
                        TB: 'vd_contratos.id_filial', OP: '=', P: '', C: 'OR', G: '1',
                    },
                    {
                        TB: 'vd_contratos.ativo', OP: '=', P: 'S', C: 'AND', G: '2',
                    },
                ]);
            }
        }

        if (this.functions().campo('status').val() === 'P' && this.functions().campo('id').val()) {
            this.functions().botao('ativar_outro').hide();
        }

        IXC.form('cliente_contrato').campo('data').val(moment().format('DD/MM/YYYY'));

        this.parameters().campo_grid_p.id_vendedor = () => JSON.stringify([
            {TB: 'vendedor.status', OP: '=', P: 'A'},
        ]);

        this.functions().campo('id_cliente').change(() => {
            if (this.functions().campo('endereco_padrao_cliente').marcado().val() === 'S') {
                this.alterarEnderecoPadrao();
                this.trocaCamposEndereco();
            }
        });

        this.functions().campo('endereco_padrao_cliente').change(() => {
            this.alterarEnderecoPadrao();
            this.trocaCamposEndereco();
        });
        this.trocaCamposEndereco();
        if (IXCparametros.motivo_inclusao_obrigatorio === 'S') {
            this.functions().campo('motivo_inclusao').val('');
        }
        if ((IXCparametros.gera_por_tipo_doc_produtos === 'S' && this.functions().campo('base_geracao_tipo_doc').marcado().val() === 'P')
            || (this.functions().campo('base_geracao_tipo_doc').marcado().val() === 'PROD')
        ) {
            this.hideOptionalDocumentTypeFields();
        }

        this.functions().campo('data_cancelamento').prop('disabled', true);
        this.functions().campo('data_cancelamento').prop('readonly', true);

        if (IXCparametros.contrato_permite_alterar_data_canc === 'S'
            && (typeof IXC_perm?.cliente_contrato?.campos?.data_cancelamento?.tipo_e === 'undefined'
                || IXC_perm?.cliente_contrato?.campos?.data_cancelamento?.tipo_e === 'H')) {
            this.functions().campo('data_cancelamento').prop('disabled', false);
            this.functions().campo('data_cancelamento').prop('readonly', false);
        }
    }

    onClose(): void {
        localStorage.removeItem('edit');
    }

    onResize(): void {
    }

    onSubmitsucess(j: any): void {
        let idPlanoAtual = this.functions().campo('id_vd_contrato').val();
        const contrato = this.functions().campo('id').val();
        $.getJSON('aplicativo/cliente_contrato/action/action.php?action=botaoAjax_27724', `id=${contrato}&id_vd_contrato=${idPlanoAtual}&id_vd_contrato_antigo=${j.old_id_vd_contrato}`, (response: any) => {
            const responseAjax27724 = response;
            let dataValidadeString = '';
            responseAjax27724.forEach((valor: any) => {
                if (Number(valor.cliente_contrato_id_vd_contrato) !== Number(j.old_id_vd_contrato)) {
                    if (valor.cliente_contrato_descontos_id > 0) {
                        dataValidadeString = IxcCommons.helpers.sprintf(
                            IXC.tradutor.Translate(' com vencimento em '),
                            valor.data_validade_desconto,
                        );
                        if (valor.data_validade_desconto === '00/00/0000') {
                            dataValidadeString = IXC.tradutor.Translate(' sem vencimento');
                        }
                        $('body').IXCnotificacao({
                            tipo: 'alerta',
                            timeout: 27000,
                            titulo: IXC.tradutor.translate('Desconto deletado'),
                            mensagem: IxcCommons.helpers.sprintf(
                                IXC.tradutor.Translate('Existe um desconto vinculado a esse contrato no valor de %s %s que será deletado'),
                                valor.cliente_contrato_descontos_valor, dataValidadeString,
                            ),
                        });
                    } else {
                        dataValidadeString = IxcCommons.helpers.sprintf(
                            IXC.tradutor.Translate(' com vencimento em '),
                            valor.data_validade_acrescimo,
                        );
                        if (valor.data_validade_acrescimo === '00/00/0000') {
                            dataValidadeString = IXC.tradutor.Translate(' sem vencimento');
                        }
                        $('body').IXCnotificacao({
                            tipo: 'alerta',
                            timeout: 27000,
                            titulo: IXC.tradutor.translate('Acréscimo deletado'),
                            mensagem: IxcCommons.helpers.sprintf(
                                IXC.tradutor.Translate('Existe um acréscimo vinculado a esse contrato no valor de %s %s que será deletado'),
                                valor.cliente_contrato_acrescimos_valor, dataValidadeString,
                            ),
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
                titulo: IXC.tradutor.translate('Autenticação Cancelada'),
                mensagem: IXC.tradutor.translate('A autenticação radius relacionada a este contrato foi removida, '
                    + 'edite os logins e relacione o contrato novamente!'),
            });
        }
        if (Array.isArray(j.WarningCoa)) {
            j.WarningCoa.forEach((row: any) => alerta('alerts', row));
        }
        if (Object.prototype.hasOwnProperty.call(j, 'param_cancela_plano_valor_igual')
            && j.param_cancela_plano_valor_igual.toString() === 'S') {
            $('body').IXCnotificacao({
                tipo: 'alerta',
                timeout: 30000,
                titulo: IXC.tradutor.translate('Financeiro Cancelado'),
                mensagem: IXC.tradutor.translate('O parâmetro de cancelamento de parcelas para planos com valor igual '
                    + 'está ativa, todo o financeiro referente a este contrato foi cancelado!'),
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
            const data = j.dadosCancelamento;
            if (IXCparametros.cancelar_venda_ao_cancelar_titulo === 'S') {
                const msg = data.ehVendaFiscal ? IXC.tradutor.translate(`Boleto cancelado com sucesso 
             porém não foi possivel cancelar a venda ${data.idVenda} pois hà vinculo com nota modelo ${data.modeloNf}`)
                    : IXC.tradutor.translate(`Boleto cancelado com sucesso com cancelamento da venda ${data.idVenda}`);

                $('body').IXCnotificacao({
                    tipo: 'alerta',
                    timeout: 30000,
                    titulo: IXC.tradutor.translate('Financeiro Cancelado'),
                    mensagem: msg,
                });
            }
        }
        const fidelidadeContrato = this.functions().campo('fidelidade').val();
        if (fidelidadeContrato === '' || fidelidadeContrato === undefined || fidelidadeContrato === 0) {
            const idContrato = this.functions().campo('id').val();
            const request = $.ajax({
                url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_28340',
                data: {id_contrato: idContrato},
            });
            request.done((response: any) => {
                const fidelidade = Number(response);

                this.functions().campo('fidelidade').val(fidelidade);
            });
        }
        localStorage.setItem('edit', 'true');
    }

    onSubmit(): void {
        const idPlanoAtual = this.functions().campo('id_vd_contrato').val();
        const idContrato = this.functions().campo('id').val();
        if (localStorage.getItem('edit') === 'true') {
            const request = $.ajax({
                url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_28174',
                type: 'POST',
                async: false,
                data: {id_plano_atual: idPlanoAtual, id_contrato: idContrato},
            });
            request.done((response: any) => {
                if (IXCparametros.cancel_finan_valor_igual === 'S' && response.cancela_sempre) {
                    if (!confirm(IXC.tradutor.translate('Ao possuir o parâmetro de cancelamento de financeiro de '
                        + 'planos de mesmo valor ativo em Parâmetros fnanceiros, todo o financeiro poderá ser '
                        + 'cancelado. Deseja continuar?'))) {
                        this.functions().campo('id_vd_contrato').val(response.id_original);
                        this.functions().setErro('Mudança de plano cancelada. Os dados não serão modificados.');
                    }
                } else if (response.valores_diferentes) {
                    if (!confirm(IXC.tradutor.translate('Ao alterar o plano de contrato para outro com valor diferente '
                        + 'do atual, todo o financeiro poderá ser cancelado. Deseja continuar?'))) {
                        this.functions().campo('contrato').val(response.descricao_original);
                        this.functions().campo('id_vd_contrato').val(response.id_original);
                        this.functions().setErro('Mudança de plano cancelada. Os dados não serão modificados.');
                    }
                }
            });
        }

        if (this.naoAlteraDataBase === true) {
            this.naoAlteraDataBase = false;
            if (!confirm(IXC.tradutor.translate('Alterar o campo de data base financeiro de maneira incorreta para '
                + 'contratos que já possuem financeiro pode ocasionar diversos problemas, sendo eles financeiros ou de '
                + 'bloqueio indevido de clientes. Você realmente deseja fazer essa alteração?'))) {
                this.functions().campo('data').val(this.responseAjax27687.data_base_contrato);
                this.functions().setErro(`Atenção: o campo data base financeiro voltou para seu valor original: ${this.responseAjax27687.data_base_contrato}`);
            }
        }
    }

    onSubmiterror(_j: any, _p: any): void {
    }

    hideOptionalDocumentTypeFields(): void {
        this.functions().campo('fieldset_fiscal').esconde();
        this.functions().campo('tipo_doc_opc').esconde();
        this.functions().campo('tipo_doc_opc2').esconde();
        this.functions().campo('tipo_doc_opc3').esconde();
        this.functions().campo('tipo_doc_opc4').esconde();
    }

    showOptionalDocumentTypeFields(): void {
        this.functions().campo('fieldset_fiscal').mostra();
        this.functions().campo('tipo_doc_opc').mostra();
        this.functions().campo('tipo_doc_opc2').mostra();
        this.functions().campo('tipo_doc_opc3').mostra();
        this.functions().campo('tipo_doc_opc4').mostra();
    }

    montaParcAtivacao(): string {
        let dias;
        let vencimentos = '';
        const vencPers = this.functions().campo('venc_personalizado').val();
        const comEntrada = this.functions().campo('com_entrada').val();
        const diaFixo = parseInt(this.functions().campo('dia_fixo_vencimento').val(), 10);
        const numParc = parseInt(this.functions().campo('ativacao_numero_parcelas').val(), 10);
        const tipoCondPag = this.functions().campo('tipo_condicao_pag').val();

        if (vencPers && (tipoCondPag === 'P')) {
            this.functions().campo('ativacao_numero_parcelas').esconde();
            const maturities = vencPers.split(',');
            maturities.forEach((maturity: string) => {
                const days = parseInt(maturity, 10);
                let dataVenc = moment().add(days, 'day').format('DD/MM/YYYY');

                if (comEntrada === 'N') {
                    const dataVencMoment = moment(dataVenc, 'DD/MM/YYYY');
                    dataVencMoment.add(1, 'month');
                    dataVenc = dataVencMoment.format('DD/MM/YYYY');
                }
                vencimentos = vencimentos.concat(dataVenc, ' | ');
            });
        } else {
            for (let i = 0; i <= (numParc - 1); i += 1) {
                if (comEntrada.toString() === 'S') {
                    dias = parseInt(String((i - 1) * 30), 10);
                } else {
                    dias = parseInt(String(i * 30), 10);
                }
                const dataVenc = new Date();
                let diaVenc = 0;
                if (diaFixo !== 0) {
                    diaVenc = diaFixo;
                } else {
                    diaVenc = dataVenc.getDate();
                }
                dataVenc.setDate(dataVenc.getDate() + dias);
                if (tipoCondPag === 'T') {
                    diaVenc = dataVenc.getDate();
                }
                const mesVenc = (dataVenc.getMonth() + 1);
                const anoVenc = dataVenc.getFullYear();
                vencimentos = `${vencimentos + moment().year(anoVenc).month(mesVenc).date(diaVenc)
                    .format('DD/MM/YYYY')} | `;
            }
        }
        return vencimentos;
    }

    calcValParcAtivacao(): void {
        const numParc = parseInt(this.functions().campo('ativacao_numero_parcelas').val(), 10);
        const taxaInst = parseFloat(this.functions().campo('taxa_instalacao').val().replace('.', '')
            .replace(',', '.'));
        if ((numParc > 0) && (taxaInst > 0)) {
            const valParcela = taxaInst / numParc;
            this.functions().campo('ativacao_valor_parcela').val(roundMoeda(valParcela.toString()));
        }
    }

    trocaCamposEndereco(): void {
        const camposAntigos = [
            'id_condominio', 'bloco', 'apartamento', 'cep',
            'endereco', 'numero', 'bairro', 'cidade',
            'referencia', 'complemento', 'latitude', 'longitude',
        ];
        const camposNovos = [
            'condominio_novo', 'bloco_novo', 'apartamento_novo', 'cep_novo',
            'endereco_novo', 'numero_novo', 'bairro_novo', 'cidade_novo',
            'referencia_novo', 'complemento_novo', 'latitude_novo', 'longitude_novo', 'fieldset_endereco_cliente',
        ];
        if (this.functions().campo('endereco_padrao_cliente').marcado().val() === 'S') {
            camposAntigos.forEach((item) => {
                this.functions().campo(item).esconde();
            });
            camposNovos.forEach((item) => {
                this.functions().campo((item)).mostra();
                this.functions().somenteLeitura(item, true);
            });
        } else {
            camposNovos.forEach((item) => {
                this.functions().campo(item).esconde();
                this.functions().somenteLeitura(item, false);
            });
            camposAntigos.forEach((item) => {
                this.functions().campo(item).mostra();
            });

            const camposAdicionarAsterisco = ['cep', 'endereco', 'numero', 'bairro', 'cidade'];
            camposAdicionarAsterisco.forEach((item) => {
                if ($(`label[for=${(item)}]`)[0].innerHTML.indexOf('<font color="#FF0000">&nbsp;*</font>') === -1) {
                    $(`label[for=${(item)}]`)[0].innerHTML += "<font color='#FF0000'>&nbsp;*</font>";
                }
            });
        }
    }

    setFieldState(): void {
        const renovation = this.functions().campo('renovacao_automatica').marcado().val();
        const blocking = this.functions().campo('bloqueio_automatico').marcado().val();
        const delayNotice = this.functions().campo('aviso_atraso').marcado().val();
        if (renovation === 'N' && blocking === 'N' && delayNotice === 'N') {
            const free = this.functions().campo('isentar_contrato').prop('checked');
            if (!free) {
                this.functions().campo('isentar_contrato').prop('checked', true);
                alerta('alerts', IXC.tradutor.translate(
                    "Devido á alteração nos campos 'Bloqueio automático', 'Aviso automático' e "
                    + "'Gera financeiro automático',  a opção 'Isentar contrato' foi marcada.",
                ));
            }
        } else {
            const free = this.functions().campo('isentar_contrato').prop('checked');
            if (free) {
                this.functions().campo('isentar_contrato').prop('checked', false);
                alerta('alerts', IXC.tradutor.translate(
                    "Devido á alteração nos campos 'Bloqueio automático', 'Aviso automático' e "
                    + "'Gera financeiro automático',  a opção 'Isentar contrato' foi desmarcada.",
                ));
            }
        }
    }

    mudarvisibilidadecampo(parametro: any, campo: any): void {
        const valor = this.functions().campo(parametro).marcado().val();
        if (valor === 'N') {
            this.functions().somenteLeitura(campo, true);
        } else {
            this.functions().somenteLeitura(campo, false);
        }
    }

    esconderCamposBloqReducaoMsg(restricao: any, campoOcultar: any): void {
        if (restricao.toString() === 'S') {
            this.functions().campo(campoOcultar).mostra();
        } else {
            this.functions().campo(campoOcultar).esconde();
        }
    }

    verificarDataBase(): void {
        const dataBaseFinanceiro = this.functions().campo('data').val();
        if ((this.responseAjax27687.quantidade_titulos > 0)
            && (this.responseAjax27687.data_base_contrato.toString() !== dataBaseFinanceiro.toString())
            && (this.responseAjax27687.param_alt_data_base_grupo.toString() === 'S')
        ) {
            this.naoAlteraDataBase = true;
        }
    }

    showTipAddress(tipAddress: any): void {
        if (!this.functions().campo('endereco_padrao_cliente').prop('checked')) {
            tipAddress.setAttribute('style', 'display = block');
        } else {
            tipAddress.setAttribute('style', 'display = none');
        }
    }

    alterarEnderecoPadrao(): void {
        const enderecoPadraoCheckbox = this.functions().campo('endereco_padrao_cliente');
        if (enderecoPadraoCheckbox.marcado().val() === 'S') {
            const request = $.ajax({
                url: 'aplicativo/cliente_contrato/action/action.php?action=botaoAjax_29011',
                type: 'POST',
                data: {id_cliente: this.functions().campo('id_cliente').val()},
                dataType: 'JSON',
                async: false,
            });
            request.done((response: any) => {
                if (response != null) {
                    const defineValorCampos = [
                        'condominio_novo', 'bloco_novo', 'apartamento_novo', 'cep_novo', 'endereco_novo',
                        'numero_novo', 'bairro_novo', 'cidade_novo', 'referencia_novo', 'complemento_novo',
                        'latitude_novo', 'longitude_novo',
                    ];
                    defineValorCampos.forEach((item) => {
                        const campoAtual = this.functions().campo(item);
                        campoAtual.attr('readonly', true);
                        campoAtual.addClass('campo-desabilitado');
                        this.functions().campo(item).val(response[item]);
                    });
                    this.functions().campo('condominio_novo').blur();
                    this.functions().campo('cidade_novo').trigger('blur');
                }
            });
        }
    }
}


class OtherFile {
    public addTwoNumbers(a: number, b: number): number {
        return a + b;
    }

    public generateIntNumber() {
        return Math.floor(Math.random() * 100);
    }
}

class myClass {
    public myMethod(num: any) {
        return `${num}`;
    }
}

function tsExample(num: any = 0, num2: any = 0) {
    const otherFile = new OtherFile()
    const number = (new myClass()).myMethod(num);

    return otherFile.addTwoNumbers(number as any, num2 as any);
}