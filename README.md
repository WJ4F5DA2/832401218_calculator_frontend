# 832401218 Calculator Frontend

The **front end** of a front-end/back-end separated calculator system,
implemented with plain HTML + CSS + JavaScript — no frameworks,
no build step.

The front end only handles presentation and user interaction: it collects
the expression, calls the back-end API, displays the result and error
messages returned by the back end, and shows/manages calculation history.
**All calculation is performed by the back end**; the front end contains
no calculation logic.

## Tech Stack

| Component | Technology |
| --- | --- |
| Structure | HTML5 |
| Styling | CSS3 (Flex + Grid, responsive layout) |
| Logic | Vanilla JavaScript (ES6, no framework, no build step) |
| Communication | Fetch API (JSON over HTTP) |

## Runtime Environment

- Any modern browser (Chrome / Edge / Firefox)
- Local preview requires a static file server (e.g. Python's built-in `http.server`)

## How to Run

```bash
# Start a static server inside the src directory
cd src
python -m http.server 5500
```

Open `http://localhost:5500/index.html` in a browser.

## Configuration

The back-end API address is configured at the top of `src/script.js`:

```js
const API_BASE = "http://localhost:5000/api";
```

- Local development: keep the default (the back end runs on port 5000).
- After deployment: change it to the public back-end URL, e.g.
  `https://your-backend.onrender.com/api`.

## How the Front End Connects to the Back End

1. Start the back-end service first (see the backend repository README).
2. Point `API_BASE` at the back end's `/api` prefix.
3. The front end interacts with the back end through these APIs:

| Front-end action | API call |
| --- | --- |
| Click `=` | `POST /api/calculate` with body `{ "expression": "..." }` |
| Page load / click "Refresh" | `GET /api/history` |
| Click `×` on a history record | `DELETE /api/history/{id}` |
| Click "Clear" | `DELETE /api/history` |

If the back end is unavailable, the UI still accepts input normally, but
no new valid calculation result can be obtained, and the history list
shows "Cannot connect to the back end".

## Project Structure

```
832401218_calculator_frontend/
├── src/
│   ├── index.html     # Page structure (keypad + history panel)
│   ├── style.css      # Styles
│   └── script.js      # Interaction logic and API calls
├── README.md
└── codestyle.md
```
