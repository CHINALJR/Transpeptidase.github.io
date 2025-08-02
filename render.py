

# pip3 install pytest-playwright playwright
# /Users/wq/Library/Python/3.9/bin/playwright install chromium
# python3 -m http.server 8000

from playwright.sync_api import sync_playwright
import os

OUTPUT_HTML = "index.html"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    page.goto(f"http://localhost:8000/js_index.html", wait_until="networkidle")
    page.wait_for_timeout(5000)

    rendered_html = page.content()
    browser.close()

# 删除包含 "script.js" 的整行（基于字符串处理）
lines = rendered_html.splitlines()
filtered_lines = [line for line in lines if "script.js" not in line]

# 写入新的 HTML 文件
with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
    f.write("\n".join(filtered_lines))

print(f"save to {OUTPUT_HTML}")