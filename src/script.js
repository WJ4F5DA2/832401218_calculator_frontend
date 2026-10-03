/**
 * Calculator front end.
 *
 * The front end only collects input and displays what the back end returns;
 * all calculation is performed by the back-end API.
 */
"use strict";

/* Back-end API base URL. Change this after deploying the back end. */
const API_BASE = "https://wj4f5da2.pythonanywhere.com/api";

const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const errorEl = document.getElementById("error");
const historyListEl = document.getElementById("history-list");

let expression = "";

/** Map internal operators to the symbols shown on the display. */
function toDisplay(expr) {
  return expr.replace(/\//g, "÷").replace(/\*/g, "×").replace(/-/g, "−");
}

function render() {
  expressionEl.textContent = expression ? toDisplay(expression) : " ";
  resultEl.textContent = "0";
}

function showError(message) {
  errorEl.textContent = message;
}

function clearError() {
  errorEl.textContent = "";
}

function appendValue(value) {
  clearError();
  expression += value;
  render();
}

function clearAll() {
  clearError();
  expression = "";
  render();
}

function backspace() {
  clearError();
  expression = expression.slice(0, -1);
  render();
}

async function requestJson(url, options) {
  const response = await fetch(url, options);
  if (response.status === 204) {
    return { success: true };
  }
  const body = await response.json();
  if (!response.ok || body.success === false) {
    throw new Error(body.message || "Request failed (HTTP " + response.status + ")");
  }
  return body;
}

/** Send the expression to the back end and display its result. */
async function calculate() {
  if (!expression.trim()) {
    showError("Please enter an expression first");
    return;
  }
  clearError();
  resultEl.textContent = "Calculating…";
  try {
    const data = await requestJson(API_BASE + "/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: expression }),
    });
    resultEl.textContent = "= " + data.result;
    await loadHistory();
  } catch (err) {
    resultEl.textContent = "0";
    showError(err.message);
  }
}

/** Load history records from the back end and render them. */
async function loadHistory() {
  try {
    const data = await requestJson(API_BASE + "/history");
    renderHistory(data.history);
  } catch (err) {
    historyListEl.innerHTML =
      '<li class="history-empty">Cannot connect to the back end; history unavailable</li>';
  }
}

function renderHistory(records) {
  historyListEl.innerHTML = "";
  if (!records.length) {
    historyListEl.innerHTML = '<li class="history-empty">No history records</li>';
    return;
  }
  records.forEach(function (record) {
    const li = document.createElement("li");
    li.className = "history-item";

    const exprSpan = document.createElement("span");
    exprSpan.className = "history-expr";
    exprSpan.textContent =
      toDisplay(record.expression) + " = " + record.result;

    const timeSpan = document.createElement("span");
    timeSpan.className = "history-time";
    timeSpan.textContent = record.created_at;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "history-delete";
    deleteBtn.type = "button";
    deleteBtn.title = "Delete this record";
    deleteBtn.textContent = "×";
    deleteBtn.addEventListener("click", function () {
      deleteRecord(record.id);
    });

    li.appendChild(exprSpan);
    li.appendChild(timeSpan);
    li.appendChild(deleteBtn);
    historyListEl.appendChild(li);
  });
}

/** Ask the back end to delete one record, then refresh the list. */
async function deleteRecord(id) {
  try {
    await requestJson(API_BASE + "/history/" + id, { method: "DELETE" });
    await loadHistory();
  } catch (err) {
    showError(err.message);
  }
}

/** Ask the back end to clear all records, then refresh the list. */
async function clearHistory() {
  try {
    await requestJson(API_BASE + "/history", { method: "DELETE" });
    await loadHistory();
  } catch (err) {
    showError(err.message);
  }
}

/* ---------- wire up events ---------- */

document.getElementById("keys").addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }
  if (button.dataset.action === "clear") {
    clearAll();
  } else if (button.dataset.action === "backspace") {
    backspace();
  } else if (button.dataset.action === "equals") {
    calculate();
  } else if (button.dataset.value !== undefined) {
    appendValue(button.dataset.value);
  }
});

document
  .getElementById("refresh-history")
  .addEventListener("click", loadHistory);
document
  .getElementById("clear-history")
  .addEventListener("click", clearHistory);

render();
loadHistory();
