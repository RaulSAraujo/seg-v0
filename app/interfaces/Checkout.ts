export interface Checkout {
    colorSeller: string;
    ecomOrderId: string;
    pointSale: string;
    listProductsOrder: ListProductsOrder[];
    orderBox: OrderBox;
    seller: string
}

export interface ListProductsOrder {
    id: number;
    name: string;
    brand: string;
    width: string;
    height: string;
    length: string;
    weight: string;
    imageUrl: string;
    description: string;
    quantitySold: number;
    weight_cubic: string;
    produto_chave: number;
    countedQuantity: number;
    tags: Tag[];
}

export interface Tag {
    check: boolean;
    tag_id: number;
    ecom_order_id: number;
}

export interface OrderBox {
    box: string;
}
