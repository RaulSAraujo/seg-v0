import type { RouteLocationNormalizedLoaded } from "#vue-router";

export const useModelStore = defineStore("models", () => {
  /**
   * @param {string} entity_name Nome da entidade principal (model)
   * @param {string} page_title Título da página exibido ao usuário
   * @param {string} route_path Caminho da rota para a página
   * @param {string} api_endpoint Endpoint da API para as operações relacionadas
   * @param {string} menu Categoria da pagina
   */
  const models = ref([
    {
      entity_name: "Product",
      page_title: "Produto Compra",
      route_path: "product",
      api_endpoint: "product",
      menu: "Cadastro",
    },
    {
      entity_name: "ProductLogs",
      page_title: "Produto Compra",
      route_path: "product-logs",
      api_endpoint: "product/logs",
      menu: "Cadastro",
    },
    {
      entity_name: "ProductSell",
      page_title: "Produto venda",
      route_path: "product-sell",
      api_endpoint: "product-sell",
      menu: "Cadastro",
    },
    {
      entity_name: "Supplier",
      page_title: "Fornecedores",
      route_path: "supplier",
      api_endpoint: "supplier",
      menu: "Cadastro",
    },
    {
      entity_name: "Apparatus",
      page_title: "Aparelhos",
      route_path: "apparatus",
      api_endpoint: "apparatus",
      menu: "Cadastro",
    },
    {
      entity_name: "ClassificationApparatus",
      page_title: "Classificação de aparelhos",
      route_path: "apparatus-classification",
      api_endpoint: "apparatus/classification-apparatus",
      menu: "Cadastro",
    },
    {
      entity_name: "Clients",
      page_title: "Clientes",
      route_path: "client",
      api_endpoint: "clients",
      menu: "Cadastro",
    },
    {
      entity_name: "Package",
      page_title: "Embalagens",
      route_path: "package",
      api_endpoint: "package",
      menu: "Cadastro",
    },
    {
      entity_name: "ValidateProductsImage",
      page_title: "Validação de imagens",
      route_path: "validate-image",
      api_endpoint: "validate-products-image",
      menu: "Cadastro",
    },
    {
      entity_name: "ShipmentOrders",
      page_title: "Transportadoras",
      route_path: "shipment",
      api_endpoint: "shipment-orders",
      menu: "Cadastro",
    },
    {
      entity_name: "PrintersSettings",
      page_title: "Impressoras",
      route_path: "printer",
      api_endpoint: "printers-settings",
      menu: "Cadastro",
    },
    {
      entity_name: "PurchaseControl",
      page_title: "Pedido de compra",
      route_path: "purchase-order",
      api_endpoint: "purchase-control",
      menu: "Compras",
    },
    {
      entity_name: "ImportOrders",
      page_title: "Pedido importação",
      route_path: "order-import",
      api_endpoint: "import-orders",
      menu: "Compras",
    },
    {
      entity_name: "QuotationPack",
      page_title: "Cotações",
      route_path: "quotation",
      api_endpoint: "quotation-pack",
      menu: "Compras",
    },
    {
      entity_name: "PurchaseRequest",
      page_title: "Solicitações de compra",
      route_path: "purchase-request",
      api_endpoint: "purchase-request",
      menu: "Compras",
    },
    {
      entity_name: "InputMaterials",
      page_title: "Insumos",
      route_path: "insumos",
      api_endpoint: "input-materials",
      menu: "Compras",
    },
    {
      entity_name: "SavedRma",
      page_title: "Salvados",
      route_path: "saved-rma",
      api_endpoint: "saved-rma",
      menu: "Compras",
    },
    {
      entity_name: "OrdersFinalityStockMl",
      page_title: "Pedidos mercado livre",
      route_path: "order-ml",
      api_endpoint: "orders-finality-stock-ml",
      menu: "Compras",
    },
    {
      entity_name: "PendencyPrice",
      page_title: "Pendencias de preço",
      route_path: "pending-price",
      api_endpoint: "pendency-price/purchase-control-product",
      menu: "Compras",
    },
    {
      entity_name: "ValidateVirtualStock",
      page_title: "Validação de estoque virtual",
      route_path: "validate-stock-virtual",
      api_endpoint: "validate-virtual-stock",
      menu: "Compras",
    },
    {
      entity_name: "MinimumStock",
      page_title: "Estoque mínimo",
      route_path: "minimum-stock",
      api_endpoint: "minimum-stock",
      menu: "Compras",
    },
    {
      entity_name: "StockMovementAnalysis",
      page_title: "Análise de movimentação de estoque",
      route_path: "stock-movement-analysis",
      api_endpoint: "stock-movement-analysis",
      menu: "Compras",
    },
    {
      entity_name: "SupplierPasswords",
      page_title: "Senha de fornecedores",
      route_path: "supplier-password",
      api_endpoint: "supplier-passwords",
      menu: "Compras",
    },
    {
      entity_name: "SupplierPasswordsLogs",
      page_title: "Logs de alteração de senhas",
      route_path: "supplier-password-log",
      api_endpoint: "supplier-passwords/supplier-passwords-logs",
      menu: "Compras",
    },
    {
      entity_name: "LimitDatePurchaseControl",
      page_title: "Data limite pedido compra",
      route_path: "limit-date",
      api_endpoint: "limit-date-purchase-control",
      menu: "Compras",
    },
    {
      entity_name: "ShippingValidation",
      page_title: "Validação de envio",
      route_path: "shipping-validation",
      api_endpoint: "shipping-validation",
      menu: "Vendas",
    },
    {
      entity_name: "WarrantyRma",
      page_title: "Garantia",
      route_path: "warranty",
      api_endpoint: "warranty-rma",
      menu: "Vendas",
    },
    {
      entity_name: "SellDevice",
      page_title: "Aparelhos à venda",
      route_path: "sell-device",
      api_endpoint: "sell-device",
      menu: "Vendas",
    },
    {
      entity_name: "SacSale",
      page_title: "Sac",
      route_path: "sac",
      api_endpoint: "sac-sale",
      menu: "Vendas",
    },
    {
      entity_name: "TemplateConfig",
      page_title: "Template produtos",
      route_path: "product-template",
      api_endpoint: "template-config",
      menu: "Vendas",
    },
    {
      entity_name: "SalesOrdersSeparation",
      page_title: "Pedidos de separação",
      route_path: "separation-requests",
      api_endpoint: "sales-orders-separation",
      menu: "Vendas",
    },
    {
      entity_name: "CounterOrder",
      page_title: "Pedido Balcão",
      route_path: "counter-order",
      api_endpoint: "counter-order",
      menu: "Vendas",
    },
    {
      entity_name: "ServiceOrder",
      page_title: "Ordem de serviço",
      route_path: "service-order",
      api_endpoint: "service-order",
      menu: "Serviços",
    },
    {
      entity_name: "SeveralTables",
      page_title: "Tabela diversas",
      route_path: "several-tables",
      api_endpoint: "several-tables",
      menu: "Serviços",
    },
    {
      entity_name: "City",
      page_title: "Cidade",
      route_path: "several-tables-index-city",
      api_endpoint: "several-tables/city",
      menu: "Serviços",
    },
    {
      entity_name: "Region",
      page_title: "Região",
      route_path: "several-tables-index-region",
      api_endpoint: "several-tables/region",
      menu: "Serviços",
    },
    {
      entity_name: "ReceptionCashControl",
      page_title: "Controle de caixa",
      route_path: "cash-control",
      api_endpoint: "reception-cash-control",
      menu: "Serviços",
    },
    {
      entity_name: "InternalObservation",
      page_title: "Crm",
      route_path: "crm",
      api_endpoint: "internal-observation",
      menu: "Serviços",
    },
    {
      entity_name: "ServiceOrderSchedule",
      page_title: "Agenda",
      route_path: "schedule",
      api_endpoint: "service-order-schedule",
      menu: "Serviços",
    },
    {
      entity_name: "ExternalServiceReport",
      page_title: "Atendimento externo",
      route_path: "external",
      api_endpoint: "external-service-report",
      menu: "Serviços",
    },
    {
      entity_name: "ErpProductStock",
      page_title: "Local de armazenagem",
      route_path: "storage-location",
      api_endpoint: "erp-product-stock",
      menu: "Estoque",
    },
    {
      entity_name: "ProductLoan",
      page_title: "Controle de empréstimo",
      route_path: "product-loan",
      api_endpoint: "product-loan",
      menu: "Estoque",
    },
    {
      entity_name: "OrderPicking",
      page_title: "Separação",
      route_path: "separation-log",
      api_endpoint: "order-picking",
      menu: "Estoque",
    },
    {
      entity_name: "StockTagControl",
      page_title: "Etiqueta de produto",
      route_path: "product-label",
      api_endpoint: "stock-tag-control",
      menu: "Estoque",
    },
    {
      entity_name: "PartsCollectionManagement",
      page_title: "Gestão de coletas",
      route_path: "parts-collection-management",
      api_endpoint: "parts-collection-management",
      menu: "Estoque",
    },
    {
      entity_name: "StockingModule",
      page_title: "Log de estocagem",
      route_path: "stocking-module",
      api_endpoint: "stocking-module",
      menu: "Estoque",
    },
    {
      entity_name: "StockTransfer",
      page_title: "Transferência",
      route_path: "transfer",
      api_endpoint: "stock-transfer",
      menu: "Estoque",
    },
    {
      entity_name: "Receivement",
      page_title: "Recebimento",
      route_path: "receipt",
      api_endpoint: "Receivement",
      menu: "Estoque",
    },
    {
      entity_name: "TaxStock",
      page_title: "Estoque fiscal",
      route_path: "tax-stock",
      api_endpoint: "tax-stock",
      menu: "Estoque",
    },
    {
      entity_name: "SuggestedStorageLocation",
      page_title: "Sugestão local de armazenagem",
      route_path: "suggested-storage-location",
      api_endpoint: "suggested-storage-location",
      menu: "Estoque",
    },
    {
      entity_name: "PurchaseReturn",
      page_title: "Devolução de Compra",
      route_path: "purchase-return",
      api_endpoint: "purchase-return",
      menu: "Estoque",
    },
    {
      entity_name: "Dashboard",
      page_title: "Dashboard",
      route_path: "dashboard",
      api_endpoint: "dashboard",
      menu: "Expedição",
    },
    {
      entity_name: "SalesOrder",
      page_title: "Checkout",
      route_path: "check-out",
      api_endpoint: "sales-order",
      menu: "Expedição",
    },
    {
      entity_name: "CarrierCutTime",
      page_title: "Horário de corte",
      route_path: "cut-time",
      api_endpoint: "carrier-cut-time",
      menu: "Expedição",
    },
    {
      entity_name: "ShippingUrgency",
      page_title: "Urgência de envio",
      route_path: "shipping-urgency",
      api_endpoint: "shipping-urgency",
      menu: "Expedição",
    },
    {
      entity_name: "SalesCollection",
      page_title: "Romaneio",
      route_path: "romaneio",
      api_endpoint: "sales-collection",
      menu: "Expedição",
    },
    {
      entity_name: "ProductSyncErrors",
      page_title: "Erros sincronização",
      route_path: "integration-sync-errors",
      api_endpoint: "product-sync-errors",
      menu: "Integrações",
    },
    {
      entity_name: "Ecommerce",
      page_title: "Ecommerce",
      route_path: "integration-ecommerce",
      api_endpoint: "ecommerce",
      menu: "Integrações",
    },
    {
      entity_name: "IntegrationLogs",
      page_title: "Log de Integrações",
      route_path: "integration-log",
      api_endpoint: "integration-logs",
      menu: "Integrações",
    },
    {
      entity_name: "ErpProduct",
      page_title: "Fila erp-seg",
      route_path: "integration-log-index-erp-seg",
      api_endpoint: "integration-logs/erp-product",
      menu: "Integrações",
    },
    {
      entity_name: "SegEcom",
      page_title: "Fila seg-ecom",
      route_path: "integration-log-index-seg-ecom",
      api_endpoint: "integration-logs/seg-ecom",
      menu: "Integrações",
    },
    {
      entity_name: "ErpWarehouse",
      page_title: "Almoxarifados",
      route_path: "warehouse",
      api_endpoint: "erp-warehouse",
      menu: "Configurações de sistema",
    },
    {
      entity_name: "Companies",
      page_title: "Empresas",
      route_path: "company",
      api_endpoint: "companies",
      menu: "Configurações de sistema",
    },
    {
      entity_name: "InvoiceRule",
      page_title: "Faturamento",
      route_path: "invoicing",
      api_endpoint: "invoice-rule",
      menu: "Configurações de sistema",
    },
    {
      entity_name: "CustomFilters",
      page_title: "Filtros/Grid",
      route_path: "custom-filter-grid",
      api_endpoint: "custom-filters",
      menu: "Configurações de sistema",
    },
    {
      entity_name: "ManageSystem",
      page_title: "Sistema",
      route_path: "manage-system",
      api_endpoint: "manager-system",
      menu: "Configurações de sistema",
    },
    {
      entity_name: "TablePrice",
      page_title: "Tabela de preço balcão",
      route_path: "table-price",
      api_endpoint: "table-price",
      menu: "Configurações de sistema",
    },
    {
      entity_name: "NotificationsConfig",
      page_title: "Configuração de notificações",
      route_path: "notifications-configuration",
      api_endpoint: "notifications-config",
      menu: "Configurações de usuários",
    },
    {
      entity_name: "UsersAccessList",
      page_title: "Lista de acesso",
      route_path: "access-list",
      api_endpoint: "users-access-list",
      menu: "Configurações de usuários",
    },
    {
      entity_name: "LoginLog",
      page_title: "Log de acesso",
      route_path: "access-log",
      api_endpoint: "login-log",
      menu: "Configurações de usuários",
    },
    {
      entity_name: "Group",
      page_title: "Perfil",
      route_path: "setting-profile",
      api_endpoint: "group",
      menu: "Configurações de usuários",
    },
    {
      entity_name: "User",
      page_title: "Usuários",
      route_path: "manage-user",
      api_endpoint: "user",
      menu: "Configurações de usuários",
    },
    {
      entity_name: "SupportRequest",
      page_title: "Chamados",
      route_path: "support-request",
      api_endpoint: "support-request",
      menu: "Chamados",
    },
    {
      entity_name: "Automations",
      page_title: "Puppeteer",
      route_path: "automation-puppeteer",
      api_endpoint: "automations",
      menu: "Automações",
    },
  ]);

  function fictitiousModels(text: string) {
    if (text == "PendencyPrice") return "PurchaseControlProduct";

    return text;
  }

  function findModelName() {
    const { name }: RouteLocationNormalizedLoaded = useRoute();

    let entityName = models.value.find((e) => e.route_path == name)?.entity_name;

    // Verificar se model atual é fictícia
    entityName = fictitiousModels(entityName!);

    return entityName;
  }

  function findApiEndpoint() {
    const { name }: RouteLocationNormalizedLoaded = useRoute();

    return models.value.find((e) => e.route_path == name)?.api_endpoint ?? "";
  }

  return { findModelName, findApiEndpoint, models };
});
