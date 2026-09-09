# Roadmap

## Mercado Pago (Checkout Transparente + Orders API)
- [x] Banco: campos de pagamento no pedido, tentativas em `payments`, eventos de webhook
- [x] Funções de servidor: `mp-config`, `mp-create-payment`, `mp-payment-status`, `mercado-pago-webhook`
- [x] Checkout: PIX + cartão de crédito sem sair do site
- [x] Painel administrativo: seção de pagamento no pedido
- [x] Somente credenciais de PRODUÇÃO (`MERCADO_PAGO_*`), `PAYMENT_ENVIRONMENT=production`
- [ ] Cadastro dos secrets de produção pelo usuário (bloqueado: depende das chaves reais)
- [ ] Cadastro da URL do webhook no painel do Mercado Pago (bloqueado: ação no painel do usuário)
