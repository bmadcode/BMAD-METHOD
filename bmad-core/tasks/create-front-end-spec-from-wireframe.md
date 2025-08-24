<!-- Powered by BMAD™ Core -->

# Create Front-end Spec from Local Wireframe (Auto Screenshot)

## Purpose
ローカルHTMLワイヤーフレームを自動でヘッドレスブラウザで撮影し、スクリーンショットをフロントエンド仕様に埋め込んだうえで、テンプレートに沿って仕様書を生成します。

## Inputs
- screen_id: 画面ID（例: AD-033）
- wireframe_html_path: ローカルHTMLワイヤーフレームの絶対パス
- project_root: プロジェクトルートの絶対パス（例: /Users/xxx/work/your-project）

## Defaults
- 仕様書出力先: `documents/frontend_spec/{{screen_id}}.md`
- スクリーンショット出力先: `documents/assets/{{screen_id}}-wireframe.png`
- テンプレート: `{root}/templates/front-end-spec-tmpl.yaml`

## Steps
1. Python Playwright をプリウォーム（環境に未導入なら導入）
2. Chromium で `file://` スキームのローカルHTMLを開き、1280x720 で撮影
3. 画像を `documents/assets/{{screen_id}}-wireframe.png` に保存
4. テンプレート `front-end-spec-tmpl.yaml` を用いて仕様書を作成
   - 変数: `screen_id`, `wireframe_screenshot_relpath`（例: `../assets/{{screen_id}}-wireframe.png`）
5. 生成された仕様書に「Wireframe Screenshots」セクションが含まれることを確認
6. （任意）プローズモードでの出力
   - `export BMAD_STYLE=prose` を設定してからレンダリングを行うと、本リポジトリのポリシーに従い「1文1行＋各行先頭に`* `」で整形されたプローズが生成される（コードブロック・Mermaid・画像・表は除外）。

## Execution Notes
- 撮影後に画像パスを相対に変換し、仕様書から参照可能にします。
- 既存ファイルがある場合は追記/更新の方針をユーザーに確認してください。

## Commands
```bash
# 1) Ensure playwright env is ready (idempotent)
python3 -m pip install --user playwright
python3 -m playwright install chromium

# 2) Take screenshot
python3 - <<'PY'
from playwright.sync_api import sync_playwright
import os
screen_id = os.environ.get('BMAD_SCREEN_ID')
html = os.environ.get('BMAD_WIREFRAME_HTML')
project_root = os.environ.get('BMAD_PROJECT_ROOT')
out_abs = os.path.join(project_root, 'documents', 'assets', f"{screen_id}-wireframe.png")
os.makedirs(os.path.dirname(out_abs), exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width":1280, "height":720})
    page.goto(f"file://{html}")
    page.wait_for_timeout(1200)
    page.screenshot(path=out_abs)
    b.close()
print(out_abs)
PY

# 3) Render from template (tooling-dependent - example placeholder)
# export BMAD_STYLE=prose
# bmad render --template {root}/templates/front-end-spec-tmpl.yaml \
#   --out documents/frontend_spec/${BMAD_SCREEN_ID}.md \
#   --var screen_id=${BMAD_SCREEN_ID} \
#   --var wireframe_screenshot_relpath=../assets/${BMAD_SCREEN_ID}-wireframe.png
```

## Elicitation
本タスクは非対話で実行可能ですが、出力先が既存の場合は上書き可否の確認が必要です。


