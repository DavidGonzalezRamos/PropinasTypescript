import { useMemo } from "react";
import { OrderItem } from "../types";
import { formatCurrency } from "../helpers";

type OrderTotalsProp = {
  order: OrderItem[];
  tip: number;
  placeOrder: () => void;
};
export default function OrderTotals({
  order,
  tip,
  placeOrder,
}: OrderTotalsProp) {
  const subtotalAmount = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order]);
  const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order]);
  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propina</h2>
        <p>Subtotal a pagar: </p>
        <span className="font-bold">{formatCurrency(subtotalAmount)}</span>

        <p>Propina: </p>
        <span className="font-bold">{formatCurrency(tipAmount)}</span>

        <p>Total a pagar: </p>
        <span className="font-bold">{formatCurrency(totalAmount)}</span>
      </div>
      <button
        className="w-full bg-black p-3 uppercase text-white mt-10 font-bold disabled:opacity-15"
        disabled={totalAmount === 0}
        onClick={placeOrder}
      >
        Guardar Orden
      </button>
    </>
  );
}
