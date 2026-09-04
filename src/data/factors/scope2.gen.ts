/**
 * scope2.gen.ts — Scope 2 배출계수 (자동 생성 · 손대지 마세요)
 *
 * 원본: C:\\Workspace\\Private\\온실가스\\GHGCalc_V0m_lja.xlsm
 * 생성: scripts/build_scope2_data.py
 *
 * 카테고리:
 *   POWER     : 전력 배출계수 (kg/MWh, 발전단/소비단, GIR 승인 연도별)
 *   HEAT_KDHC : 한국지역난방공사 지사별 열 배출계수 (kg/TJ, 8지사 × 계획기간 3기/4기)
 *   HEAT_NATIONAL : 국가 통합 열(스팀) 3종 (kg/TJ, 열전용/열병합/열평균) - 원출처 미상
 */

import type { Measurement } from "@/data/factors/types";
import {
  GIR_POWER_2017,
  GIR_POWER_2022,
  KDHC_HEAT_EF,
  KETS_HEAT_EF,
} from "@/data/sources";

export type PowerVintage = "2017" | "2022";
export type PowerLocation = "발전단" | "소비단";
export type PowerGhg = "CO2" | "CH4" | "N2O";
export type HeatKind = "열전용" | "열병합" | "열평균";
export type KdhcPhase = "3기" | "4기";
export type KdhcDistrict =
  | "수도권지사" | "평택지사" | "청주지사" | "세종지사"
  | "대구지사" | "양산지사" | "김해지사" | "광주전남지사";

export interface PowerEmissionFactors {
  vintage: PowerVintage;
  location: PowerLocation;
  ncv: Measurement;                       // MJ/kWh
  ef: Record<PowerGhg, Measurement>;      // kg/MWh
}

export interface HeatEmissionFactorsKdhc {
  phase: KdhcPhase;
  district: KdhcDistrict;
  ef: Record<PowerGhg, Measurement>;      // kg/TJ
}

export interface HeatEmissionFactorsNational {
  kind: HeatKind;
  ef: Record<PowerGhg, Measurement>;      // kg/TJ
}

export const POWER: PowerEmissionFactors[] = [
  {
    "vintage": "2017",
    "location": "발전단",
    "ncv": { "value": 8.9, "unit": "MJ/kWh", "primarySource": { ...GIR_POWER_2017, "note": "2017년 승인 · 발전단 순발열량 (K-ETS 별표 12 표 A 전기 항목과 동일)" } },
    "ef": {
      "CO2": { "value": 440.1, "unit": "kgGHG/MWh", "primarySource": { ...GIR_POWER_2017, "note": "2017년 승인 · 발전단 · CO2" } },
      "CH4": { "value": 0.0034, "unit": "kgGHG/MWh", "primarySource": { ...GIR_POWER_2017, "note": "2017년 승인 · 발전단 · CH4" } },
      "N2O": { "value": 0.0082, "unit": "kgGHG/MWh", "primarySource": { ...GIR_POWER_2017, "note": "2017년 승인 · 발전단 · N2O" } },
    },
  },
  {
    "vintage": "2017",
    "location": "소비단",
    "ncv": { "value": 9.6, "unit": "MJ/kWh", "primarySource": { ...GIR_POWER_2017, "note": "2017년 승인 · 소비단 순발열량 (K-ETS 별표 12 표 A 전기 항목과 동일)" } },
    "ef": {
      "CO2": { "value": 456.7, "unit": "kgGHG/MWh", "primarySource": { ...GIR_POWER_2017, "note": "2017년 승인 · 소비단 · CO2" } },
      "CH4": { "value": 0.0036, "unit": "kgGHG/MWh", "primarySource": { ...GIR_POWER_2017, "note": "2017년 승인 · 소비단 · CH4" } },
      "N2O": { "value": 0.0085, "unit": "kgGHG/MWh", "primarySource": { ...GIR_POWER_2017, "note": "2017년 승인 · 소비단 · N2O" } },
    },
  },
  {
    "vintage": "2022",
    "location": "발전단",
    "ncv": { "value": 8.9, "unit": "MJ/kWh", "primarySource": { ...GIR_POWER_2022, "note": "2022년 승인 · 발전단 순발열량 (K-ETS 별표 12 표 A 전기 항목과 동일)" } },
    "ef": {
      "CO2": { "value": 440.3, "unit": "kgGHG/MWh", "primarySource": { ...GIR_POWER_2022, "note": "2022년 승인 · 발전단 · CO2" } },
      "CH4": { "value": 0.0116, "unit": "kgGHG/MWh", "primarySource": { ...GIR_POWER_2022, "note": "2022년 승인 · 발전단 · CH4" } },
      "N2O": { "value": 0.0093, "unit": "kgGHG/MWh", "primarySource": { ...GIR_POWER_2022, "note": "2022년 승인 · 발전단 · N2O" } },
    },
  },
  {
    "vintage": "2022",
    "location": "소비단",
    "ncv": { "value": 9.6, "unit": "MJ/kWh", "primarySource": { ...GIR_POWER_2022, "note": "2022년 승인 · 소비단 순발열량 (K-ETS 별표 12 표 A 전기 항목과 동일)" } },
    "ef": {
      "CO2": { "value": 474.7, "unit": "kgGHG/MWh", "primarySource": { ...GIR_POWER_2022, "note": "2022년 승인 · 소비단 · CO2" } },
      "CH4": { "value": 0.0125, "unit": "kgGHG/MWh", "primarySource": { ...GIR_POWER_2022, "note": "2022년 승인 · 소비단 · CH4" } },
      "N2O": { "value": 0.01, "unit": "kgGHG/MWh", "primarySource": { ...GIR_POWER_2022, "note": "2022년 승인 · 소비단 · N2O" } },
    },
  },
];

export const HEAT_KDHC: HeatEmissionFactorsKdhc[] = [
  {
    "phase": "3기",
    "district": "수도권지사",
    "ef": {
      "CO2": { "value": 35840.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 수도권지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 0.649, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 수도권지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.0658, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 수도권지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "3기",
    "district": "평택지사",
    "ef": {
      "CO2": { "value": 11041.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 평택지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 0.232, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 평택지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.0204, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 평택지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "3기",
    "district": "청주지사",
    "ef": {
      "CO2": { "value": 66698.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 청주지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 2.536, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 청주지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.5058, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 청주지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "3기",
    "district": "세종지사",
    "ef": {
      "CO2": { "value": 41305.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 세종지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 0.742, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 세종지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.0742, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 세종지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "3기",
    "district": "대구지사",
    "ef": {
      "CO2": { "value": 53065.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 대구지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 6.1671, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 대구지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.949, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 대구지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "3기",
    "district": "양산지사",
    "ef": {
      "CO2": { "value": 42263.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 양산지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 0.7547, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 양산지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.0755, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 양산지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "3기",
    "district": "김해지사",
    "ef": {
      "CO2": { "value": 33977.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 김해지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 0.6056, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 김해지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.0606, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 김해지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "3기",
    "district": "광주전남지사",
    "ef": {
      "CO2": { "value": 41830.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 광주전남지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 13.93, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 광주전남지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 1.8397, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 3기 · 광주전남지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "4기",
    "district": "수도권지사",
    "ef": {
      "CO2": { "value": 35991.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 수도권지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 0.6519, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 수도권지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.0661, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 수도권지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "4기",
    "district": "평택지사",
    "ef": {
      "CO2": { "value": 18391.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 평택지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 0.3574, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 평택지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.0334, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 평택지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "4기",
    "district": "청주지사",
    "ef": {
      "CO2": { "value": 67038.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 청주지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 2.549, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 청주지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.5084, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 청주지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "4기",
    "district": "세종지사",
    "ef": {
      "CO2": { "value": 41305.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 세종지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 0.742, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 세종지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.0742, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 세종지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "4기",
    "district": "대구지사",
    "ef": {
      "CO2": { "value": 53392.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 대구지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 6.2051, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 대구지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.9549, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 대구지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "4기",
    "district": "양산지사",
    "ef": {
      "CO2": { "value": 43042.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 양산지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 0.7686, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 양산지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.0769, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 양산지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "4기",
    "district": "김해지사",
    "ef": {
      "CO2": { "value": 35595.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 김해지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 0.6345, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 김해지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 0.0635, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 김해지사 · N2O · 실측 기반" } },
    },
  },
  {
    "phase": "4기",
    "district": "광주전남지사",
    "ef": {
      "CO2": { "value": 41830.0, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 광주전남지사 · CO2 · 실측 기반" } },
      "CH4": { "value": 13.93, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 광주전남지사 · CH4 · 실측 기반" } },
      "N2O": { "value": 1.8397, "unit": "kgGHG/TJ", "primarySource": { ...KDHC_HEAT_EF, "note": "KDHC 계획기간 4기 · 광주전남지사 · N2O · 실측 기반" } },
    },
  },
];

export const HEAT_NATIONAL: HeatEmissionFactorsNational[] = [
  {
    "kind": "열전용",
    "ef": {
      "CO2": { "value": 56373, "unit": "kgGHG/TJ", "primarySource": { ...KETS_HEAT_EF, "note": "⚠ 원출처 미상 · 열전용 · CO2 · xlsm 하드코딩값 (K-ETS 별표 또는 GIR 부속 자료 추정)" } },
      "CH4": { "value": 1.278, "unit": "kgGHG/TJ", "primarySource": { ...KETS_HEAT_EF, "note": "⚠ 원출처 미상 · 열전용 · CH4 · xlsm 하드코딩값 (K-ETS 별표 또는 GIR 부속 자료 추정)" } },
      "N2O": { "value": 0.166, "unit": "kgGHG/TJ", "primarySource": { ...KETS_HEAT_EF, "note": "⚠ 원출처 미상 · 열전용 · N2O · xlsm 하드코딩값 (K-ETS 별표 또는 GIR 부속 자료 추정)" } },
    },
  },
  {
    "kind": "열병합",
    "ef": {
      "CO2": { "value": 60760, "unit": "kgGHG/TJ", "primarySource": { ...KETS_HEAT_EF, "note": "⚠ 원출처 미상 · 열병합 · CO2 · xlsm 하드코딩값 (K-ETS 별표 또는 GIR 부속 자료 추정)" } },
      "CH4": { "value": 2.053, "unit": "kgGHG/TJ", "primarySource": { ...KETS_HEAT_EF, "note": "⚠ 원출처 미상 · 열병합 · CH4 · xlsm 하드코딩값 (K-ETS 별표 또는 GIR 부속 자료 추정)" } },
      "N2O": { "value": 0.549, "unit": "kgGHG/TJ", "primarySource": { ...KETS_HEAT_EF, "note": "⚠ 원출처 미상 · 열병합 · N2O · xlsm 하드코딩값 (K-ETS 별표 또는 GIR 부속 자료 추정)" } },
    },
  },
  {
    "kind": "열평균",
    "ef": {
      "CO2": { "value": 59510, "unit": "kgGHG/TJ", "primarySource": { ...KETS_HEAT_EF, "note": "⚠ 원출처 미상 · 열평균 · CO2 · xlsm 하드코딩값 (K-ETS 별표 또는 GIR 부속 자료 추정)" } },
      "CH4": { "value": 1.832, "unit": "kgGHG/TJ", "primarySource": { ...KETS_HEAT_EF, "note": "⚠ 원출처 미상 · 열평균 · CH4 · xlsm 하드코딩값 (K-ETS 별표 또는 GIR 부속 자료 추정)" } },
      "N2O": { "value": 0.44, "unit": "kgGHG/TJ", "primarySource": { ...KETS_HEAT_EF, "note": "⚠ 원출처 미상 · 열평균 · N2O · xlsm 하드코딩값 (K-ETS 별표 또는 GIR 부속 자료 추정)" } },
    },
  },
];
