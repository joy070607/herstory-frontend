// GET /api/v1/cart/my?memberId={memberId} 응답 스키마

export interface CartItemDetail {
  cartItemId: number;
  productId: number;
  productName: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export type CartStatus = "IN_CART" | "CHECKED_OUT" | "CANCELLED";

export interface CartResponse {
  cartId: number;
  memberId: number;
  choiceFit: boolean;
  status: CartStatus;
  items: CartItemDetail[];
  totalPrice: number;
}
