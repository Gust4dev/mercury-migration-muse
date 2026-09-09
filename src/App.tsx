import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { CartProvider } from "@/lib/loja/cart";
import Index from "./pages/Index.tsx";
import VendiMais from "./pages/VendiMais.tsx";

import Suporte from "./pages/Suporte.tsx";
import NotFound from "./pages/NotFound.tsx";

import LojaHome from "./pages/loja/LojaHome.tsx";
import Catalogo from "./pages/loja/Catalogo.tsx";
import ProdutoPage from "./pages/loja/ProdutoPage.tsx";
import CarrinhoPage from "./pages/loja/CarrinhoPage.tsx";
import CheckoutPage from "./pages/loja/CheckoutPage.tsx";
import PedidoPage from "./pages/loja/PedidoPage.tsx";
import ContaPage from "./pages/loja/ContaPage.tsx";

import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminProdutos from "./pages/admin/AdminProdutos.tsx";
import AdminTaxonomy from "./pages/admin/AdminTaxonomy.tsx";
import AdminPedidos from "./pages/admin/AdminPedidos.tsx";
import AdminCupons from "./pages/admin/AdminCupons.tsx";
import AdminConfiguracoes from "./pages/admin/AdminConfiguracoes.tsx";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vendimais" element={<VendiMais />} />
            <Route path="/vendi-mais" element={<VendiMais />} />

            <Route path="/suporte" element={<Suporte />} />

            {/* Loja */}
            <Route path="/loja" element={<LojaHome />} />
            <Route path="/loja/catalogo" element={<Catalogo />} />
            <Route path="/loja/categoria/:slug" element={<Catalogo mode="categoria" />} />
            <Route path="/loja/segmento/:slug" element={<Catalogo mode="segmento" />} />
            <Route path="/loja/produto/:slug" element={<ProdutoPage />} />
            <Route path="/loja/carrinho" element={<CarrinhoPage />} />
            <Route path="/loja/checkout" element={<CheckoutPage />} />
            <Route path="/loja/pedido" element={<PedidoPage />} />
            <Route path="/loja/conta" element={<ContaPage />} />

            {/* Painel administrativo */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="produtos" element={<AdminProdutos />} />
              <Route path="categorias" element={<AdminTaxonomy table="categories" title="Categorias" />} />
              <Route path="segmentos" element={<AdminTaxonomy table="segments" title="Segmentos" />} />
              <Route path="pedidos" element={<AdminPedidos />} />
              <Route path="cupons" element={<AdminCupons />} />
              <Route path="configuracoes" element={<AdminConfiguracoes />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
