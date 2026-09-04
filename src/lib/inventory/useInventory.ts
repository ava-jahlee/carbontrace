"use client";

/**
 * useInventory · 저장된 인벤토리 항목 배열을 React 상태로 노출.
 *
 * localStorage 를 초기 소스로 하되 · add/update/remove/clear 뒤 dispatch
 * 되는 INVENTORY_EVENT 를 구독해 다중 컴포넌트가 자동 sync 된다.
 */

import { useEffect, useState } from "react";
import type { InventoryItem } from "@/data/inventory";
import { INVENTORY_EVENT, loadInventory } from "./storage";

export function useInventory(): {
  items: InventoryItem[];
  ready: boolean;
} {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(loadInventory());
    setReady(true);

    const onChange = () => setItems(loadInventory());
    window.addEventListener(INVENTORY_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(INVENTORY_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return { items, ready };
}
