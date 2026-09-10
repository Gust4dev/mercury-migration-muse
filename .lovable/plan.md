# CEP, endereço e frete automáticos na Loja

Objetivo: o cliente informa o CEP uma única vez, o endereço aparece sozinho e as opções de entrega são calculadas automaticamente — sem botão "Calcular".

## O que muda para o cliente

1. **Página do produto**: digita o CEP e as opções de entrega aparecem sozinhas, assim que os 8 dígitos estiverem completos.
2. **Carrinho**: já vem com o CEP informado antes e mostra o frete automaticamente, recalculando se quantidades ou produtos mudarem.
3. **Checkout**: o CEP já vem preenchido, rua/bairro/cidade/UF são preenchidos sozinhos (o cliente só digita número e complemento) e as opções de entrega aparecem sem clique.
4. **Trocar o CEP**: a cotação anterior é descartada na hora, o endereço é consultado de novo e o frete recalculado; nunca fica um frete de um CEP antigo.
5. **CEP não encontrado**: mensagem amigável ("Não encontramos esse CEP, preencha o endereço manualmente") e os campos continuam editáveis — não trava a compra.
6. Enquanto consulta: "Buscando endereço..." e "Calculando opções de entrega...".

## Detalhes técnicos

**Novo arquivo `src/lib/loja/cep.ts`**
- `getSavedCep()` / `saveCep()` usando a mesma chave `mercury-loja-cep` já existente, com evento para sincronizar entre componentes na mesma aba.
- `lookupCep(cep)`: consulta ViaCEP (aceita com/sem hífen, normaliza para 8 dígitos), retorna `{ street, district, city, state }` ou `null` quando não encontrado; erros de rede não quebram o fluxo.
- Hook `useCepAddress()` para o checkout: estado de carregamento, erro amigável e disparo automático quando o CEP fica válido.

**`src/components/loja/ShippingCalculator.tsx`**
- Cotação automática (debounce ~600ms) quando o CEP tem 8 dígitos válidos, reutilizando `quoteShipping` do Melhor Envio sem alteração.
- Botão "Calcular" vira apenas fallback ("Tentar novamente") em caso de erro.
- CEP inicial passa a vir de `getSavedCep()` e é salvo a cada CEP válido; alteração de itens continua invalidando a cotação (lógica atual mantida).
- Recalcula automaticamente quando a assinatura de itens muda e já existe CEP válido.

**`src/pages/loja/ProdutoPage.tsx` / `CarrinhoPage.tsx`**
- Passam a ler o CEP compartilhado e não precisam de mudanças de layout; carrinho continua repassando `onCepChange`.

**`src/pages/loja/CheckoutPage.tsx`**
- CEP inicial de `getSavedCep()`; ViaCEP dispara no `onChange` ao completar 8 dígitos (não só no blur), com indicador de carregamento e mensagem de erro.
- Troca de CEP limpa cotação e opção selecionada (já existe) e a cotação nova acontece sozinha via `ShippingCalculator`.
- Mesma lógica de ViaCEP também no modo "Entrega grátis em Anápolis/GO".

**Sem mudanças em**: Mercado Pago, Edge Functions (`shipping-quote`, `create-order`), packing/Melhor Envio, banco. A validação e o recálculo do total continuam sendo feitos no servidor antes do pagamento; o CEP salvo no navegador serve só como conveniência.
