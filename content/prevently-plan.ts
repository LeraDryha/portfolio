// The Prevently case's "Try it" plan: a few of the app's real rules, translated from the Ukrainian app.
// Source: prevently-ios RecommendationData/rules_age_v1_2.json (age table) and rules_modifiers.json (modifiers).
// The engine keeps the strictest interval when several rules give the same check-up (fewest months wins).

export type Category = "lab" | "ins" | "con" | "vac" | "q";
export type Answer = "smoke" | "bmi" | "breast" | "colon" | "htn";

export const categories: Record<Category, string> = {
  lab: "Lab tests",
  ins: "Instrumental",
  con: "Consultations",
  vac: "Vaccines",
  q: "Questionnaires",
};

export const exams: Record<string, [name: string, category: Category]> = {
  blood_pressure: ["Blood pressure", "ins"],
  hiv_test: ["HIV test", "lab"],
  hcv_test: ["Hepatitis C test", "lab"],
  hpv_vaccine: ["HPV vaccine", "vac"],
  phq9: ["Depression screening (PHQ-9)", "q"],
  gad7: ["Anxiety screening (GAD-7)", "q"],
  tb_questionnaire: ["TB questionnaire", "q"],
  dentist: ["Dentist", "con"],
  gynecologist: ["Gynaecologist", "con"],
  ophthalmologist: ["Ophthalmologist", "con"],
  cervical_screening: ["Cervical screening (HPV test)", "lab"],
  diabetes_screening: ["HbA1c", "lab"],
  mammography: ["Mammography", "ins"],
  lipid_panel: ["Lipid panel", "lab"],
  colorectal_screening: ["Bowel screening (FIT)", "lab"],
  dexa: ["Bone density (DEXA)", "ins"],
  hepb_vaccine: ["Hepatitis B vaccine", "vac"],
  td_vaccine: ["Tetanus and diphtheria booster", "vac"],
  flu_vaccine: ["Flu vaccine", "vac"],
  pneumococcal_vaccine: ["Pneumococcal vaccine", "vac"],
  shingles_vaccine: ["Shingles vaccine", "vac"],
  breast_mri: ["Breast MRI", "ins"],
  breast_us: ["Breast ultrasound", "ins"],
  colonoscopy: ["Colonoscopy", "ins"],
  family_doctor: ["Family doctor", "con"],
};

/** [exam, from age, to age, how often, months (for "strictest wins"), source] */
export const ageRules: [string, number, number, string, number, string][] = [
  ["blood_pressure", 18, 39, "Every 3–5 years", 36, "USPSTF 2021"],
  ["blood_pressure", 40, 120, "Every year", 12, "USPSTF 2021"],
  ["hiv_test", 18, 65, "Once", 999, "USPSTF 2019"],
  ["hcv_test", 18, 79, "Once", 999, "USPSTF 2020"],
  ["hpv_vaccine", 18, 26, "0–2–6 month schedule", 998, "CDC/ACIP 2019"],
  ["hpv_vaccine", 27, 45, "If your doctor decides", 998, "CDC/ACIP 2019"],
  ["phq9", 18, 120, "Every year", 12, "USPSTF 2023"],
  ["tb_questionnaire", 18, 120, "Every year", 12, "WHO; MoH of Ukraine 2023"],
  ["gad7", 18, 120, "Every year", 12, "USPSTF 2023"],
  ["dentist", 18, 120, "Every year", 12, "NICE CG19"],
  ["gynecologist", 18, 64, "Every year", 12, "ACOG"],
  ["gynecologist", 65, 120, "Every year or as needed", 12, "ACOG"],
  ["ophthalmologist", 18, 39, "Every 5–10 years", 60, "AAO 2025"],
  ["ophthalmologist", 40, 54, "Every 2–4 years", 24, "AAO 2025"],
  ["ophthalmologist", 55, 64, "Every 1–3 years", 12, "AAO 2025"],
  ["ophthalmologist", 65, 120, "Every 1–2 years", 12, "AAO 2025"],
  ["cervical_screening", 25, 64, "Every 5 years", 60, "MoH of Ukraine No. 1057, 2024"],
  ["diabetes_screening", 35, 74, "Every 3 years", 36, "ADA 2025 / USPSTF 2021"],
  ["mammography", 40, 74, "Every 2 years", 24, "USPSTF 2024 / ECIBC 2019"],
  ["lipid_panel", 30, 74, "Every 5 years", 60, "USPSTF 2022"],
  ["colorectal_screening", 45, 75, "Every year", 12, "USPSTF 2021"],
  ["dexa", 65, 120, "At your doctor’s interval", 24, "USPSTF 2025"],
  ["hepb_vaccine", 18, 59, "0–1–6 month schedule, if not vaccinated", 998, "CDC/ACIP 2022"],
  ["td_vaccine", 18, 120, "Every 10 years", 120, "WHO / CDC"],
  ["flu_vaccine", 18, 120, "Every year", 12, "CDC/ACIP"],
  ["pneumococcal_vaccine", 65, 120, "Once", 999, "CDC/ACIP 2022–2023"],
  ["shingles_vaccine", 50, 120, "Two doses", 998, "CDC/ACIP 2022"],
];

/** [answer, exam, from age, to age, how often, months, why, source] */
export const modifierRules: [Answer, string, number, number, string, number, string, string][] = [
  ["bmi", "diabetes_screening", 0, 120, "Every 3 years", 36, "BMI", "ADA 2025 / USPSTF 2021"],
  ["smoke", "lipid_panel", 0, 120, "Every 5 years", 60, "smoking", "USPSTF 2022 / ACC-AHA"],
  ["bmi", "lipid_panel", 0, 120, "Every 5 years", 60, "BMI", "USPSTF 2022 / ACC-AHA"],
  ["smoke", "pneumococcal_vaccine", 19, 64, "Once", 999, "smoking", "CDC/ACIP 2022–2023"],
  ["breast", "mammography", 30, 120, "Every year, from 30", 12, "family history", "NCCN 2025"],
  ["breast", "breast_mri", 0, 120, "If your doctor recommends", 997, "family history", "NCCN 2025"],
  ["breast", "breast_us", 0, 120, "If indicated", 997, "family history", "ACR 2023"],
  ["breast", "gynecologist", 0, 120, "Every year", 12, "family history", "NCCN 2025"],
  ["colon", "colonoscopy", 40, 120, "From 40, then every 5 years", 60, "family history", "ACG 2021"],
  ["htn", "blood_pressure", 0, 120, "Every year", 12, "family history", "USPSTF 2021; ESH 2023"],
  ["htn", "lipid_panel", 20, 39, "Every 3–5 years", 36, "family history", "ESC 2021"],
  ["htn", "lipid_panel", 40, 120, "Every year", 12, "family history", "ESC 2021"],
  ["htn", "diabetes_screening", 35, 39, "Every 3–5 years", 36, "family history", "ESC 2021"],
  ["htn", "diabetes_screening", 40, 120, "Every year", 12, "family history", "ESC 2021"],
  ["htn", "family_doctor", 0, 120, "Every year", 12, "family history", "ESC 2021"],
];

export type PlanItem = { id: string; freq: string; months: number; why: string[]; sources: string[] };

/** The plan for an age and a set of answers: every rule that applies, the strictest interval per check-up. */
export function buildPlan(age: number, answers: Set<Answer>): PlanItem[] {
  const out = new Map<string, PlanItem>();
  const put = (id: string, freq: string, months: number, why: string, source: string) => {
    const cur = out.get(id);
    if (!cur) {
      out.set(id, { id, freq, months, why: [why], sources: [source] });
      return;
    }
    if (!cur.why.includes(why)) cur.why.push(why);
    if (!cur.sources.includes(source)) cur.sources.push(source);
    if (months < cur.months) {
      cur.freq = freq;
      cur.months = months;
    }
  };
  for (const [id, a, b, f, m, s] of ageRules) if (age >= a && age <= b) put(id, f, m, "age", s);
  for (const [k, id, a, b, f, m, w, s] of modifierRules) if (answers.has(k) && age >= a && age <= b) put(id, f, m, w, s);
  return [...out.values()];
}
