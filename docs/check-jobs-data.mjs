import { jobs, JOB_COUNT } from "../src/data/jobs.ts";

const { en, ar } = jobs;
const bad = [];

if (en.length !== JOB_COUNT) bad.push("en length " + en.length + " != JOB_COUNT");
if (ar.length !== JOB_COUNT) bad.push("ar length " + ar.length + " != JOB_COUNT");

const groups = {};
const fields = ["dept", "type", "loc", "exp", "title", "desc"];
const lists = ["requirements", "responsibilities"];

en.forEach((j, i) => {
  groups[j.dept] = (groups[j.dept] || 0) + 1;
  const a = ar[i];
  if (!a) return bad.push(j.id + " missing ar entry");
  if (j.id !== a.id) bad.push("idx " + i + ": id " + j.id + " vs " + a.id);
  fields.forEach((k) => {
    if (!j[k]) bad.push(j.id + " en " + k + " empty");
    if (!a[k]) bad.push(j.id + " ar " + k + " empty");
  });
  lists.forEach((k) => {
    if (j[k].length < 4 || a[k].length < 4) bad.push(j.id + " " + k + " too short " + j[k].length + "/" + a[k].length);
    if (j[k].length !== a[k].length) bad.push(j.id + " " + k + " en/ar length mismatch");
    if (j[k].some((s) => !s || !s.trim())) bad.push(j.id + " en " + k + " has empty string");
    if (a[k].some((s) => !s || !s.trim())) bad.push(j.id + " ar " + k + " has empty string");
  });
});

const ids = en.map((j) => j.id);
const types = en.reduce((m, j) => ((m[j.type] = (m[j.type] || 0) + 1), m), {});
const reqTotal = en.reduce((n, j) => n + j.requirements.length, 0);
const respTotal = en.reduce((n, j) => n + j.responsibilities.length, 0);

console.log("ids:", ids.join(","));
console.log("counts EN/AR:", en.length, "/", ar.length, "| unique ids:", new Set(ids).size);
console.log("by dept:", JSON.stringify(groups));
console.log("by type:", JSON.stringify(types));
console.log("distinct locations:", new Set(en.map((j) => j.loc)).size);
console.log("requirement bullets:", reqTotal, "| responsibility bullets:", respTotal);
console.log("PROBLEMS:", bad.length ? bad : "NONE");
