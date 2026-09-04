"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORY_META, type InventoryItem } from "@/data/inventory";
import { useInventory } from "@/lib/inventory/useInventory";
import {
  clearInventory,
  exportInventoryJson,
  removeInventoryItem,
  updateInventoryItemMeta,
} from "@/lib/inventory/storage";
import {
  formatCo2eq,
  groupByScope,
  sumCo2eqTons,
  type Scope,
} from "@/lib/inventory/aggregations";
import { useFacility } from "@/lib/facility/useFacility";

const SCOPE_META: Record<Scope, { ko: string }> = {
  1: { ko: "Scope 1 · 직접 배출" },
  2: { ko: "Scope 2 · 전력·열" },
  3: { ko: "Scope 3 · 기타 간접" },
};

/** 인벤토리 메인 뷰 · 총합 배너 + Scope 그룹 + 항목 리스트. */
export function InventoryView() {
  const { items, ready } = useInventory();
  const { facility } = useFacility();

  const grouped = useMemo(() => groupByScope(items), [items]);
  const total = useMemo(() => sumCo2eqTons(items), [items]);

  if (!ready) {
    return (
      <p className="text-sm text-text-dim">인벤토리를 불러오는 중…</p>
    );
  }

  if (items.length === 0) {
    return <EmptyState hasFacility={facility !== null} />;
  }

  return (
    <div>
      {/* ─── 상단 · 총합 배너 ─── */}
      <section className="grid gap-6 border-b border-border pb-8 md:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-semibold tracking-tight text-accent">
              {formatCo2eq(total, 3)}
            </span>
            <span className="font-mono text-sm text-text-muted">t CO₂eq</span>
          </div>
          {facility && (
            <div className="mt-3 text-xs text-text-muted">
              현재 시설 · <span className="text-text">{facility.siteName}</span>
            </div>
          )}
          {!facility && (
            <div className="mt-3 text-xs text-text-dim">
              시설 미등록 상태에서 저장된 항목이 있습니다.{" "}
              <Link href="/facility" className="text-accent underline decoration-dotted underline-offset-4 hover:decoration-solid">
                시설 등록 →
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start gap-2 md:items-end">
          <button
            type="button"
            onClick={() => exportInventoryJson()}
            className="border border-border bg-surface-2 px-3 py-1.5 text-xs text-text hover:border-accent hover:text-accent"
          >
            JSON 내보내기
          </button>
          <button
            type="button"
            onClick={() => {
              if (!confirm(`인벤토리 항목 ${items.length}건을 모두 삭제할까요? 되돌릴 수 없습니다.`)) return;
              clearInventory();
            }}
            className="text-[11px] text-text-dim hover:text-red-600"
          >
            전체 삭제
          </button>
        </div>
      </section>

      {/* ─── Scope 별 그룹 · 소계 · 리스트 ─── */}
      <div className="mt-10 space-y-14">
        {([1, 2, 3] as const).map((scope) => {
          const list = grouped[scope];
          const subtotal = sumCo2eqTons(list);
          return (
            <ScopeGroup
              key={scope}
              scope={scope}
              items={list}
              subtotal={subtotal}
            />
          );
        })}
      </div>
    </div>
  );
}

/** 항목이 하나도 없을 때 · 계산기로 유도. */
function EmptyState({ hasFacility }: { hasFacility: boolean }) {
  return (
    <div className="border border-border bg-surface-2 p-10 text-center">
      <p className="text-sm text-text-muted">
        아직 담긴 항목이 없습니다.
      </p>
      <p className="mt-1 text-sm text-text-dim">
        각 계산기의 결과 아래 <span className="font-mono text-[11px] text-text">‹인벤토리에 추가›</span> 버튼을 누르면 여기에 누적됩니다.
      </p>
      <div className="mt-6 flex flex-wrap items-baseline justify-center gap-6 text-sm">
        {!hasFacility && (
          <Link href="/facility" className="text-accent underline decoration-dotted underline-offset-4 hover:decoration-solid">
            시설 먼저 등록 →
          </Link>
        )}
        <Link href="/scope1/fuel-combustion" className="text-accent underline decoration-dotted underline-offset-4 hover:decoration-solid">
          연료 연소 →
        </Link>
        <Link href="/scope1/refrigerant" className="text-accent underline decoration-dotted underline-offset-4 hover:decoration-solid">
          냉매 →
        </Link>
        <Link href="/scope2" className="text-accent underline decoration-dotted underline-offset-4 hover:decoration-solid">
          전력 · 열 →
        </Link>
      </div>
    </div>
  );
}

function ScopeGroup({
  scope,
  items,
  subtotal,
}: {
  scope: Scope;
  items: InventoryItem[];
  subtotal: number;
}) {
  const meta = SCOPE_META[scope];
  return (
    <section>
      <header className="flex items-baseline justify-between border-b border-border pb-3">
        <h2 className="text-lg font-semibold text-text">
          {meta.ko}
        </h2>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold text-accent">
            {formatCo2eq(subtotal, 3)}
          </span>
          <span className="font-mono text-xs text-text-muted">t CO₂eq</span>
          <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-text-dim">
            · {items.length}건
          </span>
        </div>
      </header>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-text-dim">
          이 Scope 에 담긴 항목이 없습니다.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-border">
          {items.map((item) => (
            <InventoryItemRow key={item.id} item={item} />
          ))}
        </ul>
      )}
    </section>
  );
}

function InventoryItemRow({ item }: { item: InventoryItem }) {
  const cat = CATEGORY_META[item.category];
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(item.label);
  const [memo, setMemo] = useState(item.memo ?? "");

  function save() {
    updateInventoryItemMeta(item.id, {
      label: label.trim() || item.label,
      memo: memo.trim() ? memo.trim() : undefined,
    });
    setEditing(false);
  }

  function remove() {
    if (!confirm(`"${item.label}" 를 인벤토리에서 삭제할까요?`)) return;
    removeInventoryItem(item.id);
  }

  return (
    <li className="py-4">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        {/* 좌측 · 라벨 · 메타 · 요약 */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
              {cat.ko}
            </span>
            {editing ? (
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="min-w-0 flex-1 rounded-none border border-border bg-surface-2 px-2 py-1 text-sm text-text focus:border-accent focus:outline-none"
                maxLength={120}
                autoFocus
              />
            ) : (
              <span className="text-sm font-medium text-text truncate">
                {item.label}
              </span>
            )}
          </div>

          <div className="mt-1.5 text-xs text-text-muted">
            {item.display.activity}
            <span className="mx-2 text-text-dim">·</span>
            <span className="font-mono text-[10px] uppercase tracking-widest">
              {item.display.conditions}
            </span>
          </div>

          {editing ? (
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모 (선택)"
              rows={2}
              className="mt-2 w-full rounded-none border border-border bg-surface-2 px-2 py-1 text-xs text-text focus:border-accent focus:outline-none"
              maxLength={400}
            />
          ) : (
            item.memo && (
              <p className="mt-1.5 text-xs text-text-dim">{item.memo}</p>
            )
          )}

          {item.facility && (
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-text-dim">
              site · {item.facility.siteName} · {item.facility.grade}
            </div>
          )}

          {item.warnings.length > 0 && (
            <ul className="mt-1.5 space-y-0.5 text-[11px] text-warn">
              {item.warnings.map((w, i) => (
                <li key={i}>· {w}</li>
              ))}
            </ul>
          )}
        </div>

        {/* 우측 · 값 · 액션 */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-accent">
              {formatCo2eq(item.totalCo2eq.value, 4)}
            </span>
            <span className="font-mono text-xs text-text-muted">t CO₂eq</span>
          </div>
          <div className="flex items-baseline gap-3 text-[11px]">
            <Link
              href={cat.href}
              className="text-text-dim hover:text-accent"
              title="이 계산기로 이동"
            >
              계산기 ↗
            </Link>
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={save}
                  className="font-medium text-accent hover:underline"
                >
                  저장
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setLabel(item.label);
                    setMemo(item.memo ?? "");
                  }}
                  className="text-text-dim hover:text-text"
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="text-text-dim hover:text-accent"
                >
                  편집
                </button>
                <button
                  type="button"
                  onClick={remove}
                  className="text-text-dim hover:text-red-600"
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
