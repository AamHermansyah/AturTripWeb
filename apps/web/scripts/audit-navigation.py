"""Audit HTTP/SSR localhost. Tidak menjalankan JavaScript atau menilai layout visual."""
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import urlopen
import json

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / ".docs/navigation-audit.json"
BASE = "http://localhost:3000"
previous = json.loads(REPORT.read_text(encoding="utf-8"))
seeds = sorted(set(previous["seeds"] + ["/guide-mode/changes", "/booking/changes", "/booking/guide-reschedule"]))

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = set()
        self.headings = 0
    def handle_starttag(self, tag, attrs):
        if tag == "h1":
            self.headings += 1
        if tag == "a":
            href = dict(attrs).get("href", "")
            if href.startswith("/") and not href.startswith("//"):
                self.hrefs.add(href.split("#")[0])

def check(path):
    try:
        with urlopen(BASE + path, timeout=45) as response:
            html = response.read().decode("utf-8")
            parser = Links()
            parser.feed(html)
            problems = []
            if response.status >= 400:
                problems.append("HTTP error")
            if "NEXT_HTTP_ERROR_FALLBACK" in html:
                problems.append("notFound payload")
            if '"digest"' in html or "Application error: a server-side exception" in html:
                problems.append("server render error")
            public = urlsplit(path).path.startswith(("/trips/", "/booking/changes", "/guide-mode/changes"))
            if public and any(value in html for value in ["116.401237", "116.404567", "116.411237", "-8.412349"]):
                problems.append("private example coordinate in public payload")
            return {"path": path, "status": response.status, "links": sorted(parser.hrefs), "h1Count": parser.headings, "errors": problems}
    except Exception as error:
        return {"path": path, "status": None, "links": [], "errors": [str(error)]}

with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(check, seeds))
    targets = sorted(set(href for item in results for href in item["links"]) - set(seeds))
    results += list(pool.map(check, targets))
errors = [item for item in results if item["errors"]]
report = {"date": date.today().isoformat(), "method": "HTTP and server-rendered links; no browser interaction", "seeds": seeds, "checked": len(results), "errorCount": len(errors), "results": sorted(results, key=lambda item: item["path"])}
REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"checked": report["checked"], "errors": errors}, ensure_ascii=True))
raise SystemExit(1 if errors else 0)
